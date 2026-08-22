import { useEffect, useState } from 'react'
import iconClose from '../../../assets/lost-register/icon-close.svg'
import './FilePreviewModal.css'

export default function FilePreviewModal({ file, onClose }) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (!file) {
      setUrl(null)
      return undefined
    }
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  if (!file || !url) return null

  const isPdf = file.type === 'application/pdf'

  return (
    <div className="file-preview-overlay" onClick={onClose}>
      <div className="file-preview" onClick={(event) => event.stopPropagation()}>
        <div className="file-preview__header">
          <span className="file-preview__name">{file.name}</span>
          <button type="button" className="file-preview__close" onClick={onClose} aria-label="닫기">
            <img src={iconClose} alt="" />
          </button>
        </div>
        <div className="file-preview__body">
          {isPdf ? (
            <iframe src={url} title={file.name} className="file-preview__pdf" />
          ) : (
            <img src={url} alt={file.name} className="file-preview__image" />
          )}
        </div>
      </div>
    </div>
  )
}
