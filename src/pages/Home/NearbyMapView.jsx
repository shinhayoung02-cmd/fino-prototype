import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapBg from '../../assets/location-picker/map-bg.png'
import iconLocate from '../../assets/location-picker/icon-locate.svg'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import mapPin from '../../assets/home/map-pin-figma.svg'
import itemWallet from '../../assets/home/item-wallet.png'
import itemBuzzEarphone from '../../assets/home/item-buzz-earphone.jpg?inline'
import itemAirpods from '../../assets/home/item-airpods.jpg?inline'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconClock from '../../assets/home/icon-clock.svg'
import { useKakaoMap } from '../../lib/kakaoMaps'
import './NearbyMapView.css'

const NEARBY_ITEMS = [
  {
    id: 'wallet',
    photo: itemWallet,
    title: '검정 반지갑 습득',
    feature: '검정색 Matin Kim 가죽 반지갑',
    time: '오늘 오전 9~12시',
    location: '서울 마포구 홍대입구역',
    // 지도 위 핀 위치 (지도 중심 기준 px 오프셋)
    pin: { left: '50%', top: '50%' },
    // Figma 사진 크롭 위치 (80x80 박스 기준 실측치)
    photoCrop: { left: -14, top: 0, width: 108, height: 81 },
  },
  {
    id: 'earphone-1',
    photo: itemBuzzEarphone,
    title: '흰색 무선 이어폰 습득',
    feature: '흰색 BUZZ 이어폰',
    time: '오늘 오전 12~14시',
    location: '서울 마포구 AK몰',
    pin: { left: 'calc(50% + 98.5px)', top: 'calc(50% - 51px)' },
    photoCrop: { left: -6, top: -1, width: 86, height: 86 },
  },
  {
    id: 'earphone-2',
    photo: itemAirpods,
    title: '흰색 무선 이어폰 습득',
    feature: '흰색 에어팟 이어폰',
    time: '오늘 오전 12시',
    location: '서울 성산동',
    // Figma에 세번째 핀 좌표가 없어 기존 두 핀 패턴을 따라 임의 배치함
    pin: { left: 'calc(50% - 90px)', top: 'calc(50% + 40px)' },
    photoCrop: { left: -5, top: 0, width: 89, height: 89 },
  },
]

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="nearby-map__pin-icon" aria-hidden="true">
      <path
        d="M10 1.5c-3.31 0-6 2.69-6 6 0 4.5 6 11 6 11s6-6.5 6-11c0-3.31-2.69-6-6-6Zm0 8.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z"
        fill="#1a1c20"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="nearby-map__search-icon" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" stroke="#1a1c20" strokeWidth="1.6" />
      <line x1="13.6" y1="13.6" x2="18" y2="18" stroke="#1a1c20" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="nearby-map__refresh-icon" aria-hidden="true">
      <path
        d="M12.25 7A5.25 5.25 0 1 1 10.5 3.06M12.25 1.75v3.06h-3.06"
        stroke="#1a1c20"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ItemCard({ item, onClick }) {
  return (
    <div
      className={`nearby-map__item${onClick ? ' nearby-map__item--clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="nearby-map__item-photo">
        {item.photo && (
          <img
            src={item.photo}
            alt=""
            style={{
              left: item.photoCrop.left,
              top: item.photoCrop.top,
              width: item.photoCrop.width,
              height: item.photoCrop.height,
            }}
          />
        )}
      </div>
      <div className="nearby-map__item-body">
        <p className="nearby-map__item-title">{item.title}</p>
        <p className="nearby-map__item-row">
          <img src={iconPayment} alt="" />
          {item.feature}
        </p>
        <p className="nearby-map__item-row">
          <img src={iconClock} alt="" />
          {item.time}
        </p>
        <p className="nearby-map__item-location">{item.location}</p>
      </div>
    </div>
  )
}

export default function NearbyMapView() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(null)
  const selectedItem = NEARBY_ITEMS.find((item) => item.id === selectedId) ?? null
  const { containerRef: mapContainerRef, mapRef: kakaoMapRef, mapReady, mapFailed } = useKakaoMap({
    draggable: false,
    zoomable: false,
  })

  useEffect(() => {
    if (!mapReady) return
    // the map height changes (normal <-> tall) when an item is selected;
    // Kakao doesn't pick up container resizes on its own, so nudge it.
    const timer = setTimeout(() => kakaoMapRef.current.relayout(), 0)
    return () => clearTimeout(timer)
  }, [mapReady, selectedItem, kakaoMapRef])

  return (
    <div className="nearby-map">
      {selectedItem ? (
        <div className="nearby-map__search-header">
          <div className="nearby-map__search-field">
            <span className="nearby-map__search-field-text">{selectedItem.location}</span>
            <button
              type="button"
              className="nearby-map__search-field-clear"
              aria-label="지우기"
              onClick={() => setSelectedId(null)}
            >
              <img src={iconRemoveCircle} alt="" />
            </button>
          </div>
          <button type="button" className="nearby-map__search-cancel" onClick={() => setSelectedId(null)}>
            취소
          </button>
        </div>
      ) : (
        <div className="nearby-map__callout">
          <LocationPinIcon />
          <p className="nearby-map__callout-text">
            현재 위치가 내 동네로 설정한 <strong>&lsquo;서교동&rsquo;</strong>에 있어요
          </p>
        </div>
      )}

      <div className={`nearby-map__map${selectedItem ? ' nearby-map__map--tall' : ''}`}>
        <div
          ref={mapContainerRef}
          className="nearby-map__map-canvas"
          style={{ visibility: mapReady && !mapFailed ? 'visible' : 'hidden' }}
        />
        {(!mapReady || mapFailed) && <img src={mapBg} alt="지도" className="nearby-map__map-img" />}

        {NEARBY_ITEMS.map((item) => {
          const isSelected = selectedItem?.id === item.id
          if (selectedItem && !isSelected) return null
          return (
            <button
              type="button"
              key={item.id}
              className="nearby-map__pin"
              style={{ left: item.pin.left, top: item.pin.top }}
              aria-label={item.title}
              onClick={() => setSelectedId(item.id)}
            >
              <img src={mapPin} alt="" className="nearby-map__pin-img" />
            </button>
          )
        })}

        {selectedItem && (
          <button type="button" className="nearby-map__area-search">
            <RefreshIcon />이 지역 검색하기
          </button>
        )}

        <div className="nearby-map__controls">
          <button type="button" className="nearby-map__control-btn" aria-label="장소 검색">
            <SearchIcon />
          </button>
          <button type="button" className="nearby-map__control-btn" aria-label="내 위치로 이동">
            <img src={iconLocate} alt="" />
          </button>
        </div>
      </div>

      <div className={`nearby-map__sheet${selectedItem ? ' nearby-map__sheet--confirm' : ''}`}>
        <div className="nearby-map__address">
          <LocationPinIcon />
          <div className="nearby-map__address-text">
            <p className="nearby-map__address-title">{selectedItem ? selectedItem.location : '서울 마포구 서교동'}</p>
            <p className="nearby-map__address-desc">{selectedItem ? selectedItem.title : '홍대입구역 9번 출구 인근'}</p>
          </div>
        </div>

        <div className="nearby-map__list">
          {selectedItem ? (
            <ItemCard item={selectedItem} />
          ) : (
            NEARBY_ITEMS.map((item) => (
              <ItemCard key={item.id} item={item} onClick={() => setSelectedId(item.id)} />
            ))
          )}
        </div>

        <button type="button" className="nearby-map__confirm" onClick={() => navigate('/')}>
          확인
        </button>
      </div>
    </div>
  )
}
