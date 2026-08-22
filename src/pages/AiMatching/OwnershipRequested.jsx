import { useNavigate } from 'react-router-dom'
import SuccessGraphic from '../../components/common/SuccessGraphic/SuccessGraphic'
import './OwnershipRequested.css'

export default function OwnershipRequested() {
  const navigate = useNavigate()

  return (
    <div className="ownership-requested">
      <div className="ownership-requested__body">
        <SuccessGraphic />
        <h2 className="ownership-requested__title">
          소유권 확인을
          <br />
          요청했어요
        </h2>
        <p className="ownership-requested__desc">확인 결과가 오면 알림으로 알려드릴게요.</p>
      </div>

      <div className="ownership-requested__actions">
        <button
          type="button"
          className="ownership-requested__action ownership-requested__action--secondary"
          onClick={() => navigate('/matching/waiting')}
        >
          대기 화면 보기
        </button>
        <button
          type="button"
          className="ownership-requested__action ownership-requested__action--primary"
          onClick={() => navigate('/matching')}
        >
          확인했어요
        </button>
      </div>
    </div>
  )
}
