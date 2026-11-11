import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@seed-design/css/base.css'
import './index.css'
import App from './App.jsx'

// GA4: Vercel 환경변수 VITE_GA_ID(G-XXXX)가 있을 때만 로드.
// 화면 이동(SPA)은 GA4 향상된 측정의 '방문 기록 이벤트 기반 페이지 변경'이 자동으로 page_view 기록.
const gaId = import.meta.env.VITE_GA_ID
if (gaId) {
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', gaId)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
