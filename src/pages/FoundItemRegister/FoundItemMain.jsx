import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import iconClock from '../../assets/lost-register/icon-clock.svg'
import iconChevronRight from '../../assets/lost-register/icon-chevron-right.svg'
import TimeRangeSheet from '../LostItemRegister/TimeRangeSheet'
import './FoundItemMain.css'

export default function FoundItemMain({ draft, onDraftChange, onRegister }) {
  const navigate = useNavigate()
  const [isTimeSheetOpen, setTimeSheetOpen] = useState(false)
  const { name, description, timeRange, location } = draft

  const setName = (value) => onDraftChange({ ...draft, name: value })
  const setDescription = (value) => onDraftChange({ ...draft, description: value })
  const handleConfirmTime = (range) => onDraftChange({ ...draft, timeRange: range })

  const isNextEnabled = name.trim().length > 0 && description.trim().length > 0 && timeRange !== null

  const handleNext = () => {
    if (!isNextEnabled) return
    onRegister?.()
  }

  return (
    <div className="found-main">
      <section className="found-main__section found-main__section--first">
        <h2 className="found-main__section-title">물건 정보를 입력해주세요</h2>
        <div className="found-main__field-group">
          <div className="found-main__field">
            <input
              type="text"
              className="found-main__field-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="물건 이름을 입력해주세요"
            />
            {name && (
              <button
                type="button"
                className="found-main__field-clear"
                aria-label="지우기"
                onClick={() => setName('')}
              >
                <img src={iconRemoveCircle} alt="" />
              </button>
            )}
          </div>
          <div className="found-main__field">
            <input
              type="text"
              className="found-main__field-input"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="상세 설명을 입력해주세요 (색상, 브랜드, 특징 등)"
            />
            {description && (
              <button
                type="button"
                className="found-main__field-clear"
                aria-label="지우기"
                onClick={() => setDescription('')}
              >
                <img src={iconRemoveCircle} alt="" />
              </button>
            )}
          </div>
        </div>
        <p className="found-main__hint">AI가 자동으로 인식한 물건이에요</p>
      </section>

      <section className="found-main__section">
        <h2 className="found-main__section-title">습득 시간은 언제인가요?</h2>
        <button type="button" className="found-main__field" onClick={() => setTimeSheetOpen(true)}>
          <img src={iconClock} alt="" className="found-main__field-prefix-icon" />
          <span className={`found-main__field-text${timeRange ? '' : ' found-main__field-text--placeholder'}`}>
            {timeRange
              ? `${timeRange.month} ${timeRange.day} · ${timeRange.hour} ${timeRange.minute}`
              : '시간을 선택해주세요'}
          </span>
        </button>
        <p className="found-main__hint">습득한 시간을 선택해 주세요</p>
      </section>

      <section className="found-main__section">
        <h2 className="found-main__section-title">습득 장소는 어디인가요?</h2>
        <button
          type="button"
          className="found-main__location-row"
          onClick={() => navigate('/found/new/location')}
        >
          <span className="found-main__location-text">
            <span className="found-main__location-title">
              {location ? `${location.address} · ${location.radius}` : '위치 및 범위 선택하기'}
            </span>
            <span className="found-main__location-desc">
              {location ? location.detail : '지도에서 대략적인 위치를 선택해요'}
            </span>
          </span>
          <img src={iconChevronRight} alt="" className="found-main__location-chevron" />
        </button>
      </section>

      <div className="found-main__next-wrap">
        <button type="button" className="found-main__next" disabled={!isNextEnabled} onClick={handleNext}>
          다음 단계로
        </button>
      </div>

      <TimeRangeSheet
        isOpen={isTimeSheetOpen}
        onClose={() => setTimeSheetOpen(false)}
        onConfirm={handleConfirmTime}
        title="습득 시각은 언제인가요?"
        description="습득 시간을 선택해주세요"
        dayRowLabel="습득 날짜"
        timeRowLabel="습득 시간"
      />
    </div>
  )
}
