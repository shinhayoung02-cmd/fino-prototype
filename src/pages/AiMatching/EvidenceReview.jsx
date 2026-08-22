import { useNavigate } from 'react-router-dom'
import { Badge } from '@seed-design/react'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import { EVIDENCE_STEPS } from './evidenceSteps'
import './EvidenceReview.css'

export default function EvidenceReview({ filesByStep }) {
  const navigate = useNavigate()

  return (
    <div className="evidence-review">
      <h2 className="evidence-review__title">제출할 자료를 확인해주세요</h2>
      <p className="evidence-review__subtitle">주인 확인을 위해 추가한 자료를 확인한 뒤 보내주세요.</p>

      <div className="evidence-review__callout">
        <img src={iconInfo} alt="" className="evidence-review__callout-icon" />
        <p className="evidence-review__callout-text">
          제출 자료는 습득자에게만 공유되며, 검토 후 즉시 삭제돼요.
        </p>
      </div>

      <div className="evidence-review__list">
        {EVIDENCE_STEPS.map((step, index) => {
          const isSubmitted = filesByStep[index]?.length > 0
          return (
            <div className="evidence-review__item" key={step.reviewLabel}>
              <span className="evidence-review__item-label">{step.reviewLabel}</span>
              <span className="evidence-review__item-body">
                <span className="evidence-review__item-title">{step.reviewTitle}</span>
                <span className="evidence-review__item-detail">{step.reviewDetail}</span>
              </span>
              {isSubmitted ? (
                <span className="evidence-review__item-badge">첨부 완료</span>
              ) : (
                <Badge tone="neutral" variant="weak">
                  대기중
                </Badge>
              )}
            </div>
          )
        })}
      </div>

      <div className="evidence-review__actions">
        <button
          type="button"
          className="evidence-review__edit"
          onClick={() => navigate('/matching/result/ownership/evidence/upload')}
        >
          수정하기
        </button>
        <button
          type="button"
          className="evidence-review__submit"
          onClick={() => navigate('/matching/result/ownership/evidence/submitted')}
        >
          확인 자료 보내기
        </button>
      </div>
    </div>
  )
}
