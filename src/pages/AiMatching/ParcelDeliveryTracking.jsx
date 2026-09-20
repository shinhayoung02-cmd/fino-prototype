import { ITEM_PROFILES } from '../../data/itemProfiles'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconPayment from '../../assets/ai-matching/icon-payment.svg'
import iconClock from '../../assets/ai-matching/icon-clock.svg'
import iconChevronRight from '../../assets/ai-matching/icon-chevron-right-list.svg'
import iconChevronDown from '../../assets/ai-matching/icon-chevron-down.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './ParcelDeliveryTracking.css'

const PROGRESS_STEPS = [
  { label: '접수대기', done: true },
  { label: '접수완료', done: true },
  { label: '배송중', done: true },
  { label: '수령완료', done: false },
]

const LAST_DONE_INDEX = PROGRESS_STEPS.reduce((acc, step, index) => (step.done ? index : acc), -1)

const HELP_ITEMS = [
  { id: 'faq', label: '자주 묻는 질문' },
  { id: 'contact', label: '고객센터 문의하기' },
]

const FAQ_ITEMS = [
  {
    id: 'status',
    question: '배송 상태는 어디서 확인하나요?',
    answer: '운송장 번호와 현재 배송 상태를 이 화면에서 확인할 수 있어요.',
  },
  {
    id: 'delay',
    question: '배송이 늦어지면 어떻게 하나요?',
    answer: '운송장 번호로 배송 상황을 확인하고, 문제가 있으면 고객센터에 문의해주세요.',
  },
  {
    id: 'received',
    question: '분실자가 물건을 받으면 어떻게 되나요?',
    answer: '수령이 확인되면 반환이 완료되고 진행 상태도 수령 완료로 바뀌어요.',
  },
  {
    id: 'issue',
    question: '배송 중 문제가 생기면 어떻게 하나요?',
    answer: '분실이나 파손 등 문제가 생기면 배송사 확인 후 고객센터에 알려주세요.',
  },
]

export default function ParcelDeliveryTracking({ itemProfile = ITEM_PROFILES['wallet-normal'] } = {}) {
  const navigate = useNavigate()
  const [isFaqSheetOpen, setFaqSheetOpen] = useState(false)
  const [openFaqId, setOpenFaqId] = useState(null)

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="parcel-delivery-tracking">
      <div className="parcel-delivery-tracking__progress">
        {PROGRESS_STEPS.map((step, index) => (
          <div className="parcel-delivery-tracking__progress-step" key={step.label}>
            {index > 0 && (
              <div
                className={`parcel-delivery-tracking__progress-connector${
                  step.done && PROGRESS_STEPS[index - 1].done
                    ? ' parcel-delivery-tracking__progress-connector--active'
                    : ''
                }${index === LAST_DONE_INDEX ? ' parcel-delivery-tracking__progress-connector--latest' : ''}`}
              />
            )}
            <div className="parcel-delivery-tracking__progress-node">
              {step.done ? (
                <img
                  src={iconProgressStepDone}
                  alt=""
                  className={`parcel-delivery-tracking__progress-circle${
                    index === LAST_DONE_INDEX ? ' parcel-delivery-tracking__progress-circle--latest' : ''
                  }`}
                />
              ) : (
                <span className="parcel-delivery-tracking__progress-circle parcel-delivery-tracking__progress-circle--empty" />
              )}
              <span
                className={`parcel-delivery-tracking__progress-label${
                  step.done ? ' parcel-delivery-tracking__progress-label--active' : ''
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="parcel-delivery-tracking__intro">
        <div className="parcel-delivery-tracking__title-row">
          <p className="parcel-delivery-tracking__title">상품이 배송되고 있어요</p>
          <span className="parcel-delivery-tracking__badge">반환 접수</span>
        </div>
        <p className="parcel-delivery-tracking__subtitle">CJ대한통운 운송장번호 : 1234-5678-9012</p>
      </div>

      <div className="parcel-delivery-tracking__item-card">
        <div className="parcel-delivery-tracking__item-photo">
          <img src={itemProfile.photo} alt="" />
        </div>
        <div className="parcel-delivery-tracking__item-info">
          <p className="parcel-delivery-tracking__item-title">{itemProfile.category} 습득</p>
          <div className="parcel-delivery-tracking__item-rows">
            <p className="parcel-delivery-tracking__item-row">
              <img src={iconPayment} alt="" />
              {itemProfile.shortDescription}
            </p>
            <p className="parcel-delivery-tracking__item-row">
              <img src={iconClock} alt="" />
              오늘 오전 9~12시
            </p>
            <p className="parcel-delivery-tracking__item-location">서울 마포구 홍대입구역</p>
          </div>
        </div>
      </div>

      <div className="parcel-delivery-tracking__help-list">
        {HELP_ITEMS.map((item, index) => (
          <div key={item.id} className="parcel-delivery-tracking__help-item-wrap">
            {index > 0 && <div className="parcel-delivery-tracking__help-divider" />}
            <button
              type="button"
              className="parcel-delivery-tracking__help-item"
              onClick={item.id === 'faq' ? () => setFaqSheetOpen(true) : undefined}
            >
              <span>{item.label}</span>
              <img src={iconChevronRight} alt="" />
            </button>
          </div>
        ))}
      </div>

      <div className="parcel-delivery-tracking__next-wrap">
        <button
          type="button"
          className="parcel-delivery-tracking__next"
          onClick={() => navigate('/found/match-result/quiz/claimants/return-prep/review/parcel/complete')}
        >
          다음
        </button>
      </div>

      <BottomSheet isOpen={isFaqSheetOpen} onClose={() => setFaqSheetOpen(false)} title="자주 묻는 질문">
        <div className="parcel-delivery-tracking__faq-list">
          {FAQ_ITEMS.map((item) => {
            const isOpenItem = openFaqId === item.id
            return (
              <div className="parcel-delivery-tracking__faq-item" key={item.id}>
                <button
                  type="button"
                  className="parcel-delivery-tracking__faq-item-trigger"
                  onClick={() => toggleFaq(item.id)}
                >
                  <span className="parcel-delivery-tracking__faq-item-title">{item.question}</span>
                  <img
                    src={iconChevronDown}
                    alt=""
                    className={`parcel-delivery-tracking__faq-item-chevron${isOpenItem ? ' parcel-delivery-tracking__faq-item-chevron--open' : ''}`}
                  />
                </button>
                {isOpenItem && (
                  <div className="parcel-delivery-tracking__faq-item-body">
                    <p className="parcel-delivery-tracking__faq-item-desc">{item.answer}</p>
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
