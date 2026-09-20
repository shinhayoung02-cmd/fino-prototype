import { useState } from 'react'
import iconClose from '../../assets/lost-register/icon-close.svg'
import { ITEM_PROFILES } from '../../data/itemProfiles'
import './SecondaryVerificationQuestion.css'

export const SECONDARY_VERIFICATION_STEPS = ITEM_PROFILES['wallet-normal'].secondaryVerificationSteps

export const SECONDARY_VERIFICATION_ANSWER_LABELS = {
  confirmed: '확인됐어요.',
  unclear: '판별하기 어려워요.',
}

export default function SecondaryVerificationQuestion({ answers, onChangeAnswers, onSubmit, steps = SECONDARY_VERIFICATION_STEPS }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [isImageOpen, setIsImageOpen] = useState(false)
  const step = steps[stepIndex]
  const isLastStep = stepIndex === steps.length - 1

  const handleAnswer = (value) => {
    onChangeAnswers(answers.map((answer, index) => (index === stepIndex ? value : answer)))
    if (isLastStep) {
      onSubmit?.()
    } else {
      setStepIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="secondary-verification-question">
      {step.progressStyle === 'dots' ? (
        <div className="secondary-verification-question__progress">
          {steps.map((verificationStep, index) => (
            <span
              key={verificationStep.badge}
              className={`secondary-verification-question__progress-dot${
                index === stepIndex ? ' secondary-verification-question__progress-dot--active' : ''
              }`}
            />
          ))}
        </div>
      ) : (
        <div className="secondary-verification-question__badge-row">
          <span className="secondary-verification-question__step-badge">{step.badge}</span>
        </div>
      )}

      <div className="secondary-verification-question__intro">
        <h2 className="secondary-verification-question__title">
          {step.titleLines.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </h2>
        <p className="secondary-verification-question__sub">{step.sub}</p>
      </div>

      <span className="secondary-verification-question__ai-badge">{step.aiBadgeLabel}</span>

      <button
        type="button"
        className="secondary-verification-question__image-frame"
        onClick={() => setIsImageOpen(true)}
      >
        <img src={step.image} alt={step.imageAlt} className="secondary-verification-question__image" />
      </button>

      {isImageOpen && (
        <div
          className="secondary-verification-question__image-overlay"
          onClick={() => setIsImageOpen(false)}
        >
          <button
            type="button"
            className="secondary-verification-question__image-overlay-close"
            onClick={() => setIsImageOpen(false)}
            aria-label="닫기"
          >
            <img src={iconClose} alt="" />
          </button>
          <img
            src={step.image}
            alt={step.imageAlt}
            className="secondary-verification-question__image-overlay-img"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      <p className="secondary-verification-question__result-title">{step.resultTitle}</p>
      <p className="secondary-verification-question__result-desc">{step.resultDesc}</p>

      <span className="secondary-verification-question__point-badge">확인 포인트</span>
      <p className="secondary-verification-question__point-desc">{step.point}</p>

      <div className="secondary-verification-question__actions-wrap">
        <div className="secondary-verification-question__actions">
          <button
            type="button"
            className={`secondary-verification-question__confirm${step.buttonStyle === 'fixed' ? ' secondary-verification-question__confirm--fixed' : ''}`}
            onClick={() => handleAnswer('confirmed')}
          >
            확인됐어요
          </button>
          <button
            type="button"
            className={`secondary-verification-question__unclear${step.buttonStyle === 'fixed' ? ' secondary-verification-question__unclear--fixed' : ''}`}
            onClick={() => handleAnswer('unclear')}
          >
            판별하기 어려워요
          </button>
        </div>
        {step.showNextLabel && <span className="secondary-verification-question__next-label">다음</span>}
      </div>
    </div>
  )
}
