import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FLOW_LABELS } from '../../components/common/NavMenu/NavMenu'
import { readJson, writeJson } from '../../utils/storage'

const FLOW_HISTORY_KEY = 'fino-flow-history'

function getFlowName(path) {
  if (path.startsWith('/found')) return '습득자'
  if (path.startsWith('/my/storage')) return '보관함'
  if (path.startsWith('/lost') || path.startsWith('/matching')) return '분실자'
  return null
}

// 최근 활동: 방문한 플로우 화면 기록 (경로별 최신 1건, 최대 5건, 새로고침해도 유지)
export default function useFlowHistory() {
  const location = useLocation()
  const [flowHistory, setFlowHistory] = useState(() => readJson(FLOW_HISTORY_KEY, []))

  useEffect(() => {
    const path = location.pathname
    if (path === '/' || path === '/activity') return undefined
    // 화면이 그려진 뒤 헤더 제목을 읽는다
    const timer = setTimeout(() => {
      const title = document.querySelector('.header__title, .header h1')?.textContent?.trim()
      const label = FLOW_LABELS[path] ?? title
      if (!label) return
      setFlowHistory((prev) => {
        const next = [{ path, label, flow: getFlowName(path), at: Date.now() }, ...prev.filter((h) => h.path !== path)].slice(0, 5)
        writeJson(FLOW_HISTORY_KEY, next)
        return next
      })
    }, 0)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return flowHistory
}
