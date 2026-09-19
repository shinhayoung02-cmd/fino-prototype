import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import itemWallet from '../../assets/home/item-wallet.png'
import itemEarphone from '../../assets/home/item-buzz-earphone.jpg'
import itemCarKey from '../../assets/chat/item-car-key.jpg'
import finoAvatarIllustration from '../../assets/chat/fino-avatar-layer2.png'
import './Chat.css'

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="chat__callout-icon" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#0b4596" />
      <circle cx="8" cy="4.8" r="1.1" fill="white" />
      <rect x="7" y="7" width="2" height="5.2" rx="1" fill="white" />
    </svg>
  )
}

const FILTERS = ['전체', '확인 중', '전달 중', '완료']

const DEFAULT_ROOMS = [
  {
    id: 'fino',
    name: 'FINO',
    lastMessage: 'FINO에 오신 걸 환영합니다',
    time: '오전 11:20',
    unread: 1,
    status: '확인 중',
  },
]

const ACTIVE_FLOW_ROOMS = [
  {
    id: 'wallet-handover',
    name: '검정 반지갑',
    role: '습득자',
    image: itemWallet,
    lastMessage: '"내일 오후 3시에 전달 가능해요"',
    statusLine: '대면 전달 일정 확인 중',
    time: '오전 11:20',
    unread: 1,
    status: '전달 중',
  },
  {
    id: 'earphone-evidence',
    name: '흰색 무선 이어폰',
    role: '분실자',
    image: itemEarphone,
    lastMessage: '추가 확인 자료가 도착했어요',
    time: '오전 11:20',
    unread: 0,
    status: '확인 중',
  },
  {
    id: 'car-key-done',
    name: '자동차 열쇠',
    role: '습득자',
    image: itemCarKey,
    lastMessage: '물건 전달이 완료됐어요',
    time: '어제',
    unread: 0,
    status: '완료',
  },
]

export default function Chat({ readRoomIds, isFlowActive }) {
  const [activeFilter, setActiveFilter] = useState('전체')
  const navigate = useNavigate()
  const CHAT_ROOMS = isFlowActive ? ACTIVE_FLOW_ROOMS : DEFAULT_ROOMS
  const visibleRooms = CHAT_ROOMS.filter(
    (room) => activeFilter === '전체' || room.status === activeFilter,
  )

  return (
    <div className="chat">
      <div className="chat__callout">
        <InfoIcon />
        <p className="chat__callout-text">안전하게 물건을 주고받을 수 있도록 도와드려요.</p>
      </div>

      <div className="chat__filter-row">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`chat__filter${filter === activeFilter ? ' chat__filter--selected' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="chat__list">
        {visibleRooms.map((room) => {
          const unread = readRoomIds?.has(room.id) ? 0 : room.unread
          return (
            <button
              key={room.id}
              type="button"
              className="chat__room"
              onClick={() => navigate(`/chat/${room.id}`)}
            >
              <span className="chat__room-avatar">
                {room.image ? (
                  <img src={room.image} alt="" className="chat__room-avatar-photo" />
                ) : (
                  <img src={finoAvatarIllustration} alt="" className="chat__room-avatar-fino" />
                )}
              </span>
              <span className="chat__room-body">
                <span className="chat__room-name-row">
                  <span className="chat__room-name">{room.name}</span>
                  {room.role && <span className="chat__room-role-badge">{room.role}</span>}
                </span>
                <span className="chat__room-last-message">{room.lastMessage}</span>
                {room.statusLine && <span className="chat__room-status-line">{room.statusLine}</span>}
              </span>
              <span className="chat__room-meta">
                <span className="chat__room-time">{room.time}</span>
                {unread > 0 && <span className="chat__room-badge">{unread}</span>}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
