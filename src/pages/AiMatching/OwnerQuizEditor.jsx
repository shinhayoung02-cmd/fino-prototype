import { useState } from 'react'
import './OwnerQuiz.css'

// 습득자: AI가 사진에서 만든 주관식 퀴즈를 확인·수정해 등록
export default function OwnerQuizEditor({ initialQuiz, onSubmit }) {
  const [quiz, setQuiz] = useState(initialQuiz)
  const update = (index, key, value) =>
    setQuiz((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)))
  const isValid = quiz.every((item) => item.question.trim() && item.answer.trim())

  return (
    <div className="owner-quiz">
      <div className="owner-quiz__intro">
        <h2 className="owner-quiz__title">
          AI가 만든 퀴즈를
          <br />
          확인해주세요
        </h2>
        <p className="owner-quiz__desc">사진에서 찾은 특징으로 질문과 정답을 만들었어요. 실제 물건과 다르면 고쳐주세요.</p>
      </div>

      {quiz.map((item, index) => (
        <section className="owner-quiz__item" key={index}>
          <div className="owner-quiz__item-head">
            <span className="owner-quiz__step">
              {index + 1}/{quiz.length}
            </span>
            <span className="owner-quiz__ai-tag">AI가 찾은 특징 · {item.feature}</span>
          </div>
          <label className="owner-quiz__label" htmlFor={`owner-quiz-q-${index}`}>
            질문
          </label>
          <input
            id={`owner-quiz-q-${index}`}
            className="owner-quiz__field"
            value={item.question}
            onChange={(event) => update(index, 'question', event.target.value)}
          />
          <label className="owner-quiz__label" htmlFor={`owner-quiz-a-${index}`}>
            정답
          </label>
          <input
            id={`owner-quiz-a-${index}`}
            className="owner-quiz__field"
            value={item.answer}
            onChange={(event) => update(index, 'answer', event.target.value)}
          />
        </section>
      ))}
      <p className="owner-quiz__hint">정답은 분실자에게 보이지 않아요</p>

      <div className="owner-quiz__cta-space" />
      <button type="button" className="owner-quiz__cta" disabled={!isValid} onClick={() => onSubmit?.(quiz)}>
        퀴즈 등록하기
      </button>
    </div>
  )
}
