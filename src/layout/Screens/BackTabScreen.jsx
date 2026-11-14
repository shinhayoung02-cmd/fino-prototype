import { useLocation } from 'react-router-dom'
import AppShell from '../AppShell/AppShell'
import Header from '../../components/common/Header/Header'
import BottomNav from '../../components/common/BottomNav/BottomNav'
import { NAV_ITEMS } from './navItems'
import useGoTo from './useGoTo'

// 제목 헤더 화면. 하단 네비 탭 목적지면 하단 네비, 아니면 뒤로가기(홈으로)
export default function BackTabScreen({ title, children, activeTab, onSelectTab, rightSlot }) {
  const goHome = useGoTo('/', onSelectTab)
  const location = useLocation()
  // 하단 네비 탭 목적지(AI 매칭·채팅·작성글 관리)는 뒤로가기 없이 하단 네비 표시
  const isNavTab = NAV_ITEMS.some((item) => item.path === location.pathname)
  return (
    <AppShell
      key={location.pathname}
      header={<Header title={title} showBack={!isNavTab} onBack={goHome} rightSlot={rightSlot} />}
      bottomNav={isNavTab ? <BottomNav items={NAV_ITEMS} activeTab={activeTab} onSelect={onSelectTab} /> : undefined}
    >
      {children}
    </AppShell>
  )
}
