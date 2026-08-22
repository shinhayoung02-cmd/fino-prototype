import { useNavigate } from 'react-router-dom'
import iconCheckPositive from '../../assets/ai-matching/icon-check-positive.svg'
import './OwnershipConfirmed.css'

const STATUS_ROWS = [
  { label: '접수된 소유권 증빙', value: '완료', tone: 'brand' },
  { label: '현재 상태', value: '분실물 전달 가능', tone: 'positive' },
]

export default function OwnershipConfirmed() {
  const navigate = useNavigate()

  return (
    <div className="ownership-confirmed">
      <span className="ownership-confirmed__badge">소유권 확인 완료</span>

      <h2 className="ownership-confirmed__title">
        소유권 승인 권한이
        <br />
        부여 됐어요
      </h2>
      <p className="ownership-confirmed__subtitle">검증이 완료되어 반환 절차를 진행할 수 있어요</p>

      <div className="ownership-confirmed__callout">
        <img src={iconCheckPositive} alt="" className="ownership-confirmed__callout-icon" />
        <p className="ownership-confirmed__callout-text">
          이제 확인된 습득자와 감사 및 전달 방식 절차로 이어집니다.
        </p>
      </div>

      <div className="ownership-confirmed__status">
        <p className="ownership-confirmed__status-label">제출 현황</p>
        <div className="ownership-confirmed__status-list">
          {STATUS_ROWS.map((row) => (
            <div className="ownership-confirmed__status-row" key={row.label}>
              <span className="ownership-confirmed__status-row-label">{row.label}</span>
              <span
                className={`ownership-confirmed__status-badge ownership-confirmed__status-badge--${row.tone}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="ownership-confirmed__actions">
        <button
          type="button"
          className="ownership-confirmed__action"
          onClick={() => navigate('/matching/result/ownership/verified')}
        >
          확인
        </button>
      </div>
    </div>
  )
}
