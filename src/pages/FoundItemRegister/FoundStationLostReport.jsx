import { useEffect, useState } from 'react'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import iconInfo from '../../assets/lost-register/icon-info-blue.svg'
import lost112Receipt from '../../assets/found-report/samples/lost112-receipt.png'
import lost112Photo from '../../assets/found-report/samples/lost112-photo.png'
import { AttachmentField, AttachmentInputPreset } from '../../../seed-design/ui/attachment-field'
import { ProgressCircle } from '../../../seed-design/ui/progress-circle'
import './FoundStationLostReport.css'

const PHOTO_OPTIONS = [
  { label: '조회 화면', url: lost112Photo, name: 'lost112-photo.png', receiptNumber: '2026-034821' },
  { label: '접수증', url: lost112Receipt, name: 'lost112-receipt.png', receiptNumber: '2026-102394' },
]

const MAX_PHOTOS = 10
const AI_RECOGNITION_DELAY = 1200
const LOST112_NUMBER_PATTERN = /^\d{4}-\d{6}$/

export default function FoundStationLostReport({
  draft,
  onDraftChange,
  onPrev,
  onRegister,
  mode = 'edit',
  onEdit,
  onGoHome,
}) {
  const { lost112Photos = [], lost112Number } = draft
  const readOnly = mode === 'review'

  const [isRecognizing, setIsRecognizing] = useState(false)
  const [pickedPhotoOption, setPickedPhotoOption] = useState(null)
  const [autoFilledNumber, setAutoFilledNumber] = useState('')

  const setLost112Number = (value) => {
    if (value !== autoFilledNumber) setAutoFilledNumber('')
    onDraftChange({ ...draft, lost112Number: value })
  }
  const handlePhotosChange = (nextPhotos) => onDraftChange({ ...draft, lost112Photos: nextPhotos })

  useEffect(() => {
    if (!pickedPhotoOption) return

    setIsRecognizing(true)
    const timer = setTimeout(() => {
      onDraftChange((prev) => ({ ...prev, lost112Number: pickedPhotoOption.receiptNumber }))
      setAutoFilledNumber(pickedPhotoOption.receiptNumber)
      setIsRecognizing(false)
    }, AI_RECOGNITION_DELAY)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedPhotoOption])

  const showAutoFillBanner = lost112Number !== '' && lost112Number === autoFilledNumber
  const showFormatWarning =
    !showAutoFillBanner && lost112Number.trim().length > 0 && !LOST112_NUMBER_PATTERN.test(lost112Number.trim())

  return (
    <div className="station-report">
      <div className="station-report__scroll">
        <section className="station-report__section">
          <AttachmentField
            label="사진을 등록해주세요"
            labelClassName="station-report__photo-label"
            maxFiles={MAX_PHOTOS}
            accept="image/*"
            acceptedFileEntries={lost112Photos}
            onAcceptedFileEntriesChange={handlePhotosChange}
            disabled={readOnly}
          >
            <AttachmentInputPreset
              pickerOptions={PHOTO_OPTIONS}
              onPick={setPickedPhotoOption}
              triggerClassName="station-report__photo-trigger"
              countClassName="station-report__photo-count"
              disabled={readOnly}
            />
          </AttachmentField>
        </section>

        <section className="station-report__section">
          <h2 className="station-report__section-title">LOST112 접수번호를 입력해주세요</h2>
          <div className={`station-report__field${readOnly ? ' station-report__field--readonly' : ''}`}>
            <input
              type="text"
              className="station-report__field-input"
              value={lost112Number}
              onChange={(event) => setLost112Number(event.target.value)}
              placeholder="예: 2025-123456"
              readOnly={readOnly}
            />
            {lost112Number && !readOnly && (
              <button
                type="button"
                className="station-report__field-clear"
                aria-label="지우기"
                onClick={() => setLost112Number('')}
              >
                <img src={iconRemoveCircle} alt="" />
              </button>
            )}
          </div>
          {showAutoFillBanner && !readOnly && (
            <div className="station-report__number-hint">
              <img src={iconInfo} alt="" className="station-report__number-hint-icon" />
              <p className="station-report__number-hint-text">자동 입력된 접수번호를 확인해주세요.</p>
            </div>
          )}
          {showFormatWarning && !readOnly && (
            <div className="station-report__number-hint">
              <img src={iconInfo} alt="" className="station-report__number-hint-icon" />
              <p className="station-report__number-hint-text">
                접수번호 형식을 확인해주세요. 예: 2025-123456
              </p>
            </div>
          )}
        </section>

        {mode === 'review' ? (
          <div className="station-report__review-actions">
            <button type="button" className="station-report__edit" onClick={onEdit}>
              수정하기
            </button>
            <button type="button" className="station-report__submit" onClick={onGoHome}>
              홈으로
            </button>
          </div>
        ) : (
          <div className="station-report__actions">
            <button type="button" className="station-report__prev" onClick={onPrev}>
              이전
            </button>
            <button type="button" className="station-report__submit" onClick={onRegister}>
              등록하기
            </button>
          </div>
        )}
      </div>

      {isRecognizing && (
        <div className="station-report__ai-overlay">
          <ProgressCircle size="40" tone="neutral" />
        </div>
      )}
    </div>
  )
}
