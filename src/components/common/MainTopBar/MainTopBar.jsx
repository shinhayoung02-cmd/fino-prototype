import { useNavigate } from 'react-router-dom'
import iconBell from '../../../assets/home/icon-bell.svg'
import iconProfile from '../../../assets/home/icon-profile.svg'
import './MainTopBar.css'

export default function MainTopBar({ title = 'FINO' }) {
  const navigate = useNavigate()

  return (
    <div className="main-top-bar">
      <span className="main-top-bar__title">{title}</span>
      <div className="main-top-bar__actions">
        <button type="button" className="main-top-bar__icon-btn" aria-label="알림" onClick={() => navigate('/notifications')}>
          <img src={iconBell} alt="" />
        </button>
        <button type="button" className="main-top-bar__icon-btn" aria-label="내 정보" onClick={() => navigate('/my')}>
          <img src={iconProfile} alt="" />
        </button>
      </div>
      <div className="main-top-bar__divider" />
    </div>
  )
}
