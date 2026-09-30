import { useNavigate } from 'react-router-dom'
import './QuizFailedResult.css'

export default function QuizFailedResult() {
  const navigate = useNavigate()

  return (
    <div className="quiz-failed-result">
      <span className="quiz-failed-result__badge">소유권 확인중</span>

      <h2 className="quiz-failed-result__title">
        퀴즈 검증에서
        <br />
        통과하지 못했어요
      </h2>
      <p className="quiz-failed-result__subtitle">습득자가 답변한 결과를 확인하고, 재검증을 요청할 수 있어요.</p>

      <div className="quiz-failed-result__field">
        <p className="quiz-failed-result__field-label">습득자 답변 요약</p>
        <div className="quiz-failed-result__list">
          <div className="quiz-failed-result__row">
            <span className="quiz-failed-result__row-label">물건 색상</span>
            <span className="quiz-failed-result__row-answer">회색 계열이라고 답변</span>
          </div>
          <div className="quiz-failed-result__divider" />
          <div className="quiz-failed-result__row">
            <span className="quiz-failed-result__row-label">특이사항</span>
            <span className="quiz-failed-result__row-answer quiz-failed-result__row-answer--box">스크래치 없다고 답변</span>
          </div>
          <div className="quiz-failed-result__divider" />
          <div className="quiz-failed-result__row">
            <span className="quiz-failed-result__row-label">결과</span>
            <span className="quiz-failed-result__row-badge">불일치 / 불명확</span>
          </div>
        </div>
      </div>

      <div className="quiz-failed-result__actions">
        <button type="button" className="quiz-failed-result__home" onClick={() => navigate('/')}>
          홈으로
        </button>
        <button
          type="button"
          className="quiz-failed-result__retry"
          onClick={() => navigate('/matching/result/ownership/quiz-failed/evidence')}
        >
          재검증 요청하기
        </button>
      </div>
    </div>
  )
}
