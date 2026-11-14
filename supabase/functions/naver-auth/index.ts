// 네이버 로그인 → Supabase 세션.
// Supabase 기본 provider에 네이버가 없고, 커스텀 OAuth는 네이버 응답({response:{...}})의 중첩 구조를 못 읽어서 직접 처리.
//   GET /naver-auth/start?redirect_to=<앱 주소>  → state 쿠키 심고 네이버 로그인으로
//   GET /naver-auth/callback?code&state           → 네이버 프로필 → 사용자 생성/조회 → 매직링크로 앱에 세션 전달
// 계정은 네이버 고유 id로 식별(naver_<id>@users.fino.invalid). 이메일이 같아도 카카오·구글 계정과 자동 병합하지 않음(탈취 방지).
import { createClient } from 'jsr:@supabase/supabase-js@2'

const NAVER_ID = Deno.env.get('NAVER_CLIENT_ID')!
const NAVER_SECRET = Deno.env.get('NAVER_CLIENT_SECRET')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const admin = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

// 오픈 리다이렉트 방지: 이 주소들로만 돌려보냄 (Supabase Auth URL 허용 목록과 맞출 것)
const ALLOWED_ORIGINS = ['https://withfino.com', 'https://www.withfino.com', 'https://fino-v2.vercel.app', 'http://localhost:5173']
const CALLBACK = `${SUPABASE_URL}/functions/v1/naver-auth/callback`

const redirect = (to: string, headers: Record<string, string> = {}) => new Response(null, { status: 302, headers: { Location: to, ...headers } })

function safeRedirect(value: string | null) {
  try {
    const url = new URL(value ?? '')
    return ALLOWED_ORIGINS.includes(url.origin) ? url.toString() : ALLOWED_ORIGINS[0]
  } catch {
    return ALLOWED_ORIGINS[0]
  }
}

const readCookie = (req: Request, name: string) =>
  req.headers.get('cookie')?.split(/;\s*/).find((c) => c.startsWith(`${name}=`))?.slice(name.length + 1) ?? null

Deno.serve(async (req) => {
  const url = new URL(req.url)

  if (url.pathname.endsWith('/start')) {
    const state = crypto.randomUUID()
    const back = encodeURIComponent(safeRedirect(url.searchParams.get('redirect_to')))
    const auth = new URL('https://nid.naver.com/oauth2.0/authorize')
    auth.search = new URLSearchParams({ response_type: 'code', client_id: NAVER_ID, redirect_uri: CALLBACK, state }).toString()
    const cookie = `naver_state=${state}.${back}; Path=/functions/v1/naver-auth; Max-Age=600; HttpOnly; Secure; SameSite=Lax`
    // Referrer 숨김: 네이버는 등록된 서비스 URL과 Referer를 대조함 — localhost·앱(Capacitor) 내부 주소에서 시작해도 막히지 않게
    return redirect(auth.toString(), { 'Set-Cookie': cookie, 'Referrer-Policy': 'no-referrer' })
  }

  if (url.pathname.endsWith('/callback')) {
    const raw = readCookie(req, 'naver_state') ?? ''
    const dot = raw.indexOf('.') // state(uuid)엔 '.'이 없음 — 첫 '.' 뒤가 돌아갈 주소(주소엔 '.'이 있음)
    const savedState = dot > 0 ? raw.slice(0, dot) : ''
    const back = dot > 0 ? raw.slice(dot + 1) : ''
    const appUrl = safeRedirect(decodeURIComponent(back ?? ''))
    const fail = (reason: string) => redirect(`${appUrl}#error=naver_login_failed&error_description=${encodeURIComponent(reason)}`)

    if (!savedState || savedState !== url.searchParams.get('state')) return fail('state mismatch')
    const code = url.searchParams.get('code')
    if (!code) return fail(url.searchParams.get('error_description') ?? 'cancelled')

    const tokenRes = await fetch('https://nid.naver.com/oauth2.0/token?' + new URLSearchParams({
      grant_type: 'authorization_code', client_id: NAVER_ID, client_secret: NAVER_SECRET, code, state: savedState,
    }))
    const { access_token } = await tokenRes.json()
    if (!access_token) return fail('token')

    const me = await (await fetch('https://openapi.naver.com/v1/nid/me', { headers: { Authorization: `Bearer ${access_token}` } })).json()
    const p = me?.response
    if (me?.resultcode !== '00' || !p?.id) return fail('profile')

    const email = `naver_${p.id}@users.fino.invalid`
    const metadata = { provider: 'naver', naver_id: p.id, nickname: p.nickname ?? p.name, avatar_url: p.profile_image ?? null, contact_email: p.email ?? null }

    // 처음이면 생성(이미 있으면 'already registered' 오류 → 무시하고 로그인 진행)
    const { error: createError } = await admin.auth.admin.createUser({ email, email_confirm: true, user_metadata: metadata, app_metadata: { provider: 'naver', providers: ['naver'] } })
    if (createError && !/already|registered|exists/i.test(createError.message)) return fail('create')

    const { data, error } = await admin.auth.admin.generateLink({ type: 'magiclink', email, options: { redirectTo: appUrl } })
    if (error || !data?.properties?.action_link) return fail('link')
    // action_link = Supabase verify → appUrl#access_token=... (supabase-js가 주소에서 세션을 읽음)
    return redirect(data.properties.action_link, { 'Set-Cookie': 'naver_state=; Path=/functions/v1/naver-auth; Max-Age=0' })
  }

  return new Response('Not found', { status: 404 })
})
