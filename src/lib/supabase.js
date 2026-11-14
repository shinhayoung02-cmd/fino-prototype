import { createClient } from '@supabase/supabase-js'

// 출시용 DB(fino-launch). 로컬은 `npm run dev:launch`(.env.launch.local), 배포는 Vercel env.
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)

export function signIn(provider) {
  // 네이버는 Supabase 기본 provider가 아니라 서버 함수(supabase/functions/naver-auth)로 처리
  if (provider === 'naver') {
    window.location.href = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/naver-auth/start?redirect_to=${encodeURIComponent(window.location.origin)}`
    return Promise.resolve({ error: null })
  }
  return supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin } })
}

export const signOut = () => supabase.auth.signOut()

// '8월' '21일' '9시' '30분' → Date (올해 기준)
const num = (s) => parseInt(String(s ?? ''), 10)
export function toTimestamp(t) {
  if (!t) return null
  const d = new Date(new Date().getFullYear(), num(t.month) - 1, num(t.day), num(t.hour) || 0, num(t.minute) || 0)
  return Number.isNaN(d.getTime()) ? null : d.toISOString()
}

// 사진을 캔버스에 다시 그려 긴 변 max px로 줄인다. 다시 그리면 EXIF(GPS 촬영 위치 등)가 전부 빠진다.
async function redraw(file, max) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  return canvas
}

// AI 인식 전송용: 긴 변 1024px JPEG base64
export async function toJpegBase64(file, max = 1024) {
  return (await redraw(file, max)).toDataURL('image/jpeg', 0.85).split(',')[1]
}

// Storage 업로드용: 긴 변 2048px JPEG 파일(확대·영수증 글씨 읽기용), GPS 제거됨
async function toUploadJpeg(file, max = 2048) {
  const canvas = await redraw(file, max)
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('사진 변환 실패'))), 'image/jpeg', 0.9),
  )
}

// AI 특징 뽑기(서버 함수 recognize). { image } 또는 { text } → { category, color, brand, material, form, features, name, description }
// 한도 초과면 { quota: true }, 그 외 실패는 throw
export async function recognize(input) {
  const { data, error } = await supabase.functions.invoke('recognize', { body: input })
  if (error) {
    if (error.context?.status === 429) return { quota: true }
    throw error
  }
  return data
}

const ATTR_KEYS = ['color', 'brand', 'material', 'form', 'features']
const pickAttrs = (r) => (r && !r.quota ? Object.fromEntries(ATTR_KEYS.map((k) => [k, r[k] ?? null])) : null)

// 매칭용 특징: 등록 화면에서 이미 뽑았으면 그대로, 아니면 첫 사진 → 없으면 설명 글로 뽑음. 실패해도 저장은 진행(매칭은 글자 비교로 대체)
async function ensureAttrs(draft) {
  if (draft.attrs) return draft.attrs
  try {
    const file = (draft.photos ?? []).map(toFile).find(Boolean)
    const text = [draft.name, draft.description, ...(draft.featureAnswers ?? [])].filter((v) => v?.trim()).join(' / ')
    if (file) return pickAttrs(await recognize({ image: await toJpegBase64(file) }))
    if (text) return pickAttrs(await recognize({ text }))
  } catch (err) {
    console.error('[attrs]', err)
  }
  return null
}

// AttachmentField 항목 → File (데모 샘플 사진은 File이 아니라서 건너뜀)
const toFile = (entry) => (entry instanceof File ? entry : entry?.file instanceof File ? entry.file : null)

// 사진 파일만 먼저 올리고 경로 목록을 돌려준다. 하나라도 실패하면 이미 올린 파일을 지우고 throw
async function uploadPhotoFiles(userId, kind, itemId, photos = []) {
  const paths = []
  try {
    for (const file of photos.map(toFile).filter(Boolean)) {
      const path = `${userId}/${kind}/${itemId}/${crypto.randomUUID()}.jpg`
      const { error } = await supabase.storage.from('item-photos').upload(path, await toUploadJpeg(file), { contentType: 'image/jpeg' })
      if (error) throw error
      paths.push(path)
    }
    return paths
  } catch (err) {
    await removePhotoFiles(paths)
    throw err
  }
}

const removePhotoFiles = (paths) => (paths.length ? supabase.storage.from('item-photos').remove(paths) : null)

const TABLE = { lost: 'lost_items', found: 'found_items', storage: 'storage_items' }

// 등록 draft → 테이블 행. 위치는 동네(area)와 정확한 주소(address)를 나눠 저장 — 상대에겐 area만 보임
function toRow(kind, draft, extra) {
  const features = (draft.featureAnswers ?? []).filter((v) => v?.trim())
  const base = { category: draft.name || '기타', name: draft.description || draft.name || '이름 없음', description: draft.description || null }
  if (kind === 'storage') return { ...base, private_features: features }
  const loc = draft.location
  const place = loc ? { area: loc.address ?? null, address: loc.detail ?? null, lat: loc.lat ?? null, lng: loc.lng ?? null } : {}
  if (kind === 'lost') {
    return { ...base, ...place, private_features: features, lost_from: toTimestamp(draft.timeRange), radius_m: num(draft.location?.radius) || null }
  }
  return { ...base, ...place, found_at: toTimestamp(draft.timeRange), custody: extra?.custody ?? 'keep', lost112_number: extra?.lost112Number || null }
}

// 등록 저장. 실패하면 throw — 호출한 화면에서 사용자에게 알린다.
export async function saveItem(kind, draft, extra) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('로그인이 필요해요')
  // 순서: id 미리 생성 → 사진 업로드 → 물건 저장(여기서 매칭 트리거) → 사진 기록. 사진 실패 시 물건은 저장 안 됨
  const id = crypto.randomUUID()
  const row = { id, ...toRow(kind, draft, extra), attrs: await ensureAttrs(draft) }
  const paths = await uploadPhotoFiles(user.id, kind, id, draft.photos)
  const { error } = await supabase.from(TABLE[kind]).insert(row)
  if (error) {
    await removePhotoFiles(paths)
    throw error
  }
  if (paths.length) {
    const { error: rowError } = await supabase.from('item_photos').insert(paths.map((path) => ({ item_kind: kind, item_id: id, path })))
    if (rowError) console.error('[item_photos]', rowError) // 물건은 이미 저장됨 — 재시도하면 중복이라 throw 안 함
  }
  return id
}

export async function deleteStorageItem(id) {
  const { error } = await supabase.from('storage_items').delete().eq('id', id)
  if (error) throw error
}

// 보관함 목록 + 사진(비공개 버킷이라 1시간짜리 서명 URL)
export async function fetchMyStorageItems() {
  const { data: rows, error } = await supabase.from('storage_items').select('*').order('created_at', { ascending: false })
  if (error) throw error
  const { data: photos } = await supabase.from('item_photos').select('item_id, path').eq('item_kind', 'storage')
  const paths = (photos ?? []).map((p) => p.path)
  const { data: signed } = paths.length ? await supabase.storage.from('item-photos').createSignedUrls(paths, 3600) : { data: [] }
  const urlByPath = Object.fromEntries((signed ?? []).map((s) => [s.path, s.signedUrl]))
  return rows.map((row) => ({
    ...row,
    photoUrls: (photos ?? []).filter((p) => p.item_id === row.id).map((p) => urlByPath[p.path]).filter(Boolean),
  }))
}

// 홈 최근 활동: 내가 등록한 분실물·습득물
export async function fetchRecentItems(limit = 3) {
  const [lost, found] = await Promise.all(
    ['lost_items', 'found_items'].map((t) => supabase.from(t).select('id, name, created_at').order('created_at', { ascending: false }).limit(limit)),
  )
  return [...(lost.data ?? []).map((r) => ({ ...r, kind: 'lost' })), ...(found.data ?? []).map((r) => ({ ...r, kind: 'found' }))]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit)
}

// 내 프로필(가입 시 소셜 계정 닉네임·사진으로 자동 생성). 동네(region)는 비어 있을 수 있음
export async function fetchMyProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data, error } = await supabase.from('profiles').select('nickname, avatar_url, region').eq('id', user.id).single()
  if (error) throw error
  return data
}

export async function updateMyProfile(fields) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('로그인이 필요해요')
  const { error } = await supabase.from('profiles').update(fields).eq('id', user.id)
  if (error) throw error
}

// '11월 14일 오후 3시 20분'
const formatFoundAt = (iso) =>
  iso ? new Date(iso).toLocaleString('ko-KR', { month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '시간 모름'

// 분실자 화면의 매칭 후보 (점수 높은 순) — 카드/상세 화면이 쓰는 모양으로 변환. 습득물 사진은 서명 URL(1시간)
export async function fetchMyLostMatches() {
  const { data: rows, error } = await supabase
    .from('match_items')
    .select('*')
    .eq('is_lost_owner', true)
    .eq('status', 'candidate')
    .order('score', { ascending: false })
  if (error) throw error
  const foundIds = rows.map((r) => r.found_item_id)
  const { data: photos } = foundIds.length
    ? await supabase.from('item_photos').select('item_id, path').eq('item_kind', 'found').in('item_id', foundIds)
    : { data: [] }
  const paths = (photos ?? []).map((p) => p.path)
  const { data: signed } = paths.length ? await supabase.storage.from('item-photos').createSignedUrls(paths, 3600) : { data: [] }
  const urlByPath = Object.fromEntries((signed ?? []).map((s) => [s.path, s.signedUrl]))
  const { data: excludedCount } = await supabase.rpc('my_dismissed_count')
  const candidates = rows.map((r) => {
    const gallery = (photos ?? []).filter((p) => p.item_id === r.found_item_id).map((p) => urlByPath[p.path]).filter(Boolean)
    return {
      id: r.match_id,
      similarity: Math.round(r.score * 100),
      photo: gallery[0] ?? null,
      gallery,
      title: `${r.found_category} 습득`, // 짧게(예: '지갑 습득') — 자세한 설명은 feature 줄에
      feature: r.found_description ?? r.found_name,
      time: formatFoundAt(r.found_at),
      location: r.found_area ?? '위치 모름',
      matchReasons: r.reasons ?? [],
    }
  })
  return { candidates, excludedCount: excludedCount ?? 0 }
}

// '내 물건이 아니에요' — 같은 습득물은 다시 추천되지 않음
export async function dismissMatch(matchId) {
  const { error } = await supabase.rpc('dismiss_match', { m: matchId })
  if (error) throw error
}
