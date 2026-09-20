import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapMailbox from '../../assets/parcel-store-select/map-bg.png'
import pinHalo from '../../assets/parcel-store-select/pin-halo.svg'
import pinBody from '../../assets/parcel-store-select/pin-body.svg'
import iconLocationPinSm from '../../assets/parcel-store-select/icon-location-pin.svg'
import iconLocationPinLg from '../../assets/parcel-store-select/icon-location-pin2.svg'
import iconSearch from '../../assets/parcel-store-select/icon-search.svg'
import iconLocate from '../../assets/parcel-store-select/icon-locate.svg'
import iconCheckmark from '../../assets/parcel-store-select/icon-checkmark.svg'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import iconToggleSearch from '../../assets/location-picker/icon-toggle-search.svg'
import { useKakaoMap } from '../../lib/kakaoMaps'
import { ProgressCircle } from '../../../seed-design/ui/progress-circle'
import './MailboxSelect.css'

const MAILBOX_OPTIONS = [
  { id: 'exit-9', title: '홍대입구역 9번 출구 우체통', distance: '120m' },
  { id: 'community-center', title: '서교동 주민센터 앞 우체통', distance: '280m' },
  { id: 'post-office', title: '홍대입구 우체국 앞 우체통', distance: '450m' },
]

export default function MailboxSelect({ value, onConfirm, backTo }) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(value?.id || MAILBOX_OPTIONS[0].id)
  const [searchMode, setSearchMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAreaSearching, setIsAreaSearching] = useState(false)
  const [hasSetLocation, setHasSetLocation] = useState(false)
  const [addressInfo, setAddressInfo] = useState({
    title: '서울 마포구 서교동',
    detail: '홍대입구역 9번 출구 인근',
  })
  const district = addressInfo.title.trim().split(/\s+/).pop()
  const { containerRef: mapContainerRef, kakaoRef, mapRef: kakaoMapRef, mapReady, mapFailed } = useKakaoMap()

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
    const mailbox = MAILBOX_OPTIONS.find((option) => option.id === selectedId)
    onConfirm?.({ id: mailbox.id, title: mailbox.title, desc: `현재 위치에서 ${mailbox.distance}` })
    navigate(backTo)
  }

  const showSearchAreaBtn = searchMode && searchQuery.trim().length > 0

  return (
    <div className="mailbox-select">
      {searchMode && (
        <div className="mailbox-select__search-header">
          <div className="mailbox-select__search-field">
            <input
              type="text"
              className="mailbox-select__search-input"
              placeholder="장소, 주소를 검색해보세요"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                className="mailbox-select__search-clear"
                aria-label="지우기"
                onClick={() => setSearchQuery('')}
              >
                <img src={iconRemoveCircle} alt="" />
              </button>
            )}
          </div>
          <button
            type="button"
            className="mailbox-select__cancel"
            onClick={() => {
              setSearchMode(false)
              setSearchQuery('')
            }}
          >
            취소
          </button>
        </div>
      )}

      <div className="mailbox-select__map">
        <div
          ref={mapContainerRef}
          className="mailbox-select__map-canvas"
          style={{ visibility: mapReady && !mapFailed ? 'visible' : 'hidden' }}
        />
        {(!mapReady || mapFailed) && <img src={mapMailbox} alt="지도" className="mailbox-select__map-img" />}

        {!searchMode && (
          <div className="mailbox-select__callout">
            <img src={iconLocationPinSm} alt="" className="mailbox-select__callout-icon" />
            <p className="mailbox-select__callout-text">
              {hasSetLocation ? (
                <>선택한 위치를 <strong>&lsquo;{district}&rsquo;</strong>으로 설정했어요</>
              ) : (
                <>현재 위치가 내 동네로 설정한 <strong>&lsquo;서교동&rsquo;</strong>에 있어요</>
              )}
            </p>
          </div>
        )}

        <div className="mailbox-select__controls">
          <button type="button" className="mailbox-select__control-btn" aria-label="장소 검색" onClick={() => setSearchMode(true)}>
            <img src={iconSearch} alt="" />
          </button>
          <button type="button" className="mailbox-select__control-btn" aria-label="내 위치로 이동" onClick={handleLocate}>
            <img src={iconLocate} alt="" />
          </button>
        </div>

        <div className="mailbox-select__pin">
          <img src={pinHalo} alt="" className="mailbox-select__pin-halo" />
          <img src={pinBody} alt="" className="mailbox-select__pin-body" />
          <span className="mailbox-select__pin-center" />
        </div>

        {showSearchAreaBtn && (
          <button type="button" className="mailbox-select__search-area-btn" onClick={handleSearchThisArea}>
            <img src={iconToggleSearch} alt="" />이 지역 검색하기
          </button>
        )}

        {isAreaSearching && (
          <div className="mailbox-select__area-loading">
            <ProgressCircle size="40" tone="brand" />
          </div>
        )}
      </div>

      <div className="mailbox-select__sheet">
        <div className="mailbox-select__address">
          <img src={iconLocationPinLg} alt="" className="mailbox-select__address-icon" />
          <div className="mailbox-select__address-text">
            <p className="mailbox-select__address-title">{addressInfo.title}</p>
            <p className="mailbox-select__address-desc">{addressInfo.detail}</p>
          </div>
        </div>

        <div className="mailbox-select__list-wrap">
          <p className="mailbox-select__list-label">가까운 우체통</p>
          <div className="mailbox-select__list">
            {MAILBOX_OPTIONS.map((option) => {
              const isSelected = selectedId === option.id
              return (
                <button
                  type="button"
                  key={option.id}
                  className={`mailbox-select__option${isSelected ? ' mailbox-select__option--selected' : ''}`}
                  onClick={() => setSelectedId(option.id)}
                >
                  <span className="mailbox-select__option-body">
                    <span className="mailbox-select__option-title">{option.title}</span>
                    <span className="mailbox-select__option-distance">{option.distance}</span>
                  </span>
                  <span
                    className={`mailbox-select__option-radio${isSelected ? ' mailbox-select__option-radio--selected' : ''}`}
                  >
                    {isSelected && <img src={iconCheckmark} alt="" />}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <button type="button" className="mailbox-select__confirm" onClick={handleConfirm}>
          우체통 선택 완료
        </button>
      </div>
    </div>
  )
}
