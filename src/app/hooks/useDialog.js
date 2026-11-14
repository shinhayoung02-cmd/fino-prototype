import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// 열림/닫힘 상태. 기본으로 화면을 옮기면 닫힌다
export function useDialog({ closeOnNavigate = true } = {}) {
  const { pathname } = useLocation()
  const [isOpen, setOpen] = useState(false)
  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (closeOnNavigate) setOpen(false)
  }, [pathname, closeOnNavigate])

  return { isOpen, open, close }
}

// 홈('/')으로 돌아오면 delay(ms) 뒤 열리는 '결과 도착' 알림 (시연용 연출)
// - 기본: 홈에 들어오는 순간 대기를 풀고 타이머 시작 (그 전에 홈을 떠나면 알림은 사라짐)
// - keepUntilShown: 실제로 열릴 때까지 대기 유지 (홈을 떠났다 돌아와도 다시 시도)
export function useHomeNotification(defaultDelay, { keepUntilShown = false } = {}) {
  const { pathname } = useLocation()
  const { isOpen, open, close } = useDialog()
  // 대기 중인 알림의 delay 목록. 같은 delay는 한 번만
  const [pendingDelays, setPendingDelays] = useState([])

  const notifyOnHome = useCallback(
    (delay = defaultDelay) => setPendingDelays((prev) => (prev.includes(delay) ? prev : [...prev, delay])),
    [defaultDelay],
  )
  const reset = useCallback(() => {
    setPendingDelays([])
    close()
  }, [close])

  useEffect(() => {
    if (keepUntilShown || pathname !== '/' || pendingDelays.length === 0) return undefined

    setPendingDelays([])
    const timers = pendingDelays.map((delay) => setTimeout(open, delay))
    return () => timers.forEach(clearTimeout)
    // 화면 이동 때만 확인 — 대기를 푼 직후 다시 실행되면 타이머가 지워지므로 pendingDelays는 의존성에서 뺀다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (!keepUntilShown || pathname !== '/' || pendingDelays.length === 0) return undefined

    const timers = pendingDelays.map((delay) =>
      setTimeout(() => {
        setPendingDelays([])
        open()
      }, delay),
    )
    return () => timers.forEach(clearTimeout)
  }, [keepUntilShown, pathname, pendingDelays, open])

  return { isOpen, open, close, notifyOnHome, reset }
}
