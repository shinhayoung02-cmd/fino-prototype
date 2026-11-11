import iconInfo from '../../assets/lost-register/icon-info.svg'
import './QuizStepsReview.css'

// Figma 212:12281 '비공개 특징 퀴즈 최종 확인' 레이아웃 — items: [{ question, answer }]
export default function QuizStepsReview({ title, desc, callout, items, onEdit, onSubmit, submitLabel = '등록하기' }) {
  return (
    <div className="feature-review">
      <h2 className="feature-review__title">{title}</h2>
      <p className="feature-review__desc">{desc}</p>

      <div className="feature-review__callout">
        <img src={iconInfo} alt="" className="feature-review__callout-icon" />
        <p className="feature-review__callout-text">{callout}</p>
      </div>

      <div className="feature-review__list">
        {items.map((item, index) => (
          <div className="feature-review__card" key={index}>
            <span className="feature-review__badge">특징 {index + 1}</span>
            <div className="feature-review__card-body">
              <p className="feature-review__card-question">{item.question}</p>
              <p className="feature-review__card-answer">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="feature-review__action-wrap">
        <button type="button" className="feature-review__edit" onClick={onEdit}>
          수정하기
        </button>
        <button type="button" className="feature-review__register" onClick={onSubmit}>
          {submitLabel}
        </button>
      </div>
    </div>
  )
}
