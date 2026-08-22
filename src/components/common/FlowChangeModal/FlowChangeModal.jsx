import Modal from '../Modal/Modal'
import './FlowChangeModal.css'

export default function FlowChangeModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          플로우를
          <br />
          변경하시겠습니까?
        </>
      }
      footer={
        <div className="flow-change-modal__actions">
          <button
            type="button"
            className="flow-change-modal__action flow-change-modal__action--secondary"
            onClick={onClose}
          >
            아니요
          </button>
          <button
            type="button"
            className="flow-change-modal__action flow-change-modal__action--critical"
            onClick={onConfirm}
          >
            초기화
          </button>
        </div>
      }
    >
      플로우 변경 하면 현재 플로우는
      <br />
      초기화 됩니다.
    </Modal>
  )
}
