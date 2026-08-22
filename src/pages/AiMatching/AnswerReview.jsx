import iconInfo from '../../assets/lost-register/icon-info.svg'
import './AnswerReview.css'

export default function AnswerReview({
  title = '입력한 답변을 확인해주세요',
  subtitle = '습득자가 입력한 비공개 특징을 실제 물건과 비교해주세요',
  calloutText = 'AI가 습득자 설명을 바탕으로 정리한 내용이에요',
  cards,
  onEdit,
  onSubmit,
}) {
  return (
    <div className="answer-review">
      <h2 className="answer-review__title">{title}</h2>
      <p className="answer-review__subtitle">{subtitle}</p>

      <div className="answer-review__callout">
        <img src={iconInfo} alt="" className="answer-review__callout-icon" />
        <p className="answer-review__callout-text">{calloutText}</p>
      </div>

      <div className="answer-review__cards">
        {cards.map((card, index) => (
          <div className="answer-review__card" key={card.question}>
            <span className="answer-review__card-badge">답변 {index + 1}</span>
            <div className="answer-review__card-body">
              <p className="answer-review__card-question">{card.question}</p>
              <p className="answer-review__card-answer">{card.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="answer-review__actions">
        <button type="button" className="answer-review__edit" onClick={onEdit}>
          수정하기
        </button>
        <button type="button" className="answer-review__submit" onClick={onSubmit}>
          제출하기
        </button>
      </div>
    </div>
  )
}
