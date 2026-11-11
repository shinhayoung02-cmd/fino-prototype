import { useState } from 'react'
import iconClose from '../../assets/lost-register/icon-close.svg'
import iconInfo from '../../assets/ai-matching/icon-info-informative.svg'
import './QuizSteps.css'

// Figma Section 4(1409:49946) '1-Click 비공개 퀴즈' 레이아웃 — 질문 하나씩, 이전/다음
// steps: [{ title, hint }], answers: string[]
export default function QuizSteps({
  steps,
  answers,
  onChangeAnswers,
  callout,
  placeholder = '답을 입력해주세요',
  lastLabel = '다음',
  onDone,
}) {
  const [stepIndex, setStepIndex] = useState(0)
  const [direction, setDirection] = useState('forward')

  const step = steps[stepIndex]
  const value = answers[stepIndex] ?? ''
  const isNextEnabled = value.trim().length > 0
  const isLastStep = stepIndex === steps.length - 1

  const setValue = (next) => onChangeAnswers(answers.map((answer, index) => (index === stepIndex ? next : answer)))

  const handleNext = () => {
    if (!isNextEnabled) return
    if (isLastStep) {
      onDone?.()
      return
    }
    setDirection('forward')
    setStepIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    setDirection('backward')
    setStepIndex((prev) => Math.max(0, prev - 1))
  }

  return (
    <div className="feature-quiz">
      <div className={`feature-quiz__top feature-quiz__top--${direction}`} key={stepIndex}>
        <div className="feature-quiz__badge-row">
          <span className="feature-quiz__badge">
            {stepIndex + 1}/{steps.length}
          </span>
        </div>
        <h2 className="feature-quiz__title">{step.title}</h2>
        <p className="feature-quiz__hint">{step.hint}</p>
        <div className="feature-quiz__field">
          <input
            type="text"
            className="feature-quiz__field-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={placeholder}
          />
          {value && (
            <button type="button" className="feature-quiz__field-clear" aria-label="지우기" onClick={() => setValue('')}>
              <img src={iconClose} alt="" />
            </button>
          )}
        </div>
        {callout && (
          <div className="feature-quiz__callout">
            <img src={iconInfo} alt="" className="feature-quiz__callout-icon" />
            <p className="feature-quiz__callout-text">{callout}</p>
          </div>
        )}
      </div>

      <div className="feature-quiz__action-wrap">
        {stepIndex > 0 && (
          <button type="button" className="feature-quiz__prev" onClick={handlePrev}>
            이전
          </button>
        )}
        <button type="button" className="feature-quiz__next" disabled={!isNextEnabled} onClick={handleNext}>
          {isLastStep ? lastLabel : '다음'}
        </button>
      </div>
    </div>
  )
}
