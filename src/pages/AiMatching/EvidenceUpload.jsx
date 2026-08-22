import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AttachmentField, AttachmentDropzonePreset } from '../../../seed-design/ui/attachment-field'
import FilePreviewModal from '../../components/common/FilePreviewModal/FilePreviewModal'
import { EVIDENCE_STEPS } from './evidenceSteps'
import './EvidenceUpload.css'

export default function EvidenceUpload({ filesByStep, onFilesByStepChange }) {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [direction, setDirection] = useState('forward')
  const [previewFile, setPreviewFile] = useState(null)

  const step = EVIDENCE_STEPS[stepIndex]
  const isLastStep = stepIndex === EVIDENCE_STEPS.length - 1

  const setStepFiles = (files) => {
    onFilesByStepChange(filesByStep.map((entry, index) => (index === stepIndex ? files : entry)))
  }

  const handleNext = () => {
    if (!isLastStep) {
      setDirection('forward')
      setStepIndex((prev) => prev + 1)
    } else {
      navigate('/matching/result/ownership/evidence/review')
    }
  }

  const handlePrev = () => {
    setDirection('backward')
    setStepIndex((prev) => Math.max(0, prev - 1))
  }

  return (
    <div className="evidence-upload">
      <div className={`evidence-upload__top evidence-upload__top--${direction}`} key={stepIndex}>
        <div className="evidence-upload__badge-row">
          <span className="evidence-upload__badge">{step.badge}</span>
        </div>
        <h2 className="evidence-upload__title">{step.title}</h2>
        <p className="evidence-upload__subtitle">{step.subtitle}</p>

        <div className="evidence-upload__tip">
          <span className="evidence-upload__tip-label">TIP</span>
          <p className="evidence-upload__tip-text">{step.tip}</p>
        </div>

        <AttachmentField
          rootProps={{ className: 'evidence-upload__field-root' }}
          maxFiles={1}
          accept={step.accept}
          acceptedFileEntries={filesByStep[stepIndex]}
          onAcceptedFileEntriesChange={setStepFiles}
        >
          <AttachmentDropzonePreset
            samples={step.sample ? [step.sample] : []}
            onPreview={(fileEntry) => setPreviewFile(fileEntry.file)}
          />
        </AttachmentField>
      </div>

      <div className="evidence-upload__action-wrap">
        {stepIndex > 0 && (
          <button type="button" className="evidence-upload__prev" onClick={handlePrev}>
            이전
          </button>
        )}
        <button type="button" className="evidence-upload__next" onClick={handleNext}>
          다음
        </button>
      </div>

      <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
    </div>
  )
}
