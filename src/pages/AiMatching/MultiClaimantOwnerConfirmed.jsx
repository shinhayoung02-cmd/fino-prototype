import iconInfoPositive from '../../assets/ai-matching/icon-info-positive.svg'
import './MultiClaimantOwnerConfirmed.css'

const STATUS_ITEMS = [
  { id: 'ownership-proof', label: '접수된 소유권 증빙', status: '완료', tone: 'brand' },
  { id: 'current-status', label: '현재 상태', status: '분실물 전달 가능', tone: 'positive' },
]

export default function MultiClaimantOwnerConfirmed({ onConfirm }) {
  return (
    <div className="multi-claimant-owner-confirmed">
      <span className="multi-claimant-owner-confirmed__badge">소유권 확인중</span>

      <div className="multi-claimant-owner-confirmed__intro">
        <h2 className="multi-claimant-owner-confirmed__title">최종 주인이 확인됐어요</h2>
        <p className="multi-claimant-owner-confirmed__desc">검증이 완료되어 반환 절차를 진행할 수 있어요</p>
      </div>

      <div className="multi-claimant-owner-confirmed__callout">
        <img src={iconInfoPositive} alt="" className="multi-claimant-owner-confirmed__callout-icon" />
        <p className="multi-claimant-owner-confirmed__callout-text">
          이제 확인된 분실자와 감사 및 전달 방식
          <br />
          절차로 이어집니다.
        </p>
      </div>

      <div className="multi-claimant-owner-confirmed__card">
        <p className="multi-claimant-owner-confirmed__card-meta">서울 마포구 홍대입구역 근처 · 오늘 오전 9~12시</p>
        <p className="multi-claimant-owner-confirmed__card-title">검정 반지갑 습득</p>
        <p className="multi-claimant-owner-confirmed__card-desc">검정색 Matin Kim 가죽 반지갑</p>
      </div>

      <div className="multi-claimant-owner-confirmed__divider" />

      <div className="multi-claimant-owner-confirmed__field">
        <p className="multi-claimant-owner-confirmed__field-label">제출 현황</p>
        <div className="multi-claimant-owner-confirmed__list">
          {STATUS_ITEMS.map((item, index) => (
            <div className="multi-claimant-owner-confirmed__item" key={item.id}>
              {index > 0 && <div className="multi-claimant-owner-confirmed__item-divider" />}
              <div className="multi-claimant-owner-confirmed__item-row">
                <span className="multi-claimant-owner-confirmed__item-label">{item.label}</span>
                <span
                  className={`multi-claimant-owner-confirmed__item-pill multi-claimant-owner-confirmed__item-pill--${item.tone}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="multi-claimant-owner-confirmed__next-wrap">
        <button type="button" className="multi-claimant-owner-confirmed__next" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  )
}
