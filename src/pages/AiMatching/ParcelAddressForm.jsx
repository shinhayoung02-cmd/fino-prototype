import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import iconCheckBrand from '../../assets/ai-matching/icon-check-brand.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './ParcelAddressForm.css'

const ENTRY_OPTIONS = [
  { id: 'password', label: '공동현관 비밀번호' },
  { id: 'free', label: '자유출입 가능' },
]

export default function ParcelAddressForm() {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [entryMethod, setEntryMethod] = useState(null)
  const [note, setNote] = useState('')
  const [isConsentSheetOpen, setConsentSheetOpen] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const allAgreed = agreePrivacy && agreeTerms

  const toggleAll = () => {
    const next = !allAgreed
    setAgreePrivacy(next)
    setAgreeTerms(next)
  }

  const handleConfirmConsent = () => {
    setConsentSheetOpen(false)
    navigate('/matching/result/ownership/proposal-confirm', { state: { deliveryMethod: 'parcel' } })
  }

  return (
    <div className="parcel-address">
      <div className="parcel-address__banner">
        <img src={iconInfo} alt="" className="parcel-address__banner-icon" />
        <p className="parcel-address__banner-text">물건이 발송될 주소는 습득자가 입력해요.</p>
      </div>

      <div className="parcel-address__head">
        <h2 className="parcel-address__title">일반 택배 배송</h2>
        <span className="parcel-address__badge">발송 준비중</span>
      </div>
      <p className="parcel-address__subtitle">습득자는 추가 결제 없이 물건을 보낼 수 있어요.</p>

      <div className="parcel-address__field">
        <p className="parcel-address__field-label">주소를 입력해주세요</p>
        <div className="parcel-address__input-group">
          <div className="parcel-address__input">
            <input
              type="text"
              className="parcel-address__input-field"
              placeholder="주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {address && (
              <button
                type="button"
                className="parcel-address__input-clear"
                aria-label="지우기"
                onClick={() => setAddress('')}
              >
                <img src={iconRemoveCircle} alt="" />
              </button>
            )}
          </div>
          <div className="parcel-address__input">
            <input
              type="text"
              className="parcel-address__input-field"
              placeholder="상세주소"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
            {addressDetail && (
              <button
                type="button"
                className="parcel-address__input-clear"
                aria-label="지우기"
                onClick={() => setAddressDetail('')}
              >
                <img src={iconRemoveCircle} alt="" />
              </button>
            )}
          </div>
        </div>
        <p className="parcel-address__field-helper">상대방에게는 주소가 보이지 않아요</p>
      </div>

      <div className="parcel-address__field">
        <p className="parcel-address__field-label">공동현관 출입방법</p>
        <div className="parcel-address__radio-group">
          {ENTRY_OPTIONS.map((option) => {
            const isSelected = entryMethod === option.id
            return (
              <button
                type="button"
                key={option.id}
                className="parcel-address__radio-row"
                onClick={() => setEntryMethod(option.id)}
              >
                <span
                  className={`parcel-address__radiomark${isSelected ? ' parcel-address__radiomark--selected' : ''}`}
                />
                <span className="parcel-address__radio-label">{option.label}</span>
              </button>
            )
          })}
        </div>
        <p className="parcel-address__field-helper">출입이 불가능한 경우, 배송이 취소될 수 있어요.</p>
      </div>

      <div className="parcel-address__field">
        <p className="parcel-address__field-label">
          주소 특이사항 <span className="parcel-address__field-label-optional">(선택)</span>
        </p>
        <div className="parcel-address__input">
          <input
            type="text"
            className="parcel-address__input-field"
            placeholder="입력해주세요."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      <div className="parcel-address__next-wrap">
        <button type="button" className="parcel-address__submit" onClick={() => setConsentSheetOpen(true)}>
          신청하기
        </button>
      </div>

      <BottomSheet
        isOpen={isConsentSheetOpen}
        onClose={() => setConsentSheetOpen(false)}
        title="꼭 필요한 동의만 넣었어요"
        footer={
          <button
            type="button"
            className="parcel-address__consent-confirm"
            disabled={!allAgreed}
            onClick={handleConfirmConsent}
          >
            확인
          </button>
        }
      >
        <div className="parcel-address__consent-list">
          <button type="button" className="parcel-address__consent-row parcel-address__consent-row--all" onClick={toggleAll}>
            <span className={`parcel-address__checkbox${allAgreed ? ' parcel-address__checkbox--checked' : ''}`}>
              {allAgreed && <img src={iconCheckBrand} alt="" />}
            </span>
            <span className="parcel-address__consent-label parcel-address__consent-label--all">모두 동의</span>
          </button>
          <button
            type="button"
            className="parcel-address__consent-row"
            onClick={() => setAgreePrivacy((prev) => !prev)}
          >
            <span className={`parcel-address__checkbox${agreePrivacy ? ' parcel-address__checkbox--checked' : ''}`}>
              {agreePrivacy && <img src={iconCheckBrand} alt="" />}
            </span>
            <span className="parcel-address__consent-label">[필수] 개인정보 수집 및 이용 동의 (택배예약 서비스)</span>
          </button>
          <button
            type="button"
            className="parcel-address__consent-row"
            onClick={() => setAgreeTerms((prev) => !prev)}
          >
            <span className={`parcel-address__checkbox${agreeTerms ? ' parcel-address__checkbox--checked' : ''}`}>
              {agreeTerms && <img src={iconCheckBrand} alt="" />}
            </span>
            <span className="parcel-address__consent-label">[필수] CJ대한통운 택배 이용약관</span>
          </button>
        </div>
      </BottomSheet>
    </div>
  )
}
