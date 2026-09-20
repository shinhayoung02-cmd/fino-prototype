import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconChevronRight from '../../assets/ai-matching/icon-chevron-right.svg'
import mapBg from '../../assets/location-picker/map-bg.png'
import pinHalo from '../../assets/home/pin-halo.svg'
import pinBody from '../../assets/home/pin-body.svg'
import iconVoucher from '../../assets/parcel-info/icon-voucher.svg'
import iconNote from '../../assets/parcel-info/icon-note.svg'
import iconMoneyWon from '../../assets/ai-matching/icon-money-won.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import { useKakaoMap } from '../../lib/kakaoMaps'
import './ParcelStoreLocation.css'

const CONFIRM_ITEMS_GROUP = [
  { icon: iconVoucher, text: '물건이 보이지 않도록 포장해주세요.' },
  { icon: iconNote, text: '접수할 때 예약번호를 보여주세요.' },
]

const CONFIRM_ITEM_SINGLE = { icon: iconMoneyWon, text: '배송비는 분실자가 이미 결제했어요.' }

export default function ParcelStoreLocation({ store }) {
  const navigate = useNavigate()
  const [isConfirmSheetOpen, setConfirmSheetOpen] = useState(false)
  const { containerRef: mapContainerRef, mapReady, mapFailed } = useKakaoMap()

  return (
    <div className="parcel-store-location">
      <div className="parcel-store-location__head">
        <h2 className="parcel-store-location__title">편의점 택배</h2>
        <span className="parcel-store-location__badge">발송 준비중</span>
      </div>
      <p className="parcel-store-location__subtitle">습득자는 별도 결제 없이 편의점에서 접수할 수 있어요</p>

      <div className="parcel-store-location__callout">
        <img src={iconInfo} alt="" className="parcel-store-location__callout-icon" />
        <p className="parcel-store-location__callout-text">내 근처 편의점에서 받을 수 있어요</p>
      </div>

      <div className="parcel-store-location__field">
        <p className="parcel-store-location__field-label">내 근처 편의점</p>

        <button
          type="button"
          className="parcel-store-location__list-row"
          onClick={() => navigate('/matching/result/ownership/parcel/store/location/select')}
        >
          <span className="parcel-store-location__list-row-body">
            <span className="parcel-store-location__list-row-title">{store ? store.title : '장소 선택하기'}</span>
            <span className="parcel-store-location__list-row-desc">
              {store ? store.desc : '지도에서 대략적인 위치를 선택해요'}
            </span>
          </span>
          <img src={iconChevronRight} alt="" />
        </button>

        <div className="parcel-store-location__map">
          <div
            ref={mapContainerRef}
            className="parcel-store-location__map-canvas"
            style={{ visibility: mapReady && !mapFailed ? 'visible' : 'hidden' }}
          />
          {(!mapReady || mapFailed) && (
            <img src={mapBg} alt="지도" className="parcel-store-location__map-img" />
          )}
          <div className="parcel-store-location__pin">
            <img src={pinHalo} alt="" className="parcel-store-location__pin-halo" />
            <img src={pinBody} alt="" className="parcel-store-location__pin-body" />
          </div>
        </div>

        <p className="parcel-store-location__hint">가까운 수령 가능 매장을 찾아보세요.</p>
      </div>

      <div className="parcel-store-location__actions">
        <button
          type="button"
          className="parcel-store-location__confirm"
          disabled={!store}
          onClick={() => setConfirmSheetOpen(true)}
        >
          확인
        </button>
        <button
          type="button"
          className="parcel-store-location__edit"
          onClick={() => navigate('/matching/result/ownership/parcel/store/info')}
        >
          수정하기
        </button>
      </div>

      <BottomSheet
        isOpen={isConfirmSheetOpen}
        onClose={() => setConfirmSheetOpen(false)}
        title="접수 전에 확인해주세요"
        footer={
          <button
            type="button"
            className="parcel-store-location__confirm-sheet-btn"
            onClick={() => {
              setConfirmSheetOpen(false)
              navigate('/matching/result/ownership/proposal-confirm', {
                state: { deliveryMethod: 'parcel-store' },
              })
            }}
          >
            확인
          </button>
        }
      >
        <p className="parcel-store-location__confirm-sheet-desc">습득자는 별도 결제 없이 편의점에서 접수할 수 있어요</p>
        <div className="parcel-store-location__confirm-sheet-list">
          <div className="parcel-store-location__confirm-sheet-accordion">
            {CONFIRM_ITEMS_GROUP.map((item, index) => (
              <div className="parcel-store-location__confirm-sheet-item" key={item.text}>
                {index > 0 && <div className="parcel-store-location__confirm-sheet-item-divider" />}
                <img src={item.icon} alt="" className="parcel-store-location__confirm-sheet-item-icon" />
                <p className="parcel-store-location__confirm-sheet-item-text">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="parcel-store-location__confirm-sheet-group-divider" />
          <div className="parcel-store-location__confirm-sheet-accordion">
            <div className="parcel-store-location__confirm-sheet-item">
              <img
                src={CONFIRM_ITEM_SINGLE.icon}
                alt=""
                className="parcel-store-location__confirm-sheet-item-icon"
              />
              <p className="parcel-store-location__confirm-sheet-item-text">{CONFIRM_ITEM_SINGLE.text}</p>
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
