import photoWallet from '../assets/my-storage/photo-wallet.jpg'
import photoAirpods from '../assets/my-storage/photo-airpods.jpg'
import photoCarKey from '../assets/found-camera/gallery/car-key.png'

// 내 물건 보관함 초기 데이터 (Figma ① 1339:49713 기준)
// name/description은 분실물 등록 폼의 두 입력칸에 그대로 들어가는 값
export const INITIAL_STORAGE_ITEMS = [
  {
    id: 'wallet',
    title: '검정 Matin Kim 가죽 반지갑',
    name: '지갑/카드',
    description: '검정색 Matin Kim 가죽 반지갑',
    meta: '지갑/카드 · 검정색 가죽',
    category: '지갑/카드',
    registeredAt: '10월 2일 등록',
    feature: '안쪽 카드칸 학생증, 모서리 까짐',
    photoUrls: [photoWallet],
  },
  {
    id: 'airpods',
    title: '핑크 케이스 에어팟 프로 2',
    name: '전자기기',
    description: '핑크 실리콘 케이스 에어팟 프로 2',
    meta: '전자기기 · 핑크 실리콘 케이스',
    category: '전자기기',
    registeredAt: '10월 15일 등록',
    feature: '케이스 뒷면 스티커 자국',
    photoUrls: [photoAirpods],
  },
  {
    id: 'car-key',
    title: '현대 자동차 스마트키',
    name: '열쇠',
    description: '현대 자동차 스마트키',
    meta: '열쇠 · 갈색 가죽 키링',
    category: '열쇠',
    registeredAt: '11월 1일 등록',
    feature: '아파트 출입카드 함께 달림',
    photoUrls: [photoCarKey],
  },
]

const todayLabel = () => {
  const d = new Date()
  return `${d.getMonth() + 1}월 ${d.getDate()}일 등록`
}

// 등록 폼 draft → 보관함 항목
export function toStorageItem(draft) {
  const features = (draft.featureAnswers ?? []).filter((v) => v.trim())
  return {
    id: `item-${Date.now()}`,
    title: draft.description || draft.name,
    name: draft.name,
    description: draft.description,
    meta: draft.name,
    category: draft.name,
    registeredAt: todayLabel(),
    feature: features.join(', '),
    featureCount: features.length,
    photoEntries: draft.photos ?? [],
    photoUrls: (draft.photos ?? []).map((entry) => URL.createObjectURL(entry.file)),
  }
}

// 보관함 항목 → 분실물 등록 draft의 사진 엔트리 (AttachmentField 형식)
export async function toPhotoEntries(item) {
  if (item.photoEntries?.length) return item.photoEntries
  return Promise.all(
    item.photoUrls.map(async (url, index) => {
      const blob = await (await fetch(url)).blob()
      return { id: `storage-${item.id}-${index}`, file: new File([blob], `${item.id}-${index}.jpg`, { type: blob.type }), status: 'pending' }
    }),
  )
}
