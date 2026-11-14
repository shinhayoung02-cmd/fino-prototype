import { useLocation } from 'react-router-dom'
import AppShell from '../AppShell/AppShell'
import MainTopBar from '../../components/common/MainTopBar/MainTopBar'
import BottomNav from '../../components/common/BottomNav/BottomNav'
import { NAV_ITEMS } from './navItems'

// 메인 상단바 + 하단 네비
export default function TabScreen({ children, activeTab, onSelectTab }) {
  const location = useLocation()
  return (
    <AppShell
      key={location.pathname}
      header={<MainTopBar />}
      bottomNav={<BottomNav items={NAV_ITEMS} activeTab={activeTab} onSelect={onSelectTab} />}
    >
      {children}
    </AppShell>
  )
}
