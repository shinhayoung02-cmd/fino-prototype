import { ITEM_PROFILES } from '../../data/itemProfiles'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconPayment from '../../assets/ai-matching/icon-payment.svg'
import iconClock from '../../assets/ai-matching/icon-clock.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import './ParcelDeliveryReview.css'

const PROGRESS_STEPS = [
  { label: '접수대기', done: true },
  { label: '접수완료', done: true },
  { label: '배송중', done: false },
  { label: '수령완료', done: false },
]

const LAST_DONE_INDEX = PROGRESS_STEPS.reduce((acc, step, index) => (step.done ? index : acc), -1)

export default function ParcelDeliveryReview({ itemProfile = ITEM_PROFILES['wallet-normal'] } = {}) {
  const navigate = useNavigate()

  return (
    <div className="parcel-delivery-review">
      <div className="parcel-delivery-review__progress">
        {PROGRESS_STEPS.map((step, index) => (
          <div className="parcel-delivery-review__progress-step" key={step.label}>
            {index > 0 && (
              <div
                className={`parcel-delivery-review__progress-connector${
                  step.done && PROGRESS_STEPS[index - 1].done
                    ? ' parcel-delivery-review__progress-connector--active'
                    : ''
                }${index === LAST_DONE_INDEX ? ' parcel-delivery-review__progress-connector--latest' : ''}`}
              />
            )}
            <div className="parcel-delivery-review__progress-node">
              {step.done ? (
                <img
                  src={iconProgressStepDone}
                  alt=""
                  className={`parcel-delivery-review__progress-circle${
                    index === LAST_DONE_INDEX ? ' parcel-delivery-review__progress-circle--latest' : ''
                  }`}
                />
              ) : (
                <span className="parcel-delivery-review__progress-circle parcel-delivery-review__progress-circle--empty" />
              )}
              <span
                className={`parcel-delivery-review__progress-label${
                  step.done ? ' parcel-delivery-review__progress-label--active' : ''
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="parcel-delivery-review__intro">
        <div className="parcel-delivery-review__title-row">
          <p className="parcel-delivery-review__title">일반택배 배송</p>
          <span className="parcel-delivery-review__badge">반환 접수</span>
        </div>
        <p className="parcel-delivery-review__subtitle">습득자는 별도 결제 없이 편의점에서 접수할 수 있어요</p>
      </div>

      <div className="parcel-delivery-review__callout">
        <img src={iconInfo} alt="" className="parcel-delivery-review__callout-icon" />
        <p className="parcel-delivery-review__callout-text">
          포장 후 물품은 내일(수) 오전 9시 전까지
          <br />
          문 앞에 놔주세요.
        </p>
      </div>

      <div className="parcel-delivery-review__item-card">
        <div className="parcel-delivery-review__item-photo">
          <img src={itemProfile.photo} alt="" />
        </div>
        <div className="parcel-delivery-review__item-info">
          <p className="parcel-delivery-review__item-title">{itemProfile.category} 습득</p>
          <div className="parcel-delivery-review__item-rows">
            <p className="parcel-delivery-review__item-row">
              <img src={iconPayment} alt="" />
              {itemProfile.shortDescription}
            </p>
            <p className="parcel-delivery-review__item-row">
              <img src={iconClock} alt="" />
              오늘 오전 9~12시
            </p>
            <p className="parcel-delivery-review__item-location">서울 마포구 홍대입구역</p>
          </div>
        </div>
      </div>

      <div className="parcel-delivery-review__actions">
        <button
          type="button"
          className="parcel-delivery-review__confirm"
          onClick={() => navigate('/found/match-result/quiz/claimants/return-prep/review/parcel/tracking')}
        >
          확인
        </button>
        <button
          type="button"
          className="parcel-delivery-review__edit"
          onClick={() => navigate('/found/match-result/quiz/claimants/return-prep/review/parcel/box-size')}
        >
          수정하기
        </button>
      </div>
    </div>
  )
}
