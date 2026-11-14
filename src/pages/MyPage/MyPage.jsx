import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMyProfile, signOut } from '../../lib/supabase'
import { IS_LIVE } from '../../app/constants'
import avatarSample from '../../assets/my-page/avatar-sample.png'
import iconConfirmationBadge from '../../assets/my-page/icon-confirmation-badge.svg'
import iconChevronRightSm from '../../assets/my-page/icon-chevron-right-sm.svg'
import iconCategory from '../../assets/my-page/icon-category.svg'
import iconInterest from '../../assets/my-page/icon-interest.svg'
import iconPostManage from '../../assets/my-page/icon-post-manage.svg'
import iconMyBadge from '../../assets/my-page/icon-my-badge.svg'
import iconNotification from '../../assets/my-page/icon-notification.svg'
import iconLock from '../../assets/my-page/icon-lock.svg'
import iconHelpcenter from '../../assets/my-page/icon-helpcenter.svg'
import iconContents from '../../assets/my-storage/icon-contents.svg'
import './MyPage.css'

const BADGES = ['신뢰 습득자', '동네 파수꾼', '따뜻한 이웃']

const ACTIVITY_ITEMS = [
  { icon: iconContents, label: '내 물건 보관함', path: '/my/storage' },
  { icon: iconCategory, label: '관심 카테고리 설정' },
  { icon: iconInterest, label: '관심 목록' },
  { icon: iconPostManage, label: '글·댓글 관리' },
  { icon: iconMyBadge, label: '나의 배지 보관함' },
]

const SETTINGS_ITEMS = [
  { icon: iconNotification, label: '알림 설정' },
  { icon: iconLock, label: '개인정보 처리방침' },
  { icon: iconHelpcenter, label: '고객센터' },
  { icon: iconPostManage, label: '로그아웃', onClick: signOut },
]

function MyPageListRow({ icon, label, onClick }) {
  return (
    <button type="button" className="my-page__row" onClick={onClick}>
      <img src={icon} alt="" className="my-page__row-icon" />
      <span className="my-page__row-label">{label}</span>
      <img src={iconChevronRightSm} alt="" className="my-page__row-chevron" />
    </button>
  )
}

export default function MyPage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetchMyProfile()
      .then(setProfile)
      .catch((err) => console.error('[profile]', err))
  }, [])

  return (
    <div className="my-page">
      <div className="my-page__profile">
        <button type="button" className="my-page__profile-row" onClick={() => navigate('/my/profile')}>
          <img src={profile?.avatar_url || avatarSample} alt="" className="my-page__avatar" />
          <div className="my-page__identity">
            <p className="my-page__name">
              {profile?.nickname ?? ''}
              <img src={iconConfirmationBadge} alt="" className="my-page__verified" />
            </p>
            <p className="my-page__handle">{profile?.region || '동네 미설정'}</p>
          </div>
          <img src={iconChevronRightSm} alt="" className="my-page__row-chevron" />
        </button>
        {/* 배지는 아직 실데이터 없음 — 시연 화면에서만 표시 */}
        {!IS_LIVE && <div className="my-page__badges">
          {BADGES.map((badge) => (
            <span className="my-page__badge" key={badge}>
              {badge}
            </span>
          ))}
        </div>}
      </div>

      <div className="my-page__divider" />

      <div className="my-page__section">
        <p className="my-page__section-title">나의 활동</p>
        {ACTIVITY_ITEMS.map((item) => (
          <MyPageListRow
            key={item.label}
            icon={item.icon}
            label={item.label}
            onClick={item.path ? () => navigate(item.path) : undefined}
          />
        ))}
      </div>

      <div className="my-page__divider" />

      <div className="my-page__section">
        <p className="my-page__section-title">설정</p>
        {SETTINGS_ITEMS.map((item) => (
          <MyPageListRow key={item.label} icon={item.icon} label={item.label} onClick={item.onClick} />
        ))}
      </div>
    </div>
  )
}
