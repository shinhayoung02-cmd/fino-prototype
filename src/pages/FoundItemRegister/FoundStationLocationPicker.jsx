import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapBg from '../../assets/location-picker/map-bg.png'
import radiusCircle from '../../assets/location-picker/radius-circle.svg'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import iconToggleSearch from '../../assets/location-picker/icon-toggle-search.svg'
import iconLocate from '../../assets/location-picker/icon-locate.svg'
import iconRadioCheck from '../../assets/found-report/icon-radio-check.svg'
import pinHalo from '../../assets/home/pin-halo.svg'
import pinBody from '../../assets/home/pin-body.svg'
import { useKakaoMap } from '../../lib/kakaoMaps'
import { ProgressCircle } from '../../../seed-design/ui/progress-circle'
import POLICE_STATIONS from '../../data/policeStations.json'
import './FoundStationLocationPicker.css'

const MAX_STATIONS = 3
const MAX_SUGGESTIONS = 8

// 초성 검색 ("ㅅㄱ" 입력 시 "서강지구대"도 매칭되도록)
const CHOSUNG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
]

function getChosung(str) {
  let result = ''
  for (const ch of str) {
    const code = ch.charCodeAt(0) - 0xac00
    result += code >= 0 && code <= 11171 ? CHOSUNG_LIST[Math.floor(code / 588)] : ch
  }
  return result
}

const isChosungQuery = (str) => [...str].every((ch) => CHOSUNG_LIST.includes(ch))

function matchesQuery(term, query) {
  return isChosungQuery(query) ? getChosung(term).includes(query) : term.includes(query)
}

// 검색어와 이름 한 글자(또는 초성 한 글자)라도 겹치는 전국 지구대·파출소를 찾는다.
function findMatchingStations(query) {
  const trimmed = query.trim()
  if (!trimmed) return []
  return POLICE_STATIONS.filter((station) => matchesQuery(station.name, trimmed)).slice(0, MAX_SUGGESTIONS)
}

// 지도 중심 주소("서울 마포구 서교동")의 구/군 단위로 실제 전국 지구대·파출소 데이터를 매칭한다.
// 위경도가 없는 데이터라 실거리 정렬은 못하고, 같은 구/군 내 목록만 추려서 보여준다.
function findNearbyStations(addressTitle) {
  const parts = addressTitle.trim().split(/\s+/)
  const sido = parts[0]
  const district = parts[1]

  const byDistrict = district ? POLICE_STATIONS.filter((station) => station.address.includes(district)) : []
  if (byDistrict.length > 0) return byDistrict.slice(0, MAX_STATIONS)

  const bySido = sido ? POLICE_STATIONS.filter((station) => station.address.includes(sido)) : []
  if (bySido.length > 0) return bySido.slice(0, MAX_STATIONS)

  return POLICE_STATIONS.slice(0, MAX_STATIONS)
}

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
  const [selectedAddress, setSelectedAddress] = useState(value?.stationAddress ?? null)
  const [isAreaSearching, setIsAreaSearching] = useState(false)
  const [hasSetLocation, setHasSetLocation] = useState(false)
  const [addressInfo, setAddressInfo] = useState({
    title: '서울 마포구 서교동',
    detail: '홍대입구역 9번 출구 인근',
  })

  const district = addressInfo.title.trim().split(/\s+/).pop()
  const stations = useMemo(() => findNearbyStations(addressInfo.title), [addressInfo.title])
  const matchingStations = useMemo(() => findMatchingStations(searchQuery), [searchQuery])
  const selectedStation = stations.find((station) => station.address === selectedAddress) ?? stations[0]
  const {
    containerRef: mapContainerRef,
    kakaoRef,
    mapRef: kakaoMapRef,
    mapReady,
    mapFailed,
  } = useKakaoMap()

  useEffect(() => {
    if (!mapReady) return
    const kakao = kakaoRef.current
    const map = kakaoMapRef.current
    const geocoder = new kakao.maps.services.Geocoder()
    const handleIdle = () => {
      const center = map.getCenter()
      geocoder.coord2Address(center.getLng(), center.getLat(), (result, status) => {
        if (status !== kakao.maps.services.Status.OK || !result[0]) return
        const { address, road_address: roadAddress } = result[0]
        setAddressInfo({
          title: [address.region_1depth_name, address.region_2depth_name, address.region_3depth_name]
            .filter(Boolean)
            .join(' '),
          detail: roadAddress ? roadAddress.address_name : address.address_name,
        })
      })
    }
    kakao.maps.event.addListener(map, 'idle', handleIdle)
    return () => kakao.maps.event.removeListener(map, 'idle', handleIdle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady])

  const handleLocate = () => {
    const kakao = kakaoRef.current
    if (!kakao || !kakaoMapRef.current || !navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      kakaoMapRef.current.panTo(new kakao.maps.LatLng(coords.latitude, coords.longitude))
      setHasSetLocation(true)
    })
  }

  const handleSearchThisArea = () => {
    const query = searchQuery.trim()
    setIsAreaSearching(true)

    const finish = () => {
      setIsAreaSearching(false)
      setSearchMode(false)
      setSearchQuery('')
      setHasSetLocation(true)
    }

    const kakao = kakaoRef.current
    if (!kakao || !kakaoMapRef.current || mapFailed || !query) {
      setTimeout(finish, 2000)
      return
    }

    const startedAt = Date.now()
    const places = new kakao.maps.services.Places()
    places.keywordSearch(query, (results, status) => {
      const remaining = Math.max(0, 2000 - (Date.now() - startedAt))
      setTimeout(() => {
        if (status === kakao.maps.services.Status.OK && results[0]) {
          const place = results[0]
          kakaoMapRef.current.setCenter(new kakao.maps.LatLng(Number(place.y), Number(place.x)))
        }
        finish()
      }, remaining)
    })
  }

  const handleConfirm = () => {
    if (!selectedStation) return
    onConfirm({
      stationAddress: selectedStation.address,
      address: `${selectedStation.name}${selectedStation.type}`,
      radius: selectedStation.type,
      detail: selectedStation.address,
    })
    navigate(backTo)
  }

  const showSearchAreaBtn = searchMode && searchQuery.trim().length > 0

  const handlePickSuggestion = (station) => {
    setSelectedAddress(station.address)
    setSearchMode(false)
    setSearchQuery('')
  }

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

      {searchMode && matchingStations.length > 0 && (
        <div className="station-picker__suggestions">
          {matchingStations.map((station) => (
            <button
              type="button"
              key={station.address}
              className="station-picker__suggestion"
              onClick={() => handlePickSuggestion(station)}
            >
              <span className="station-picker__suggestion-name">
                {station.name}
                {station.type}
              </span>
              <span className="station-picker__suggestion-address">{station.address}</span>
            </button>
          ))}
        </div>
      )}

      <div className="station-picker__map">
        {!searchMode && (
          <div className="station-picker__callout">
            <LocationPinIcon />
            <p className="station-picker__callout-text">
              {hasSetLocation ? (
                <>선택한 위치를 <strong>&lsquo;{district}&rsquo;</strong>으로 설정했어요</>
              ) : (
                <>현재 위치가 내 동네로 설정한 <strong>&lsquo;서교동&rsquo;</strong>에 있어요</>
              )}
            </p>
          </div>
        )}
        <div
          ref={mapContainerRef}
          className="station-picker__map-canvas"
          style={{ visibility: mapReady && !mapFailed ? 'visible' : 'hidden' }}
        />
        {(!mapReady || mapFailed) && <img src={mapBg} alt="지도" className="station-picker__map-img" />}
        {searchMode && (
          <img src={radiusCircle} alt="" className="station-picker__radius" style={{ transform: 'translate(-50%, -50%)' }} />
        )}
        <div className="station-picker__pin">
          <img src={pinHalo} alt="" className="station-picker__pin-halo" />
          <img src={pinBody} alt="" className="station-picker__pin-body" />
        </div>

        {showSearchAreaBtn && (
          <button type="button" className="station-picker__search-area-btn" onClick={handleSearchThisArea}>
            <img src={iconToggleSearch} alt="" />이 지역 검색하기
          </button>
        )}

        {isAreaSearching && (
          <div className="station-picker__area-loading">
            <ProgressCircle size="40" tone="brand" />
          </div>
        )}

        <div className="station-picker__controls">
          <button type="button" className="station-picker__control-btn" aria-label="내 위치로 이동" onClick={handleLocate}>
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
            <p className="station-picker__address-title">{addressInfo.title}</p>
            <p className="station-picker__address-desc">{addressInfo.detail}</p>
          </div>
        </div>

        <div className="station-picker__station-section">
          <p className="station-picker__station-label">현재 위치 기반 보관 위치</p>
          <div className="station-picker__station-list">
            {stations.map((station) => {
              const isSelected = selectedStation?.address === station.address
              return (
                <button
                  type="button"
                  key={station.address}
                  className={`station-picker__station${isSelected ? ' station-picker__station--selected' : ''}`}
                  onClick={() => setSelectedAddress(station.address)}
                >
                  <span className="station-picker__station-body">
                    <span className="station-picker__station-name">
                      {station.name}
                      {station.type}
                    </span>
                    <span className="station-picker__station-distance">{station.address}</span>
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
