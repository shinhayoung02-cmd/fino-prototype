import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapMailbox from '../../assets/parcel-store-select/map-bg.png'
import pinHalo from '../../assets/parcel-store-select/pin-halo.svg'
import pinBody from '../../assets/parcel-store-select/pin-body.svg'
import iconLocationPinSm from '../../assets/parcel-store-select/icon-location-pin.svg'
import iconLocationPinLg from '../../assets/parcel-store-select/icon-location-pin2.svg'
import iconSearch from '../../assets/parcel-store-select/icon-search.svg'
import iconLocate from '../../assets/parcel-store-select/icon-locate.svg'
import iconCheckmark from '../../assets/parcel-store-select/icon-checkmark.svg'
import './MailboxSelect.css'

const MAILBOX_OPTIONS = [
  { id: 'exit-9', title: '홍대입구역 9번 출구 우체통', distance: '120m' },
  { id: 'community-center', title: '서교동 주민센터 앞 우체통', distance: '280m' },
  { id: 'post-office', title: '홍대입구 우체국 앞 우체통', distance: '450m' },
]

export default function MailboxSelect({ value, onConfirm, backTo }) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(value?.id || MAILBOX_OPTIONS[0].id)

  const handleConfirm = () => {
    const mailbox = MAILBOX_OPTIONS.find((option) => option.id === selectedId)
    onConfirm?.({ id: mailbox.id, title: mailbox.title, desc: `현재 위치에서 ${mailbox.distance}` })
    navigate(backTo)
  }

  return (
    <div className="mailbox-select">
      <div className="mailbox-select__map">
        <img src={mapMailbox} alt="지도" className="mailbox-select__map-img" />

        <div className="mailbox-select__callout">
          <img src={iconLocationPinSm} alt="" className="mailbox-select__callout-icon" />
          <p className="mailbox-select__callout-text">
            현재 위치가 내 동네로 설정한 <strong>&lsquo;서교동&rsquo;</strong>에 있어요
          </p>
        </div>

        <div className="mailbox-select__controls">
          <button type="button" className="mailbox-select__control-btn" aria-label="장소 검색">
            <img src={iconSearch} alt="" />
          </button>
          <button type="button" className="mailbox-select__control-btn" aria-label="내 위치로 이동">
            <img src={iconLocate} alt="" />
          </button>
        </div>

        <div className="mailbox-select__pin">
          <img src={pinHalo} alt="" className="mailbox-select__pin-halo" />
          <img src={pinBody} alt="" className="mailbox-select__pin-body" />
          <span className="mailbox-select__pin-center" />
        </div>
      </div>

      <div className="mailbox-select__sheet">
        <div className="mailbox-select__address">
          <img src={iconLocationPinLg} alt="" className="mailbox-select__address-icon" />
          <div className="mailbox-select__address-text">
            <p className="mailbox-select__address-title">서울 마포구 서교동</p>
            <p className="mailbox-select__address-desc">홍대입구역 9번 출구 인근</p>
          </div>
        </div>

        <div className="mailbox-select__list-wrap">
          <p className="mailbox-select__list-label">가까운 편의점</p>
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
