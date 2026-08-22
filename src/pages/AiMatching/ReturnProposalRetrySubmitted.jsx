import iconInfo from '../../assets/lost-register/icon-info.svg'
import SuccessGraphic from '../../components/common/SuccessGraphic/SuccessGraphic'
import './ReturnProposalRetrySubmitted.css'

export default function ReturnProposalRetrySubmitted({ onViewWaiting, onGoHome }) {
  return (
    <div className="retry-submitted">
      <div className="retry-submitted__callout">
        <img src={iconInfo} alt="" className="retry-submitted__callout-icon" />
        <p className="retry-submitted__callout-text">확인 결과가 나오면 알림으로 알려드릴게요.</p>
      </div>

      <div className="retry-submitted__body">
        <SuccessGraphic />
        <h2 className="retry-submitted__title">작성한 답변을 보냈어요</h2>
        <p className="retry-submitted__desc">
          답변을 바탕으로 주인 확인
          <br />
          결과를 안내할게요.
        </p>
      </div>

      <div className="retry-submitted__actions">
        <button type="button" className="retry-submitted__secondary" onClick={onViewWaiting}>
          대기 화면 보기
        </button>
        <button type="button" className="retry-submitted__primary" onClick={onGoHome}>
          홈으로
        </button>
      </div>
    </div>
  )
}
