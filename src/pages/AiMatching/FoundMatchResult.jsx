import iconInfo from '../../assets/lost-register/icon-info.svg'
import './FoundMatchResult.css'

const MATCH_REASONS = ['색상 일치', '형태 유사', '습득 위치 300m 이내']

function CheckBadge() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" className="found-match-result__check" aria-hidden="true">
      <rect width="20" height="20" rx="4" fill="#2a3038" />
      <path d="M6 10.3l2.4 2.4L14 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FoundMatchResult({ onNext }) {
  return (
    <div className="found-match-result">
      <span className="found-match-result__badge">소유권 확인중</span>

      <h2 className="found-match-result__title">AI 매칭 결과가 도착했어요</h2>
      <p className="found-match-result__subtitle">설정한 특징과 실제 물건이 일치하는지 확인해주세요</p>

      <div className="found-match-result__callout">
        <img src={iconInfo} alt="" className="found-match-result__callout-icon" />
        <p className="found-match-result__callout-text">다른 분실자의 개인정보는 공개되지 않아요.</p>
      </div>

      <div className="found-match-result__card">
        <div className="found-match-result__card-meta-row">
          <p className="found-match-result__card-meta">역삼1동 · 반경 500m · 오늘 오전 9~12시</p>
          <span className="found-match-result__card-pill">접수 완료</span>
        </div>
        <p className="found-match-result__card-title">검정 반지갑을 잃어버렸어요</p>
        <p className="found-match-result__card-desc">검정색 Matin Kim 가죽 반지갑</p>
      </div>

      <div className="found-match-result__reasons">
        <p className="found-match-result__reasons-title">AI 매칭 근거</p>
        <ul className="found-match-result__reasons-list">
          {MATCH_REASONS.map((reason) => (
            <li className="found-match-result__reasons-item" key={reason}>
              <CheckBadge />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="found-match-result__next-wrap">
        <button type="button" className="found-match-result__next" onClick={onNext}>
          다음
        </button>
      </div>
    </div>
  )
}
