import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapBg from '../../assets/location-picker/map-bg.png'
import radiusCircle from '../../assets/location-picker/radius-circle.svg'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import iconToggleSearch from '../../assets/location-picker/icon-toggle-search.svg'
import iconLocate from '../../assets/location-picker/icon-locate.svg'
import pinHalo from '../../assets/home/pin-halo.svg'
import pinBody from '../../assets/home/pin-body.svg'
import { ProgressCircle } from '../../../seed-design/ui/progress-circle'
import './LocationPicker.css'

const RADIUS_OPTIONS = ['500m', '100m', '동네 전체']
const RADIUS_SCALE = { '500m': 1, '100m': 0.45, '동네 전체': 1.6 }

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="location-picker__pin-icon" aria-hidden="true">
      <path
        d="M10 1.5c-3.31 0-6 2.69-6 6 0 4.5 6 11 6 11s6-6.5 6-11c0-3.31-2.69-6-6-6Zm0 8.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z"
        fill="#1a1c20"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="location-picker__search-icon" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" stroke="#1a1c20" strokeWidth="1.6" />
      <line x1="13.6" y1="13.6" x2="18" y2="18" stroke="#1a1c20" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default function LocationPicker({ value, onConfirm, backTo = '/lost/new', type = 'lost' }) {
  const navigate = useNavigate()
  const [searchMode, setSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [radius, setRadius] = useState(value?.radius ?? '500m')
  const [isAreaSearching, setIsAreaSearching] = useState(false)
  const [confirmedQuery, setConfirmedQuery] = useState(null)

  const radiusLabel = type === 'lost' ? '분실 반경' : type === 'discovered' ? '발견 반경' : '습득 반경'
  const radiusHint =
    type === 'lost'
      ? '분실 위치가 정확할수록 매칭에 도움이 돼요.'
      : type === 'discovered'
        ? '발견 위치가 정확할수록 매칭에 도움이 돼요.'
        : '습득 위치가 정확할수록 매칭에 도움이 돼요.'

  const handleConfirm = () => {
    onConfirm({ address: '서울 마포구 서교동', detail: '홍대입구역 9번 출구 인근', radius })
    navigate(backTo)
  }

  const showSearchAreaBtn = searchMode && searchQuery.trim().length > 0

  const handleSearchThisArea = () => {
    const query = searchQuery.trim()
    setIsAreaSearching(true)
    setTimeout(() => {
      setIsAreaSearching(false)
      setSearchMode(false)
      setSearchQuery('')
      setConfirmedQuery(query)
    }, 2000)
  }

  return (
    <div className="location-picker">
      {searchMode && (
        <div className="location-picker__search-header">
          <div className="location-picker__search-field">
            <input
              type="text"
              className="location-picker__search-input"
              placeholder="장소, 주소를 검색해보세요"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                className="location-picker__search-clear"
                aria-label="지우기"
                onClick={() => setSearchQuery('')}
              >
                <img src={iconRemoveCircle} alt="" />
              </button>
            )}
          </div>
          <button
            type="button"
            className="location-picker__cancel"
            onClick={() => {
              setSearchMode(false)
              setSearchQuery('')
            }}
          >
            취소
          </button>
        </div>
      )}

      <div className="location-picker__map">
        {!searchMode && (
          <div className="location-picker__callout">
            <LocationPinIcon />
            <p className="location-picker__callout-text">
              {confirmedQuery ? (
                <>
                  지도에서 선택한 위치가 <strong>&lsquo;{confirmedQuery}&rsquo;</strong>에 있어요
                </>
              ) : (
                <>
                  현재 위치가 내 동네로 설정한 <strong>&lsquo;서교동&rsquo;</strong>에 있어요
                </>
              )}
            </p>
          </div>
        )}
        <img src={mapBg} alt="지도" className="location-picker__map-img" />
        <img
          src={radiusCircle}
          alt=""
          className="location-picker__radius"
          style={{ transform: `translate(-50%, -50%) scale(${RADIUS_SCALE[radius]})` }}
        />
        <div className="location-picker__pin">
          <img src={pinHalo} alt="" className="location-picker__pin-halo" />
          <img src={pinBody} alt="" className="location-picker__pin-body" />
          <span className="location-picker__pin-center" />
        </div>

        {showSearchAreaBtn && (
          <button type="button" className="location-picker__search-area-btn" onClick={handleSearchThisArea}>
            <img src={iconToggleSearch} alt="" />이 지역 검색하기
          </button>
        )}

        {isAreaSearching && (
          <div className="location-picker__area-loading">
            <ProgressCircle size="40" tone="brand" />
          </div>
        )}

        <div className="location-picker__controls">
          <button
            type="button"
            className="location-picker__control-btn"
            aria-label="장소 검색"
            onClick={() => setSearchMode(true)}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            className="location-picker__control-btn"
            aria-label="내 위치로 이동"
          >
            <img src={iconLocate} alt="" />
          </button>
        </div>
      </div>

      <div className="location-picker__sheet">
        <div className="location-picker__address">
          <LocationPinIcon />
          <div className="location-picker__address-text">
            <p className="location-picker__address-title">서울 마포구 서교동</p>
            <p className="location-picker__address-desc">홍대입구역 9번 출구 인근</p>
          </div>
        </div>

        <div className="location-picker__radius-section">
          <p className="location-picker__radius-label">{radiusLabel}</p>
          <div className="location-picker__segmented">
            {RADIUS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className={`location-picker__segment${radius === option ? ' location-picker__segment--active' : ''}`}
                onClick={() => setRadius(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="location-picker__radius-hint">{radiusHint}</p>
        </div>

        <button type="button" className="location-picker__confirm" onClick={handleConfirm}>
          선택 완료
        </button>
      </div>
    </div>
  )
}
