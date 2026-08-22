import { useNavigate } from 'react-router-dom'
import iconSearchLg from '../../assets/ai-matching/icon-search-lg.svg'
import './ParcelPickupAddressCheck.css'

export default function ParcelPickupAddressCheck() {
  const navigate = useNavigate()
  return (
    <div className="parcel-pickup-address-check">
      <span className="parcel-pickup-address-check__badge">반환 접수</span>

      <div className="parcel-pickup-address-check__intro">
        <h2 className="parcel-pickup-address-check__title">
          택배기사님이 물품을
          <br />
          수거할 주소를 알려주세요
        </h2>
        <p className="parcel-pickup-address-check__desc">
          집 앞에 내놓기만 하면 분실자에게 안전하게 배송돼요.
          <br />
          배송비는 분실자가 부담해요.
        </p>
      </div>

      <div className="parcel-pickup-address-check__empty">
        <div className="parcel-pickup-address-check__empty-icon">
          <img src={iconSearchLg} alt="" />
        </div>
        <p className="parcel-pickup-address-check__empty-title">등록된 주소가 없어요</p>
        <p className="parcel-pickup-address-check__empty-desc">당근에서 사용할 주소를 등록해 주세요.</p>
      </div>

      <div className="parcel-pickup-address-check__next-wrap">
        <button
          type="button"
          className="parcel-pickup-address-check__next"
          onClick={() => navigate('/found/match-result/quiz/claimants/return-prep/review/parcel/address')}
        >
          주소 입력하기
        </button>
      </div>
    </div>
  )
}
