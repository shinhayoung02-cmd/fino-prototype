import { Routes } from 'react-router-dom'
import useMainRoutes from './useMainRoutes'
import useMatchingRoutes from './useMatchingRoutes'
import useChatRoutes from './useChatRoutes'
import useFoundRegisterRoutes from './useFoundRegisterRoutes'
import useFoundMatchRoutes from './useFoundMatchRoutes'
import useLostRoutes from './useLostRoutes'
import useMyRoutes from './useMyRoutes'

// 전체 화면 라우트. 플로우별 라우트는 각 use*Routes 파일에 있다
export default function AppRoutes() {
  const mainRoutes = useMainRoutes()
  const matchingRoutes = useMatchingRoutes()
  const chatRoutes = useChatRoutes()
  const foundRegisterRoutes = useFoundRegisterRoutes()
  const foundMatchRoutes = useFoundMatchRoutes()
  const lostRoutes = useLostRoutes()
  const myRoutes = useMyRoutes()

  return (
    <Routes>
      {mainRoutes}
      {matchingRoutes}
      {chatRoutes}
      {foundRegisterRoutes}
      {foundMatchRoutes}
      {lostRoutes}
      {myRoutes}
    </Routes>
  )
}
