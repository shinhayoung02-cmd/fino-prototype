import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconChevronDown from '../../assets/ai-matching/icon-chevron-down.svg'
import { THANKS_OPTIONS } from './ThanksMethodSelect'
import './ProposalConfirm.css'

const DELIVERY_SUMMARY = {
  meetup: {
    title: '직접 만나서 받기',
    desc: '약속한 장소와 시간에 만나 직접 물건을 받아요.',
    editTo: '/matching/result/ownership/in-person',
  },
  parcel: {
    title: '택배로 받기',
    desc: '습득자가 택배로 보내면 등록한 주소에서 받아요.',
    editTo: '/matching/result/ownership/parcel/general/address',
  },
  'parcel-store': {
    title: '택배로 받기',
    desc: '편의점에서 택배로 접수해 받아요.',
    editTo: '/matching/result/ownership/parcel/store/location',
  },
}

export default function ProposalConfirm({ thanksMethod = 'coffee' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDeliveryOpen, setDeliveryOpen] = useState(false)
  const deliveryMethod = DELIVERY_SUMMARY[location.state?.deliveryMethod] ? location.state.deliveryMethod : 'meetup'
  const delivery = DELIVERY_SUMMARY[deliveryMethod]
  const thanks = THANKS_OPTIONS.find((option) => option.id === thanksMethod) ?? THANKS_OPTIONS[0]

  return (
    <div className="proposal-confirm">
      <h2 className="proposal-confirm__title">이대로 습득자에게 보낼까요?</h2>
      <p className="proposal-confirm__subtitle">감사 방식과 전달 방법을 한 번 더 확인해주세요</p>

      <div className="proposal-confirm__callout">
        <img src={iconInfo} alt="" className="proposal-confirm__callout-icon" />
        <p className="proposal-confirm__callout-text">
          습득자가 내용을 확인하고 승인하면 반환 절차가 시작돼요
        </p>
      </div>

      <div className="proposal-confirm__summary">
        <div className="proposal-confirm__summary-card">
          <span className="proposal-confirm__summary-badge">감사 방식</span>
          <div className="proposal-confirm__summary-body">
            <p className="proposal-confirm__summary-title">{thanks.title}</p>
            <p className="proposal-confirm__summary-desc">물건 전달 후 습득자가 받을 수 있어요</p>
          </div>
        </div>
        <button
          type="button"
          className="proposal-confirm__summary-card proposal-confirm__summary-card--button"
          onClick={() => setDeliveryOpen((prev) => !prev)}
          aria-expanded={isDeliveryOpen}
        >
          <span className="proposal-confirm__summary-badge">전달 방식</span>
          <div className="proposal-confirm__summary-body">
            <p className="proposal-confirm__summary-title">{delivery.title}</p>
            {isDeliveryOpen && <p className="proposal-confirm__summary-desc">{delivery.desc}</p>}
          </div>
          <img
            src={iconChevronDown}
            alt=""
            className={`proposal-confirm__summary-chevron${isDeliveryOpen ? ' proposal-confirm__summary-chevron--open' : ''}`}
          />
        </button>
      </div>

      <div className="proposal-confirm__actions">
        <button type="button" className="proposal-confirm__edit" onClick={() => navigate(delivery.editTo)}>
          수정하기
        </button>
        <button
          type="button"
          className="proposal-confirm__send"
          onClick={() => navigate('/matching/result/ownership/proposal-sent', { state: { deliveryMethod } })}
        >
          습득자에게 보내기
        </button>
      </div>
    </div>
  )
}
