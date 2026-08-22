import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapBg from '../../assets/location-picker/map-bg.png'
import radiusCircle from '../../assets/location-picker/radius-circle.svg'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import iconToggleSearch from '../../assets/location-picker/icon-toggle-search.svg'
import iconLocate from '../../assets/location-picker/icon-locate.svg'
import iconRadioCheck from '../../assets/found-report/icon-radio-check.svg'
import pinHalo from '../../assets/home/pin-halo.svg'
import pinBody from '../../assets/home/pin-body.svg'
import './FoundStationLocationPicker.css'

const STATIONS = [
  { id: 'seongsu', name: '성수지구대', distance: '1.0km' },
  { id: 'wangsimni', name: '왕십리지구대', distance: '1.2km' },
  { id: 'ttukseom', name: '뚝섬파출소', distance: '1.8km' },
]

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="station-picker__pin-icon" aria-hidden="true">
      <path
        d="M10 1.5c-3.31 0-6 2.69-6 6 0 4.5 6 11 6 11s6-6.5 6-11c0-3.31-2.69-6-6-6Zm0 8.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z"
        fill="#1a1c20"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="station-picker__search-icon" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" stroke="#1a1c20" strokeWidth="1.6" />
      <line x1="13.6" y1="13.6" x2="18" y2="18" stroke="#1a1c20" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default function FoundStationLocationPicker({ value, onConfirm, backTo = '/found/new/station' }) {
  const navigate = useNavigate()
  const [searchMode, setSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [stationId, setStationId] = useState(value?.stationId ?? 'seongsu')

  const visibleStations = searchQuery.trim()
    ? STATIONS.filter((station) => station.name.includes(searchQuery.trim()))
    : STATIONS

  const handleConfirm = () => {
    const station = STATIONS.find((item) => item.id === stationId) ?? STATIONS[0]
    onConfirm({
      stationId: station.id,
      address: station.name,
      radius: station.distance,
      detail: '',
    })
    navigate(backTo)
  }

  const showSearchAreaBtn = searchMode && searchQuery.trim().length > 0

  return (
    <div className="station-picker">
      {searchMode && (
        <div className="station-picker__search-header">
          <div className="station-picker__search-field">
            <input
              type="text"
              className="station-picker__search-input"
              placeholder="장소, 주소를 검색해보세요"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                className="station-picker__search-clear"
                aria-label="지우기"
                onClick={() => setSearchQuery('')}
              >
                <img src={iconRemoveCircle} alt="" />
              </button>
            )}
          </div>
          <button
            type="button"
            className="station-picker__cancel"
            onClick={() => {
              setSearchMode(false)
              setSearchQuery('')
            }}
          >
            취소
          </button>
        </div>
      )}

      <div className="station-picker__map">
        {!searchMode && (
          <div className="station-picker__callout">
            <LocationPinIcon />
            <p className="station-picker__callout-text">
              현재 위치가 내 동네로 설정한 <strong>&lsquo;서교동&rsquo;</strong>에 있어요
            </p>
          </div>
        )}
        <img src={mapBg} alt="지도" className="station-picker__map-img" />
        {searchMode && (
          <img src={radiusCircle} alt="" className="station-picker__radius" style={{ transform: 'translate(-50%, -50%)' }} />
        )}
        <div className="station-picker__pin">
          <img src={pinHalo} alt="" className="station-picker__pin-halo" />
          <img src={pinBody} alt="" className="station-picker__pin-body" />
        </div>

        {showSearchAreaBtn && (
          <button type="button" className="station-picker__search-area-btn">
            <img src={iconToggleSearch} alt="" />이 지역 검색하기
          </button>
        )}

        <div className="station-picker__controls">
          <button type="button" className="station-picker__control-btn" aria-label="내 위치로 이동">
            <img src={iconLocate} alt="" />
          </button>
          <button
            type="button"
            className="station-picker__control-btn"
            aria-label="장소 검색"
            onClick={() => setSearchMode(true)}
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="station-picker__sheet">
        <div className="station-picker__address">
          <LocationPinIcon />
          <div className="station-picker__address-text">
            <p className="station-picker__address-title">서울 마포구 서교동</p>
            <p className="station-picker__address-desc">홍대입구역 9번 출구 인근</p>
          </div>
        </div>

        <div className="station-picker__station-section">
          <p className="station-picker__station-label">현재 위치 기반 보관 위치</p>
          <div className="station-picker__station-list">
            {visibleStations.map((station) => {
              const isSelected = stationId === station.id
              return (
                <button
                  type="button"
                  key={station.id}
                  className={`station-picker__station${isSelected ? ' station-picker__station--selected' : ''}`}
                  onClick={() => setStationId(station.id)}
                >
                  <span className="station-picker__station-body">
                    <span className="station-picker__station-name">{station.name}</span>
                    <span className="station-picker__station-distance">{station.distance}</span>
                  </span>
                  <span
                    className={`station-picker__station-radio${isSelected ? ' station-picker__station-radio--selected' : ''}`}
                  >
                    {isSelected && <img src={iconRadioCheck} alt="" />}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <button type="button" className="station-picker__confirm" onClick={handleConfirm}>
          선택 완료
        </button>
      </div>
    </div>
  )
}
