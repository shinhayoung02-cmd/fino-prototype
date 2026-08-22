import { useEffect } from 'react'
import './Modal.css'

export default function Modal({ isOpen, onClose, title, children, footer, dismissible = true }) {
  useEffect(() => {
    if (!isOpen || !dismissible) return undefined

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, dismissible, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={dismissible ? onClose : undefined}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        {title && <div className="modal__title">{title}</div>}
        <div className="modal__content">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  )
}
