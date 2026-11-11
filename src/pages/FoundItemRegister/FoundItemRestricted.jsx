import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconChevronRight from '../../assets/home/icon-chevron-right.svg'
import iconChevronDown from '../../assets/ai-matching/icon-chevron-down.svg'
import iconInfo from '../../assets/my-storage/icon-info.svg'
import iconCheck from '../../assets/ai-matching/icon-parcel-check.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './FoundItemRestricted.css'

const HANDOVER_OPTIONS = [
  {
    id: 'mailbox',
    title: '가까운 우체통에 넣기',
    desc: '가까운 우체통을 통해 빠르게 인계할 수 있어요.',
  },
  {
    id: 'police-box',
    title: '지구대 인계 등록',
    desc: '지구대 또는 파출소에 인계한 정보를 등록해요',
  },
]

const FAQ_ITEMS = [
  {
    id: 'why-restricted',
    question: '왜 안전 인계를 추천하나요?',
    answer: '신분증이나 금융카드는 개인정보 보호와 2차 피해 예방을 위해 안전 인계를 추천해요. 직접 보관하며 등록할 수도 있어요.',
  },
  {
    id: 'what-to-do',
    question: '이제 물건은 어떻게 처리하나요?',
    answer: '가까운 지구대·파출소나 안내된 안전 인계 방법을 선택해 전달해주세요.',
  },
  {
    id: 'direct-transfer',
    question: '분실자에게 직접 전달해도 되나요?',
    answer: '직접 전달도 가능하지만, 개인정보 보호를 위해 안전 인계 절차를 추천해요.',
  },
  {
    id: 'after-transfer',
    question: '인계한 뒤에는 어떻게 되나요?',
    answer: '인계 장소와 시간을 등록하면 분실자가 확인할 수 있도록 안내해요.',
  },
]

export default function FoundItemRestricted({ onKeepItem }) {
  const navigate = useNavigate()
  const [isFaqOpen, setFaqOpen] = useState(false)
  const [openFaqId, setOpenFaqId] = useState(null)
  const [isHandoverSheetOpen, setHandoverSheetOpen] = useState(false)
  const [handoverMethod, setHandoverMethod] = useState(null)

  const toggleFaqItem = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="found-item-restricted">
      <div className="found-item-restricted__body">
        <span className="found-item-restricted__badge">습득물 확인중</span>
        <div className="found-item-restricted__heading">
          <h2 className="found-item-restricted__title">
            안전 인계를
            <br />
            추천하는 물건이에요
          </h2>
          <p className="found-item-restricted__subtitle">
            신분증 및 금융 카드는 2차 피해 방지를 위해
            <br />
            지구대·우체통 인계를 추천해요.
          </p>
        </div>

        <div className="found-item-restricted__callout found-item-restricted__callout--info">
          <img src={iconInfo} alt="" className="found-item-restricted__callout-icon" />
          <p className="found-item-restricted__callout-text">원하면 직접 보관하며 일반 등록할 수도 있어요.</p>
        </div>

        <div className="found-item-restricted__detected">
          <p className="found-item-restricted__detected-label">감지된 항목</p>
          <span className="found-item-restricted__chip">신분증 / 주민등록증</span>
        </div>
      </div>

      <div className="found-item-restricted__list">
        <button type="button" className="found-item-restricted__list-row" onClick={() => setFaqOpen(true)}>
          <span>자주 묻는 질문</span>
          <img src={iconChevronRight} alt="" />
        </button>
        <div className="found-item-restricted__list-divider" />
        <div className="found-item-restricted__list-row">
          <span>고객센터 문의하기</span>
          <img src={iconChevronRight} alt="" />
        </div>
      </div>

      <div className="found-item-restricted__bottom">
        <button
          type="button"
          className="found-item-restricted__next"
          onClick={() => {
            setHandoverMethod(null)
            setHandoverSheetOpen(true)
          }}
        >
          다음 단계로
        </button>
      </div>

      <BottomSheet isOpen={isHandoverSheetOpen} onClose={() => setHandoverSheetOpen(false)}>
        <div className="handover-sheet__header">
          <p className="handover-sheet__title">안전한 인계 방법을 선택해주세요</p>
          <p className="handover-sheet__desc">아래 방법으로 인계하면 더 안전해요</p>
        </div>
        <div className="handover-sheet__list">
          {HANDOVER_OPTIONS.map((option) => {
            const isSelected = handoverMethod === option.id
            return (
              <button
                type="button"
                key={option.id}
                className={`handover-sheet__option${isSelected ? ' handover-sheet__option--selected' : ''}`}
                onClick={() => {
                  if (handoverMethod) return
                  setHandoverMethod(option.id)
                  setTimeout(() => {
                    setHandoverSheetOpen(false)
                    navigate(option.id === 'mailbox' ? '/found/new/restricted/mailbox' : '/found/new/restricted/police-box')
                  }, 1000)
                }}
              >
                <span className="handover-sheet__option-body">
                  <span className="handover-sheet__option-title">{option.title}</span>
                  <span className="handover-sheet__option-desc">{option.desc}</span>
                </span>
                {isSelected && (
                  <span className="handover-sheet__option-check">
                    <img src={iconCheck} alt="" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          className="handover-sheet__keep"
          onClick={() => {
            setHandoverSheetOpen(false)
            onKeepItem?.()
          }}
        >
          직접 보관하며 등록하기
        </button>
      </BottomSheet>

      <BottomSheet isOpen={isFaqOpen} onClose={() => setFaqOpen(false)} title="자주 묻는 질문">
        <div className="faq-sheet__list">
          {FAQ_ITEMS.map((item) => {
            const isOpenItem = openFaqId === item.id
            return (
              <div className="faq-sheet__item" key={item.id}>
                <button type="button" className="faq-sheet__item-trigger" onClick={() => toggleFaqItem(item.id)}>
                  <span className="faq-sheet__item-question">{item.question}</span>
                  <img
                    src={iconChevronDown}
                    alt=""
                    className={`faq-sheet__item-chevron${isOpenItem ? ' faq-sheet__item-chevron--open' : ''}`}
                  />
                </button>
                {isOpenItem && (
                  <div className="faq-sheet__item-body">
                    <p className="faq-sheet__item-answer">{item.answer}</p>
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
