import { useState } from 'react'
import './OwnerQuiz.css'

// 분실자: 습득자가 등록한 주관식 퀴즈에 답 입력
export default function OwnerQuizSolve({ quiz, onSubmit }) {
  const [answers, setAnswers] = useState(() => quiz.map(() => ''))
  const isValid = answers.every((answer) => answer.trim())

  return (
    <div className="owner-quiz">
      <div className="owner-quiz__intro">
        <h2 className="owner-quiz__title">
          습득자가 낸 퀴즈를
          <br />
          풀어주세요
        </h2>
        <p className="owner-quiz__desc">물건 주인만 알 수 있는 질문이에요. 기억나는 대로 적어주세요.</p>
      </div>

      {quiz.map((item, index) => (
        <section className="owner-quiz__item" key={index}>
          <div className="owner-quiz__item-head">
            <span className="owner-quiz__step">
              {index + 1}/{quiz.length}
            </span>
          </div>
          <p className="owner-quiz__question">{item.question}</p>
          <input
            className="owner-quiz__field"
            placeholder="답을 입력해주세요"
            value={answers[index]}
            onChange={(event) =>
              setAnswers((prev) => prev.map((answer, i) => (i === index ? event.target.value : answer)))
            }
          />
        </section>
      ))}
      <p className="owner-quiz__hint">AI가 습득자의 정답과 비교해 주인을 확인해요</p>

      <div className="owner-quiz__cta-space" />
      <button type="button" className="owner-quiz__cta" disabled={!isValid} onClick={() => onSubmit?.(answers)}>
        답변 보내기
      </button>
    </div>
  )
}
