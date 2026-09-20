import { useState } from 'react'
import iconRetry from '../../assets/ai-matching/icon-retry.svg'
import { ITEM_PROFILES } from '../../data/itemProfiles'
import './FoundItemCamera.css'

const GALLERY_ITEM_KEYS = ['wallet-normal', 'airpods', 'car-key', 'wallet-restricted', 'bag-restricted']

// 습득자 사진 폴더의 앞/뒷면 사진을 모두 개별 선택 타일로 노출
export const GALLERY_TILES = GALLERY_ITEM_KEYS.flatMap((itemKey) => {
  const profile = ITEM_PROFILES[itemKey]
  return [
    { id: `${itemKey}-front`, url: profile.photo, itemKey },
    { id: `${itemKey}-back`, url: profile.photoBack, itemKey },
  ]
})

// 선택된 타일들이 전부 같은 물건(itemKey)인 경우에만 프로필을 반환, 아니면 null(불일치)
export function resolveSelectedProfile(selectedIds) {
  const itemKeys = new Set(
    GALLERY_TILES.filter((tile) => selectedIds.includes(tile.id)).map((tile) => tile.itemKey),
  )
  if (itemKeys.size !== 1) return null
  const itemKey = [...itemKeys][0]
  return { itemKey, profile: ITEM_PROFILES[itemKey] }
}

export function GalleryGrid({ selectedIds, onToggle }) {
  return (
    <div className="found-camera__gallery-grid">
      {GALLERY_TILES.map((tile) => {
        const isSelected = selectedIds.includes(tile.id)
        return (
          <button
            key={tile.id}
            type="button"
            className="found-camera__gallery-item"
            onClick={() => onToggle(tile.id)}
          >
            <img src={tile.url} alt="" />
            {selectedIds.length > 0 && !isSelected && <span className="found-camera__gallery-item-dim" />}
            <span
              className={`found-camera__gallery-item-check${isSelected ? ' found-camera__gallery-item-check--selected' : ''}`}
            >
              {isSelected && '✓'}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function GalleryMismatchNotice({ onReselect }) {
  return (
    <div className="found-camera__mismatch">
      <img src={iconRetry} alt="" className="found-camera__mismatch-icon" />
      <p className="found-camera__mismatch-title">
        같은 물건의 사진인지
        <br />
        확인해주세요
      </p>
      <p className="found-camera__mismatch-desc">
        서로 다른 물건의 사진이 함께
        <br />
        선택되어 있어요.
      </p>
      <button type="button" className="found-camera__mismatch-submit" onClick={onReselect}>
        다시 선택하기
      </button>
    </div>
  )
}

export default function GalleryPickerSheet({ onClose, onSelect }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [step, setStep] = useState('grid')

  const toggle = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const handleConfirm = () => {
    const result = resolveSelectedProfile(selectedIds)
    if (!result) {
      setStep('mismatch')
      return
    }
    onSelect({
      itemKey: result.itemKey,
      url: result.profile.photo,
      restricted: result.profile.restricted,
      category: result.profile.category,
      description: result.profile.description,
    })
  }

  const handleReselect = () => {
    setSelectedIds([])
    setStep('grid')
  }

  return (
    <>
      <div className="found-camera__gallery-scrim" onClick={onClose} />
      <div className="found-camera__gallery-sheet" role="dialog" aria-label="사진 선택">
        <div className="found-camera__gallery-handle-row">
          <span className="found-camera__gallery-handle" />
        </div>
        <div className="found-camera__gallery-header">
          <span className="found-camera__gallery-title">최근 항목</span>
          <button type="button" className="found-camera__gallery-cancel" onClick={onClose}>
            취소
          </button>
        </div>
        <div className="found-camera__gallery-body">
          {step === 'grid' ? (
            <>
              <p className="found-camera__gallery-date">오늘</p>
              <GalleryGrid selectedIds={selectedIds} onToggle={toggle} />
              {selectedIds.length > 0 && (
                <button type="button" className="found-camera__gallery-confirm" onClick={handleConfirm}>
                  선택 완료 ({selectedIds.length})
                </button>
              )}
            </>
          ) : (
            <GalleryMismatchNotice onReselect={handleReselect} />
          )}
        </div>
      </div>
    </>
  )
}
