import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import './ThanksMethodSelect.css'

export const THANKS_OPTIONS = [
  { id: 'coffee', title: '커피 1잔', desc: '따뜻한 커피 한 잔으로 고마운 마음을 전해요' },
  { id: 'snack', title: '편의점 간식', desc: '간단한 간식으로 고마운 마음을 전해요' },
  { id: 'dessert', title: '디저트 1개', desc: '달콤한 디저트로 고마운 마음을 전해요' },
]

export default function ThanksMethodSelect({ value = 'coffee', onConfirm }) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(value)

  return (
    <div className="thanks-method">
      <h2 className="thanks-method__title">어떻게 고마운 마음을 전할까요?</h2>
      <p className="thanks-method__subtitle">물건을 돌려받은 뒤 습득자에게 전달할 감사를 선택해주세요.</p>

      <div className="thanks-method__callout">
        <img src={iconInfo} alt="" className="thanks-method__callout-icon" />
        <p className="thanks-method__callout-text">감사는 물건을 돌려받은 뒤 전달돼요</p>
      </div>

      <div className="thanks-method__options">
        {THANKS_OPTIONS.map((option) => {
          const isSelected = selectedId === option.id
          return (
            <button
              type="button"
              key={option.id}
              className={`thanks-method__option${isSelected ? ' thanks-method__option--selected' : ''}`}
              onClick={() => setSelectedId(option.id)}
            >
              <span className="thanks-method__option-body">
                <span className="thanks-method__option-title">{option.title}</span>
                <span className="thanks-method__option-desc">{option.desc}</span>
              </span>
              <span
                className={`thanks-method__option-radio${isSelected ? ' thanks-method__option-radio--selected' : ''}`}
              />
            </button>
          )
        })}
      </div>

      <div className="thanks-method__next-wrap">
        <button
          type="button"
          className="thanks-method__next"
          onClick={() => {
            onConfirm?.(selectedId)
            navigate('/matching/result/ownership/delivery')
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
