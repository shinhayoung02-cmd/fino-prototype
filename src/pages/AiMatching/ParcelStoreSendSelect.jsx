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
import './ParcelStoreSendSelect.css'

const STORE_OPTIONS = [
  { id: 'cu', title: 'CU 홍대입구역점', distance: '120m' },
  { id: 'gs25', title: 'GS25 서교중앙점', distance: '280m' },
  { id: '7-11', title: '세븐일레븐 홍대입구점', distance: '450m' },
]

export default function ParcelStoreSendSelect() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(STORE_OPTIONS[0].id)

  return (
    <div className="parcel-store-send-select">
      <div className="parcel-store-send-select__map">
        <img src={mapBg} alt="지도" className="parcel-store-send-select__map-img" />

        <div className="parcel-store-send-select__callout">
          <img src={iconLocationPinSm} alt="" className="parcel-store-send-select__callout-icon" />
          <p className="parcel-store-send-select__callout-text">
            현재 위치가 내 동네로 설정한 <strong>&lsquo;서교동&rsquo;</strong>에 있어요
          </p>
        </div>

        <div className="parcel-store-send-select__controls">
          <button type="button" className="parcel-store-send-select__control-btn" aria-label="장소 검색">
            <img src={iconSearch} alt="" />
          </button>
          <button type="button" className="parcel-store-send-select__control-btn" aria-label="내 위치로 이동">
            <img src={iconLocate} alt="" />
          </button>
        </div>

        <div className="parcel-store-send-select__pin">
          <img src={pinHalo} alt="" className="parcel-store-send-select__pin-halo" />
          <img src={pinBody} alt="" className="parcel-store-send-select__pin-body" />
          <span className="parcel-store-send-select__pin-center" />
        </div>
      </div>

      <div className="parcel-store-send-select__sheet">
        <div className="parcel-store-send-select__address">
          <img src={iconLocationPinLg} alt="" className="parcel-store-send-select__address-icon" />
          <div className="parcel-store-send-select__address-text">
            <p className="parcel-store-send-select__address-title">서울 마포구 서교동</p>
            <p className="parcel-store-send-select__address-desc">홍대입구역 9번 출구 인근</p>
          </div>
        </div>

        <div className="parcel-store-send-select__list-wrap">
          <p className="parcel-store-send-select__list-label">가까운 편의점</p>
          <div className="parcel-store-send-select__list">
            {STORE_OPTIONS.map((option) => {
              const isSelected = selectedId === option.id
              return (
                <button
                  type="button"
                  key={option.id}
                  className={`parcel-store-send-select__option${isSelected ? ' parcel-store-send-select__option--selected' : ''}`}
                  onClick={() => setSelectedId(option.id)}
                >
                  <span className="parcel-store-send-select__option-body">
                    <span className="parcel-store-send-select__option-title">{option.title}</span>
                    <span className="parcel-store-send-select__option-distance">{option.distance}</span>
                  </span>
                  <span
                    className={`parcel-store-send-select__option-radio${isSelected ? ' parcel-store-send-select__option-radio--selected' : ''}`}
                  >
                    {isSelected && <img src={iconCheckmark} alt="" />}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          className="parcel-store-send-select__confirm"
          onClick={() => navigate('/found/match-result/quiz/claimants/return-prep/review/parcel-store/progress')}
        >
          확인
        </button>
      </div>
    </div>
  )
}
