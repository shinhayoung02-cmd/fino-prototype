import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconSearch from '../../assets/home/icon-search.svg'
import iconRemoveCircle from '../../assets/lost-register/icon-remove-circle.svg'
import './ParcelRecipientInfo.css'

export default function ParcelRecipientInfo() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [addressDetail, setAddressDetail] = useState('')

  const isNextEnabled =
    name.trim().length > 0 && contact.trim().length > 0 && address.trim().length > 0

  return (
    <div className="parcel-recipient-info">
      <h2 className="parcel-recipient-info__title">내 정보를 확인해 주세요</h2>

      <div className="parcel-recipient-info__field-group">
        <p className="parcel-recipient-info__label">이름</p>
        <input
          type="text"
          className="parcel-recipient-info__input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="입력해주세요."
        />
      </div>

      <div className="parcel-recipient-info__field-group">
        <p className="parcel-recipient-info__label">연락처</p>
        <input
          type="tel"
          className="parcel-recipient-info__input"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
          placeholder="입력해주세요."
        />
      </div>

      <div className="parcel-recipient-info__field-group">
        <p className="parcel-recipient-info__label">주소를 입력해주세요</p>
        <div className="parcel-recipient-info__address-stack">
          <div className="parcel-recipient-info__field">
            <input
              type="text"
              className="parcel-recipient-info__field-input"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="주소"
            />
            <img src={iconSearch} alt="" className="parcel-recipient-info__field-icon" />
          </div>
          <div className="parcel-recipient-info__field">
            <input
              type="text"
              className="parcel-recipient-info__field-input"
              value={addressDetail}
              onChange={(event) => setAddressDetail(event.target.value)}
              placeholder="상세주소"
            />
            {addressDetail && (
              <button
                type="button"
                className="parcel-recipient-info__field-clear"
                aria-label="지우기"
                onClick={() => setAddressDetail('')}
              >
                <img src={iconRemoveCircle} alt="" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="parcel-recipient-info__next-wrap">
        <button
          type="button"
          className="parcel-recipient-info__next"
          disabled={!isNextEnabled}
          onClick={() => navigate('/matching/result/ownership/parcel/store/location')}
        >
          다음
        </button>
      </div>
    </div>
  )
}
