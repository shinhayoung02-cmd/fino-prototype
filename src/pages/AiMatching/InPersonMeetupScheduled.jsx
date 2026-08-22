import iconInfo from '../../assets/ai-matching/icon-info-informative.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import iconPayment from '../../assets/ai-matching/icon-payment.svg'
import iconClock from '../../assets/ai-matching/icon-clock.svg'
import walletPhoto from '../../assets/ai-matching/samples/wallet-matin-kim-photo.jpg'
import './InPersonMeetupScheduled.css'

const PROGRESS_STEPS = [
  { label: '제안승인', done: true },
  { label: '일정확정', done: true },
  { label: '만남예정', done: true },
  { label: '전달완료', done: false },
]

function pad2(value) {
  return String(value).padStart(2, '0')
}

function formatSlot(slot) {
  if (!slot) return '-'
  const hour12 = slot.hour % 12 === 0 ? 12 : slot.hour % 12
  const period = slot.hour < 12 ? '오전' : '오후'
  return `${slot.year}.${pad2(slot.month)}.${pad2(slot.day)} ${period} ${hour12}:${pad2(slot.minute)}`
}

export default function InPersonMeetupScheduled({ place, slot, onNext }) {
  return (
    <div className="in-person-scheduled">
      <div className="in-person-scheduled__progress">
        {PROGRESS_STEPS.map((step, index) => (
          <div className="in-person-scheduled__progress-step" key={step.label}>
            {index > 0 && (
              <div
                className={`in-person-scheduled__progress-connector${
                  step.done && PROGRESS_STEPS[index - 1].done
                    ? ' in-person-scheduled__progress-connector--active'
                    : ''
                }`}
              />
            )}
            <div className="in-person-scheduled__progress-node">
              {step.done ? (
                <img src={iconProgressStepDone} alt="" className="in-person-scheduled__progress-circle" />
              ) : (
                <span className="in-person-scheduled__progress-circle in-person-scheduled__progress-circle--empty" />
              )}
              <span
                className={`in-person-scheduled__progress-label${
                  step.done ? ' in-person-scheduled__progress-label--active' : ''
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="in-person-scheduled__intro">
        <div className="in-person-scheduled__title-row">
          <p className="in-person-scheduled__title">대면 직거래</p>
          <span className="in-person-scheduled__badge">전달예정</span>
        </div>
        <p className="in-person-scheduled__subtitle">약속 장소와 시간을 정해 직접 전달해요</p>
      </div>

      <div className="in-person-scheduled__callout">
        <img src={iconInfo} alt="" className="in-person-scheduled__callout-icon" />
        <p className="in-person-scheduled__callout-text">
          사람이 많은 공공장소에서 만나주세요
          <br />
          물건을 전달한 후 완료 상태를 확인해주세요
        </p>
      </div>

      <div className="in-person-scheduled__item-card">
        <div className="in-person-scheduled__item-photo">
          <img src={walletPhoto} alt="" />
        </div>
        <div className="in-person-scheduled__item-info">
          <p className="in-person-scheduled__item-title">검정 반지갑 습득</p>
          <div className="in-person-scheduled__item-rows">
            <p className="in-person-scheduled__item-row">
              <img src={iconPayment} alt="" />
              검정색 Matin Kim 가죽 반지갑
            </p>
            <p className="in-person-scheduled__item-row">
              <img src={iconClock} alt="" />
              오늘 오전 9~12시
            </p>
            <p className="in-person-scheduled__item-location">서울 마포구 홍대입구역</p>
          </div>
        </div>
      </div>

      <div className="in-person-scheduled__status">
        <p className="in-person-scheduled__status-label">진행 현황</p>
        <div className="in-person-scheduled__status-list">
          <div className="in-person-scheduled__row">
            <span className="in-person-scheduled__row-label">현재 상태</span>
            <span className="in-person-scheduled__badge-value">만남 예정</span>
          </div>
          <div className="in-person-scheduled__divider" />
          <div className="in-person-scheduled__row">
            <span className="in-person-scheduled__row-label">약속 장소</span>
            <span className="in-person-scheduled__plain-value">{place ? place.title : '-'}</span>
          </div>
          <div className="in-person-scheduled__divider" />
          <div className="in-person-scheduled__row in-person-scheduled__row--time">
            <span className="in-person-scheduled__row-label">약속 시간</span>
            <span className="in-person-scheduled__plain-value">{formatSlot(slot)}</span>
          </div>
        </div>
      </div>

      <div className="in-person-scheduled__actions">
        <button type="button" className="in-person-scheduled__next" onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  )
}
