import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconSearchMuted from '../../assets/ai-matching/icon-search-muted.svg'
import iconRemoveCircle from '../../assets/location-picker/icon-remove-circle.svg'
import './ParcelStoreInfoForm.css'

export default function ParcelStoreInfoForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [addressDetail, setAddressDetail] = useState('')

  return (
    <div className="parcel-store-info-form">
      <h2 className="parcel-store-info-form__title">내 정보를 확인해 주세요</h2>

      <div className="parcel-store-info-form__field">
        <p className="parcel-store-info-form__field-label">이름</p>
        <div className="parcel-store-info-form__input">
          <input
            type="text"
            className="parcel-store-info-form__input-field"
            placeholder="입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="parcel-store-info-form__field">
        <p className="parcel-store-info-form__field-label">연락처</p>
        <div className="parcel-store-info-form__input">
          <input
            type="text"
            className="parcel-store-info-form__input-field"
            placeholder="입력해주세요."
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
      </div>

      <div className="parcel-store-info-form__field">
        <p className="parcel-store-info-form__field-label">주소를 입력해주세요</p>
        <div className="parcel-store-info-form__input-group">
          <div className="parcel-store-info-form__input">
            <input
              type="text"
              className="parcel-store-info-form__input-field"
              placeholder="주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <img src={iconSearchMuted} alt="" className="parcel-store-info-form__input-suffix" />
          </div>
          <div className="parcel-store-info-form__input">
            <input
              type="text"
              className="parcel-store-info-form__input-field"
              placeholder="상세주소"
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
            <img src={iconRemoveCircle} alt="" className="parcel-store-info-form__input-suffix" />
          </div>
        </div>
      </div>

      <div className="parcel-store-info-form__next-wrap">
        <button
          type="button"
          className="parcel-store-info-form__next"
          onClick={() => navigate('/found/match-result/quiz/claimants/return-prep/review/parcel-store/store')}
        >
          다음
        </button>
      </div>
    </div>
  )
}
