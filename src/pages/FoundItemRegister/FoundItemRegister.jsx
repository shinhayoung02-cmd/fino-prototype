import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconClock from '../../assets/lost-register/icon-clock.svg'
import iconSun from '../../assets/found-report/icon-sun.svg'
import iconScanner from '../../assets/found-report/icon-scanner.svg'
import iconPhoto from '../../assets/lost-register/icon-material-photo-library.svg'
import iconCamera from '../../assets/lost-register/icon-material-photo-camera.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import { GalleryGrid, GalleryMismatchNotice, resolveSelectedProfile } from '../FoundItemCamera/GalleryPickerSheet'
import '../FoundItemCamera/FoundItemCamera.css'
import './FoundItemRegister.css'

const CAMERA_TIPS = [
  { id: 'light', icon: iconSun, title: '밝은 곳에서 촬영해주세요.', desc: '밝은 곳에 배치하고 그림자를 피하세요' },
  { id: 'distance', icon: iconScanner, title: '거리를 유지해주세요.', desc: '휴대폰을 12~18인치 떨어진 곳에 고정해주세요' },
  { id: 'wait', icon: iconClock, title: '잠시만 기다려 주세요.', desc: '1-2초만 기다려주세요' },
]

const VERIFY_CLOSE_DELAY = 3000

export default function FoundItemRegister({ onRecognized, onRestrictedRecognized }) {
  const navigate = useNavigate()
  const [isSourcePickerOpen, setSourcePickerOpen] = useState(false)
  const [sourcePickerStep, setSourcePickerStep] = useState('source')
  const [isCameraSheetOpen, setCameraSheetOpen] = useState(false)
  const [isVerifyingOpen, setVerifyingOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedIds, setSelectedIds] = useState([])

  const toggleGalleryTile = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const handleGalleryConfirm = () => {
    const result = resolveSelectedProfile(selectedIds)
    if (!result) {
      setSourcePickerStep('mismatch')
      return
    }
    setSourcePickerOpen(false)
    setSelectedPhoto({
      itemKey: result.itemKey,
      url: result.profile.photo,
      restricted: result.profile.restricted,
      category: result.profile.category,
      description: result.profile.description,
    })
    setSelectedIds([])
    setVerifyingOpen(true)
  }

  const handleGalleryReselect = () => {
    setSelectedIds([])
    setSourcePickerStep('gallery')
  }

  useEffect(() => {
    if (!isVerifyingOpen) return undefined

    const timer = setTimeout(() => {
      setVerifyingOpen(false)
      if (selectedPhoto?.restricted) onRestrictedRecognized?.(selectedPhoto)
      else if (selectedPhoto) onRecognized?.(selectedPhoto)
      navigate(selectedPhoto?.restricted ? '/found/new/restricted' : '/found/new/main')
    }, VERIFY_CLOSE_DELAY)
    return () => clearTimeout(timer)
  }, [isVerifyingOpen, navigate, onRecognized, onRestrictedRecognized, selectedPhoto])

  return (
    <div className="found-item-register">
      <div className="found-item-register__body">
        <span className="found-item-register__badge">습득물 확인중</span>
        <h2 className="found-item-register__title">
          사진과 위치만으로
          <br />
          빠르게 등록할 수 있어요
        </h2>
        <p className="found-item-register__subtitle">상세한 글 작성 없이 빠르게 등록할 수 있어요</p>

        <div className="found-item-register__callout">
          <img src={iconInfo} alt="" className="found-item-register__callout-icon" />
          <p className="found-item-register__callout-text">물건의 정면·뒷면이 잘 보이는 사진을 등록해주세요</p>
        </div>
      </div>

      <div className="found-item-register__bottom">
        <p className="found-item-register__hard-link">사진 촬영이 어려워요</p>
        <button
          type="button"
          className="found-item-register__next"
          onClick={() => {
            setSourcePickerStep('source')
            setSelectedIds([])
            setSourcePickerOpen(true)
          }}
        >
          다음 단계로
        </button>
      </div>

      <BottomSheet
        isOpen={isSourcePickerOpen}
        onClose={() => setSourcePickerOpen(false)}
        overlayClassName="source-picker-sheet-overlay"
        title={sourcePickerStep === 'source' ? '연결 프로그램' : sourcePickerStep === 'gallery' ? '최근 항목' : '사진 선택'}
      >
        {sourcePickerStep === 'source' ? (
          <div className="source-picker-sheet__grid">
            <button
              type="button"
              className="source-picker-sheet__item"
              onClick={() => setSourcePickerStep('gallery')}
            >
              <span className="source-picker-sheet__item-icon">
                <img src={iconPhoto} alt="" />
              </span>
              <span className="source-picker-sheet__item-label">사진</span>
            </button>
            <button
              type="button"
              className="source-picker-sheet__item"
              onClick={() => {
                setSourcePickerOpen(false)
                setCameraSheetOpen(true)
              }}
            >
              <span className="source-picker-sheet__item-icon">
                <img src={iconCamera} alt="" />
              </span>
              <span className="source-picker-sheet__item-label">카메라</span>
            </button>
          </div>
        ) : sourcePickerStep === 'gallery' ? (
          <>
            <GalleryGrid selectedIds={selectedIds} onToggle={toggleGalleryTile} />
            {selectedIds.length > 0 && (
              <button type="button" className="found-camera__gallery-confirm" onClick={handleGalleryConfirm}>
                선택 완료 ({selectedIds.length})
              </button>
            )}
          </>
        ) : (
          <GalleryMismatchNotice onReselect={handleGalleryReselect} />
        )}
      </BottomSheet>

      <BottomSheet isOpen={isCameraSheetOpen} onClose={() => setCameraSheetOpen(false)}>
        <div className="camera-permission-sheet__header">
          <p className="camera-permission-sheet__title">카메라 접근 허용이 필요해요</p>
          <p className="camera-permission-sheet__desc">AI가 자동으로 인식하려면 카메라 엑세스가 필요합니다</p>
        </div>
        <div className="camera-permission-sheet__footer">
          <div className="camera-permission-sheet__list">
            {CAMERA_TIPS.map((tip) => (
              <div className="camera-permission-sheet__item" key={tip.id}>
                <img src={tip.icon} alt="" className="camera-permission-sheet__item-icon" />
                <div className="camera-permission-sheet__item-body">
                  <p className="camera-permission-sheet__item-title">{tip.title}</p>
                  <p className="camera-permission-sheet__item-desc">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="camera-permission-sheet__submit"
            onClick={() => {
              setCameraSheetOpen(false)
              navigate('/found/new/camera')
            }}
          >
            카메라 액세스 활성화
          </button>
        </div>
      </BottomSheet>

      {isVerifyingOpen && (
        <div className="found-camera__verify-overlay" onClick={() => setVerifyingOpen(false)}>
          <div className="found-camera__verify-dialog" onClick={(event) => event.stopPropagation()}>
            <img src={iconScanner} alt="" className="found-camera__verify-icon" />
            <p className="found-camera__verify-title">사진을 확인하고 있어요</p>
            <p className="found-camera__verify-desc">
              신분증, 금융카드,
              <br />
              고액 현금 여부를 확인 중입니다
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
