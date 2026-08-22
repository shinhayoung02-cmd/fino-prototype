import { useNavigate } from 'react-router-dom'
import iconPayment from '../../assets/ai-matching/icon-payment.svg'
import iconClock from '../../assets/ai-matching/icon-clock.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import walletPhoto from '../../assets/ai-matching/samples/wallet-matin-kim-photo.jpg'
import './ParcelStoreDeliveryStart.css'

const PROGRESS_STEPS = [
  { label: '접수대기', done: true },
  { label: '접수완료', done: true },
  { label: '배송중', done: false },
  { label: '수령완료', done: false },
]

export default function ParcelStoreDeliveryStart() {
  const navigate = useNavigate()
  return (
    <div className="parcel-store-delivery-start">
      <div className="parcel-store-delivery-start__progress">
        {PROGRESS_STEPS.map((step, index) => (
          <div className="parcel-store-delivery-start__progress-step" key={step.label}>
            {index > 0 && (
              <div
                className={`parcel-store-delivery-start__progress-connector${
                  step.done && PROGRESS_STEPS[index - 1].done
                    ? ' parcel-store-delivery-start__progress-connector--active'
                    : ''
                }`}
              />
            )}
            <div className="parcel-store-delivery-start__progress-node">
              {step.done ? (
                <img src={iconProgressStepDone} alt="" className="parcel-store-delivery-start__progress-circle" />
              ) : (
                <span className="parcel-store-delivery-start__progress-circle parcel-store-delivery-start__progress-circle--empty" />
              )}
              <span
                className={`parcel-store-delivery-start__progress-label${
                  step.done ? ' parcel-store-delivery-start__progress-label--active' : ''
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="parcel-store-delivery-start__intro">
        <div className="parcel-store-delivery-start__title-row">
          <p className="parcel-store-delivery-start__title">편의점 택배</p>
          <span className="parcel-store-delivery-start__badge">반환 접수</span>
        </div>
        <p className="parcel-store-delivery-start__subtitle">습득자는 별도 결제 없이 편의점에서 접수할 수 있어요</p>
      </div>

      <div className="parcel-store-delivery-start__item-card">
        <div className="parcel-store-delivery-start__item-photo">
          <img src={walletPhoto} alt="" />
        </div>
        <div className="parcel-store-delivery-start__item-info">
          <p className="parcel-store-delivery-start__item-title">검정 반지갑 습득</p>
          <div className="parcel-store-delivery-start__item-rows">
            <p className="parcel-store-delivery-start__item-row">
              <img src={iconPayment} alt="" />
              검정색 Matin Kim 가죽 반지갑
            </p>
            <p className="parcel-store-delivery-start__item-row">
              <img src={iconClock} alt="" />
              오늘 오전 9~12시
            </p>
            <p className="parcel-store-delivery-start__item-location">서울 마포구 홍대입구역</p>
          </div>
        </div>
      </div>

      <div className="parcel-store-delivery-start__next-wrap">
        <button
          type="button"
          className="parcel-store-delivery-start__next"
          onClick={() => navigate('/found/match-result/quiz/claimants/return-prep/review/parcel-store/weight')}
        >
          다음
        </button>
      </div>
    </div>
  )
}
