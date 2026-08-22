import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import './FeatureReview.css'

const QUESTIONS = [
  '물건에서 확인한 세부 특징이 있나요?',
  '함께 있던 물건이나 부속품이 있나요?',
  '주인만 알 만한 흔적이나 특징이 있나요?',
]

// AI가 사용자가 입력한 답변을 바탕으로 다시 작성한 최종 문구 — 실제 입력 내용과 무관하게 항상 이 문구가 노출된다.
const AI_REWRITTEN_ANSWERS = [
  '지갑 안쪽이 갈색이고, 뒷면 오른쪽 아래에 작은 흠집이 있어요.',
  '지갑 안에 신한카드와 교통카드가 함께 들어있어요.',
  '지갑 안쪽에 작은 별 모양 스티커가 붙어 있어요.',
]

export default function FeatureReview({ answers, onRegister }) {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate('/lost/new/next')
  }

  const handleRegister = () => {
    onRegister?.()
    navigate('/lost/new/done')
  }

  return (
    <div className="feature-review">
      <h2 className="feature-review__title">비공개 특징 퀴즈</h2>
      <p className="feature-review__desc">작성한 특징과 실제 물건이 일치하는지 최종 확인해주세요</p>

      <div className="feature-review__callout">
        <img src={iconInfo} alt="" className="feature-review__callout-icon" />
        <p className="feature-review__callout-text">AI가 작성된 내용 바탕으로 퀴즈를 작성할거에요.</p>
      </div>

      <div className="feature-review__list">
        {QUESTIONS.map((question, index) => (
          <div className="feature-review__card" key={question}>
            <span className="feature-review__badge">질문 {index + 1}</span>
            <div className="feature-review__card-body">
              <p className="feature-review__card-question">{question}</p>
              <p className="feature-review__card-answer">
                {answers?.[index] ? AI_REWRITTEN_ANSWERS[index] : '아직 입력하지 않았어요'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="feature-review__action-wrap">
        <button type="button" className="feature-review__edit" onClick={handleEdit}>
          수정하기
        </button>
        <button type="button" className="feature-review__register" onClick={handleRegister}>
          등록하기
        </button>
      </div>
    </div>
  )
}
