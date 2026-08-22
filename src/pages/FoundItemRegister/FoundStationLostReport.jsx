import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import lost112Receipt from '../../assets/found-report/samples/lost112-receipt.png'
import lost112Photo from '../../assets/found-report/samples/lost112-photo.png'
import { AttachmentField, AttachmentInputPreset } from '../../../seed-design/ui/attachment-field'
import './FoundStationLostReport.css'

const SAMPLE_PHOTOS = [
  { url: lost112Photo, name: 'lost112-photo.png' },
  { url: lost112Receipt, name: 'lost112-receipt.png' },
]

const MAX_PHOTOS = 10

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

  const setLost112Number = (value) => onDraftChange({ ...draft, lost112Number: value })
  const handlePhotosChange = (nextPhotos) => onDraftChange({ ...draft, lost112Photos: nextPhotos })

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
          >
            <AttachmentInputPreset
              samples={SAMPLE_PHOTOS}
              triggerClassName="station-report__photo-trigger"
              countClassName="station-report__photo-count"
            />
          </AttachmentField>
        </section>

        <section className="station-report__section">
          <h2 className="station-report__section-title">LOST112 접수번호를 입력해주세요</h2>
          <div className="station-report__field">
            <input
              type="text"
              className="station-report__field-input"
              value={lost112Number}
              onChange={(event) => setLost112Number(event.target.value)}
              placeholder="예: 2025-123456"
            />
            {lost112Number && (
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
    </div>
  )
}
