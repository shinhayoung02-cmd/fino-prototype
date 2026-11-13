import { useEffect, useState } from 'react'
import AppShell from '../../layout/AppShell/AppShell'
import logoBg from '../../assets/splash/logo-bg.svg'
import logoVector from '../../assets/splash/logo-vector.svg'
import logoMaskShape from '../../assets/splash/logo-mask-shape.svg'
import logoMaskDots from '../../assets/splash/logo-mask-dots.svg'
import logoGradient from '../../assets/splash/logo-gradient.svg'
import { signIn } from '../../lib/supabase'
import './Login.css'

// Figma 당근밭 1471:29054 (로그인 출시판). 로고는 스플래시와 같은 SVG 부품을 100px로 축소
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
          <div className="login__logo-group">
            <div className="login__logo">
              <div className="login__logo-inner">
                <img src={logoBg} alt="" className="login__logo-bg" />
                <img src={logoVector} alt="" className="login__logo-vector" />
                <div
                  className="login__logo-masked"
                  style={{ maskImage: `url("${logoMaskShape}"), url("${logoMaskDots}")`, WebkitMaskImage: `url("${logoMaskShape}"), url("${logoMaskDots}")` }}
                >
                  <img src={logoGradient} alt="" />
                </div>
              </div>
            </div>
            <p className="login__wordmark">FINO</p>
          </div>
          <p className="login__tagline">잃어버린 순간부터, FINO가 함께 찾아요!</p>
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
