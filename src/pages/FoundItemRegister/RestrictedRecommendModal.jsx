import Modal from '../../components/common/Modal/Modal'

// 신분증·금융카드 등 감지 시: 강제 이동 대신 안전 인계를 추천하는 팝업
export default function RestrictedRecommendModal({ isOpen, onHandover, onKeep }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onKeep}
      dismissible={false}
      title="안전 인계를 추천해요"
      footer={
        <div className="match-dialog__actions">
          <button type="button" className="match-dialog__action match-dialog__action--brand" onClick={onHandover}>
            인계 방법 보기
          </button>
          <button type="button" className="match-dialog__action match-dialog__action--secondary" onClick={onKeep}>
            직접 보관하며 등록하기
          </button>
        </div>
      }
    >
      신분증·금융카드가 감지됐어요.
      <br />
      2차 피해 예방을 위해
      <br />
      지구대·우체통 인계를 추천해요.
    </Modal>
  )
}
