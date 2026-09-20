import { ITEM_PROFILES } from '../../data/itemProfiles'
import { useState } from 'react'
import { DatePicker } from '@seed-design/react'
import iconInfo from '../../assets/ai-matching/icon-info-informative.svg'
import iconClockSelect from '../../assets/ai-matching/icon-clock-select.svg'
import iconChevronRight from '../../assets/ai-matching/icon-chevron-right.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import iconPayment from '../../assets/ai-matching/icon-payment.svg'
import iconClock from '../../assets/ai-matching/icon-clock.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './InPersonScheduleConfirm.css'

const PROGRESS_STEPS = [
  { label: '제안승인', done: true },
  { label: '일정확정', done: true },
  { label: '만남예정', done: false },
  { label: '전달완료', done: false },
]

const LAST_DONE_INDEX = PROGRESS_STEPS.reduce((acc, step, index) => (step.done ? index : acc), -1)

function pad2(value) {
  return String(value).padStart(2, '0')
}

function getToday() {
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }
}

function addDays(date, days) {
  const d = new Date(date.year, date.month - 1, date.day + days)
  return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }
}

function isSameDate(a, b) {
  return Boolean(a) && Boolean(b) && a.year === b.year && a.month === b.month && a.day === b.day
}

const TODAY = getToday()

// 분실자가 제안한 약속 시간 4개 (임의 지정)
const CANDIDATE_SLOTS = [
  { ...addDays(TODAY, 0), hour: 14, minute: 0 },
  { ...addDays(TODAY, 1), hour: 10, minute: 0 },
  { ...addDays(TODAY, 2), hour: 19, minute: 0 },
  { ...addDays(TODAY, 3), hour: 20, minute: 0 },
]

function onlyCandidateDate(candidate) {
  return CANDIDATE_SLOTS.some((slot) => isSameDate(slot, candidate))
}

export default function InPersonScheduleConfirm({ place, onSelectPlace, slot: selectedSlot, onSlotChange, onNext, itemProfile = ITEM_PROFILES['wallet-normal'] }) {
  const [isCalendarOpen, setCalendarOpen] = useState(false)
  const [pendingSlot, setPendingSlot] = useState(null)

  const handlePickDate = (date) => {
    const match = CANDIDATE_SLOTS.find((slot) => isSameDate(slot, date))
    if (!match) return
    setCalendarOpen(false)
    setPendingSlot(match)
  }

  const handleConfirmSlot = () => {
    onSlotChange?.(pendingSlot)
    setPendingSlot(null)
  }

  return (
    <div className="in-person-schedule">
      <div className="in-person-schedule__intro">
        <div className="in-person-schedule__title-row">
          <p className="in-person-schedule__title">대면 직거래</p>
          <span className="in-person-schedule__badge">일정확정 중</span>
        </div>
        <p className="in-person-schedule__subtitle">약속 장소와 시간을 정해 직접 전달해요</p>
      </div>

      <div className="in-person-schedule__callout">
        <img src={iconInfo} alt="" className="in-person-schedule__callout-icon" />
        <p className="in-person-schedule__callout-text">
          사람이 많은 공공장소에서 만나주세요
          <br />
          물건을 전달한 후 완료 상태를 확인해주세요
        </p>
      </div>

      <div className="in-person-schedule__progress">
        {PROGRESS_STEPS.map((step, index) => (
          <div className="in-person-schedule__progress-step" key={step.label}>
            {index > 0 && (
              <div
                className={`in-person-schedule__progress-connector${
                  step.done && PROGRESS_STEPS[index - 1].done
                    ? ' in-person-schedule__progress-connector--active'
                    : ''
                }${index === LAST_DONE_INDEX ? ' in-person-schedule__progress-connector--latest' : ''}`}
              />
            )}
            <div className="in-person-schedule__progress-node">
              {step.done ? (
                <img
                  src={iconProgressStepDone}
                  alt=""
                  className={`in-person-schedule__progress-circle${
                    index === LAST_DONE_INDEX ? ' in-person-schedule__progress-circle--latest' : ''
                  }`}
                />
              ) : (
                <span className="in-person-schedule__progress-circle in-person-schedule__progress-circle--empty" />
              )}
              <span
                className={`in-person-schedule__progress-label${
                  step.done ? ' in-person-schedule__progress-label--active' : ''
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="in-person-schedule__item-card">
        <div className="in-person-schedule__item-photo">
          <img src={itemProfile.photo} alt="" />
        </div>
        <div className="in-person-schedule__item-info">
          <p className="in-person-schedule__item-title">{itemProfile.category} 습득</p>
          <div className="in-person-schedule__item-rows">
            <p className="in-person-schedule__item-row">
              <img src={iconPayment} alt="" />
              {itemProfile.shortDescription}
            </p>
            <p className="in-person-schedule__item-row">
              <img src={iconClock} alt="" />
              오늘 오전 9~12시
            </p>
            <p className="in-person-schedule__item-location">서울 마포구 홍대입구역</p>
          </div>
        </div>
      </div>

      <div className="in-person-schedule__field">
        <p className="in-person-schedule__field-label">약속 시간을 선택해주세요</p>
        <button type="button" className="in-person-schedule__time-trigger" onClick={() => setCalendarOpen(true)}>
          <img src={iconClockSelect} alt="" className="in-person-schedule__time-trigger-icon" />
          <span
            className={`in-person-schedule__time-trigger-text${
              selectedSlot ? ' in-person-schedule__time-trigger-text--filled' : ''
            }`}
          >
            {selectedSlot
              ? `${selectedSlot.month}월 ${selectedSlot.day}일 ${pad2(selectedSlot.hour)}시 ${pad2(selectedSlot.minute)}분`
              : '시간을 선택해주세요'}
          </span>
        </button>
      </div>

      <div className="in-person-schedule__field">
        <p className="in-person-schedule__field-label">약속 장소를 선택해주세요</p>
        <button type="button" className="in-person-schedule__list-row" onClick={onSelectPlace}>
          <span className="in-person-schedule__list-row-body">
            <span className="in-person-schedule__list-row-title">{place ? place.title : '장소 선택하기'}</span>
            <span className="in-person-schedule__list-row-desc">
              {place ? `${place.distance} 거리` : '지도에서 대략적인 위치를 선택해요'}
            </span>
          </span>
          <img src={iconChevronRight} alt="" />
        </button>
      </div>

      <div className="in-person-schedule__next-wrap">
        <button type="button" className="in-person-schedule__next" onClick={onNext}>
          다음
        </button>
      </div>

      <BottomSheet
        isOpen={isCalendarOpen}
        onClose={() => setCalendarOpen(false)}
        title="약속 시간을 선택해주세요"
      >
        <p className="in-person-schedule__calendar-desc">분실자가 제안한 시간 중에서 선택해주세요.</p>
        <div className="in-person-schedule__calendar">
          <DatePicker
            selectionMode="single"
            today={TODAY}
            value={selectedSlot}
            onValueChange={handlePickDate}
            constraints={[onlyCandidateDate]}
          />
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={Boolean(pendingSlot)}
        onClose={() => setPendingSlot(null)}
        title="제안된 약속 시간"
        footer={
          <button type="button" className="in-person-schedule__confirm-btn" onClick={handleConfirmSlot}>
            확인
          </button>
        }
      >
        {pendingSlot && (
          <div className="in-person-schedule__confirm-rows">
            <div className="in-person-schedule__confirm-row">
              <span className="in-person-schedule__confirm-label">약속 요일</span>
              <span className="in-person-schedule__confirm-value">
                {pendingSlot.month}월 {pendingSlot.day}일
              </span>
            </div>
            <div className="in-person-schedule__confirm-row">
              <span className="in-person-schedule__confirm-label">약속 시간</span>
              <span className="in-person-schedule__confirm-value">
                {pad2(pendingSlot.hour)}시 {pad2(pendingSlot.minute)}분
              </span>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  )
}
