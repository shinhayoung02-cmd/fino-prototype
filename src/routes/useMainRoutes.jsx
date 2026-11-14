import { Route } from 'react-router-dom'
import TabScreen from '../layout/Screens/TabScreen'
import BackTabScreen from '../layout/Screens/BackTabScreen'
import Home from '../pages/Home/Home'
import NearbyMapView from '../pages/Home/NearbyMapView'
import Playground from '../pages/Playground/Playground'
import Notifications from '../pages/Notifications/Notifications'
import useAppState from '../app/useAppState'
import useStepRoute from './useStepRoute'
import SearchScreen from './screens/SearchScreen'
import DetailScreen from './screens/DetailScreen'

// 홈 · 지도 · 검색 · 알림 · 개발용 화면
export default function useMainRoutes() {
  const { activeTab, setActiveTab, lost, found, storage, flowHistory, actions } = useAppState()
  const stepRoute = useStepRoute()

  return [
    <Route
      key="/"
      path="/"
      element={
        <TabScreen activeTab={activeTab} onSelectTab={setActiveTab}>
          <Home
            completedItem={lost.completedItem}
            onEditItem={lost.editCompletedItem}
            onRegisterNew={actions.startNewRegistration}
            storageItems={storage.storageItems}
            completedFoundItem={found.completedFoundItem}
            onEditFoundItem={found.editCompletedItem}
            onRegisterNewFound={() => found.setCompletedFoundItem(null)}
            isApprovalResultReady={lost.isApprovalResultReady}
            foundMatchResultPath={found.foundFlowResumePath}
            flowHistory={flowHistory}
          />
        </TabScreen>
      }
    />,
    stepRoute('/map', { title: '내 주변 습득물', backTo: '/' }, <NearbyMapView />),
    <Route key="/search" path="/search" element={<SearchScreen />} />,
    <Route
      key="/notifications"
      path="/notifications"
      element={
        <BackTabScreen title="알림" activeTab={activeTab} onSelectTab={setActiveTab}>
          <Notifications />
        </BackTabScreen>
      }
    />,
    <Route key="/playground" path="/playground" element={<TabScreen><Playground /></TabScreen>} />,
    <Route key="/detail" path="/detail" element={<DetailScreen />} />,
  ]
}
