import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconNote from '../../assets/parcel-info/icon-note.svg'
import iconPayment from '../../assets/parcel-info/icon-payment.svg'
import iconVoucher from '../../assets/parcel-info/icon-voucher.svg'
import iconMarketCheck from '../../assets/parcel-info/icon-market-check.svg'
import './ParcelDeliveryInfo.css'

const CONFIGS = {
  general: {
    title: '일반 택배 이용방법',
    subtitle: '택배를 통해 원하는 주소로 물건을 받아요.',
    calloutLines: ['배송비는 내가 미리 결제해요', '습득자는 추가 결제 없이 물건을 보낼 수 있어요.'],
    groupedItems: [
      { icon: iconNote, text: '물건을 받을 주소를 확인해주세요.' },
      { icon: iconPayment, text: '배송에 필요한 금액을 미리 결제해요.' },
    ],
    singleItem: { icon: iconVoucher, text: '습득자가 발송하면 배송 상황을 확인하고,\n등록한 주소에서 받아요.' },
  },
  store: {
    title: '편의점 택배 이용방법',
    subtitle: '가까운 편의점을 통해 물건을 받아요',
    calloutLines: ['배송비는 내가 미리 결제해요', '습득자는 편의점에서 따로 결제하지 않아도 돼요.'],
    groupedItems: [
      { icon: iconMarketCheck, text: '물건을 받을 편의점을 선택해요' },
      { icon: iconPayment, text: '배송비를 미리 결제해요' },
    ],
    singleItem: { icon: iconVoucher, text: '도착 알림을 받고 편의점에서 물건을 받아요' },
  },
}

export default function ParcelDeliveryInfo({ type }) {
  const navigate = useNavigate()
  const config = CONFIGS[type]

  return (
    <div className="parcel-info">
      <div className="parcel-info__head">
        <h2 className="parcel-info__title">{config.title}</h2>
        <span className="parcel-info__badge">발송 준비중</span>
      </div>
      <p className="parcel-info__subtitle">{config.subtitle}</p>

      <div className="parcel-info__callout">
        <img src={iconInfo} alt="" className="parcel-info__callout-icon" />
        <p className="parcel-info__callout-text">
          {config.calloutLines[0]}
          <br />
          {config.calloutLines[1]}
        </p>
      </div>

      <div className="parcel-info__list">
        <div className="parcel-info__accordion">
          {config.groupedItems.map((item, index) => (
            <div className="parcel-info__item" key={item.text}>
              {index > 0 && <div className="parcel-info__item-divider" />}
              <img src={item.icon} alt="" className="parcel-info__item-icon" />
              <p className="parcel-info__item-text">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="parcel-info__group-divider" />

        <div className="parcel-info__accordion">
          <div className="parcel-info__item">
            <img src={config.singleItem.icon} alt="" className="parcel-info__item-icon" />
            <p className="parcel-info__item-text">
              {config.singleItem.text.split('\n').map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="parcel-info__next-wrap">
        <button
          type="button"
          className="parcel-info__next"
          onClick={() => {
            if (type === 'general') navigate('/matching/result/ownership/parcel/general/address')
            else if (type === 'store') navigate('/matching/result/ownership/parcel/store/info')
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
