import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/ai-matching/icon-info-informative.svg'
import iconCheckBrand from '../../assets/ai-matching/icon-check-brand.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './ParcelBoxSizeSelect.css'

const BOX_SIZE_OPTIONS = [
  { id: '80', label: '80cm 이하' },
  { id: '100', label: '100cm 이하' },
  { id: '120', label: '120cm 이하' },
]

export default function ParcelBoxSizeSelect() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState('80')
  const [isConsentSheetOpen, setConsentSheetOpen] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const allAgreed = agreePrivacy && agreeTerms

  const toggleAll = () => {
    const next = !allAgreed
    setAgreePrivacy(next)
    setAgreeTerms(next)
  }

  return (
    <div className="parcel-box-size">
      <div className="parcel-box-size__intro">
        <h2 className="parcel-box-size__title">박스의 크기를 알려주세요</h2>
        <p className="parcel-box-size__desc">가로+세로+높이를 더한 크기를 선택해 주세요.</p>
      </div>

      <div className="parcel-box-size__callout">
        <img src={iconInfo} alt="" className="parcel-box-size__callout-icon" />
        <p className="parcel-box-size__callout-text">운동화 박스가 80cm 정도예요.</p>
      </div>

      <div className="parcel-box-size__field">
        <div className="parcel-box-size__list">
          {BOX_SIZE_OPTIONS.map((option) => {
            const isSelected = selectedId === option.id
            return (
              <button
                type="button"
                key={option.id}
                className={`parcel-box-size__option${isSelected ? ' parcel-box-size__option--selected' : ''}`}
                onClick={() => setSelectedId(option.id)}
              >
                <span className="parcel-box-size__option-label">{option.label}</span>
                <span
                  className={`parcel-box-size__radiomark${isSelected ? ' parcel-box-size__radiomark--selected' : ''}`}
                />
              </button>
            )
          })}
        </div>
      </div>

      <div className="parcel-box-size__next-wrap">
        <button type="button" className="parcel-box-size__next" onClick={() => setConsentSheetOpen(true)}>
          다음
        </button>
      </div>

      <BottomSheet
        isOpen={isConsentSheetOpen}
        onClose={() => setConsentSheetOpen(false)}
        title="꼭 필요한 동의만 넣었어요"
        footer={
          <button
            type="button"
            className="parcel-box-size__consent-confirm"
            disabled={!allAgreed}
            onClick={() => {
              setConsentSheetOpen(false)
              navigate('/found/match-result/quiz/claimants/return-prep/review/parcel/confirm')
            }}
          >
            확인
          </button>
        }
      >
        <div className="parcel-box-size__consent-list">
          <button
            type="button"
            className="parcel-box-size__consent-row parcel-box-size__consent-row--all"
            onClick={toggleAll}
          >
            <span className={`parcel-box-size__checkbox${allAgreed ? ' parcel-box-size__checkbox--checked' : ''}`}>
              {allAgreed && <img src={iconCheckBrand} alt="" />}
            </span>
            <span className="parcel-box-size__consent-label parcel-box-size__consent-label--all">모두 동의</span>
          </button>
          <button
            type="button"
            className="parcel-box-size__consent-row"
            onClick={() => setAgreePrivacy((prev) => !prev)}
          >
            <span className={`parcel-box-size__checkbox${agreePrivacy ? ' parcel-box-size__checkbox--checked' : ''}`}>
              {agreePrivacy && <img src={iconCheckBrand} alt="" />}
            </span>
            <span className="parcel-box-size__consent-label">[필수] 개인정보 수집 및 이용 동의 (택배예약 서비스)</span>
          </button>
          <button
            type="button"
            className="parcel-box-size__consent-row"
            onClick={() => setAgreeTerms((prev) => !prev)}
          >
            <span className={`parcel-box-size__checkbox${agreeTerms ? ' parcel-box-size__checkbox--checked' : ''}`}>
              {agreeTerms && <img src={iconCheckBrand} alt="" />}
            </span>
            <span className="parcel-box-size__consent-label">[필수] CJ대한통운 택배 이용약관</span>
          </button>
        </div>
      </BottomSheet>
    </div>
  )
}
