import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Checkbox } from '@seed-design/react'
import { IconCheckmarkFatFill } from '@karrotmarket/react-monochrome-icon'
import iconInfo from '../../assets/lost-register/icon-info-blue.svg'
import './ThanksMethodSelect.css'

export const THANKS_OPTIONS = [
  { id: 'coffee', title: '커피 1잔', desc: '따뜻한 커피 한 잔으로 고마운 마음을 전해요' },
  { id: 'snack', title: '편의점 간식', desc: '간단한 간식으로 고마운 마음을 전해요' },
  { id: 'dessert', title: '디저트 1개', desc: '달콤한 디저트로 고마운 마음을 전해요' },
  { id: 'message', title: '감사 메시지 보내기', desc: '따뜻한 메시지로 고마운 마음을 전해요' },
]

// 감사 방식은 SEED Checkbox로 복수 선택
export default function ThanksMethodSelect({ value = ['coffee'], message: initialMessage = '', onConfirm }) {
  const navigate = useNavigate()
  const [selectedIds, setSelectedIds] = useState(() => [].concat(value))
  const [message, setMessage] = useState(initialMessage)
  const hasMessage = selectedIds.includes('message')
  const isNextDisabled = selectedIds.length === 0 || (hasMessage && !message.trim())
  const toggle = (id, checked) =>
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))

  return (
    <div className="thanks-method">
      <h2 className="thanks-method__title">어떻게 고마운 마음을 전할까요?</h2>
      <p className="thanks-method__subtitle">물건을 돌려받은 뒤 습득자에게 전달할 감사를 선택해주세요. 여러 개 고를 수 있어요.</p>

      <div className="thanks-method__callout">
        <img src={iconInfo} alt="" className="thanks-method__callout-icon" />
        <p className="thanks-method__callout-text">감사는 물건을 돌려받은 뒤 전달돼요</p>
      </div>

      <div className="thanks-method__options">
        {THANKS_OPTIONS.map((option) => {
          const isSelected = selectedIds.includes(option.id)
          return (
            <Checkbox.Root
              key={option.id}
              size="large"
              tone="brand"
              checked={isSelected}
              onCheckedChange={(checked) => toggle(option.id, checked)}
              className={`thanks-method__option${isSelected ? ' thanks-method__option--selected' : ''}`}
            >
              <span className="thanks-method__option-body">
                <span className="thanks-method__option-title">{option.title}</span>
                <span className="thanks-method__option-desc">{option.desc}</span>
              </span>
              <Checkbox.Control>
                <Checkbox.Indicator checked={<IconCheckmarkFatFill />} />
              </Checkbox.Control>
              <Checkbox.HiddenInput />
            </Checkbox.Root>
          )
        })}
        {hasMessage && (
          <textarea
            className="thanks-method__message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="습득자에게 전할 감사 메시지를 적어주세요"
            maxLength={200}
            rows={4}
          />
        )}
      </div>

      <div className="thanks-method__next-wrap">
        <button
          type="button"
          className="thanks-method__next"
          disabled={isNextDisabled}
          onClick={() => {
            onConfirm?.(selectedIds, hasMessage ? message.trim() : '')
            navigate('/matching/result/ownership/delivery')
          }}
        >
          다음
        </button>
      </div>
    </div>
  )
}
