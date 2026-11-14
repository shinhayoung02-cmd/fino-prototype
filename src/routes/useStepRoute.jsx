import { Route } from 'react-router-dom'
import SubStepScreen from '../layout/Screens/SubStepScreen'
import MenuButton from '../components/common/MenuButton/MenuButton'
import useAppState from '../app/useAppState'

// 플로우 중간 단계 라우트를 만든다: stepRoute(path, { title, backTo, className, hasMenu }, 화면)
// hasMenu(기본 true): 헤더 오른쪽 ☰(시연 메뉴) 버튼
export default function useStepRoute() {
  const { dialogs } = useAppState()

  return (path, { title, backTo, className, hasMenu = true }, content) => (
    <Route
      key={path}
      path={path}
      element={
        <SubStepScreen
          title={title}
          backTo={backTo}
          className={className}
          rightSlot={hasMenu ? <MenuButton onClick={dialogs.navMenu.open} /> : undefined}
        >
          {content}
        </SubStepScreen>
      }
    />
  )
}
