import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconClose from '../../assets/lost-register/icon-close.svg'
import iconClock from '../../assets/lost-register/icon-clock.svg'
import iconChevronRight from '../../assets/lost-register/icon-chevron-right.svg'
import leftItemSample1 from '../../assets/found-report/samples/left-item-1.png'
import leftItemSample2 from '../../assets/found-report/samples/left-item-2.png'
import { AttachmentField, AttachmentInputPreset } from '../../../seed-design/ui/attachment-field'
import { ProgressCircle } from '../../../seed-design/ui/progress-circle'
import TimeRangeSheet from '../LostItemRegister/TimeRangeSheet'
import './FoundLeftItemMain.css'

const SAMPLE_PHOTOS = [
  { url: leftItemSample1, name: 'left-item-1.png' },
  { url: leftItemSample2, name: 'left-item-2.png' },
]

const MAX_PHOTOS = 10
const AI_RECOGNITION_NAME = '지갑/카드'
const AI_RECOGNITION_DESCRIPTION = '검정색 Matin Kim 가죽 반지갑'
const AI_RECOGNITION_DELAY = 1200

export default function FoundLeftItemMain({
  draft,
  onDraftChange,
  onRegister,
  mode = 'edit',
  onEdit,
  onGoHome,
  timeSectionTitle = '발견 시각은 언제인가요?',
  timeHint = '발견한 시간을 선택해 주세요',
  timeSheetTitle = '발견 시각은 언제인가요?',
  timeSheetDesc = '발견한 시간을 선택해 주세요',
  timeSheetDayLabel = '발견 날짜',
  timeSheetTimeLabel = '발견 시간',
  locationSectionTitle = '발견 장소는 어디인가요?',
  locationRowDesc = '지도에서 발견 위치를 선택해요',
  locationRoute = '/found/new/left/location',
}) {
  const navigate = useNavigate()

  const { photos, name, description, timeRange, location } = draft

  const [isTimeSheetOpen, setTimeSheetOpen] = useState(false)
  const [isRecognizing, setIsRecognizing] = useState(false)

  const setName = (value) => onDraftChange({ ...draft, name: value })
  const setDescription = (value) => onDraftChange({ ...draft, description: value })

  const handlePhotosChange = (nextPhotos) => {
    onDraftChange({ ...draft, photos: nextPhotos })
  }

  useEffect(() => {
    if (photos.length === 0 || name !== '' || description !== '') return

    setIsRecognizing(true)
    const timer = setTimeout(() => {
      onDraftChange((prev) =>
        prev.name === '' && prev.description === ''
          ? { ...prev, name: AI_RECOGNITION_NAME, description: AI_RECOGNITION_DESCRIPTION }
          : prev,
      )
      setIsRecognizing(false)
    }, AI_RECOGNITION_DELAY)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length])

  const handleConfirmTime = (range) => {
    onDraftChange({ ...draft, timeRange: range })
  }

  const isNextEnabled = name.trim().length > 0 && description.trim().length > 0 && timeRange !== null

  const handleNext = () => {
    if (!isNextEnabled) return
    onRegister?.()
  }

  return (
    <div className="found-left">
      <div className="found-left__scroll">
        <section className="found-left__section">
          <AttachmentField
            label="사진을 등록해주세요"
            labelClassName="found-left__photo-label"
            indicator="선택 사항"
            maxFiles={MAX_PHOTOS}
            accept="image/*"
            acceptedFileEntries={photos}
            onAcceptedFileEntriesChange={handlePhotosChange}
          >
            <AttachmentInputPreset
              samples={SAMPLE_PHOTOS}
              triggerClassName="found-left__photo-trigger"
              countClassName="found-left__photo-count"
            />
          </AttachmentField>
        </section>

        <section className="found-left__section">
          <h2 className="found-left__section-title">물건 정보를 입력해주세요</h2>
          <div className="found-left__field-group">
            <div className="found-left__field">
              <input
                type="text"
                className="found-left__field-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="물건 이름을 입력해주세요"
              />
              {name && (
                <button
                  type="button"
                  className="found-left__field-clear"
                  aria-label="지우기"
                  onClick={() => setName('')}
                >
                  <img src={iconClose} alt="" />
                </button>
              )}
            </div>
            <div className="found-left__field">
              <input
                type="text"
                className="found-left__field-input"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="상세 설명을 입력해주세요 (색상, 브랜드, 특징 등)"
              />
              {description && (
                <button
                  type="button"
                  className="found-left__field-clear"
                  aria-label="지우기"
                  onClick={() => setDescription('')}
                >
                  <img src={iconClose} alt="" />
                </button>
              )}
            </div>
          </div>
          <p className="found-left__hint">등록된 사진 바탕으로 AI가 자동으로 인식한 물건이에요</p>
        </section>

        <section className="found-left__section">
          <h2 className="found-left__section-title">{timeSectionTitle}</h2>
          <button type="button" className="found-left__field" onClick={() => setTimeSheetOpen(true)}>
            <img src={iconClock} alt="" className="found-left__field-prefix-icon" />
            <span className={`found-left__field-text${timeRange ? '' : ' found-left__field-text--placeholder'}`}>
              {timeRange
                ? `${timeRange.month} ${timeRange.day} · ${timeRange.hour} ${timeRange.minute}`
                : '시간을 선택해주세요'}
            </span>
          </button>
          <p className="found-left__hint">{timeHint}</p>
        </section>

        <section className="found-left__section">
          <h2 className="found-left__section-title">{locationSectionTitle}</h2>
          <button
            type="button"
            className="found-left__location-row"
            onClick={() => navigate(locationRoute)}
          >
            <span className="found-left__location-text">
              <span className="found-left__location-title">
                {location ? `${location.address} · ${location.radius}` : '위치 및 범위 선택하기'}
              </span>
              <span className="found-left__location-desc">
                {location ? location.detail : locationRowDesc}
              </span>
            </span>
            <img src={iconChevronRight} alt="" className="found-left__location-chevron" />
          </button>
        </section>

        <div className="found-left__next-wrap">
          {mode === 'review' ? (
            <div className="found-left__review-actions">
              <button type="button" className="found-left__edit" onClick={onEdit}>
                수정하기
              </button>
              <button type="button" className="found-left__next" onClick={onGoHome}>
                홈으로
              </button>
            </div>
          ) : (
            <button type="button" className="found-left__next" disabled={!isNextEnabled} onClick={handleNext}>
              다음
            </button>
          )}
        </div>
      </div>

      <TimeRangeSheet
        isOpen={isTimeSheetOpen}
        onClose={() => setTimeSheetOpen(false)}
        onConfirm={handleConfirmTime}
        title={timeSheetTitle}
        description={timeSheetDesc}
        dayRowLabel={timeSheetDayLabel}
        timeRowLabel={timeSheetTimeLabel}
      />

      {isRecognizing && (
        <div className="found-left__ai-overlay">
          <ProgressCircle size="40" tone="neutral" />
        </div>
      )}
    </div>
  )
}
