import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cameraPhoto from '../../assets/found-camera/camera-photo.png'
import flashCircleBg from '../../assets/found-camera/flash-circle-bg.svg'
import iconFlash from '../../assets/found-camera/icon-flash.svg'
import cameraOffCircleBg from '../../assets/found-camera/camera-off-circle-bg.svg'
import cameraOffSlash from '../../assets/found-camera/camera-off-slash.svg'
import collapseCircleBg from '../../assets/found-camera/collapse-circle-bg.svg'
import iconCollapseChevron from '../../assets/found-camera/icon-collapse-chevron.svg'
import cornerBracketA from '../../assets/found-camera/corner-bracket-a.svg'
import cornerBracketB from '../../assets/found-camera/corner-bracket-b.svg'
import zoomDotOutline from '../../assets/found-camera/zoom-dot-outline.svg'
import zoomDotActive from '../../assets/found-camera/zoom-dot-active.svg'
import iconMountainThumb from '../../assets/found-camera/icon-mountain-thumb.svg'
import iconShutter from '../../assets/found-camera/icon-shutter.svg'
import iconCameraFlip from '../../assets/found-camera/icon-camera-flip.svg'
import iconScanner from '../../assets/found-report/icon-scanner.svg'
import GalleryPickerSheet from './GalleryPickerSheet'
import './FoundItemCamera.css'

const CORNERS = [
  { id: 'tl', src: cornerBracketA, style: { left: 1, top: 82, transform: 'rotate(180deg) scaleX(-1)' } },
  { id: 'tr', src: cornerBracketB, style: { left: 377, top: 82, transform: 'rotate(180deg)' } },
  { id: 'bl', src: cornerBracketA, style: { left: 1, top: 550 } },
  { id: 'br', src: cornerBracketB, style: { left: 377, top: 550, transform: 'scaleX(-1)' } },
]

const MODES = [
  { id: 'cinematic', label: 'Cinematic', variant: 'fade-in' },
  { id: 'video', label: 'Video' },
  { id: 'photo', label: 'Photo', variant: 'active' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'pano', label: 'Pano', variant: 'fade-out' },
]

const VERIFY_CLOSE_DELAY = 3000

export default function FoundItemCamera({
  nextPath = '/found/new/main',
  restrictedPath = '/found/new/restricted',
  onRecognized,
  onRestrictedRecognized,
}) {
  const navigate = useNavigate()
  const [isVerifyingOpen, setVerifyingOpen] = useState(false)
  const [isGalleryOpen, setGalleryOpen] = useState(false)
  const [selectedThumb, setSelectedThumb] = useState(null)

  useEffect(() => {
    if (!isVerifyingOpen) return undefined

    const timer = setTimeout(() => {
      setVerifyingOpen(false)
      if (selectedThumb?.restricted) onRestrictedRecognized?.(selectedThumb)
      else if (selectedThumb) onRecognized?.(selectedThumb)
      navigate(selectedThumb?.restricted ? restrictedPath : nextPath)
    }, VERIFY_CLOSE_DELAY)
    return () => clearTimeout(timer)
  }, [isVerifyingOpen, navigate, nextPath, onRecognized, onRestrictedRecognized, restrictedPath, selectedThumb])

  return (
    <div className="found-camera">
      <img src={cameraPhoto} alt="" className="found-camera__bg" />
      <div className="found-camera__top-scrim" />
      <div className="found-camera__bottom-scrim" />

      <span className="found-camera__chip" style={{ left: 11, top: 40, width: 26, height: 26 }}>
        <img src={flashCircleBg} alt="" className="found-camera__chip-bg" />
        <img src={iconFlash} alt="" className="found-camera__chip-glyph" style={{ width: 11, height: 19 }} />
      </span>
      <span
        className="found-camera__chip"
        style={{ left: '50%', top: 38, width: 28, height: 28, transform: 'translateX(-50%)' }}
      >
        <img src={cameraOffCircleBg} alt="" className="found-camera__chip-bg" />
        <img
          src={cameraOffSlash}
          alt=""
          className="found-camera__chip-glyph"
          style={{ width: 9, height: 9, transform: 'rotate(45deg)' }}
        />
      </span>
      <span className="found-camera__chip" style={{ right: 11, top: 40, width: 29, height: 29 }}>
        <img src={collapseCircleBg} alt="" className="found-camera__chip-bg" />
        <img src={iconCollapseChevron} alt="" className="found-camera__chip-glyph" style={{ width: 20, height: 20 }} />
      </span>

      {CORNERS.map((corner) => (
        <img
          key={corner.id}
          src={corner.src}
          alt=""
          className="found-camera__corner"
          style={corner.style}
        />
      ))}

      <div className="found-camera__zoom-pill">
        <span className="found-camera__zoom-dot">
          <img src={zoomDotOutline} alt="" />
          <em>.5</em>
        </span>
        <span className="found-camera__zoom-dot found-camera__zoom-dot--active">
          <img src={zoomDotActive} alt="" />
          <em>1x</em>
        </span>
        <span className="found-camera__zoom-dot">
          <img src={zoomDotOutline} alt="" />
          <em>3</em>
        </span>
      </div>

      <div className="found-camera__mode-row">
        {MODES.map((mode) => (
          <span key={mode.id} className={`found-camera__mode${mode.variant ? ` found-camera__mode--${mode.variant}` : ''}`}>
            {mode.label}
          </span>
        ))}
      </div>

      <div className="found-camera__controls-row">
        <button
          type="button"
          className="found-camera__thumb"
          onClick={() => setGalleryOpen(true)}
          aria-label="최근 항목"
        >
          {selectedThumb ? (
            <img src={selectedThumb.url} alt="" className="found-camera__thumb-photo" />
          ) : (
            <img src={iconMountainThumb} alt="" />
          )}
        </button>
        <button
          type="button"
          className="found-camera__shutter-btn"
          onClick={() => setVerifyingOpen(true)}
          aria-label="촬영"
        >
          <img src={iconShutter} alt="" className="found-camera__shutter" />
        </button>
        <img src={iconCameraFlip} alt="" className="found-camera__flip" />
      </div>

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

      {isGalleryOpen && (
        <GalleryPickerSheet
          onClose={() => setGalleryOpen(false)}
          onSelect={(option) => {
            setSelectedThumb(option)
            setGalleryOpen(false)
          }}
        />
      )}
    </div>
  )
}
