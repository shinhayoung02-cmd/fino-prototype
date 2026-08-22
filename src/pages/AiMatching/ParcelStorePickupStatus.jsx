import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import iconClock from '../../assets/home/icon-clock.svg'
import iconPayment from '../../assets/home/icon-payment.svg'
import Modal from '../../components/common/Modal/Modal'
import { MATCH_CANDIDATES } from './matchCandidates'
import './ParcelStoreDeliveryStatus.css'

const PROGRESS_STEPS = ['발송대기', '접수완료', '배송중', '수령완료']
const DONE_COUNT = 3
const candidate = MATCH_CANDIDATES[0]
const RECEIPT_NUMBER = 'KRX-2025-08041'
const RECEIPT_TIME = '2025.08.06 오후 2:00'
const DELIVERY_DONE_DELAY = 5000

export default function ParcelStorePickupStatus() {
  const navigate = useNavigate()
  const [isDeliveryDoneDialogOpen, setDeliveryDoneDialogOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDeliveryDoneDialogOpen(true), DELIVERY_DONE_DELAY)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="parcel-store-status">
      <div className="parcel-store-status__progress">
        {PROGRESS_STEPS.map((label, index) => (
          <div className="parcel-store-status__progress-step" key={label}>
            {index > 0 && (
              <div
                className={`parcel-store-status__progress-connector${index < DONE_COUNT ? ' parcel-store-status__progress-connector--done' : ''}`}
              />
            )}
            <div className="parcel-store-status__progress-node">
              {index < DONE_COUNT ? (
                <img src={iconProgressStepDone} alt="" className="parcel-store-status__progress-circle" />
              ) : (
                <span className="parcel-store-status__progress-circle" />
              )}
              <span
                className={`parcel-store-status__progress-label${index < DONE_COUNT ? ' parcel-store-status__progress-label--active' : ''}`}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="parcel-store-status__title-row">
        <h2 className="parcel-store-status__title">편의점 택배</h2>
        <span className="parcel-store-status__badge">접수완료</span>
      </div>
      <p className="parcel-store-status__subtitle">습득자는 별도 결제 없이 편의점에서 접수할 수 있어요</p>

      <div className="parcel-store-status__item-card">
        <div className="parcel-store-status__item-photo">
          {candidate.photo && <img src={candidate.photo} alt="" />}
        </div>
        <div className="parcel-store-status__item-info">
          <p className="parcel-store-status__item-title">{candidate.title}</p>
          <div className="parcel-store-status__item-rows">
            <p className="parcel-store-status__item-row">
              <img src={iconPayment} alt="" />
              {candidate.feature}
            </p>
            <p className="parcel-store-status__item-row">
              <img src={iconClock} alt="" />
              {candidate.time}
            </p>
            <p className="parcel-store-status__item-location">{candidate.location}</p>
          </div>
        </div>
      </div>

      <div className="parcel-store-status__field">
        <p className="parcel-store-status__field-label">진행 현황</p>
        <div className="parcel-store-status__status-list">
          <div className="parcel-store-status__status-row">
            <span className="parcel-store-status__status-row-label">현재 상태</span>
            <span className="parcel-store-status__status-badge parcel-store-status__status-badge--brand">
              배송 중
            </span>
          </div>
          <div className="parcel-store-status__status-divider" />
          <div className="parcel-store-status__status-row">
            <span className="parcel-store-status__status-row-label">접수 번호</span>
            <span className="parcel-store-status__status-badge">{RECEIPT_NUMBER}</span>
          </div>
          <div className="parcel-store-status__status-divider" />
          <div className="parcel-store-status__status-row">
            <span className="parcel-store-status__status-row-label">접수 시간</span>
            <span className="parcel-store-status__status-badge">{RECEIPT_TIME}</span>
          </div>
        </div>
      </div>

      <div className="parcel-store-status__next-wrap">
        <button type="button" className="parcel-store-status__next" onClick={() => navigate('/')}>
          홈으로
        </button>
      </div>

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
              onClick={() => navigate('/matching/result/ownership/parcel/store/receipt')}
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
