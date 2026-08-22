import Modal from '../Modal/Modal'
import './CancelRequestModal.css'

export default function CancelRequestModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="요청을 취소할까요?"
      footer={
        <div className="cancel-request-modal__actions">
          <button
            type="button"
            className="cancel-request-modal__action cancel-request-modal__action--secondary"
            onClick={onClose}
          >
            아니요
          </button>
          <button
            type="button"
            className="cancel-request-modal__action cancel-request-modal__action--critical"
            onClick={onConfirm}
          >
            요청 취소
          </button>
        </div>
      }
    >
      취소하면 지금 진행 중인 요청이 종료돼요.
    </Modal>
  )
}
