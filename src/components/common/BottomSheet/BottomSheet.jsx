import { useEffect } from 'react'
import './BottomSheet.css'

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  footer,
  fullHeight,
  overlayClassName = '',
}) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return undefined

    const scrollEl = document.querySelector('.app-shell__content')
    if (!scrollEl) return undefined

    const prevOverflow = scrollEl.style.overflow
    const prevScrollTop = scrollEl.scrollTop
    scrollEl.scrollTop = 0
    scrollEl.style.overflow = 'hidden'
    return () => {
      scrollEl.style.overflow = prevOverflow
      scrollEl.scrollTop = prevScrollTop
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className={`bottom-sheet-overlay${overlayClassName ? ` ${overlayClassName}` : ''}`}
      onClick={onClose}
    >
      <div
        className={`bottom-sheet${fullHeight ? ' bottom-sheet--full-height' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bottom-sheet__handle" />
        {title && <div className="bottom-sheet__title">{title}</div>}
        <div className="bottom-sheet__content">{children}</div>
        {footer && <div className="bottom-sheet__footer">{footer}</div>}
      </div>
    </div>
  )
}
