import Modal from '../Modal/Modal'

// 확인/취소 두 버튼 알림 (홈 '결과 도착' 알림 등). 스타일은 App.css의 match-dialog
export default function ResultDialog({
  isOpen,
  onClose,
  title,
  children,
  confirmLabel = '확인',
  cancelLabel = '취소',
  confirmTone = 'primary',
  onConfirm,
  onCancel = onClose,
  dismissible = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      dismissible={dismissible}
      title={title}
      footer={
        <div className="match-dialog__actions">
          <button type="button" className={`match-dialog__action match-dialog__action--${confirmTone}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
          <button type="button" className="match-dialog__action match-dialog__action--secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
        </div>
      }
    >
      {children}
    </Modal>
  )
}
