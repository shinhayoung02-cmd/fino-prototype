import { useState } from 'react'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconChevronRight from '../../assets/home/icon-chevron-right.svg'
import iconChevronDown from '../../assets/ai-matching/icon-chevron-down.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './WaitingScreen.css'

const DEFAULT_FAQ_ITEMS = [
  {
    id: 'what-check',
    question: '습득자는 무엇을 확인하나요?',
    answer: '등록한 비공개 특징과 실제 물건이 일치하는지 직접 확인해요.',
  },
  {
    id: 'when-result',
    question: '확인 결과는 언제 알 수 있나요?',
    answer: '습득자가 확인을 마치면 알림으로 결과를 알려드려요.',
  },
  {
    id: 'mismatch',
    question: '특징이 일치하지 않으면 어떻게 되나요?',
    answer: '추가 확인이 필요하면 영수증이나 사용 기록 같은 자료로 다시 확인할 수 있어요.',
  },
  {
    id: 'cancel',
    question: '확인 요청을 취소할 수 있나요?',
    answer: '확인이 끝나기 전이라면 진행 중인 요청을 취소할 수 있어요.',
  },
]

export default function WaitingScreen({
  onGoHome,
  badge = '소유권 확인중',
  badgeTone = 'brand',
  title = '습득자가 확인하고 있어요',
  subtitle = '물건과 입력한 특징을 비교해 결과를 확인 중이에요.',
  calloutText = '확인이 끝나면 다음 절차를 안내해드릴게요.',
  calloutIcon = iconInfo,
  calloutTone = 'neutral',
  ctaLabel = '홈으로',
  faqItems = DEFAULT_FAQ_ITEMS,
  showList = true,
  showCallout = true,
  statusItems,
  secondaryCtaLabel,
  onSecondaryCta,
}) {
  const [isFaqOpen, setFaqOpen] = useState(false)
  const [openFaqId, setOpenFaqId] = useState(null)

  const toggleFaqItem = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="waiting-screen">
      <span
        className={`waiting-screen__badge${badgeTone === 'critical-border' ? ' waiting-screen__badge--critical-border' : ''}`}
      >
        {badge}
      </span>

      <h2 className="waiting-screen__title">{title}</h2>
      <p className="waiting-screen__subtitle">{subtitle}</p>

      {showCallout && (
        <div className={`waiting-screen__callout${calloutTone === 'critical' ? ' waiting-screen__callout--critical' : ''}`}>
          <img src={calloutIcon} alt="" className="waiting-screen__callout-icon" />
          <p
            className={`waiting-screen__callout-text${calloutTone === 'critical' ? ' waiting-screen__callout-text--critical' : ''}`}
          >
            {calloutText}
          </p>
        </div>
      )}

      {statusItems ? (
        <div className="waiting-screen__status">
          <p className="waiting-screen__status-label">제출 현황</p>
          <div className="waiting-screen__status-list">
            {statusItems.map((item, index) => (
              <div key={item.label}>
                <div className="waiting-screen__status-row">
                  <span className="waiting-screen__status-row-label">{item.label}</span>
                  <span
                    className={`waiting-screen__status-row-badge waiting-screen__status-row-badge--${item.tone}`}
                  >
                    {item.value}
                  </span>
                </div>
                {index < statusItems.length - 1 && <div className="waiting-screen__status-divider" />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        showList && (
          <div className="waiting-screen__list">
            <button type="button" className="waiting-screen__list-row" onClick={() => setFaqOpen(true)}>
              <span>자주 묻는 질문</span>
              <img src={iconChevronRight} alt="" />
            </button>
            <div className="waiting-screen__list-divider" />
            <div className="waiting-screen__list-row">
              <span>고객센터 문의하기</span>
              <img src={iconChevronRight} alt="" />
            </div>
          </div>
        )
      )}

      <div className={`waiting-screen__next-wrap${showList || statusItems ? '' : ' waiting-screen__next-wrap--pinned'}`}>
        {secondaryCtaLabel && (
          <button type="button" className="waiting-screen__secondary" onClick={onSecondaryCta}>
            {secondaryCtaLabel}
          </button>
        )}
        <button type="button" className="waiting-screen__home" onClick={onGoHome}>
          {ctaLabel}
        </button>
      </div>

      <BottomSheet isOpen={isFaqOpen} onClose={() => setFaqOpen(false)} title="자주 묻는 질문">
        <div className="faq-sheet__list">
          {faqItems.map((item) => {
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
