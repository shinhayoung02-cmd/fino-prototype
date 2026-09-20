import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconClose from '../../assets/lost-register/icon-close.svg'
import iconClock from '../../assets/lost-register/icon-clock.svg'
import iconChevronRight from '../../assets/lost-register/icon-chevron-right.svg'
import { AttachmentField, AttachmentInputPreset } from '../../../seed-design/ui/attachment-field'
import { ProgressCircle } from '../../../seed-design/ui/progress-circle'
import { ITEM_PROFILES } from '../../data/itemProfiles'
import TimeRangeSheet from './TimeRangeSheet'
import FeatureSheet from './FeatureSheet'
import './LostItemRegister.css'

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

const PHOTO_OPTIONS = ['wallet-normal', 'airpods', 'car-key'].map(buildPhotoOption)

const MAX_PHOTOS = 5
const AI_RECOGNITION_DELAY = 1200

export default function LostItemRegister({ draft, onDraftChange }) {
  const navigate = useNavigate()

  const { photos, name, description, timeRange, location } = draft

  const [isTimeSheetOpen, setTimeSheetOpen] = useState(false)
  const [isFeatureSheetOpen, setFeatureSheetOpen] = useState(false)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [pickedPhotoOption, setPickedPhotoOption] = useState(null)

  const setName = (value) => onDraftChange({ ...draft, name: value })
  const setDescription = (value) => onDraftChange({ ...draft, description: value })

  const handlePhotosChange = (nextPhotos) => {
    onDraftChange({ ...draft, photos: nextPhotos })
  }

  useEffect(() => {
    if (!pickedPhotoOption) return

    setIsRecognizing(true)
    const timer = setTimeout(() => {
      onDraftChange((prev) => ({
        ...prev,
        name: pickedPhotoOption.aiName,
        description: pickedPhotoOption.aiDesc,
        itemKey: pickedPhotoOption.itemKey,
      }))
      setIsRecognizing(false)
    }, AI_RECOGNITION_DELAY)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedPhotoOption])

  const handleConfirmTime = (range) => {
    onDraftChange({ ...draft, timeRange: range })
  }

  const handleConfirmFeatures = () => {
    navigate('/lost/new/next')
  }

  const isNextEnabled = name.trim().length > 0 && description.trim().length > 0 && timeRange !== null

  const handleNext = () => {
    if (!isNextEnabled) return
    setFeatureSheetOpen(true)
  }

  return (
    <div className="lost-register">
      <div className="lost-register__scroll">
        <section className="lost-register__section">
          <AttachmentField
            label="사진을 등록해주세요"
            labelClassName="lost-register__photo-label"
            indicator="선택 사항"
            maxFiles={MAX_PHOTOS}
            accept="image/*"
            acceptedFileEntries={photos}
            onAcceptedFileEntriesChange={handlePhotosChange}
          >
            <AttachmentInputPreset
              pickerOptions={PHOTO_OPTIONS}
              onPick={setPickedPhotoOption}
              triggerClassName="lost-register__photo-trigger"
              countClassName="lost-register__photo-count"
            />
          </AttachmentField>
        </section>

        <section className="lost-register__section">
          <h2 className="lost-register__section-title">물건 정보를 입력해주세요</h2>
          <div className="lost-register__field-group">
            <div className="lost-register__field">
              <input
                type="text"
                className="lost-register__field-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="물건 이름을 입력해주세요"
              />
              {name && (
                <button
                  type="button"
                  className="lost-register__field-clear"
                  aria-label="지우기"
                  onClick={() => setName('')}
                >
                  <img src={iconClose} alt="" />
                </button>
              )}
            </div>
            <div className="lost-register__field">
              <input
                type="text"
                className="lost-register__field-input"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="상세 설명을 입력해주세요 (색상, 브랜드, 특징 등)"
              />
              {description && (
                <button
                  type="button"
                  className="lost-register__field-clear"
                  aria-label="지우기"
                  onClick={() => setDescription('')}
                >
                  <img src={iconClose} alt="" />
                </button>
              )}
            </div>
          </div>
          <p className="lost-register__hint">등록된 사진 바탕으로 AI가 자동으로 인식한 물건이에요</p>
        </section>

        <section className="lost-register__section">
          <h2 className="lost-register__section-title">분실 시각은 언제인가요?</h2>
          <button type="button" className="lost-register__field" onClick={() => setTimeSheetOpen(true)}>
            <img src={iconClock} alt="" className="lost-register__field-prefix-icon" />
            <span
              className={`lost-register__field-text${timeRange ? '' : ' lost-register__field-text--placeholder'}`}
            >
              {timeRange
                ? `${timeRange.month} ${timeRange.day} · ${timeRange.hour} ${timeRange.minute}`
                : '시간을 선택해주세요'}
            </span>
          </button>
          <p className="lost-register__hint">분실한 시간을 선택해 주세요</p>
        </section>

        <section className="lost-register__section">
          <h2 className="lost-register__section-title">분실 위치는 어디인가요?</h2>
          <button
            type="button"
            className="lost-register__location-row"
            onClick={() => navigate('/lost/new/location')}
          >
            <span className="lost-register__location-text">
              <span className="lost-register__location-title">
                {location ? `${location.address} · ${location.radius}` : '위치 및 범위 선택하기'}
              </span>
              <span className="lost-register__location-desc">
                {location ? location.detail : '지도에서 발견 위치를 선택해요'}
              </span>
            </span>
            <img src={iconChevronRight} alt="" className="lost-register__location-chevron" />
          </button>
        </section>

        <div className="lost-register__next-wrap">
          <button
            type="button"
            className="lost-register__next"
            disabled={!isNextEnabled}
            onClick={handleNext}
          >
            다음
          </button>
        </div>
      </div>

      <TimeRangeSheet
        isOpen={isTimeSheetOpen}
        onClose={() => setTimeSheetOpen(false)}
        onConfirm={handleConfirmTime}
      />

      <FeatureSheet
        isOpen={isFeatureSheetOpen}
        onClose={() => setFeatureSheetOpen(false)}
        onConfirm={handleConfirmFeatures}
      />

      {isRecognizing && (
        <div className="lost-register__ai-overlay">
          <ProgressCircle size="40" tone="neutral" />
        </div>
      )}
    </div>
  )
}
