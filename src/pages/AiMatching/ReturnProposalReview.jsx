import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import walletPhoto from '../../assets/ai-matching/samples/wallet-matin-kim-photo.jpg'
import iconPayment from '../../assets/ai-matching/icon-payment.svg'
import iconClock from '../../assets/ai-matching/icon-clock.svg'
import iconChevronRight from '../../assets/ai-matching/icon-chevron-right-list.svg'
import iconMoneyWon from '../../assets/ai-matching/icon-money-won.svg'
import iconProductBag from '../../assets/ai-matching/icon-product-bag.svg'
import iconThumbUp from '../../assets/ai-matching/icon-thumb-up.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './ReturnProposalReview.css'

const PARCEL_STEPS = [
  {
    id: 'pay',
    icon: iconMoneyWon,
    text: (
      <>
        <strong>분실자</strong>가 물건을 받을 장소를 선택하고
        <br />
        배송비를 결제해요.
      </>
    ),
  },
  {
    id: 'send',
    icon: iconProductBag,
    text: (
      <>
        <strong>습득자</strong>가 가까운 택배 접수처에서 물건을 보내요.
      </>
    ),
  },
  {
    id: 'receive',
    icon: iconThumbUp,
    text: (
      <>
        배송이 도착하면 <strong>분실자</strong>가 지정한 장소에서
        <br />
        물건을 받아요.
      </>
    ),
  },
]

const DELIVERY_PROPOSAL_ITEM = {
  'in-person': { id: 'in-person', label: '대면 직거래', answer: '약속한 장소와 시간에 만나 직접 전달해요' },
  parcel: { id: 'parcel', label: '일반 택배', answer: '택배로 포장해 등록한 주소로 보내요' },
  'parcel-store': { id: 'parcel-store', label: '편의점 택배', answer: '가까운 편의점에서 택배로 접수해 보내요' },
}

export default function ReturnProposalReview({ deliveryMethod = 'in-person' }) {
  const navigate = useNavigate()
  const proposalItems = [
    { id: 'coffee', label: '커피 1잔', answer: '물건 전달이 끝나면 감사로 받을 수 있어요' },
    DELIVERY_PROPOSAL_ITEM[deliveryMethod],
  ]
  const [openItemId, setOpenItemId] = useState(null)
  const [isRetrySheetOpen, setRetrySheetOpen] = useState(false)
  const [isParcelInfoSheetOpen, setParcelInfoSheetOpen] = useState(false)

  const toggleItem = (id) => {
    setOpenItemId((prev) => (prev === id ? null : id))
  }
  return (
    <div className="return-proposal-review">
      <span className="return-proposal-review__badge">제안 확인중</span>

      <div className="return-proposal-review__intro">
        <h2 className="return-proposal-review__title">분실자가 보낸 제안을 확인해주세요</h2>
        <p className="return-proposal-review__desc">분실자가 소유권을 다시 확인할 수 있는 자료를 보냈어요</p>
      </div>

      <div className="return-proposal-review__callout">
        <img src={iconInfo} alt="" className="return-proposal-review__callout-icon" />
        <p className="return-proposal-review__callout-text">승인 전에는 반환 절차가 시작되지 않아요.</p>
      </div>

      <div className="return-proposal-review__card">
        <div className="return-proposal-review__card-row">
          <div className="return-proposal-review__card-image">
            <img src={walletPhoto} alt="" />
          </div>
          <div className="return-proposal-review__card-info">
            <p className="return-proposal-review__card-title">검정 반지갑 습득</p>
            <div className="return-proposal-review__card-meta-row">
              <img src={iconPayment} alt="" />
              <span>검정색 Matin Kim 가죽 반지갑</span>
            </div>
            <div className="return-proposal-review__card-meta-row">
              <img src={iconClock} alt="" />
              <span>오늘 오전 9~12시</span>
            </div>
            <p className="return-proposal-review__card-location">서울 마포구 홍대입구역</p>
          </div>
        </div>
        <div className="return-proposal-review__card-divider" />
      </div>

      <div className="return-proposal-review__proposal">
        <p className="return-proposal-review__proposal-label">분실자가 선택한 제안</p>
        <div className="return-proposal-review__proposal-list">
          {proposalItems.map((item, index) => {
            const isItemOpen = openItemId === item.id
            return (
              <div key={item.id} className="return-proposal-review__proposal-item-wrap">
                {index > 0 && <div className="return-proposal-review__proposal-divider" />}
                <button
                  type="button"
                  className="return-proposal-review__proposal-item"
                  onClick={() => toggleItem(item.id)}
                >
                  <span>{item.label}</span>
                  <img
                    src={iconChevronRight}
                    alt=""
                    className={`return-proposal-review__proposal-chevron${isItemOpen ? ' return-proposal-review__proposal-chevron--open' : ''}`}
                  />
                </button>
                {isItemOpen && <p className="return-proposal-review__proposal-answer">{item.answer}</p>}
              </div>
            )
          })}
        </div>
      </div>

      <div className="return-proposal-review__actions">
        <button
          type="button"
          className="return-proposal-review__approve"
          onClick={() => {
            if (deliveryMethod === 'in-person') {
              navigate('/found/match-result/quiz/claimants/return-prep/review/in-person')
            } else if (deliveryMethod === 'parcel' || deliveryMethod === 'parcel-store') {
              setParcelInfoSheetOpen(true)
            }
          }}
        >
          승인
        </button>
        <button
          type="button"
          className="return-proposal-review__reject"
          onClick={() => setRetrySheetOpen(true)}
        >
          다시 제안 요청
        </button>
      </div>

      <BottomSheet
        isOpen={isRetrySheetOpen}
        onClose={() => setRetrySheetOpen(false)}
        title="다시 제안 요청하시겠습니까?"
        footer={
          <>
            <button
              type="button"
              className="return-proposal-review__retry-confirm"
              onClick={() => {
                setRetrySheetOpen(false)
                navigate('/found/match-result/quiz/claimants/return-prep/review/retry-reason')
              }}
            >
              확인
            </button>
            <button
              type="button"
              className="return-proposal-review__retry-cancel"
              onClick={() => setRetrySheetOpen(false)}
            >
              취소
            </button>
          </>
        }
      >
        <p className="return-proposal-review__retry-desc">다시 제안 요청은 총 2번까지 가능합니다.</p>
      </BottomSheet>

      <BottomSheet
        isOpen={isParcelInfoSheetOpen}
        onClose={() => setParcelInfoSheetOpen(false)}
        title="택배 이용방법"
        footer={
          <button
            type="button"
            className="return-proposal-review__parcel-confirm"
            onClick={() => {
              setParcelInfoSheetOpen(false)
              if (deliveryMethod === 'parcel') {
                navigate('/found/match-result/quiz/claimants/return-prep/review/parcel')
              } else if (deliveryMethod === 'parcel-store') {
                navigate('/found/match-result/quiz/claimants/return-prep/review/parcel-store')
              }
            }}
          >
            확인
          </button>
        }
      >
        <p className="return-proposal-review__parcel-desc">분실자에게 안전하게 배송돼요.</p>
        <div className="return-proposal-review__parcel-callout">
          <img src={iconInfo} alt="" className="return-proposal-review__parcel-callout-icon" />
          <p className="return-proposal-review__parcel-callout-text">
            미수령 및 반송 부담은 분실자에게 있어요
            <br />
            습득자의 추가 결제는 없어요
          </p>
        </div>
        <div className="return-proposal-review__parcel-steps">
          {PARCEL_STEPS.map((step, index) => (
            <div key={step.id} className="return-proposal-review__parcel-step-wrap">
              {index > 0 && <div className="return-proposal-review__parcel-step-divider" />}
              <div className="return-proposal-review__parcel-step">
                <img src={step.icon} alt="" className="return-proposal-review__parcel-step-icon" />
                <p className="return-proposal-review__parcel-step-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  )
}
