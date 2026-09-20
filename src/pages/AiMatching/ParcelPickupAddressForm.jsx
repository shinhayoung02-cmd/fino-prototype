import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconSearchMuted from '../../assets/ai-matching/icon-search-muted.svg'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import './ParcelPickupAddressForm.css'

const ENTRY_OPTIONS = [
  { id: 'password', label: '공동현관 비밀번호' },
  { id: 'free', label: '자유출입 가능' },
]

export default function ParcelPickupAddressForm() {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [entryMethod, setEntryMethod] = useState(null)
  const [note, setNote] = useState('')
  const [showErrors, setShowErrors] = useState(false)

  const isNextEnabled = address.trim().length > 0 && addressDetail.trim().length > 0 && entryMethod !== null

  const handleNext = () => {
    if (!isNextEnabled) {
      setShowErrors(true)
      return
    }
    navigate('/found/match-result/quiz/claimants/return-prep/review/parcel/box-size')
  }

  return (
    <div className="parcel-pickup-address-form">
      <div className="parcel-pickup-address-form__intro">
        <div className="parcel-pickup-address-form__title-row">
          <p className="parcel-pickup-address-form__title">일반택배 배송</p>
          <span className="parcel-pickup-address-form__badge">반환 접수</span>
        </div>
        <p className="parcel-pickup-address-form__subtitle">집 앞에 내놓기만 하면 분실자에게 안전하게 배송돼요.</p>
      </div>

      <div className="parcel-pickup-address-form__field">
        <p className="parcel-pickup-address-form__field-label">주소를 입력해주세요</p>
        <div className="parcel-pickup-address-form__input-group">
          <div
            className={`parcel-pickup-address-form__input${
              showErrors && !address.trim() ? ' parcel-pickup-address-form__input--error' : ''
            }`}
          >
            <input
              type="text"
              className="parcel-pickup-address-form__input-field"
              placeholder="주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <img src={iconSearchMuted} alt="" className="parcel-pickup-address-form__input-suffix" />
          </div>
          <div
            className={`parcel-pickup-address-form__input${
              showErrors && !addressDetail.trim() ? ' parcel-pickup-address-form__input--error' : ''
            }`}
          >
            <input
              type="text"
              className="parcel-pickup-address-form__input-field"
              placeholder="상세주소"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
            <img src={iconRemoveCircle} alt="" className="parcel-pickup-address-form__input-suffix" />
          </div>
        </div>
      </div>

      <div className="parcel-pickup-address-form__field">
        <p className="parcel-pickup-address-form__field-label">공동현관 출입방법</p>
        <div
          className={`parcel-pickup-address-form__radio-group${
            showErrors && entryMethod === null ? ' parcel-pickup-address-form__radio-group--error' : ''
          }`}
        >
          {ENTRY_OPTIONS.map((option) => {
            const isSelected = entryMethod === option.id
            return (
              <button
                type="button"
                key={option.id}
                className="parcel-pickup-address-form__radio-row"
                onClick={() => setEntryMethod(option.id)}
              >
                <span
                  className={`parcel-pickup-address-form__radiomark${isSelected ? ' parcel-pickup-address-form__radiomark--selected' : ''}`}
                />
                <span className="parcel-pickup-address-form__radio-label">{option.label}</span>
              </button>
            )
          })}
        </div>
        <p className="parcel-pickup-address-form__field-helper">출입이 불가능한 경우, 배송이 취소될 수 있어요.</p>
      </div>

      <div className="parcel-pickup-address-form__field">
        <p className="parcel-pickup-address-form__field-label">
          주소 특이사항 <span className="parcel-pickup-address-form__field-label-optional">(선택)</span>
        </p>
        <div className="parcel-pickup-address-form__input">
          <input
            type="text"
            className="parcel-pickup-address-form__input-field"
            placeholder="입력해주세요."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      <div className="parcel-pickup-address-form__next-wrap">
        <button type="button" className="parcel-pickup-address-form__next" onClick={handleNext}>
          다음
        </button>
      </div>
    </div>
  )
}
