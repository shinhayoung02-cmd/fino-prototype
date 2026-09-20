import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconClose from '../../assets/lost-register/icon-close.svg'
import iconClock from '../../assets/lost-register/icon-clock.svg'
import iconChevronRight from '../../assets/lost-register/icon-chevron-right.svg'
import iconRetry from '../../assets/ai-matching/icon-retry.svg'
import { ITEM_PROFILES } from '../../data/itemProfiles'
import { AttachmentField, AttachmentInputPreset } from '../../../seed-design/ui/attachment-field'
import { ProgressCircle } from '../../../seed-design/ui/progress-circle'
import TimeRangeSheet from '../LostItemRegister/TimeRangeSheet'
import './FoundLeftItemMain.css'

function buildPhotoOption(itemKey) {
  const profile = ITEM_PROFILES[itemKey]
  return {
    label: profile.shortDescription,
    url: profile.photo,
    urls: [profile.photo, profile.photoBack],
    name: `${itemKey}.jpg`,
    aiName: profile.category,
    aiDesc: profile.description,
    itemKey,
  }
}

export const STREET_PHOTO_OPTIONS = ['airpods', 'wallet-normal', 'car-key'].map(buildPhotoOption)

export const STATION_PHOTO_OPTIONS = ['bag-restricted', 'wallet-restricted'].map(buildPhotoOption)

const DEFAULT_PHOTO_OPTIONS = STREET_PHOTO_OPTIONS

const MAX_PHOTOS = 10
const AI_RECOGNITION_DELAY = 1200

const FEATURE_KEYWORDS = {
  색상: ['검정', '검은', '블랙', '흰', '하양', '화이트', '빨강', '빨간', '레드', '파랑', '파란', '블루', '노랑', '노란', '옐로', '초록', '그린', '회색', '그레이', '갈색', '브라운', '분홍', '핑크', '보라', '퍼플', '남색', '네이비', '베이지', '금색', '골드', '은색', '실버'],
  브랜드: [], // capitalized latin word (e.g. Matin Kim, Nike) checked separately
  재질: ['가죽', '레더', '면', '순면', '울', '니트', '스웨이드', '메탈', '금속', '플라스틱', '실리콘', '고무', '데님', '캔버스', '나일론', '폴리에스터', '우드', '나무', '유리', '세라믹', '천'],
  형태: ['반지갑', '장지갑', '숄더백', '토트백', '크로스백', '백팩', '파우치', '동그란', '네모난', '사각형', '원형', '라운드', '스퀘어', '지퍼형', '버클형', '케이스', '목걸이형', '팔찌형'],
}

function countFeatureCategories(text) {
  const trimmed = text.trim()
  if (!trimmed) return 0
  let count = 0
  if (FEATURE_KEYWORDS.색상.some((word) => trimmed.includes(word))) count += 1
  if (FEATURE_KEYWORDS.재질.some((word) => trimmed.includes(word))) count += 1
  if (FEATURE_KEYWORDS.형태.some((word) => trimmed.includes(word))) count += 1
  if (/[A-Z][a-zA-Z]+/.test(trimmed)) count += 1 // 브랜드: capitalized latin word
  return count
}

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
  photoOptions = DEFAULT_PHOTO_OPTIONS,
}) {
  const navigate = useNavigate()
  const readOnly = mode === 'review' || mode === 'readonly'

  const { photos, name, description, timeRange, location } = draft

  const [isTimeSheetOpen, setTimeSheetOpen] = useState(false)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [pickedPhotoOption, setPickedPhotoOption] = useState(null)
  const [showErrors, setShowErrors] = useState(false)
  const [attachedItemKey, setAttachedItemKey] = useState(null)
  const [isMismatchOpen, setMismatchOpen] = useState(false)
  const lastGoodPhotosRef = useRef(photos)

  const setName = (value) => onDraftChange({ ...draft, name: value })
  const setDescription = (value) => onDraftChange({ ...draft, description: value })

  const handlePhotosChange = (nextPhotos) => {
    onDraftChange({ ...draft, photos: nextPhotos })
  }

  useEffect(() => {
    if (!isMismatchOpen) lastGoodPhotosRef.current = photos
  }, [photos, isMismatchOpen])

  const handlePickPhoto = (option) => {
    if (attachedItemKey && option.itemKey !== attachedItemKey) {
      handlePhotosChange(lastGoodPhotosRef.current)
      setMismatchOpen(true)
      return
    }
    setAttachedItemKey(option.itemKey)
    setPickedPhotoOption(option)
  }

  useEffect(() => {
    if (!pickedPhotoOption) return

    setIsRecognizing(true)
    const timer = setTimeout(() => {
      onDraftChange((prev) => ({ ...prev, name: pickedPhotoOption.aiName, description: pickedPhotoOption.aiDesc, itemKey: pickedPhotoOption.itemKey }))
      setIsRecognizing(false)
    }, AI_RECOGNITION_DELAY)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedPhotoOption])

  const handleConfirmTime = (range) => {
    onDraftChange({ ...draft, timeRange: range })
  }

  const isNextEnabled =
    name.trim().length > 0 && description.trim().length > 0 && timeRange !== null && location !== null

  const showFeatureWarning = description.trim().length > 0 && countFeatureCategories(description) < 3

  const handleNext = () => {
    if (!isNextEnabled) {
      setShowErrors(true)
      return
    }
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
            disabled={readOnly}
          >
            <AttachmentInputPreset
              pickerOptions={photoOptions}
              onPick={handlePickPhoto}
              triggerClassName="found-left__photo-trigger"
              countClassName="found-left__photo-count"
              disabled={readOnly}
            />
          </AttachmentField>
        </section>

        <section className="found-left__section">
          <h2 className="found-left__section-title">물건 정보를 입력해주세요</h2>
          <div className="found-left__field-group">
            <div className={`found-left__field${showErrors && !name.trim() ? ' found-left__field--error' : ''}${readOnly ? ' found-left__field--readonly' : ''}`}>
              <input
                type="text"
                className="found-left__field-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="물건 이름을 입력해주세요"
                readOnly={readOnly}
              />
              {name && !readOnly && (
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
            <div className={`found-left__field${showErrors && !description.trim() ? ' found-left__field--error' : ''}${readOnly ? ' found-left__field--readonly' : ''}`}>
              <input
                type="text"
                className="found-left__field-input"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="상세 설명을 입력해주세요 (색상, 브랜드, 특징 등)"
                readOnly={readOnly}
              />
              {description && !readOnly && (
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
          {showFeatureWarning && !readOnly && (
            <div className="found-left__feature-warning">
              <span className="found-left__feature-warning-icon">!</span>
              <p className="found-left__feature-warning-text">색상, 브랜드, 재질, 형태 중 3가지 이상 적어주세요.</p>
            </div>
          )}
          <p className="found-left__hint">등록된 사진 바탕으로 AI가 자동으로 인식한 물건이에요</p>
        </section>

        <section className="found-left__section">
          <h2 className="found-left__section-title">{timeSectionTitle}</h2>
          <button
            type="button"
            className={`found-left__field${showErrors && !timeRange ? ' found-left__field--error' : ''}${readOnly ? ' found-left__field--readonly' : ''}`}
            onClick={() => !readOnly && setTimeSheetOpen(true)}
          >
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
            className={`found-left__location-row${showErrors && !location ? ' found-left__location-row--error' : ''}${readOnly ? ' found-left__location-row--readonly' : ''}`}
            onClick={() => !readOnly && navigate(locationRoute)}
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
            <button type="button" className="found-left__next" onClick={handleNext}>
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

      {isMismatchOpen && (
        <div className="found-left__mismatch-overlay" onClick={() => setMismatchOpen(false)}>
          <div className="found-left__mismatch-dialog" onClick={(event) => event.stopPropagation()}>
            <img src={iconRetry} alt="" className="found-left__mismatch-icon" />
            <p className="found-left__mismatch-title">
              같은 물건의 사진인지
              <br />
              확인해주세요
            </p>
            <p className="found-left__mismatch-desc">
              서로 다른 물건의 사진이 함께
              <br />
              선택되어 있어요.
            </p>
            <button type="button" className="found-left__mismatch-submit" onClick={() => setMismatchOpen(false)}>
              다시 선택하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
