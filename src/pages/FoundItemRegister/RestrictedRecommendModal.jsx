import '../../components/common/Modal/Modal.css'
import './RestrictedRecommendModal.css'

// 신분증·금융카드 등 감지 시: 강제 이동 대신 안전 인계를 추천하는 팝업 (Figma 1389:53049)
export default function RestrictedRecommendModal({ isOpen, onHandover, onKeep }) {
  if (!isOpen) return null
  return (
    <div className="modal-overlay">
      <div className="restricted-recommend" role="dialog" aria-modal="true">
        <div className="restricted-recommend__text">
          <p className="restricted-recommend__title">안전 인계를 추천해요</p>
          <p className="restricted-recommend__desc">
            신분증·금융카드가 감지됐어요.
            <br />
            2차 피해 예방을 위해 지구대·우체통 인계를 추천해요.
          </p>
        </div>
        <div className="restricted-recommend__actions">
          <button type="button" className="restricted-recommend__btn restricted-recommend__btn--primary" onClick={onHandover}>
            안전 인계하기
          </button>
          <button type="button" className="restricted-recommend__btn" onClick={onKeep}>
            직접 보관하며 등록하기
          </button>
        </div>
      </div>
    </div>
  )
}
