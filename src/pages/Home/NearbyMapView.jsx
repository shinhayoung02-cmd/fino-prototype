import { useNavigate } from 'react-router-dom'
import mapBg from '../../assets/location-picker/map-bg.png'
import iconLocate from '../../assets/location-picker/icon-locate.svg'
import pinHalo from '../../assets/home/pin-halo.svg'
import pinBody from '../../assets/home/pin-body.svg'
import itemWallet from '../../assets/home/item-wallet.png'
import itemBuzzEarphone from '../../assets/home/item-buzz-earphone.jpg?inline'
import itemAirpods from '../../assets/home/item-airpods.jpg?inline'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconClock from '../../assets/home/icon-clock.svg'
import './NearbyMapView.css'

const NEARBY_ITEMS = [
  {
    id: 'wallet',
    photo: itemWallet,
    title: '검정 반지갑 습득',
    feature: '검정색 Matin Kim 가죽 반지갑',
    time: '오늘 오전 9~12시',
    location: '서울 마포구 홍대입구역',
  },
  {
    id: 'earphone-1',
    photo: itemBuzzEarphone,
    title: '흰색 무선 이어폰 습득',
    feature: '흰색 BUZZ 이어폰',
    time: '오늘 오전 12~14시',
    location: '서울 마포구 AK몰',
  },
  {
    id: 'earphone-2',
    photo: itemAirpods,
    title: '흰색 무선 이어폰 습득',
    feature: '흰색 에어팟 이어폰',
    time: '오늘 오전 12시',
    location: '서울 성산동',
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

export default function NearbyMapView() {
  const navigate = useNavigate()

  return (
    <div className="nearby-map">
      <div className="nearby-map__map">
        <div className="nearby-map__callout">
          <LocationPinIcon />
          <p className="nearby-map__callout-text">
            현재 위치가 내 동네로 설정한 <strong>&lsquo;서교동&rsquo;</strong>에 있어요
          </p>
        </div>

        <img src={mapBg} alt="지도" className="nearby-map__map-img" />

        <div className="nearby-map__pin">
          <img src={pinHalo} alt="" className="nearby-map__pin-halo" />
          <img src={pinBody} alt="" className="nearby-map__pin-body" />
        </div>
        <div className="nearby-map__pin nearby-map__pin--secondary">
          <img src={pinHalo} alt="" className="nearby-map__pin-halo" />
          <img src={pinBody} alt="" className="nearby-map__pin-body" />
        </div>

        <div className="nearby-map__controls">
          <button type="button" className="nearby-map__control-btn" aria-label="내 위치로 이동">
            <img src={iconLocate} alt="" />
          </button>
          <button type="button" className="nearby-map__control-btn" aria-label="장소 검색">
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="nearby-map__sheet">
        <div className="nearby-map__address">
          <LocationPinIcon />
          <div className="nearby-map__address-text">
            <p className="nearby-map__address-title">서울 마포구 서교동</p>
            <p className="nearby-map__address-desc">홍대입구역 9번 출구 인근</p>
          </div>
        </div>

        <div className="nearby-map__list">
          {NEARBY_ITEMS.map((item) => (
            <div className="nearby-map__item" key={item.id}>
              <div className="nearby-map__item-photo">{item.photo && <img src={item.photo} alt="" />}</div>
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
          ))}
        </div>

        <button type="button" className="nearby-map__confirm" onClick={() => navigate('/')}>
          확인
        </button>
      </div>
    </div>
  )
}
