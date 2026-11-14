import { useLocation, useNavigate } from 'react-router-dom'
import AppShell from '../AppShell/AppShell'
import Header from '../../components/common/Header/Header'

// 플로우 중간 단계 화면: 뒤로가기(backTo) 헤더만, 하단 네비 없음
export default function SubStepScreen({ title, backTo, children, rightSlot, className }) {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <AppShell
      className={className}
      key={location.pathname}
      header={
        <Header title={title} showBack onBack={() => navigate(backTo)} rightSlot={rightSlot} />
      }
    >
      {children}
    </AppShell>
  )
}
