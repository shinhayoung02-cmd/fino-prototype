import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DatePicker, TimePicker, dateOnOrAfter } from '@seed-design/react'
import iconInfo from '../../assets/ai-matching/icon-info-informative.svg'
import iconClock from '../../assets/home/icon-clock.svg'
import iconClockSelect from '../../assets/ai-matching/icon-clock-select.svg'
import iconChevronRight from '../../assets/ai-matching/icon-chevron-right.svg'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconAddChip from '../../assets/ai-matching/icon-add-chip.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import { MATCH_CANDIDATES } from './matchCandidates'
import './InPersonExchange.css'

const PROGRESS_STEPS = ['제안완료', '일정확정', '만남예정', '수령완료']
const candidate = MATCH_CANDIDATES[0]

function getToday() {
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }
}

function pad2(value) {
  return String(value).padStart(2, '0')
}

function isSameDate(a, b) {
  return Boolean(a) && Boolean(b) && a.year === b.year && a.month === b.month && a.day === b.day
}

function dateKey(date) {
  return `${date.year}-${pad2(date.month)}-${pad2(date.day)}`
}

function formatSlotLabel(date, time) {
  return `${date.month}월 ${date.day}일 ${pad2(time.hour)}:${pad2(time.minute)}`
}

export default function InPersonExchange({
  locations = [],
  dates,
  onDatesChange: setDates,
  slotTimes,
  onSlotTimesChange: setSlotTimes,
}) {
  const navigate = useNavigate()
  const today = getToday()
  const [isTimeSheetOpen, setTimeSheetOpen] = useState(false)
  const [pendingDate, setPendingDate] = useState(null)
  const [pendingTime, setPendingTime] = useState({ hour: 14, minute: 0 })

  const confirmedSlots = dates
    .filter((date) => slotTimes[dateKey(date)])
    .map((date) => ({ date, time: slotTimes[dateKey(date)] }))

  const handleDatesChange = (newDates) => {
    if (newDates.length > dates.length) {
      const added = newDates.find((nd) => !dates.some((d) => isSameDate(d, nd)))
      setDates(newDates)
      if (added) {
        setPendingDate(added)
        setPendingTime({ hour: 14, minute: 0 })
      }
      return
    }

    const removed = dates.find((d) => !newDates.some((nd) => isSameDate(nd, d)))
    setDates(newDates)
    if (removed) {
      setSlotTimes((prev) => {
        const next = { ...prev }
        delete next[dateKey(removed)]
        return next
      })
    }
  }

  const handleConfirmTime = () => {
    if (!pendingDate) return
    setSlotTimes((prev) => ({ ...prev, [dateKey(pendingDate)]: pendingTime }))
    setPendingDate(null)
  }

  const cancelPendingTime = () => {
    setDates((prev) => prev.filter((d) => !isSameDate(d, pendingDate)))
    setPendingDate(null)
  }

  const closeTimeSheet = () => {
    if (pendingDate) {
      setDates((prev) => prev.filter((d) => !isSameDate(d, pendingDate)))
      setPendingDate(null)
    }
    setTimeSheetOpen(false)
  }

  return (
    <div className="in-person-exchange">
      <div className="in-person-exchange__title-row">
        <h2 className="in-person-exchange__title">대면 직거래</h2>
        <span className="in-person-exchange__badge">습득물 확인중</span>
      </div>
      <p className="in-person-exchange__subtitle">약속 장소와 시간을 정해 직접 전달해요</p>

      <div className="in-person-exchange__callout">
        <img src={iconInfo} alt="" className="in-person-exchange__callout-icon" />
        <p className="in-person-exchange__callout-text">사람이 많은 공공장소에서 만나주세요</p>
      </div>

      <div className="in-person-exchange__progress">
        {PROGRESS_STEPS.map((label, index) => (
          <div className="in-person-exchange__progress-step" key={label}>
            {index > 0 && <div className="in-person-exchange__progress-connector" />}
            <div className="in-person-exchange__progress-node">
              {index === 0 ? (
                <img
                  src={iconProgressStepDone}
                  alt=""
                  className="in-person-exchange__progress-circle in-person-exchange__progress-circle--active"
                />
              ) : (
                <span className="in-person-exchange__progress-circle" />
              )}
              <span
                className={`in-person-exchange__progress-label${index === 0 ? ' in-person-exchange__progress-label--active' : ''}`}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="in-person-exchange__item-card">
        <div className="in-person-exchange__item-photo">
          {candidate.photo && <img src={candidate.photo} alt="" />}
        </div>
        <div className="in-person-exchange__item-info">
          <p className="in-person-exchange__item-title">{candidate.title}</p>
          <div className="in-person-exchange__item-rows">
            <p className="in-person-exchange__item-row">
              <img src={iconPayment} alt="" />
              {candidate.feature}
            </p>
            <p className="in-person-exchange__item-row">
              <img src={iconClock} alt="" />
              {candidate.time}
            </p>
            <p className="in-person-exchange__item-location">{candidate.location}</p>
          </div>
        </div>
      </div>

      <div className="in-person-exchange__field">
        <p className="in-person-exchange__field-label">거래 희망 시간대 제안해주세요.</p>
        <button type="button" className="in-person-exchange__time-trigger" onClick={() => setTimeSheetOpen(true)}>
          <img src={iconClockSelect} alt="" className="in-person-exchange__time-trigger-icon" />
          <span className="in-person-exchange__time-trigger-text">시간을 선택해주세요</span>
        </button>
        <div className="in-person-exchange__chip-row">
          {confirmedSlots.map((slot) => (
            <span className="in-person-exchange__slot-chip" key={dateKey(slot.date)}>
              {formatSlotLabel(slot.date, slot.time)}
            </span>
          ))}
          <button type="button" className="in-person-exchange__add-chip" onClick={() => setTimeSheetOpen(true)}>
            추가하기
            <img src={iconAddChip} alt="" className="in-person-exchange__add-chip-icon" />
          </button>
        </div>
      </div>

      <div className="in-person-exchange__field">
        <p className="in-person-exchange__field-label">거래 희망 지역 및 장소를 선택해주세요</p>
        <button
          type="button"
          className="in-person-exchange__list-row"
          onClick={() => navigate('/matching/result/ownership/in-person/location')}
        >
          <span className="in-person-exchange__list-row-body">
            <span className="in-person-exchange__list-row-title">장소 선택하기</span>
            <span className="in-person-exchange__list-row-desc">지도에서 대략적인 위치를 선택해요</span>
          </span>
          <img src={iconChevronRight} alt="" />
        </button>
        <div className="in-person-exchange__chip-row">
          {locations.map((loc) => (
            <span className="in-person-exchange__slot-chip" key={loc}>
              {loc}
            </span>
          ))}
          <button
            type="button"
            className="in-person-exchange__add-chip"
            onClick={() => navigate('/matching/result/ownership/in-person/location')}
          >
            추가하기
            <img src={iconAddChip} alt="" className="in-person-exchange__add-chip-icon" />
          </button>
        </div>
      </div>

      <div className="in-person-exchange__next-wrap">
        <button
          type="button"
          className="in-person-exchange__next"
          onClick={() => navigate('/matching/result/ownership/proposal-confirm')}
        >
          다음
        </button>
      </div>

      <BottomSheet
        isOpen={isTimeSheetOpen}
        onClose={closeTimeSheet}
        title="거래 희망 시간대를 선택해주세요"
        footer={
          <button
            type="button"
            className="time-slot-sheet__confirm"
            disabled={confirmedSlots.length === 0}
            onClick={() => setTimeSheetOpen(false)}
          >
            확인
          </button>
        }
      >
        <p className="time-slot-sheet__desc">가능한 날짜를 여러 개 선택하고, 시간을 함께 정해주세요.</p>
        <div className="time-slot-sheet__date-picker">
          <DatePicker
            selectionMode="multiple"
            today={today}
            value={dates}
            onValueChange={handleDatesChange}
            constraints={[dateOnOrAfter(today)]}
          />
        </div>
      </BottomSheet>

      {pendingDate && (
        <div className="time-select-popup-overlay" onClick={cancelPendingTime}>
          <div className="time-select-popup" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <p className="time-select-popup__title">시간을 선택하세요</p>
            <div className="time-select-popup__picker">
              <TimePicker value={pendingTime} onValueChange={setPendingTime} />
            </div>
            <button type="button" className="time-select-popup__confirm" onClick={handleConfirmTime}>
              선택 완료
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
