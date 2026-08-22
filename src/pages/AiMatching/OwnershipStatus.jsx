import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import './OwnershipStatus.css'

const STATUS_ROWS = [
  { label: '소유권 확인 요청', value: '완료', tone: 'done' },
  { label: '현재 상태', value: '검토 중', tone: 'pending' },
]

export default function OwnershipStatus({ onGoHome }) {
  const navigate = useNavigate()

  return (
    <div className="ownership-status">
      <span className="ownership-status__badge">소유권 확인중</span>

      <h2 className="ownership-status__title">
        동일 물건에 여러 명이
        <br />
        소유권을 주장하고 있어요
      </h2>
      <p className="ownership-status__subtitle">각자 제출한 정보를 비교해 주인을 확인하고 있어요.</p>

      <div className="ownership-status__callout">
        <img src={iconInfo} alt="" className="ownership-status__callout-icon" />
        <p className="ownership-status__callout-text">
          검증 결과에 따라 반환 절차가 시작되거나 공공 인계로 전환될 수 있어요.
        </p>
      </div>

      <div className="ownership-status__status">
        <p className="ownership-status__status-label">제출 현황</p>
        <div className="ownership-status__status-list">
          {STATUS_ROWS.map((row) => (
            <div className="ownership-status__status-row" key={row.label}>
              <span className="ownership-status__status-row-label">{row.label}</span>
              <span
                className={`ownership-status__status-badge ownership-status__status-badge--${row.tone}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="ownership-status__actions">
        <button
          type="button"
          className="ownership-status__action ownership-status__action--secondary"
          onClick={onGoHome}
        >
          홈으로
        </button>
        <button
          type="button"
          className="ownership-status__action ownership-status__action--primary"
          onClick={() => navigate('/matching/result/ownership/evidence')}
        >
          다음
        </button>
      </div>
    </div>
  )
}
