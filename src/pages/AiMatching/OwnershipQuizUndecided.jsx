import iconInfoCritical from '../../assets/found-report/icon-info-critical.svg'
import './OwnershipQuizUndecided.css'

const STATUS_ITEMS = [
  { id: 'first-check', label: '1차 특징 확인', status: '일치하지 않음', tone: 'brand' },
  { id: 'current-status', label: '현재 상태', status: '개인 전달 보류', tone: 'critical' },
]

export default function OwnershipQuizUndecided({ onNext }) {
  return (
    <div className="ownership-quiz-undecided">
      <span className="ownership-quiz-undecided__badge">소유권 확인중</span>

      <div className="ownership-quiz-undecided__intro">
        <h2 className="ownership-quiz-undecided__title">주인 확인이 더 필요해요</h2>
        <p className="ownership-quiz-undecided__desc">습득자의 답변과 등록한 특징이 일치하지 않았어요.</p>
      </div>

      <div className="ownership-quiz-undecided__callout">
        <img src={iconInfoCritical} alt="" className="ownership-quiz-undecided__callout-icon" />
        <p className="ownership-quiz-undecided__callout-text">
          개인 전달은 잠시 보류돼요.
          <br />
          추가 자료를 보내 다시 확인을 요청할 수 있어요.
        </p>
      </div>

      <div className="ownership-quiz-undecided__card">
        <p className="ownership-quiz-undecided__card-meta">서울 마포구 홍대입구역 근처 · 오늘 오전 9~12시</p>
        <p className="ownership-quiz-undecided__card-title">검정 반지갑 습득</p>
        <p className="ownership-quiz-undecided__card-desc">검정색 Matin Kim 가죽 반지갑</p>
      </div>

      <div className="ownership-quiz-undecided__divider" />

      <div className="ownership-quiz-undecided__field">
        <p className="ownership-quiz-undecided__field-label">제출 현황</p>
        <div className="ownership-quiz-undecided__list">
          {STATUS_ITEMS.map((item, index) => (
            <div className="ownership-quiz-undecided__item" key={item.id}>
              {index > 0 && <div className="ownership-quiz-undecided__item-divider" />}
              <div className="ownership-quiz-undecided__item-row">
                <span className="ownership-quiz-undecided__item-label">{item.label}</span>
                <span
                  className={`ownership-quiz-undecided__item-pill ownership-quiz-undecided__item-pill--${item.tone}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="ownership-quiz-undecided__next" onClick={onNext}>
        다음
      </button>
    </div>
  )
}
