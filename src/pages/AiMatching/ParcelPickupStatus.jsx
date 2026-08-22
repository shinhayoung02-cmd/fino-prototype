import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconClock from '../../assets/home/icon-clock.svg'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconChevronRight from '../../assets/home/icon-chevron-right.svg'
import iconChevronDown from '../../assets/ai-matching/icon-chevron-down.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import Modal from '../../components/common/Modal/Modal'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import { MATCH_CANDIDATES } from './matchCandidates'
import './ParcelPickupStatus.css'

const PROGRESS_STEPS = ['발송대기', '접수완료', '배송중', '수령완료']
const DONE_COUNT = 2
const candidate = MATCH_CANDIDATES[0]

const FAQ_ITEMS = [
  {
    id: 'when-arrive',
    question: '택배는 언제 도착하나요?',
    answer: '접수 완료 후 통상 1~2일 이내에 도착해요. 배송 현황은 이 화면에서 계속 확인할 수 있어요.',
  },
  {
    id: 'track',
    question: '운송장 번호로 배송 조회가 되나요?',
    answer: '택배사 앱이나 홈페이지에서 운송장번호로 실시간 배송 조회를 할 수 있어요.',
  },
  {
    id: 'not-arrived',
    question: '배송이 오지 않으면 어떻게 하나요?',
    answer: '배송 예정일이 지나도 도착하지 않으면 고객센터로 문의해주세요.',
  },
]

export default function ParcelPickupStatus() {
  const navigate = useNavigate()
  const [isDeliveryDoneDialogOpen, setDeliveryDoneDialogOpen] = useState(false)
  const [isFaqOpen, setFaqOpen] = useState(false)
  const [openFaqId, setOpenFaqId] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setDeliveryDoneDialogOpen(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  const toggleFaqItem = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="parcel-pickup-status">
      <div className="parcel-pickup-status__progress">
        {PROGRESS_STEPS.map((label, index) => (
          <div className="parcel-pickup-status__progress-step" key={label}>
            {index > 0 && (
              <div
                className={`parcel-pickup-status__progress-connector${index < DONE_COUNT ? ' parcel-pickup-status__progress-connector--done' : ''}`}
              />
            )}
            <div className="parcel-pickup-status__progress-node">
              {index < DONE_COUNT ? (
                <img
                  src={iconProgressStepDone}
                  alt=""
                  className="parcel-pickup-status__progress-circle parcel-pickup-status__progress-circle--active"
                />
              ) : (
                <span className="parcel-pickup-status__progress-circle" />
              )}
              <span
                className={`parcel-pickup-status__progress-label${index < DONE_COUNT ? ' parcel-pickup-status__progress-label--active' : ''}`}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="parcel-pickup-status__title-row">
        <h2 className="parcel-pickup-status__title">일반택배 배송</h2>
        <span className="parcel-pickup-status__badge">접수완료</span>
      </div>
      <p className="parcel-pickup-status__subtitle">CJ대한통운 운송장번호 : 1234-5678-9012</p>

      <div className="parcel-pickup-status__item-card">
        <div className="parcel-pickup-status__item-photo">
          {candidate.photo && <img src={candidate.photo} alt="" />}
        </div>
        <div className="parcel-pickup-status__item-info">
          <p className="parcel-pickup-status__item-title">{candidate.title}</p>
          <div className="parcel-pickup-status__item-rows">
            <p className="parcel-pickup-status__item-row">
              <img src={iconPayment} alt="" />
              {candidate.feature}
            </p>
            <p className="parcel-pickup-status__item-row">
              <img src={iconClock} alt="" />
              {candidate.time}
            </p>
            <p className="parcel-pickup-status__item-location">{candidate.location}</p>
          </div>
        </div>
      </div>

      <div className="parcel-pickup-status__list">
        <button type="button" className="parcel-pickup-status__list-row" onClick={() => setFaqOpen(true)}>
          <span>자주 묻는 질문</span>
          <img src={iconChevronRight} alt="" />
        </button>
        <div className="parcel-pickup-status__list-divider" />
        <div className="parcel-pickup-status__list-row">
          <span>고객센터 문의하기</span>
          <img src={iconChevronRight} alt="" />
        </div>
      </div>

      <div className="parcel-pickup-status__actions">
        <button type="button" className="parcel-pickup-status__home" onClick={() => navigate('/')}>
          홈으로
        </button>
      </div>

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

      <Modal
        isOpen={isDeliveryDoneDialogOpen}
        onClose={() => setDeliveryDoneDialogOpen(false)}
        dismissible={false}
        title="배송이 완료 됐어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={() => navigate('/matching/result/ownership/parcel/general/receipt')}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => setDeliveryDoneDialogOpen(false)}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 결과를 확인해주세요
      </Modal>
    </div>
  )
}
