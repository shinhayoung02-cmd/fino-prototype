import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import CancelRequestModal from '../../components/common/CancelRequestModal/CancelRequestModal'
import './FinderReviewing.css'

export default function FinderReviewing() {
  const navigate = useNavigate()
  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false)

  const handleCancelRequest = () => {
    setCancelDialogOpen(false)
    navigate('/matching')
  }

  return (
    <div className="finder-reviewing">
      <span className="finder-reviewing__badge">습득자 확인중</span>

      <h2 className="finder-reviewing__title">
        습득자가 물건의
        <br />
        특징을 확인하고 있어요
      </h2>
      <p className="finder-reviewing__subtitle">분실할 때 등록한 비공개 표시와 실제 물건을 비교해요</p>

      <div className="finder-reviewing__callout">
        <img src={iconInfo} alt="" className="finder-reviewing__callout-icon" />
        <p className="finder-reviewing__callout-text">비공개 정보는 소유권 검증 목적으로만 사용돼요.</p>
      </div>

      <div className="finder-reviewing__status">
        <p className="finder-reviewing__status-label">제출 현황</p>
        <div className="finder-reviewing__status-list">
          <div className="finder-reviewing__status-row">
            <span className="finder-reviewing__status-row-label">제출한 증빙 접수</span>
            <span className="finder-reviewing__status-badge finder-reviewing__status-badge--done">완료</span>
          </div>
          <div className="finder-reviewing__status-divider" />
          <div className="finder-reviewing__status-row">
            <span className="finder-reviewing__status-row-label">현재 상태</span>
            <span className="finder-reviewing__status-badge finder-reviewing__status-badge--pending">대기 중</span>
          </div>
        </div>
      </div>

      <div className="finder-reviewing__actions">
        <button
          type="button"
          className="finder-reviewing__action finder-reviewing__action--secondary"
          onClick={() => setCancelDialogOpen(true)}
        >
          요청 취소하기
        </button>
        <button
          type="button"
          className="finder-reviewing__action finder-reviewing__action--primary"
          onClick={() => navigate('/')}
        >
          홈으로
        </button>
      </div>

      <CancelRequestModal
        isOpen={isCancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        onConfirm={handleCancelRequest}
      />
    </div>
  )
}
