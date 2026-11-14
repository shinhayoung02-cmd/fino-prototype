import { Route } from 'react-router-dom'
import BackTabScreen from '../layout/Screens/BackTabScreen'
import Chat from '../pages/Chat/Chat'
import useAppState from '../app/useAppState'
import ChatRoomScreen from './screens/ChatRoomScreen'

// 채팅 목록 · 채팅방
export default function useChatRoutes() {
  const { activeTab, setActiveTab, readRoomIds, markRoomRead, lost, found, dialogs } = useAppState()

  return [
    <Route
      key="/chat"
      path="/chat"
      element={
        <BackTabScreen title="채팅" activeTab={activeTab} onSelectTab={setActiveTab}>
          <Chat readRoomIds={readRoomIds} isFlowActive={Boolean(lost.completedItem) || Boolean(found.completedFoundItem)} />
        </BackTabScreen>
      }
    />,
    <Route
      key="/chat/:roomId"
      path="/chat/:roomId"
      element={<ChatRoomScreen onSelectTab={setActiveTab} onReadRoom={markRoomRead} onOpenNavMenu={dialogs.navMenu.open} />}
    />,
  ]
}
