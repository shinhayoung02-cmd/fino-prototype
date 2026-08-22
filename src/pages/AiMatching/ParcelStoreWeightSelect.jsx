import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/ai-matching/icon-info-informative.svg'
import './ParcelStoreWeightSelect.css'

const WEIGHT_OPTIONS = [
  { id: 'under-500g', label: '500g 미만' },
  { id: '500g-1kg', label: '500g~1kg 미만' },
  { id: '1kg-5kg', label: '1kg ~ 5kg 미만' },
]

export default function ParcelStoreWeightSelect() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState('under-500g')

  return (
    <div className="parcel-store-weight">
      <div className="parcel-store-weight__intro">
        <h2 className="parcel-store-weight__title">무게를 선택해 주세요</h2>
        <p className="parcel-store-weight__desc">반값택배는 5kg이하만 보낼 수 있어요</p>
      </div>

      <div className="parcel-store-weight__callout">
        <img src={iconInfo} alt="" className="parcel-store-weight__callout-icon" />
        <p className="parcel-store-weight__callout-text">반값택배는 5kg이하만 보낼 수 있어요.</p>
      </div>

      <div className="parcel-store-weight__field">
        <div className="parcel-store-weight__list">
          {WEIGHT_OPTIONS.map((option) => {
            const isSelected = selectedId === option.id
            return (
              <button
                type="button"
                key={option.id}
                className={`parcel-store-weight__option${isSelected ? ' parcel-store-weight__option--selected' : ''}`}
                onClick={() => setSelectedId(option.id)}
              >
                <span className="parcel-store-weight__option-label">{option.label}</span>
                <span
                  className={`parcel-store-weight__radiomark${isSelected ? ' parcel-store-weight__radiomark--selected' : ''}`}
                />
              </button>
            )
          })}
          <div className="parcel-store-weight__option parcel-store-weight__option--empty" />
        </div>
      </div>

      <div className="parcel-store-weight__next-wrap">
        <button
          type="button"
          className="parcel-store-weight__next"
          onClick={() => navigate('/found/match-result/quiz/claimants/return-prep/review/parcel-store/info')}
        >
          다음
        </button>
      </div>
    </div>
  )
}
