import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconChevronRight from '../../assets/home/icon-chevron-right.svg'
import iconGpsTarget from '../../assets/ai-matching/icon-gps-target.svg'
import iconOrder from '../../assets/ai-matching/icon-order.svg'
import iconBadgeCheck from '../../assets/ai-matching/icon-badge-check.svg'
import iconChevronDown from '../../assets/ai-matching/icon-chevron-down.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './MultipleClaimants.css'

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: '왜 여러 명이 같은 물건을 주장하나요?',
    answer:
      '등록한 분실 정보가 같은 습득물과 비슷하게 매칭되면 여러 명이 동시에 주인 확인을 요청할 수 있어요.',
  },
  {
    id: 'faq-2',
    question: '어떤 기준으로 주인을 확인하나요?',
    answer: '분실·발견 시간과 위치, 비공개 특징 퀴즈 결과, 추가로 제출한 확인 자료를 함께 비교해요.',
  },
  {
    id: 'faq-3',
    question: '다른 분실자가 제출한 정보도 볼 수 있나요?',
    answer: '아니요. 다른 사람의 개인정보와 제출 자료는 공개되지 않아요.',
  },
  {
    id: 'faq-4',
    question: '확인 중에는 물건을 받을 수 없나요?',
    answer: '네. 주인이 확인될 때까지 개인 전달은 잠시 보류돼요.',
  },
]

const CRITERIA_ITEMS = [
  {
    id: 'time-place',
    icon: iconGpsTarget,
    title: '시공간 일치도',
    desc: '분실한 시간·장소와 물건이 발견된 정보를 비교해요.',
  },
  {
    id: 'quiz',
    icon: iconOrder,
    title: '퀴즈 정답률',
    desc: '비공개 특징 퀴즈에서 실제 물건과 일치한 답변을 확인해요.',
  },
  {
    id: 'evidence',
    icon: iconBadgeCheck,
    title: '디지털 증빙',
    desc: '구매 영수증, 기기 연결 기록, 과거 사진 등 제출한 자료를 확인해요.',
  },
]

export default function MultipleClaimants() {
  const navigate = useNavigate()
  const [isSheetOpen, setSheetOpen] = useState(false)
  const [openItemId, setOpenItemId] = useState(null)
  const [isFaqSheetOpen, setFaqSheetOpen] = useState(false)
  const [openFaqId, setOpenFaqId] = useState(null)

  const toggleItem = (id) => {
    setOpenItemId((prev) => (prev === id ? null : id))
  }

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="multi-claimants">
      <span className="multi-claimants__badge">소유권 확인중</span>

      <h2 className="multi-claimants__title">
        동일 물건에 여러 명이
        <br />
        소유권을 주장하고 있어요
      </h2>
      <p className="multi-claimants__subtitle">
        모든 분실자가 동시에 증빙을 제출하고, 객관적 기준으로 소유권을 판별해요.
      </p>

      <div className="multi-claimants__callout">
        <img src={iconInfo} alt="" className="multi-claimants__callout-icon" />
        <p className="multi-claimants__callout-text">다른 분실자의 개인정보는 공개되지 않아요.</p>
      </div>

      <div className="multi-claimants__list">
        <button
          type="button"
          className="multi-claimants__list-row"
          onClick={() => setFaqSheetOpen(true)}
        >
          <span>자주 묻는 질문</span>
          <img src={iconChevronRight} alt="" />
        </button>
        <div className="multi-claimants__list-divider" />
        <div className="multi-claimants__list-row">
          <span>고객센터 문의하기</span>
          <img src={iconChevronRight} alt="" />
        </div>
      </div>

      <div className="multi-claimants__next-wrap">
        <button type="button" className="multi-claimants__next" onClick={() => setSheetOpen(true)}>
          다음
        </button>
      </div>

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setSheetOpen(false)}
        title="진행과정"
        footer={
          <button
            type="button"
            className="claimants-sheet__confirm"
            onClick={() => navigate('/matching/result/ownership/evidence')}
          >
            확인
          </button>
        }
      >
        <p className="claimants-sheet__desc">제출한 증빙을 비교해 실제 소유자를 확인해요.</p>
        <p className="claimants-sheet__label">검증 기준 3가지</p>
        <div className="claimants-sheet__list">
          {CRITERIA_ITEMS.map((item) => {
            const isOpenItem = openItemId === item.id
            return (
              <div className="claimants-sheet__item" key={item.id}>
                <button
                  type="button"
                  className="claimants-sheet__item-trigger"
                  onClick={() => toggleItem(item.id)}
                >
                  <img src={item.icon} alt="" className="claimants-sheet__item-icon" />
                  <span className="claimants-sheet__item-title">{item.title}</span>
                  <img
                    src={iconChevronDown}
                    alt=""
                    className={`claimants-sheet__item-chevron${isOpenItem ? ' claimants-sheet__item-chevron--open' : ''}`}
                  />
                </button>
                {isOpenItem && (
                  <div className="claimants-sheet__item-body">
                    <p className="claimants-sheet__item-desc">{item.desc}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </BottomSheet>

      <BottomSheet isOpen={isFaqSheetOpen} onClose={() => setFaqSheetOpen(false)} title="자주 묻는 질문">
        <div className="claimants-sheet__list">
          {FAQ_ITEMS.map((item) => {
            const isOpenItem = openFaqId === item.id
            return (
              <div className="claimants-sheet__item" key={item.id}>
                <button
                  type="button"
                  className="claimants-sheet__item-trigger"
                  onClick={() => toggleFaq(item.id)}
                >
                  <span className="claimants-sheet__item-title">{item.question}</span>
                  <img
                    src={iconChevronDown}
                    alt=""
                    className={`claimants-sheet__item-chevron${isOpenItem ? ' claimants-sheet__item-chevron--open' : ''}`}
                  />
                </button>
                {isOpenItem && (
                  <div className="claimants-sheet__item-body">
                    <p className="claimants-sheet__item-desc">{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </BottomSheet>
    </div>
  )
}
