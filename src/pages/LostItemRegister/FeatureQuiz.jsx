import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconClose from '../../assets/lost-register/icon-close.svg'
import iconInfo from '../../assets/ai-matching/icon-info-informative.svg'
import './FeatureQuiz.css'

const STEPS = [
  {
    badge: '1/3',
    title: '물건에서 확인한 세부 특징이 있나요?',
    hint: '예: 안쪽 색상, 뒷면 모양, 숨겨진 표시',
    hintKey: 'photo',
  },
  {
    badge: '2/3',
    title: '함께 있던 물건이나 부속품이 있나요?',
    hint: '예: 키링, 케이스, 카드, 충전기',
    hintKey: 'accessory',
  },
  {
    badge: '3/3',
    title: '주인만 알 만한 흔적이나 특징이 있나요?',
    hint: '예: 흠집, 스티커, 각인, 얼룩',
    hintKey: 'mark',
  },
]

const EMPTY_ANSWERS = STEPS.map(() => '')

export default function FeatureQuiz({ answers, onChangeAnswers, featureHints }) {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [direction, setDirection] = useState('forward')

  const resolvedAnswers = answers ?? EMPTY_ANSWERS
  const step = STEPS[stepIndex]
  const description = resolvedAnswers[stepIndex]
  const bannerText = featureHints?.[step.hintKey]
  const isNextEnabled = description.trim().length > 0
  const isLastStep = stepIndex === STEPS.length - 1

  const setDescription = (value) => {
    onChangeAnswers(resolvedAnswers.map((answer, index) => (index === stepIndex ? value : answer)))
  }

  const handleNext = () => {
    if (!isNextEnabled) return
    if (!isLastStep) {
      setDirection('forward')
      setStepIndex((prev) => prev + 1)
    } else {
      navigate('/lost/new/review')
    }
  }

  const handlePrev = () => {
    setDirection('backward')
    setStepIndex((prev) => Math.max(0, prev - 1))
  }

  return (
    <div className="feature-quiz">
      <div className={`feature-quiz__top feature-quiz__top--${direction}`} key={stepIndex}>
        <div className="feature-quiz__badge-row">
          <span className="feature-quiz__badge">{step.badge}</span>
        </div>
        <h2 className="feature-quiz__title">{step.title}</h2>
        <p className="feature-quiz__hint">{step.hint}</p>
        <div className="feature-quiz__field">
          <input
            type="text"
            className="feature-quiz__field-input"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="설명을 입력해주세요"
          />
          {description && (
            <button
              type="button"
              className="feature-quiz__field-clear"
              aria-label="지우기"
              onClick={() => setDescription('')}
            >
              <img src={iconClose} alt="" />
            </button>
          )}
        </div>
        {bannerText && (
          <div className="feature-quiz__callout">
            <img src={iconInfo} alt="" className="feature-quiz__callout-icon" />
            <p className="feature-quiz__callout-text">{bannerText}</p>
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
          다음
        </button>
      </div>
    </div>
  )
}
