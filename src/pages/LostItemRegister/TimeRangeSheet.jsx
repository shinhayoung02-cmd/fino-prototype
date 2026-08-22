import { useEffect, useRef, useState } from 'react'
import { TimePicker } from '@seed-design/react'
import './TimeRangeSheet.css'

const ITEM_HEIGHT = 40
const MONTHS = Array.from({ length: 12 }, (_, i) => `${i + 1}월`)
const DAYS = Array.from({ length: 31 }, (_, i) => `${i + 1}일`)

function pad2(value) {
  return String(value).padStart(2, '0')
}

function WheelColumn({ options, value, onChange }) {
  const scrollRef = useRef(null)
  const settleTimer = useRef(null)

  useEffect(() => {
    const index = options.indexOf(value)
    if (scrollRef.current && index >= 0) {
      scrollRef.current.scrollTop = index * ITEM_HEIGHT
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const settleToIndex = (index, notify) => {
    const clamped = Math.max(0, Math.min(options.length - 1, index))
    scrollRef.current?.scrollTo({ top: clamped * ITEM_HEIGHT, behavior: 'smooth' })
    if (notify) onChange(options[clamped])
  }

  const handleScroll = () => {
    if (settleTimer.current) clearTimeout(settleTimer.current)
    settleTimer.current = setTimeout(() => {
      if (!scrollRef.current) return
      const index = Math.round(scrollRef.current.scrollTop / ITEM_HEIGHT)
      settleToIndex(index, true)
    }, 120)
  }

  return (
    <div className="wheel-column">
      <div className="wheel-column__scroll" ref={scrollRef} onScroll={handleScroll}>
        {options.map((option, index) => (
          <div
            key={option}
            className={`wheel-column__item${option === value ? ' wheel-column__item--selected' : ''}`}
            onClick={() => settleToIndex(index, true)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  )
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
  const now = useRef(new Date()).current
  const [step, setStep] = useState('range')
  const [closing, setClosing] = useState(false)

  const [month, setMonth] = useState(`${now.getMonth() + 1}월`)
  const [day, setDay] = useState(`${now.getDate()}일`)
  const [time, setTime] = useState({ hour: now.getHours(), minute: now.getMinutes() })
  const [dayFilled, setDayFilled] = useState(false)
  const [timeFilled, setTimeFilled] = useState(false)

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
      <WheelPickerPopup
        closing={closing}
        title="요일을 선택하세요"
        onBackdrop={() => swapTo('range')}
        onConfirm={() => {
          setDayFilled(true)
          swapTo('range')
        }}
      >
        <div className="wheel-popup__wheels">
          <div className="wheel-popup__highlight" />
          <WheelColumn options={MONTHS} value={month} onChange={setMonth} />
          <WheelColumn options={DAYS} value={day} onChange={setDay} />
        </div>
      </WheelPickerPopup>
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
