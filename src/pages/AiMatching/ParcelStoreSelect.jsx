import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapBg from '../../assets/parcel-store-select/map-bg.png'
import pinHalo from '../../assets/parcel-store-select/pin-halo.svg'
import pinBody from '../../assets/parcel-store-select/pin-body.svg'
import iconLocationPinSm from '../../assets/parcel-store-select/icon-location-pin.svg'
import iconLocationPinLg from '../../assets/parcel-store-select/icon-location-pin2.svg'
import iconSearch from '../../assets/parcel-store-select/icon-search.svg'
import iconLocate from '../../assets/parcel-store-select/icon-locate.svg'
import iconCheckmark from '../../assets/parcel-store-select/icon-checkmark.svg'
import { useKakaoMap } from '../../lib/kakaoMaps'
import './ParcelStoreSelect.css'

const STORE_OPTIONS = [
  { id: 'cu', title: 'CU 홍대입구역점', distance: '120m' },
  { id: 'gs25', title: 'GS25 서교중앙점', distance: '280m' },
  { id: '7-11', title: '세븐일레븐 홍대입구점', distance: '450m' },
]

export default function ParcelStoreSelect({ value, onConfirm, backTo }) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(value?.id || STORE_OPTIONS[0].id)
  const { containerRef: mapContainerRef, mapReady, mapFailed } = useKakaoMap()

  const handleConfirm = () => {
    const store = STORE_OPTIONS.find((option) => option.id === selectedId)
    onConfirm?.({ id: store.id, title: store.title, desc: `${store.distance} 거리` })
    navigate(backTo)
  }

  return (
    <div className="parcel-store-select">
      <div className="parcel-store-select__map">
        <div
          ref={mapContainerRef}
          className="parcel-store-select__map-canvas"
          style={{ visibility: mapReady && !mapFailed ? 'visible' : 'hidden' }}
        />
        {(!mapReady || mapFailed) && <img src={mapBg} alt="지도" className="parcel-store-select__map-img" />}

        <div className="parcel-store-select__callout">
          <img src={iconLocationPinSm} alt="" className="parcel-store-select__callout-icon" />
          <p className="parcel-store-select__callout-text">
            현재 위치가 내 동네로 설정한 <strong>&lsquo;서교동&rsquo;</strong>에 있어요
          </p>
        </div>

        <div className="parcel-store-select__controls">
          <button type="button" className="parcel-store-select__control-btn" aria-label="장소 검색">
            <img src={iconSearch} alt="" />
          </button>
          <button type="button" className="parcel-store-select__control-btn" aria-label="내 위치로 이동">
            <img src={iconLocate} alt="" />
          </button>
        </div>

        <div className="parcel-store-select__pin">
          <img src={pinHalo} alt="" className="parcel-store-select__pin-halo" />
          <img src={pinBody} alt="" className="parcel-store-select__pin-body" />
          <span className="parcel-store-select__pin-center" />
        </div>
      </div>

      <div className="parcel-store-select__sheet">
        <div className="parcel-store-select__address">
          <img src={iconLocationPinLg} alt="" className="parcel-store-select__address-icon" />
          <div className="parcel-store-select__address-text">
            <p className="parcel-store-select__address-title">서울 마포구 서교동</p>
            <p className="parcel-store-select__address-desc">홍대입구역 9번 출구 인근</p>
          </div>
        </div>

        <div className="parcel-store-select__list-wrap">
          <p className="parcel-store-select__list-label">가까운 편의점</p>
          <div className="parcel-store-select__list">
            {STORE_OPTIONS.map((option) => {
              const isSelected = selectedId === option.id
              return (
                <button
                  type="button"
                  key={option.id}
                  className={`parcel-store-select__option${isSelected ? ' parcel-store-select__option--selected' : ''}`}
                  onClick={() => setSelectedId(option.id)}
                >
                  <span className="parcel-store-select__option-body">
                    <span className="parcel-store-select__option-title">{option.title}</span>
                    <span className="parcel-store-select__option-distance">{option.distance}</span>
                  </span>
                  <span
                    className={`parcel-store-select__option-radio${isSelected ? ' parcel-store-select__option-radio--selected' : ''}`}
                  >
                    {isSelected && <img src={iconCheckmark} alt="" />}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <button type="button" className="parcel-store-select__confirm" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  )
}
