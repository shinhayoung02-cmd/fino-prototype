import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapBg from '../../assets/location-picker/map-bg.png'
import radiusCircle from '../../assets/location-picker/radius-circle.svg'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import iconToggleSearch from '../../assets/location-picker/icon-toggle-search.svg'
import iconLocate from '../../assets/location-picker/icon-locate.svg'
import iconAddChip from '../../assets/ai-matching/icon-add-chip.svg'
import pinHalo from '../../assets/home/pin-halo.svg'
import pinBody from '../../assets/home/pin-body.svg'
import { MATCH_CANDIDATES } from './matchCandidates'
import './InPersonLocationPicker.css'

const candidate = MATCH_CANDIDATES[0]

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="meetup-location-picker__pin-icon" aria-hidden="true">
      <path
        d="M10 1.5c-3.31 0-6 2.69-6 6 0 4.5 6 11 6 11s6-6.5 6-11c0-3.31-2.69-6-6-6Zm0 8.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z"
        fill="#1a1c20"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="meetup-location-picker__search-icon" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" stroke="#1a1c20" strokeWidth="1.6" />
      <line x1="13.6" y1="13.6" x2="18" y2="18" stroke="#1a1c20" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default function InPersonLocationPicker({ value, onConfirm, backTo }) {
  const navigate = useNavigate()
  const [searchMode, setSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [address, setAddress] = useState(value?.length ? value[value.length - 1] : candidate.location)
  const [locations, setLocations] = useState(value ?? [])

  const commitSearch = () => {
    const trimmed = searchQuery.trim()
    if (!trimmed) return
    setAddress(trimmed)
    setSearchMode(false)
    setSearchQuery('')
  }

  const handleAddLocation = () => {
    const trimmed = address.trim()
    if (!trimmed || locations.includes(trimmed)) return
    setLocations((prev) => [...prev, trimmed])
  }

  const handleRemoveLocation = (loc) => {
    setLocations((prev) => prev.filter((item) => item !== loc))
  }

  const handleConfirm = () => {
    onConfirm?.(locations)
    navigate(backTo)
  }

  const showSearchAreaBtn = searchMode && searchQuery.trim().length > 0

  return (
    <div className="meetup-location-picker">
      {searchMode && (
        <div className="meetup-location-picker__search-header">
          <div className="meetup-location-picker__search-field">
            <input
              type="text"
              className="meetup-location-picker__search-input"
              placeholder="장소, 주소를 검색해보세요"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') commitSearch()
              }}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                className="meetup-location-picker__search-clear"
                aria-label="지우기"
                onClick={() => setSearchQuery('')}
              >
                <img src={iconRemoveCircle} alt="" />
              </button>
            )}
          </div>
          <button
            type="button"
            className="meetup-location-picker__cancel"
            onClick={() => {
              setSearchMode(false)
              setSearchQuery('')
            }}
          >
            취소
          </button>
        </div>
      )}

      <div className="meetup-location-picker__map">
        {!searchMode && (
          <div className="meetup-location-picker__callout">
            <LocationPinIcon />
            <p className="meetup-location-picker__callout-text">
              현재 위치가 내 동네로 설정한 <strong>&lsquo;서교동&rsquo;</strong>에 있어요
            </p>
          </div>
        )}
        <img src={mapBg} alt="지도" className="meetup-location-picker__map-img" />
        <img src={radiusCircle} alt="" className="meetup-location-picker__radius" />
        <div className="meetup-location-picker__pin">
          <img src={pinHalo} alt="" className="meetup-location-picker__pin-halo" />
          <img src={pinBody} alt="" className="meetup-location-picker__pin-body" />
        </div>

        {showSearchAreaBtn && (
          <button type="button" className="meetup-location-picker__search-area-btn" onClick={commitSearch}>
            <img src={iconToggleSearch} alt="" />이 지역 검색하기
          </button>
        )}

        <div className="meetup-location-picker__controls">
          <button type="button" className="meetup-location-picker__control-btn" aria-label="내 위치로 이동">
            <img src={iconLocate} alt="" />
          </button>
          <button
            type="button"
            className="meetup-location-picker__control-btn"
            aria-label="장소 검색"
            onClick={() => setSearchMode(true)}
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="meetup-location-picker__sheet">
        <div className="meetup-location-picker__address">
          <LocationPinIcon />
          <div className="meetup-location-picker__address-text">
            <p className="meetup-location-picker__address-title">{address}</p>
          </div>
        </div>

        <div className="meetup-location-picker__input-section">
          <p className="meetup-location-picker__input-label">입력한 장소</p>
          <div className="meetup-location-picker__input-row">
            <p className="meetup-location-picker__input-value">{address}</p>
            <button type="button" className="meetup-location-picker__add-btn" onClick={handleAddLocation}>
              추가
              <img src={iconAddChip} alt="" className="meetup-location-picker__add-btn-icon" />
            </button>
          </div>

          {locations.length > 0 && (
            <div className="meetup-location-picker__chip-row">
              {locations.map((loc) => (
                <span className="meetup-location-picker__chip" key={loc}>
                  {loc}
                  <button
                    type="button"
                    className="meetup-location-picker__chip-remove"
                    aria-label={`${loc} 삭제`}
                    onClick={() => handleRemoveLocation(loc)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <p className="meetup-location-picker__input-hint">
            지도에서 검색하고 추가를 눌러 만남 장소를 여러 곳 담을 수 있어요.
          </p>
        </div>

        <button
          type="button"
          className="meetup-location-picker__confirm"
          disabled={locations.length === 0}
          onClick={handleConfirm}
        >
          선택 완료
        </button>
      </div>
    </div>
  )
}
