import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapBg from '../../assets/parcel-store-select/map-bg.png'
import pinHalo from '../../assets/parcel-store-select/pin-halo.svg'
import pinBody from '../../assets/parcel-store-select/pin-body.svg'
import iconLocationPinSm from '../../assets/parcel-store-select/icon-location-pin.svg'
import iconLocationPinLg from '../../assets/parcel-store-select/icon-location-pin2.svg'
import iconSearch from '../../assets/parcel-store-select/icon-search.svg'
import iconLocate from '../../assets/parcel-store-select/icon-locate.svg'
import './InPersonPlaceSelect.css'

const PLACE_OPTIONS = [
  { id: 'exit9', title: '홍대입구역 9번 출구', distance: '120m' },
  { id: 'gs25', title: 'GS25 서교중앙점 앞', distance: '280m' },
  { id: 'gu-office', title: '마포구청 앞', distance: '450m' },
]

export default function InPersonPlaceSelect({ value, onConfirm, backTo }) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(value?.id || PLACE_OPTIONS[0].id)

  const handleConfirm = () => {
    const place = PLACE_OPTIONS.find((option) => option.id === selectedId)
    onConfirm?.({ id: place.id, title: place.title, distance: place.distance })
    navigate(backTo)
  }

  return (
    <div className="in-person-place-select">
      <div className="in-person-place-select__map">
        <img src={mapBg} alt="지도" className="in-person-place-select__map-img" />

        <div className="in-person-place-select__callout">
          <img src={iconLocationPinSm} alt="" className="in-person-place-select__callout-icon" />
          <p className="in-person-place-select__callout-text">
            현재 위치가 내 동네로 설정한 <strong>&lsquo;서교동&rsquo;</strong>에 있어요
          </p>
        </div>

        <div className="in-person-place-select__controls">
          <button type="button" className="in-person-place-select__control-btn" aria-label="장소 검색">
            <img src={iconSearch} alt="" />
          </button>
          <button type="button" className="in-person-place-select__control-btn" aria-label="내 위치로 이동">
            <img src={iconLocate} alt="" />
          </button>
        </div>

        <div className="in-person-place-select__pin">
          <img src={pinHalo} alt="" className="in-person-place-select__pin-halo" />
          <img src={pinBody} alt="" className="in-person-place-select__pin-body" />
          <span className="in-person-place-select__pin-center" />
        </div>
      </div>

      <div className="in-person-place-select__sheet">
        <div className="in-person-place-select__address">
          <img src={iconLocationPinLg} alt="" className="in-person-place-select__address-icon" />
          <div className="in-person-place-select__address-text">
            <p className="in-person-place-select__address-title">서울 마포구 서교동</p>
            <p className="in-person-place-select__address-desc">홍대입구역 9번 출구 인근</p>
          </div>
        </div>

        <div className="in-person-place-select__list">
          {PLACE_OPTIONS.map((option) => {
            const isSelected = selectedId === option.id
            return (
              <button
                type="button"
                key={option.id}
                className={`in-person-place-select__option${isSelected ? ' in-person-place-select__option--selected' : ''}`}
                onClick={() => setSelectedId(option.id)}
              >
                <span className="in-person-place-select__option-body">
                  <span className="in-person-place-select__option-title">{option.title}</span>
                  <span className="in-person-place-select__option-distance">{option.distance}</span>
                </span>
                <span
                  className={`in-person-place-select__option-radio${isSelected ? ' in-person-place-select__option-radio--selected' : ''}`}
                />
              </button>
            )
          })}
        </div>

        <button type="button" className="in-person-place-select__confirm" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  )
}
