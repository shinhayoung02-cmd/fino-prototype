import { useState } from 'react'
import receiptImage from '../../assets/ai-matching/samples/matin-kim-receipt.jpg'
import walletUsagePhoto from '../../assets/ai-matching/samples/wallet-usage-photo.jpg'
import walletUnboxingPhoto from '../../assets/ai-matching/samples/wallet-unboxing-photo.jpg'
import iconClose from '../../assets/lost-register/icon-close.svg'
import './SecondaryVerificationQuestion.css'

export const SECONDARY_VERIFICATION_STEPS = [
  {
    badge: '1/3',
    titleLines: ['구매 시점이나 사용 흔적을', '확인할 수 있나요?'],
    sub: '구매 영수증 · 2025.07.15 제출',
    image: receiptImage,
    imageAlt: '구매 영수증',
    resultTitle: '구매 정보가 물건과 비슷해요.',
    resultDesc: '영수증에 구매 날짜와 상품 정보가 확인돼요.',
    point: '실제 물건의 브랜드나 구매 시기와 맞는지 확인해보세요.',
    aiBadgeLabel: 'AI 비교 결과 · 높음',
    question: '구매 시점이나 사용 흔적을 확인할 수 있나요?',
  },
  {
    badge: '2/3',
    titleLines: ['첨부된 자료와 실제 물건이 일치하나요?'],
    sub: '사용 사진 · 2025.07.15 제출',
    image: walletUsagePhoto,
    imageAlt: '사용 사진',
    resultTitle: '사진 속 물건과 특징이 비슷해요.',
    resultDesc: '색상과 형태, 눈에 띄는 특징이 현재 물건과 비슷해요.',
    point: '로고 위치나 재질, 세부 모양도 같은지 확인해보세요.',
    aiBadgeLabel: 'AI 비교 결과 · 높음',
    question: '첨부된 자료와 실제 물건이 일치하나요?',
  },
  {
    badge: '3/3',
    titleLines: ['추가로 확인이 필요한 점이 있나요?'],
    sub: '과거 사용 사진 · 2025.07.15 제출',
    image: walletUnboxingPhoto,
    imageAlt: '과거 사용 사진',
    resultTitle: '사진에서 비슷한 특징을 찾았어요',
    resultDesc: '브랜드와 색상, 외형이 실제 물건과 비슷해요.',
    point: '사진 속 지갑의 브랜드, 색상, 형태가 실제 물건과 같은지 확인해주세요.',
    aiBadgeLabel: 'AI 비교 결과 · 특징 유사',
    question: '추가로 확인이 필요한 점이 있나요?',
  },
]

export const SECONDARY_VERIFICATION_ANSWER_LABELS = {
  confirmed: '확인됐어요.',
  unclear: '판별하기 어려워요.',
}

export default function SecondaryVerificationQuestion({ answers, onChangeAnswers, onSubmit }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [isImageOpen, setIsImageOpen] = useState(false)
  const step = SECONDARY_VERIFICATION_STEPS[stepIndex]
  const isLastStep = stepIndex === SECONDARY_VERIFICATION_STEPS.length - 1
  const isNextEnabled = answers[stepIndex] !== null

  const selectAnswer = (value) => {
    onChangeAnswers(answers.map((answer, index) => (index === stepIndex ? value : answer)))
  }

  const handleNext = () => {
    if (!isNextEnabled) return
    if (isLastStep) {
      onSubmit?.()
    } else {
      setStepIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="secondary-verification-question">
      <div className="secondary-verification-question__badge-row">
        <span className="secondary-verification-question__step-badge">{step.badge}</span>
      </div>

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
            className={`secondary-verification-question__confirm${answers[stepIndex] === 'confirmed' ? ' secondary-verification-question__confirm--selected' : ''}`}
            onClick={() => selectAnswer('confirmed')}
          >
            확인됐어요
          </button>
          <button
            type="button"
            className={`secondary-verification-question__unclear${answers[stepIndex] === 'unclear' ? ' secondary-verification-question__unclear--selected' : ''}`}
            onClick={() => selectAnswer('unclear')}
          >
            판별하기 어려워요
          </button>
        </div>
        <button
          type="button"
          className="secondary-verification-question__next"
          disabled={!isNextEnabled}
          onClick={handleNext}
        >
          다음
        </button>
      </div>
    </div>
  )
}
