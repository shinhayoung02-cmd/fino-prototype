import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import iconClock from '../../assets/home/icon-clock.svg'
import iconPayment from '../../assets/home/icon-payment.svg'
import Modal from '../../components/common/Modal/Modal'
import { MATCH_CANDIDATES } from './matchCandidates'
import './ParcelStoreDeliveryStatus.css'

const PROGRESS_STEPS = ['발송대기', '접수완료', '배송중', '수령완료']
const candidate = MATCH_CANDIDATES[0]
const RECEIPT_NUMBER = 'KRX-2025-08041'
const RESULT_DIALOG_DELAY = 5000

export default function ParcelStoreDeliveryStatus() {
  const navigate = useNavigate()
  const [isResultDialogOpen, setResultDialogOpen] = useState(false)

  const handleConfirm = () => {
    setTimeout(() => setResultDialogOpen(true), RESULT_DIALOG_DELAY)
  }

  return (
    <div className="parcel-store-status">
      <div className="parcel-store-status__progress">
        {PROGRESS_STEPS.map((label, index) => (
          <div className="parcel-store-status__progress-step" key={label}>
            {index > 0 && <div className="parcel-store-status__progress-connector" />}
            <div className="parcel-store-status__progress-node">
              {index === 0 ? (
                <img
                  src={iconProgressStepDone}
                  alt=""
                  className="parcel-store-status__progress-circle parcel-store-status__progress-circle--active"
                />
              ) : (
                <span className="parcel-store-status__progress-circle" />
              )}
              <span
                className={`parcel-store-status__progress-label${index === 0 ? ' parcel-store-status__progress-label--active' : ''}`}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="parcel-store-status__title-row">
        <h2 className="parcel-store-status__title">편의점 택배</h2>
        <span className="parcel-store-status__badge">발송 대기중</span>
      </div>
      <p className="parcel-store-status__subtitle">접수 번호 : {RECEIPT_NUMBER}</p>

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
            <span className="parcel-store-status__status-badge">미정</span>
          </div>
          <div className="parcel-store-status__status-divider" />
          <div className="parcel-store-status__status-row">
            <span className="parcel-store-status__status-row-label">접수 시간</span>
            <span className="parcel-store-status__status-badge">미정</span>
          </div>
        </div>
      </div>

      <div className="parcel-store-status__next-wrap">
        <button type="button" className="parcel-store-status__next" onClick={handleConfirm}>
          확인
        </button>
      </div>

      <Modal
        isOpen={isResultDialogOpen}
        onClose={() => setResultDialogOpen(false)}
        title="확인 결과가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={() => {
                setResultDialogOpen(false)
                navigate('/matching/result/ownership/parcel/store/pickup')
              }}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => setResultDialogOpen(false)}
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
