import { useEffect, useRef, useState } from 'react'
import iconPlus from '../../assets/chat/icon-plus.svg'
import iconEmoticon from '../../assets/chat/icon-emoticon.svg'
import iconSend from '../../assets/chat/icon-chatting-send.svg'
import finoAvatar from '../../assets/chat/fino-avatar-kkulddong.jpg'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconClock from '../../assets/home/icon-clock.svg'
import iconLocation from '../../assets/chat/icon-location.svg'
import iconOrder from '../../assets/chat/icon-order.svg'
import { MATCH_CANDIDATES } from '../AiMatching/matchCandidates'
import { QUICK_CHIPS, CHIP_ANSWERS, FAQ_CATEGORIES } from './finoFaq'
import './ChatRoom.css'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const AUTO_REPLY_TEXT = 'FINO에 오신 걸 환영합니다'
const AUTO_REPLY_DELAY_MS = 600

// 첫 번째 채팅방(검정 반지갑, 습득자 대면 전달)만 실제 대화 기록이 있는 상태로 시작한다.
const ROOM_HISTORY = {
  'wallet-handover': {
    item: MATCH_CANDIDATES[0],
    badge: '소유권 확인 완료',
    dateLabel: '2026년 8월 16일 금요일',
    messages: [
      { sender: 'fino', text: '안녕하세요. 내일 오후 3시쯤 괜찮으실까요?', time: '오후 4:32' },
      { sender: 'me', text: '네, 가능합니다.', time: '오후 4:35' },
      { sender: 'fino', text: '홍대입구역 9번 출구 앞에서 뵐게요.', time: '오후 4:36' },
      { sender: 'me', text: '확인했습니다. 감사합니다.', time: '오후 4:37' },
      {
        sender: 'fino',
        text: '홍대입구역 9번 출구 앞에서 뵐게요.',
        time: '오후 4:36',
        delivery: { method: '대면 전달', place: '홍대입구역 근처', datetime: '8월 17일 오후 3:00' },
      },
    ],
  },
}

function formatTime(date) {
  const hours = date.getHours()
  const period = hours < 12 ? '오전' : '오후'
  const h12 = hours % 12 === 0 ? 12 : hours % 12
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${period} ${h12}:${minutes}`
}

function formatDate(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${WEEKDAYS[date.getDay()]}요일`
}

let messageIdCounter = 0
function createMessage(sender, text) {
  messageIdCounter += 1
  return { id: messageIdCounter, sender, text, time: new Date() }
}

// 선택지 카드 (Figma 1404:63917) — options: [{ label, action }]
function createMenu(options) {
  messageIdCounter += 1
  return { id: messageIdCounter, sender: 'menu', options, time: new Date() }
}

const CATEGORY_MENU = FAQ_CATEGORIES.map((category, index) => ({
  label: category.title,
  action: { type: 'category', index },
}))

function MenuCard({ options, onSelect }) {
  const isWide = options.some((option) => option.action.type === 'question')
  return (
    <div className={`chat-room__menu${isWide ? ' chat-room__menu--wide' : ''}`}>
      {options.map((option, index) => (
        <div key={option.label} className="chat-room__menu-item-wrap">
          {index > 0 && <div className="chat-room__menu-divider" />}
          <button type="button" className="chat-room__menu-item" onClick={() => onSelect(option)}>
            {option.label}
          </button>
        </div>
      ))}
    </div>
  )
}

// Figma 1395:53641 전달 방식 카드
function DeliveryCard({ method, place, datetime }) {
  return (
    <div className="chat-room__delivery">
      <div className="chat-room__delivery-head">
        <p className="chat-room__delivery-title">전달 방식</p>
        <span className="chat-room__delivery-badge">{method}</span>
      </div>
      <div className="chat-room__delivery-rows">
        <div className="chat-room__delivery-row">
          <img src={iconLocation} alt="" />
          <span className="chat-room__delivery-label">장소</span>
          <span className="chat-room__delivery-value">{place}</span>
        </div>
        <div className="chat-room__delivery-divider" />
        <div className="chat-room__delivery-row">
          <img src={iconOrder} alt="" />
          <span className="chat-room__delivery-label">일시</span>
          <span className="chat-room__delivery-value">{datetime}</span>
        </div>
        <div className="chat-room__delivery-divider" />
      </div>
      <button type="button" className="chat-room__delivery-btn">
        전달 정보 확인하기
      </button>
    </div>
  )
}

function MessageRow({ sender, text, timeLabel }) {
  return sender === 'fino' ? (
    <div className="chat-room__row chat-room__row--fino">
      <span className="chat-room__avatar">
        <img src={finoAvatar} alt="" className="chat-room__avatar-illustration" />
      </span>
      <div className="chat-room__bubble chat-room__bubble--fino">{text}</div>
      <span className="chat-room__time">{timeLabel}</span>
    </div>
  ) : (
    <div className="chat-room__row chat-room__row--me">
      <span className="chat-room__time">{timeLabel}</span>
      <div className="chat-room__bubble chat-room__bubble--me">{text}</div>
    </div>
  )
}

export default function ChatRoom({ roomId }) {
  const history = ROOM_HISTORY[roomId]
  const [messages, setMessages] = useState(() =>
    history ? [] : [createMessage('fino', AUTO_REPLY_TEXT)],
  )
  const [draft, setDraft] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const toBottom = () => {
      list.scrollTop = list.scrollHeight
    }
    toBottom()
    // 웹폰트·레이아웃이 늦게 잡히면 높이가 바뀌므로 크기 변화 시 다시 맨 아래로
    const observer = new ResizeObserver(toBottom)
    observer.observe(list)
    for (const child of list.children) observer.observe(child)
    return () => observer.disconnect()
  }, [messages])

  const handleSend = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [...prev, createMessage('me', text)])
    setDraft('')
    setTimeout(() => {
      setMessages((prev) => [...prev, createMessage('fino', AUTO_REPLY_TEXT)])
    }, AUTO_REPLY_DELAY_MS)
  }

  // FINO 안내 채팅방: 빠른 질문 칩 · 자주하는 질문
  const replyLater = (text) => {
    setTimeout(() => {
      setMessages((prev) => [...prev, createMessage('fino', text)])
    }, AUTO_REPLY_DELAY_MS)
  }

  const handleChip = (label) => {
    setMessages((prev) => [
      ...prev,
      createMessage('me', label),
      ...(label === '자주하는 질문' ? [createMenu(CATEGORY_MENU)] : []),
    ])
    if (CHIP_ANSWERS[label]) replyLater(CHIP_ANSWERS[label])
  }

  const handleMenuSelect = ({ label, action }) => {
    if (action.type === 'category') {
      const category = FAQ_CATEGORIES[action.index]
      setMessages((prev) => [
        ...prev,
        createMessage('me', label),
        createMenu(
          category.items.map((item, itemIndex) => ({
            label: item.q,
            action: { type: 'question', category: action.index, index: itemIndex },
          })),
        ),
      ])
    } else {
      setMessages((prev) => [...prev, createMessage('me', label)])
      replyLater(FAQ_CATEGORIES[action.category].items[action.index].a)
    }
  }

  // 선택지 카드가 마지막이면(고르는 중) 칩 줄을 숨김 — Figma 1404:63792
  const showQuickChips = !history && messages[messages.length - 1]?.sender !== 'menu'

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={`chat-room${history ? ' chat-room--has-item' : ''}`}>
      {history && (
        <div className="chat-room__item-card">
          <div className="chat-room__item-photo">
            <img src={history.item.photo} alt="" />
          </div>
          <div className="chat-room__item-info">
            <p className="chat-room__item-title">
              {history.item.title}
              <span className="chat-room__item-badge">{history.badge}</span>
            </p>
            <p className="chat-room__item-row">
              <img src={iconPayment} alt="" />
              {history.item.feature}
            </p>
            <p className="chat-room__item-row">
              <img src={iconClock} alt="" />
              {history.item.time}
            </p>
            <p className="chat-room__item-location">{history.item.location}</p>
          </div>
        </div>
      )}

      <div className="chat-room__messages" ref={listRef}>
        {history && (
          <>
            <div className="chat-room__date-chip">{history.dateLabel}</div>
            <div className="chat-room__list">
              {history.messages.map((message, index) =>
                message.delivery ? (
                  <div key={`history-${index}`} className="chat-room__delivery-group">
                    <MessageRow sender={message.sender} text={message.text} timeLabel={message.time} />
                    <DeliveryCard {...message.delivery} />
                  </div>
                ) : (
                  <MessageRow
                    key={`history-${index}`}
                    sender={message.sender}
                    text={message.text}
                    timeLabel={message.time}
                  />
                ),
              )}
            </div>
          </>
        )}

        {messages.length > 0 && (
          <>
            <div className="chat-room__date-chip">{formatDate(messages[0].time)}</div>
            <div className="chat-room__list">
              {messages.map((message) =>
                message.sender === 'menu' ? (
                  <MenuCard key={message.id} options={message.options} onSelect={handleMenuSelect} />
                ) : (
                  <MessageRow
                    key={message.id}
                    sender={message.sender}
                    text={message.text}
                    timeLabel={formatTime(message.time)}
                  />
                ),
              )}
            </div>
          </>
        )}
      </div>

      {showQuickChips && (
        <div className="chat-room__quick">
          {QUICK_CHIPS.map((label) => (
            <button key={label} type="button" className="chat-room__quick-chip" onClick={() => handleChip(label)}>
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="chat-room__input-bar-wrap">
        <div className="chat-room__input-bar">
          <button type="button" className="chat-room__input-icon-btn" aria-label="첨부">
            <img src={iconPlus} alt="" />
          </button>
          <input
            type="text"
            className="chat-room__input"
            placeholder="메시지 입력"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img src={iconEmoticon} alt="" className="chat-room__emoticon" />
          <button
            type="button"
            className="chat-room__input-icon-btn"
            aria-label="전송"
            onClick={handleSend}
          >
            <img src={iconSend} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}
