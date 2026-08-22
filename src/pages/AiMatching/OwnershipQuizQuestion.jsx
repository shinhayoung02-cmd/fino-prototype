import { useState } from 'react'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconCheckboxCheck from '../../assets/ai-matching/icon-checkbox-check.svg'
import './OwnershipQuizQuestion.css'

export const ANSWER_OPTIONS = [
  { id: 'correct', title: '맞아요', desc: '실제 물건에서 특징을 확인했어요' },
  { id: 'incorrect', title: '틀려요', desc: '실제 물건과 일치하지 않아요' },
  { id: 'unsure', title: '잘 모르겠어요', desc: '현재 물건만으로는 판단하기 어려워요' },
]

export const QUIZ_STEPS = [
  {
    badge: '1/3',
    titleLines: ['지갑 안쪽이 갈색이고,', '뒷면 오른쪽 아래에 작은 흠집이 있나요?'],
    question: '지갑 안쪽이 갈색이고, 뒷면 오른쪽 아래에 작은 흠집이 있나요?',
    point: '실제 물건의 안쪽 색상과 뒷면의 흠집 위치를 확인해주세요.',
  },
  {
    badge: '2/3',
    titleLines: ['지갑 안에 신한카드와', '교통카드가 함께 들어있나요?'],
    question: '지갑 안에 신한카드와 교통카드가 함께 들어있나요?',
    point: '지갑 안에 해당 카드가 함께 들어있는지 확인해주세요.',
  },
  {
    badge: '3/3',
    titleLines: ['지갑 안쪽에 작은 별 모양 스티커가', '붙어있나요?'],
    question: '지갑 안쪽에 작은 별 모양 스티커가 붙어있나요?',
    point: '지갑 안쪽에 같은 모양의 스티커가 있는지 확인해주세요.',
  },
]

export default function OwnershipQuizQuestion({ answers, onChangeAnswers, onSubmit }) {
  const [stepIndex, setStepIndex] = useState(0)

  const step = QUIZ_STEPS[stepIndex]
  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === QUIZ_STEPS.length - 1
  const selectedId = answers[stepIndex]
  const isNextEnabled = selectedId !== null

  const setSelectedId = (id) => {
    onChangeAnswers(answers.map((answer, index) => (index === stepIndex ? id : answer)))
  }

  const handleNext = () => {
    if (!isNextEnabled) return
    if (isLastStep) {
      onSubmit?.()
    } else {
      setStepIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    setStepIndex((prev) => Math.max(0, prev - 1))
  }

  return (
    <div className="ownership-quiz-question">
      <div className="ownership-quiz-question__badge-row">
        <span className="ownership-quiz-question__step-badge">{step.badge}</span>
      </div>

      <div className="ownership-quiz-question__intro">
        <h2 className="ownership-quiz-question__title">
          {step.titleLines[0]}
          <br />
          {step.titleLines[1]}
        </h2>
        <p className="ownership-quiz-question__desc">분실자가 적어둔 특징을 확인하기 쉬운 질문으로 정리했어요.</p>
      </div>

      <div className="ownership-quiz-question__callout">
        <img src={iconInfo} alt="" className="ownership-quiz-question__callout-icon" />
        <p className="ownership-quiz-question__callout-text">실제 물건을 보고 직접 확인해주세요.</p>
      </div>

      <span className="ownership-quiz-question__point-badge">확인 포인트</span>
      <p className="ownership-quiz-question__hint">{step.point}</p>

      <div className="ownership-quiz-question__options">
        {ANSWER_OPTIONS.map((option) => {
          const isSelected = selectedId === option.id
          return (
            <button
              type="button"
              key={option.id}
              className={`ownership-quiz-question__option${isSelected ? ' ownership-quiz-question__option--selected' : ''}`}
              onClick={() => setSelectedId(option.id)}
            >
              <span className="ownership-quiz-question__option-body">
                <span className="ownership-quiz-question__option-title">{option.title}</span>
                <span className="ownership-quiz-question__option-desc">{option.desc}</span>
              </span>
              <span
                className={`ownership-quiz-question__option-check${isSelected ? ' ownership-quiz-question__option-check--selected' : ''}`}
              >
                {isSelected && <img src={iconCheckboxCheck} alt="" />}
              </span>
            </button>
          )
        })}
      </div>

      <div className="ownership-quiz-question__next-wrap">
        {isFirstStep ? (
          <button
            type="button"
            className="ownership-quiz-question__next ownership-quiz-question__next--full"
            disabled={!isNextEnabled}
            onClick={handleNext}
          >
            다음
          </button>
        ) : (
          <div className="ownership-quiz-question__actions">
            <button type="button" className="ownership-quiz-question__prev" onClick={handlePrev}>
              이전
            </button>
            <button type="button" className="ownership-quiz-question__next" disabled={!isNextEnabled} onClick={handleNext}>
              {isLastStep ? '답변 보내기' : '다음'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
