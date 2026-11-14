import PreviewStage from './layout/PreviewStage/PreviewStage'
import Login from './pages/Login/Login'
import NavMenu from './components/common/NavMenu/NavMenu'
import Splash from './components/common/Splash/Splash'
import AppStateProvider from './app/AppStateProvider'
import AppDialogs from './app/AppDialogs'
import useAppState from './app/useAppState'
import { DELIVERY_METHOD_PICK_OPTIONS } from './app/constants'
import AppRoutes from './routes/AppRoutes'
import './App.css'

// 시연용 플로우 설정 패널 (폰 프레임 밖)
function DemoNavMenu() {
  const { demo, dialogs, actions } = useAppState()
  return (
    <NavMenu
      isOpen={dialogs.navMenu.isOpen}
      onClose={dialogs.navMenu.close}
      isMultipleClaimantsFlow={demo.isMultipleClaimantsFlow}
      onToggleMultipleClaimantsFlow={() => actions.requestFlowChange('claimants')}
      isQuizFailFlow={demo.isQuizFailFlow}
      onToggleQuizFailFlow={() => actions.requestFlowChange('quiz-fail')}
      isFoundRestrictedFlow={demo.isFoundRestrictedFlow}
      onToggleFoundRestrictedFlow={() => actions.requestFlowChange('found-restricted')}
      isFoundMultipleClaimantsFlow={demo.isFoundMultipleClaimantsFlow}
      onToggleFoundMultipleClaimantsFlow={demo.toggleFoundMultipleClaimantsFlow}
      hasStorageItems={demo.hasStorageItems}
      onToggleHasStorageItems={demo.toggleHasStorageItems}
      onRestart={actions.restartDemo}
      deliveryMethodOptions={DELIVERY_METHOD_PICK_OPTIONS}
      deliveryMethodPick={demo.deliveryMethodPick}
      onSelectDeliveryMethod={demo.setDeliveryMethodPick}
    />
  )
}

function AppContent() {
  const { session, splash, setSplash } = useAppState()
  return (
    <PreviewStage>
      {session === null ? <Login /> : session === undefined ? null : <AppRoutes />}
      <AppDialogs />
      <DemoNavMenu />
      {splash && <Splash key={splash.id} withProgress={splash.withProgress} onDone={() => setSplash(null)} />}
    </PreviewStage>
  )
}

function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  )
}

export default App
