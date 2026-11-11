import { useEffect, useRef } from 'react'
import PhoneStatusBar from '../PhoneStatusBar/PhoneStatusBar'
import logoBg from '../../../assets/splash/logo-bg.svg'
import logoVector from '../../../assets/splash/logo-vector.svg'
import logoMaskShape from '../../../assets/splash/logo-mask-shape.svg'
import logoMaskDots from '../../../assets/splash/logo-mask-dots.svg'
import logoGradient from '../../../assets/splash/logo-gradient.svg'
import './Splash.css'

const DURATION_MS = 2600

// Figma 1390:61515 — 0 페이지(스플래시). withProgress: 리셋 시 하단 로딩 바 표시
export default function Splash({ withProgress = false, onDone }) {
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  useEffect(() => {
    const timer = setTimeout(() => onDoneRef.current?.(), DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="splash" role="status" aria-label="FINO 불러오는 중">
      <PhoneStatusBar />
      <div className="splash__brand">
        <div className="splash__logo">
          <img src={logoBg} alt="" className="splash__logo-bg" />
          <img src={logoVector} alt="" className="splash__logo-vector" />
          <div
            className="splash__logo-masked"
            style={{ maskImage: `url("${logoMaskShape}"), url("${logoMaskDots}")`, WebkitMaskImage: `url("${logoMaskShape}"), url("${logoMaskDots}")` }}
          >
            <img src={logoGradient} alt="" />
          </div>
          <span className="splash__logo-shine" />
        </div>
        <p className="splash__wordmark">
          {'FINO'.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${0.55 + i * 0.07}s` }}>
              {ch}
            </span>
          ))}
        </p>
      </div>
      {withProgress && (
        <div className="splash__progress">
          <div className="splash__progress-fill" />
        </div>
      )}
      <div className="app-shell__indicator-area splash__indicator-area">
        <div className="app-shell__indicator" />
      </div>
    </div>
  )
}
