import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AppShell from '../../layout/AppShell/AppShell'
import { NAV_ITEMS } from '../../layout/Screens/navItems'
import useGoTo from '../../layout/Screens/useGoTo'
import Header from '../../components/common/Header/Header'
import BottomNav from '../../components/common/BottomNav/BottomNav'
import MenuButton from '../../components/common/MenuButton/MenuButton'
import ChatRoom from '../../pages/Chat/ChatRoom'

export default function ChatRoomScreen({ onSelectTab, onReadRoom, onOpenNavMenu }) {
  const goToChatList = useGoTo('/chat', onSelectTab)
  const { roomId } = useParams()

  useEffect(() => {
    onReadRoom(roomId)
  }, [roomId, onReadRoom])

  return (
    <AppShell
      key={roomId}
      className="chat-room-shell"
      header={
        <Header title="채팅" showBack onBack={goToChatList} rightSlot={<MenuButton onClick={onOpenNavMenu} />} />
      }
      bottomNav={<BottomNav items={NAV_ITEMS} activeTab="/chat" onSelect={onSelectTab} />}
    >
      <ChatRoom roomId={roomId} />
    </AppShell>
  )
}
