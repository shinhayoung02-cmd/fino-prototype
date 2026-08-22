import { useState } from 'react'
import iconLocation from '../../assets/notifications/icon-location.svg'
import iconContents from '../../assets/notifications/icon-contents.svg'
import iconMy from '../../assets/notifications/icon-my.svg'
import iconConfirmation from '../../assets/notifications/icon-confirmation.svg'
import iconReply from '../../assets/notifications/icon-reply.svg'
import iconCheck from '../../assets/notifications/icon-check.svg'
import iconVoucher from '../../assets/notifications/icon-voucher.svg'
import './Notifications.css'

const TABS = [
  { key: 'all', label: '전체' },
  { key: 'matching', label: '매칭' },
  { key: 'ownership', label: '주인 확인' },
  { key: 'return', label: '반환' },
]

const GROUPS = [
  {
    label: '오늘',
    items: [
      {
        id: 1,
        icon: iconLocation,
        category: 'matching',
        title: '비슷한 습득물을 찾았어요',
        desc: '등록한 검정 반지갑과 88% 비슷해요',
        time: '5분 전',
        unread: true,
      },
      {
        id: 2,
        icon: iconContents,
        category: 'ownership',
        title: '습득자가 확인하고 있어요',
        desc: '등록한 비공개 특징과 실제 물건을 비교하고 있어요',
        time: '20분 전',
        unread: true,
      },
      {
        id: 3,
        icon: iconMy,
        category: 'ownership',
        title: '같은 물건을 찾는 사람이 더 있어요',
        desc: '여러 요청을 비교해 실제 주인을 확인하고 있어요',
        time: '1시간 전',
        unread: false,
      },
      {
        id: 4,
        icon: iconConfirmation,
        category: 'ownership',
        title: '추가 확인이 필요해요',
        desc: '자료를 제출해 다시 확인을 요청할 수 있어요',
        time: '3시간 전',
        unread: true,
      },
    ],
  },
  {
    label: '어제',
    items: [
      {
        id: 5,
        icon: iconReply,
        category: 'ownership',
        title: '주인 확인이 완료됐어요',
        desc: '감사 방식과 물건을 받을 방법을 선택해주세요',
        time: '어제',
        unread: false,
      },
      {
        id: 6,
        icon: iconCheck,
        category: 'return',
        title: '전달 일정이 확정됐어요',
        desc: '8월 18일 오후 3시 · 홍대입구역 8번 출구',
        time: '어제',
        unread: false,
      },
      {
        id: 7,
        icon: iconVoucher,
        category: 'return',
        title: '택배가 접수됐어요',
        desc: '물건이 배송을 시작했어요',
        time: '어제',
        unread: false,
      },
    ],
  },
]

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('all')

  const groups = GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => activeTab === 'all' || item.category === activeTab),
  })).filter((group) => group.items.length > 0)

  return (
    <div className="notifications">
      <div className="notifications__tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`notifications__tab${activeTab === tab.key ? ' notifications__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="notifications__list">
        {groups.map((group) => (
          <div className="notifications__group" key={group.label}>
            <p className="notifications__group-title">{group.label}</p>
            {group.items.map((item) => (
              <div className="notifications__row" key={item.id}>
                <div className="notifications__row-icon-wrap">
                  <img src={item.icon} alt="" className="notifications__row-icon" />
                </div>
                <div className="notifications__row-body">
                  <p className="notifications__row-title">{item.title}</p>
                  <p className="notifications__row-desc">{item.desc}</p>
                </div>
                <div className="notifications__row-meta">
                  <span className="notifications__row-time">{item.time}</span>
                  {item.unread && <span className="notifications__row-dot" />}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
