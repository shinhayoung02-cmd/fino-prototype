import iconInfo from '../../assets/lost-register/icon-info.svg'
import './OwnershipQuizWaiting.css'

const STATUS_ITEMS = [
  { id: 'feature-check', label: '비공개 특징 확인', status: '완료', tone: 'done' },
  { id: 'answer-submit', label: '답변 제출', status: '완료', tone: 'done' },
  { id: 'current-status', label: '현재 상태', status: '결과 대기중', tone: 'pending' },
]

export default function OwnershipQuizWaiting({ onConfirm }) {
  return (
    <div className="ownership-quiz-waiting">
      <span className="ownership-quiz-waiting__badge">확인 결과 대기중</span>

      <div className="ownership-quiz-waiting__intro">
        <h2 className="ownership-quiz-waiting__title">
          제출한 답변을
          <br />
          확인하고 있어요
        </h2>
        <p className="ownership-quiz-waiting__desc">실제 물건과 비교해 답한 내용을 바탕으로 주인을 확인하고 있어요.</p>
      </div>

      <div className="ownership-quiz-waiting__callout">
        <img src={iconInfo} alt="" className="ownership-quiz-waiting__callout-icon" />
        <p className="ownership-quiz-waiting__callout-text">확인 결과가 나오면 알림으로 알려드릴게요.</p>
      </div>

      <div className="ownership-quiz-waiting__field">
        <p className="ownership-quiz-waiting__field-label">제출 현황</p>
        <div className="ownership-quiz-waiting__list">
          {STATUS_ITEMS.map((item, index) => (
            <div className="ownership-quiz-waiting__item" key={item.id}>
              {index > 0 && <div className="ownership-quiz-waiting__divider" />}
              <div className="ownership-quiz-waiting__item-row">
                <span className="ownership-quiz-waiting__item-label">{item.label}</span>
                <span
                  className={`ownership-quiz-waiting__item-pill ownership-quiz-waiting__item-pill--${item.tone}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ownership-quiz-waiting__next-wrap">
        <button type="button" className="ownership-quiz-waiting__next" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  )
}
