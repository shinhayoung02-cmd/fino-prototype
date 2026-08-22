import { useNavigate } from 'react-router-dom'
import iconClock from '../../assets/home/icon-clock.svg'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import { MATCH_CANDIDATES } from './matchCandidates'
import './ParcelDeliveryStatus.css'

const PROGRESS_STEPS = ['발송대기', '접수완료', '배송중', '수령완료']
const candidate = MATCH_CANDIDATES[0]

export default function ParcelDeliveryStatus({ onConfirm }) {
  const navigate = useNavigate()
  const handleConfirm = onConfirm || (() => navigate('/'))

  return (
    <div className="parcel-delivery-status">
      <div className="parcel-delivery-status__progress">
        {PROGRESS_STEPS.map((label, index) => (
          <div className="parcel-delivery-status__progress-step" key={label}>
            {index > 0 && <div className="parcel-delivery-status__progress-connector" />}
            <div className="parcel-delivery-status__progress-node">
              {index === 0 ? (
                <img
                  src={iconProgressStepDone}
                  alt=""
                  className="parcel-delivery-status__progress-circle parcel-delivery-status__progress-circle--active"
                />
              ) : (
                <span className="parcel-delivery-status__progress-circle" />
              )}
              <span
                className={`parcel-delivery-status__progress-label${index === 0 ? ' parcel-delivery-status__progress-label--active' : ''}`}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="parcel-delivery-status__title-row">
        <h2 className="parcel-delivery-status__title">일반택배 배송</h2>
        <span className="parcel-delivery-status__badge">발송 대기중</span>
      </div>
      <p className="parcel-delivery-status__subtitle">습득자는 추가 결제 없이 물건을 보낼 수 있어요.</p>

      <div className="parcel-delivery-status__item-card">
        <div className="parcel-delivery-status__item-photo">
          {candidate.photo && <img src={candidate.photo} alt="" />}
        </div>
        <div className="parcel-delivery-status__item-info">
          <p className="parcel-delivery-status__item-title">{candidate.title}</p>
          <div className="parcel-delivery-status__item-rows">
            <p className="parcel-delivery-status__item-row">
              <img src={iconPayment} alt="" />
              {candidate.feature}
            </p>
            <p className="parcel-delivery-status__item-row">
              <img src={iconClock} alt="" />
              {candidate.time}
            </p>
            <p className="parcel-delivery-status__item-location">{candidate.location}</p>
          </div>
        </div>
      </div>

      <div className="parcel-delivery-status__actions">
        <button
          type="button"
          className="parcel-delivery-status__edit"
          onClick={() => navigate('/matching/result/ownership/parcel/general/address')}
        >
          수정하기
        </button>
        <button type="button" className="parcel-delivery-status__confirm" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  )
}
