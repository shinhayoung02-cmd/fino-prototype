import { useNavigate } from 'react-router-dom'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import iconPayment from '../../assets/ai-matching/icon-payment.svg'
import iconClock from '../../assets/ai-matching/icon-clock.svg'
import walletPhoto from '../../assets/ai-matching/samples/wallet-matin-kim-photo.jpg'
import './ParcelStoreDeliveryProgress.css'

const PROGRESS_STEPS = [
  { label: '접수대기', done: true },
  { label: '접수완료', done: true },
  { label: '배송중', done: true },
  { label: '수령완료', done: false },
]

export default function ParcelStoreDeliveryProgress() {
  const navigate = useNavigate()
  return (
    <div className="parcel-store-progress">
      <div className="parcel-store-progress__progress">
        {PROGRESS_STEPS.map((step, index) => (
          <div className="parcel-store-progress__progress-step" key={step.label}>
            {index > 0 && (
              <div
                className={`parcel-store-progress__progress-connector${
                  step.done && PROGRESS_STEPS[index - 1].done
                    ? ' parcel-store-progress__progress-connector--active'
                    : ''
                }`}
              />
            )}
            <div className="parcel-store-progress__progress-node">
              {step.done ? (
                <img src={iconProgressStepDone} alt="" className="parcel-store-progress__progress-circle" />
              ) : (
                <span className="parcel-store-progress__progress-circle parcel-store-progress__progress-circle--empty" />
              )}
              <span
                className={`parcel-store-progress__progress-label${
                  step.done ? ' parcel-store-progress__progress-label--active' : ''
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="parcel-store-progress__intro">
        <div className="parcel-store-progress__title-row">
          <p className="parcel-store-progress__title">편의점 택배</p>
          <span className="parcel-store-progress__badge">반환 접수</span>
        </div>
        <p className="parcel-store-progress__subtitle">접수 번호 : KRX-2025-08041</p>
      </div>

      <div className="parcel-store-progress__item-card">
        <div className="parcel-store-progress__item-photo">
          <img src={walletPhoto} alt="" />
        </div>
        <div className="parcel-store-progress__item-info">
          <p className="parcel-store-progress__item-title">검정 반지갑 습득</p>
          <div className="parcel-store-progress__item-rows">
            <p className="parcel-store-progress__item-row">
              <img src={iconPayment} alt="" />
              검정색 Matin Kim 가죽 반지갑
            </p>
            <p className="parcel-store-progress__item-row">
              <img src={iconClock} alt="" />
              오늘 오전 9~12시
            </p>
            <p className="parcel-store-progress__item-location">서울 마포구 홍대입구역</p>
          </div>
        </div>
      </div>

      <div className="parcel-store-progress__status">
        <p className="parcel-store-progress__status-label">진행 현황</p>
        <div className="parcel-store-progress__status-list">
          <div className="parcel-store-progress__row">
            <span className="parcel-store-progress__row-label">현재 상태</span>
            <span className="parcel-store-progress__badge-value">배송 중</span>
          </div>
          <div className="parcel-store-progress__divider" />
          <div className="parcel-store-progress__row">
            <span className="parcel-store-progress__row-label">접수 번호</span>
            <span className="parcel-store-progress__plain-value">KRX-2025-08041</span>
          </div>
          <div className="parcel-store-progress__divider" />
          <div className="parcel-store-progress__row parcel-store-progress__row--time">
            <span className="parcel-store-progress__row-label">접수 시간</span>
            <span className="parcel-store-progress__plain-value">2025.08.06 오후 2:00</span>
          </div>
        </div>
      </div>

      <div className="parcel-store-progress__next-wrap">
        <button
          type="button"
          className="parcel-store-progress__next"
          onClick={() => navigate('/found/match-result/quiz/claimants/return-prep/review/parcel-store/complete')}
        >
          다음
        </button>
      </div>
    </div>
  )
}
