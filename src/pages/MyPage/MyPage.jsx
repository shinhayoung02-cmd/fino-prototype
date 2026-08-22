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
import './MyPage.css'

const BADGES = ['신뢰 습득자', '동네 파수꾼', '따뜻한 이웃']

const ACTIVITY_ITEMS = [
  { icon: iconCategory, label: '관심 카테고리 설정' },
  { icon: iconInterest, label: '관심 목록' },
  { icon: iconPostManage, label: '글·댓글 관리' },
  { icon: iconMyBadge, label: '나의 배지 보관함' },
]

const SETTINGS_ITEMS = [
  { icon: iconNotification, label: '알림 설정' },
  { icon: iconLock, label: '개인정보 처리방침' },
  { icon: iconHelpcenter, label: '고객센터' },
  { icon: iconPostManage, label: '로그아웃' },
]

function MyPageListRow({ icon, label }) {
  return (
    <button type="button" className="my-page__row">
      <img src={icon} alt="" className="my-page__row-icon" />
      <span className="my-page__row-label">{label}</span>
      <img src={iconChevronRightSm} alt="" className="my-page__row-chevron" />
    </button>
  )
}

export default function MyPage() {
  return (
    <div className="my-page">
      <div className="my-page__profile">
        <div className="my-page__profile-row">
          <img src={avatarSample} alt="" className="my-page__avatar" />
          <div className="my-page__identity">
            <p className="my-page__name">
              홍길동
              <img src={iconConfirmationBadge} alt="" className="my-page__verified" />
            </p>
            <p className="my-page__handle">일상2동 #12345678</p>
          </div>
        </div>
        <div className="my-page__badges">
          {BADGES.map((badge) => (
            <span className="my-page__badge" key={badge}>
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="my-page__divider" />

      <div className="my-page__section">
        <p className="my-page__section-title">나의 활동</p>
        {ACTIVITY_ITEMS.map((item) => (
          <MyPageListRow key={item.label} icon={item.icon} label={item.label} />
        ))}
      </div>

      <div className="my-page__divider" />

      <div className="my-page__section">
        <p className="my-page__section-title">설정</p>
        {SETTINGS_ITEMS.map((item) => (
          <MyPageListRow key={item.label} icon={item.icon} label={item.label} />
        ))}
      </div>
    </div>
  )
}
