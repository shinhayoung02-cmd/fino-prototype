import { useState } from 'react'
import { DatePicker, TimePicker } from '@seed-design/react'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './TimeRangeSheet.css'

function pad2(value) {
  return String(value).padStart(2, '0')
}

function getToday() {
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }
}

const TODAY = getToday()
const NOW = new Date()
const TODAY_HOUR = NOW.getHours()
const TODAY_MINUTE = NOW.getMinutes()

function toTime({ year, month, day }) {
  return new Date(year, month - 1, day).getTime()
}

const MIN_SELECTABLE_TIME = (() => {
  const d = new Date(TODAY.year, TODAY.month - 1, TODAY.day)
  d.setDate(d.getDate() - 7)
  return d.getTime()
})()
const MAX_SELECTABLE_TIME = toTime(TODAY)

const isWithinSelectableRange = (candidate) => {
  const time = toTime(candidate)
  return time >= MIN_SELECTABLE_TIME && time <= MAX_SELECTABLE_TIME
}

function WheelPickerPopup({ title, onConfirm, onBackdrop, closing, children }) {
  return (
    <div
      className={`wheel-popup-overlay${closing ? ' wheel-popup-overlay--closing' : ''}`}
      onClick={onBackdrop}
    >
      <div className="wheel-popup" onClick={(event) => event.stopPropagation()}>
        <p className="wheel-popup__title">{title}</p>
        {children}
        <button type="button" className="wheel-popup__confirm" onClick={onConfirm}>
          선택 완료
        </button>
      </div>
    </div>
  )
}

function RangeSheet({
  title,
  description,
  dayRowLabel,
  timeRowLabel,
  dayLabel,
  timeLabel,
  dayFilled,
  timeFilled,
  onSelectDay,
  onSelectTime,
  onConfirm,
  onBackdrop,
  closing,
}) {
  return (
    <div className={`range-sheet-overlay${closing ? ' range-sheet-overlay--closing' : ''}`} onClick={onBackdrop}>
      <div className="range-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="range-sheet__handle" />
        <div className="range-sheet__header">
          <p className="range-sheet__title">{title}</p>
          <p className="range-sheet__desc">{description}</p>
        </div>
        <div className="range-sheet__rows">
          <button type="button" className="range-sheet__row" onClick={onSelectDay}>
            <span className="range-sheet__row-label">{dayRowLabel}</span>
            <span className={`range-sheet__row-value${dayFilled ? '' : ' range-sheet__row-value--placeholder'}`}>
              {dayLabel}
            </span>
          </button>
          <button type="button" className="range-sheet__row" onClick={onSelectTime}>
            <span className="range-sheet__row-label">{timeRowLabel}</span>
            <span className={`range-sheet__row-value${timeFilled ? '' : ' range-sheet__row-value--placeholder'}`}>
              {timeLabel}
            </span>
          </button>
        </div>
        <button type="button" className="range-sheet__confirm" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  )
}

export default function TimeRangeSheet({
  isOpen,
  onClose,
  onConfirm,
  title = '분실 시각은 언제인가요?',
  description = '분실 시간을 선택해주세요',
  dayRowLabel = '분실 날짜',
  timeRowLabel = '분실 시간',
}) {
  const [step, setStep] = useState('range')
  const [closing, setClosing] = useState(false)

  const [dateValue, setDateValue] = useState(TODAY)
  const [time, setTime] = useState({ hour: TODAY_HOUR, minute: TODAY_MINUTE })
  const [dayFilled, setDayFilled] = useState(false)
  const [timeFilled, setTimeFilled] = useState(false)
  const month = `${dateValue.month}월`
  const day = `${dateValue.day}일`

  if (!isOpen) return null

  const swapTo = (nextStep) => {
    setClosing(true)
    setTimeout(() => {
      setStep(nextStep)
      setClosing(false)
    }, 200)
  }

  const closeAll = () => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      setStep('range')
      onClose()
    }, 200)
  }

  const handleConfirmRange = () => {
    if (dayFilled && timeFilled) {
      onConfirm({ month, day, hour: `${time.hour}시`, minute: `${pad2(time.minute)}분` })
    }
    closeAll()
  }

  if (step === 'range') {
    return (
      <RangeSheet
        closing={closing}
        onBackdrop={closeAll}
        title={title}
        description={description}
        dayRowLabel={dayRowLabel}
        timeRowLabel={timeRowLabel}
        dayLabel={dayFilled ? `${month} ${day}` : '선택해주세요'}
        timeLabel={timeFilled ? `${time.hour}시 ${pad2(time.minute)}분` : '선택해주세요'}
        dayFilled={dayFilled}
        timeFilled={timeFilled}
        onSelectDay={() => swapTo('day')}
        onSelectTime={() => swapTo('time')}
        onConfirm={handleConfirmRange}
      />
    )
  }

  if (step === 'day') {
    return (
      <BottomSheet
        isOpen
        onClose={() => swapTo('range')}
        title="요일을 선택하세요"
        footer={
          <button
            type="button"
            className="range-sheet__calendar-confirm"
            onClick={() => {
              setDayFilled(true)
              swapTo('range')
            }}
          >
            선택 완료
          </button>
        }
      >
        <div className="range-sheet__calendar">
          <DatePicker
            selectionMode="single"
            today={TODAY}
            value={dateValue}
            onValueChange={setDateValue}
            constraints={[isWithinSelectableRange]}
          />
        </div>
      </BottomSheet>
    )
  }

  return (
    <WheelPickerPopup
      closing={closing}
      title="시간을 선택하세요"
      onBackdrop={() => swapTo('range')}
      onConfirm={() => {
        setTimeFilled(true)
        swapTo('range')
      }}
    >
      <TimePicker value={time} onValueChange={setTime} />
    </WheelPickerPopup>
  )
}
