import { useEffect, useState } from 'react'
import AppShell from '../../layout/AppShell/AppShell'
import logoGradient from '../../assets/splash/logo-gradient.svg'
import { signIn } from '../../lib/supabase'
import './Login.css'

// Figma 디자인 없음(사용자 결정: 코드로 바로) — 스플래시 로고 + 소셜 로그인 버튼(카카오·네이버·구글)
const PROVIDERS = [
  { id: 'kakao', label: '카카오로 시작하기' },
  { id: 'naver', label: '네이버로 시작하기' },
  { id: 'google', label: 'Google로 시작하기' },
]

export default function Login() {
  const [pending, setPending] = useState(null)

  // 네이버 서버 함수가 실패하면 #error=naver_login_failed 로 돌려보냄
  useEffect(() => {
    if (window.location.hash.includes('error=naver_login_failed')) {
      history.replaceState(null, '', window.location.pathname)
      alert('네이버 로그인을 완료하지 못했어요. 다시 시도해주세요.')
    }
  }, [])

  const handleSignIn = async (provider) => {
    setPending(provider)
    const { error } = await signIn(provider)
    if (error) {
      setPending(null)
      alert('로그인을 시작하지 못했어요. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <AppShell>
      <div className="login">
        <div className="login__brand">
          <img src={logoGradient} alt="" className="login__logo" />
          <p className="login__wordmark">FINO</p>
          <p className="login__tagline">잃어버린 물건, 주인에게 돌려줘요</p>
        </div>
        <div className="login__actions">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`login__button login__button--${p.id}`}
              disabled={pending !== null}
              onClick={() => handleSignIn(p.id)}
            >
              {pending === p.id ? '이동 중…' : p.label}
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
