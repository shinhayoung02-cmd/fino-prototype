import { useNavigate } from 'react-router-dom'
import './OwnershipVerified.css'

const ANSWER_SUMMARY = [
  { label: '현재 상태 물건 색상', value: '회색 계열이라고 답변', tone: 'muted' },
  { label: '특이사항', value: '스크래치 없다고 답변', tone: 'muted' },
  { label: '결과', value: '불일치 / 불명확', tone: 'critical' },
]

export default function QuizVerificationFailed() {
  const navigate = useNavigate()

  return (
    <div className="ownership-verified">
      <span className="ownership-verified__badge">소유권 확인중</span>

      <h2 className="ownership-verified__title">
        퀴즈 검증에서
        <br />
        통과하지 못했어요
      </h2>
      <p className="ownership-verified__subtitle">습득자가 답변한 결과를 확인하고, 재검증을 요청할 수 있어요.</p>

      <div className="ownership-verified__summary">
        <p className="ownership-verified__summary-label">습득자 답변 요약</p>
        <div className="ownership-verified__summary-list">
          {ANSWER_SUMMARY.map((row) => (
            <div className="ownership-verified__summary-row" key={row.label}>
              <span className="ownership-verified__summary-row-label">{row.label}</span>
              <span
                className={`ownership-verified__summary-row-value ownership-verified__summary-row-value--${row.tone}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="ownership-verified__actions ownership-verified__actions--stacked">
        <button
          type="button"
          className="ownership-verified__action ownership-verified__action--secondary"
          onClick={() => navigate('/')}
        >
          홈으로
        </button>
        <button
          type="button"
          className="ownership-verified__action"
          onClick={() => navigate('/matching/result/ownership/evidence')}
        >
          재검증 요청하기
        </button>
      </div>
    </div>
  )
}
