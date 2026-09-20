import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import './FeatureReview.css'

const QUESTIONS = [
  '물건에서 확인한 세부 특징이 있나요?',
  '함께 있던 물건이나 부속품이 있나요?',
  '주인만 알 만한 흔적이나 특징이 있나요?',
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
      <p className="feature-review__desc">설정한 특징과 실제 물건이 일치하는지 최종 확인해주세요</p>

      <div className="feature-review__callout">
        <img src={iconInfo} alt="" className="feature-review__callout-icon" />
        <p className="feature-review__callout-text">AI가 작성된 내용 바탕으로 퀴즈를 작성할거에요.</p>
      </div>

      <div className="feature-review__list">
        {QUESTIONS.map((question, index) => (
          <div className="feature-review__card" key={question}>
            <span className="feature-review__badge">특징 {index + 1}</span>
            <div className="feature-review__card-body">
              <p className="feature-review__card-question">{question}</p>
              <p className="feature-review__card-answer">
                {answers?.[index] || '아직 입력하지 않았어요'}
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
