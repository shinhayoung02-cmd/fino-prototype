import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import SuccessGraphic from '../../components/common/SuccessGraphic/SuccessGraphic'
import './OwnershipQuizSubmitted.css'

export default function OwnershipQuizSubmitted({ onGoHome, onViewWaiting, showWaitingButton = true }) {
  const navigate = useNavigate()

  const handleGoHome = () => {
    onGoHome?.()
    navigate('/')
  }

  return (
    <div className="ownership-quiz-submitted">
      <div className="ownership-quiz-submitted__callout">
        <img src={iconInfo} alt="" className="ownership-quiz-submitted__callout-icon" />
        <p className="ownership-quiz-submitted__callout-text">확인 결과가 나오면 알림으로 알려드릴게요.</p>
      </div>

      <div className="ownership-quiz-submitted__body">
        <SuccessGraphic />
        <h2 className="ownership-quiz-submitted__title">확인한 답변을 보냈어요</h2>
        <p className="ownership-quiz-submitted__desc">
          답변을 바탕으로 주인 확인
          <br />
          결과를 안내할게요.
        </p>
      </div>

      <div className="ownership-quiz-submitted__actions">
        {showWaitingButton && (
          <button type="button" className="ownership-quiz-submitted__secondary" onClick={onViewWaiting}>
            대기 화면 보기
          </button>
        )}
        <button type="button" className="ownership-quiz-submitted__primary" onClick={handleGoHome}>
          홈으로
        </button>
      </div>
    </div>
  )
}
