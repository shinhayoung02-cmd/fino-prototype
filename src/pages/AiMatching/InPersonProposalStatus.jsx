import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/ai-matching/icon-info-informative.svg'
import iconClock from '../../assets/home/icon-clock.svg'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import Modal from '../../components/common/Modal/Modal'
import { MATCH_CANDIDATES } from './matchCandidates'
import './InPersonProposalStatus.css'

const PROGRESS_STEPS = ['제안완료', '일정확정', '만남예정', '수령완료']
const RESULT_DIALOG_DELAY = 5000
const candidate = MATCH_CANDIDATES[0]

export default function InPersonProposalStatus() {
  const navigate = useNavigate()
  const [isResultDialogOpen, setResultDialogOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setResultDialogOpen(true), RESULT_DIALOG_DELAY)
    return () => clearTimeout(timer)
  }, [])

  const handleViewResult = () => {
    setResultDialogOpen(false)
    navigate('/matching/result/ownership/in-person/status')
  }

  return (
    <div className="in-person-proposal-status">
      <div className="in-person-proposal-status__progress">
        {PROGRESS_STEPS.map((label, index) => (
          <div className="in-person-proposal-status__progress-step" key={label}>
            {index > 0 && <div className="in-person-proposal-status__progress-connector" />}
            <div className="in-person-proposal-status__progress-node">
              {index === 0 ? (
                <img
                  src={iconProgressStepDone}
                  alt=""
                  className="in-person-proposal-status__progress-circle in-person-proposal-status__progress-circle--active"
                />
              ) : (
                <span className="in-person-proposal-status__progress-circle" />
              )}
              <span
                className={`in-person-proposal-status__progress-label${index === 0 ? ' in-person-proposal-status__progress-label--active' : ''}`}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="in-person-proposal-status__title-row">
        <h2 className="in-person-proposal-status__title">대면 직거래</h2>
        <span className="in-person-proposal-status__badge">습득물 확인중</span>
      </div>
      <p className="in-person-proposal-status__subtitle">
        제안한 감사 방식과 전달 방법을 습득자가 확인하고 있어요
      </p>

      <div className="in-person-proposal-status__callout">
        <img src={iconInfo} alt="" className="in-person-proposal-status__callout-icon" />
        <p className="in-person-proposal-status__callout-text">
          습득자가 승인하면 다음 반환 절차를 알려드릴게요
        </p>
      </div>

      <div className="in-person-proposal-status__item-card">
        <div className="in-person-proposal-status__item-photo">
          {candidate.photo && <img src={candidate.photo} alt="" />}
        </div>
        <div className="in-person-proposal-status__item-info">
          <p className="in-person-proposal-status__item-title">{candidate.title}</p>
          <div className="in-person-proposal-status__item-rows">
            <p className="in-person-proposal-status__item-row">
              <img src={iconPayment} alt="" />
              {candidate.feature}
            </p>
            <p className="in-person-proposal-status__item-row">
              <img src={iconClock} alt="" />
              {candidate.time}
            </p>
            <p className="in-person-proposal-status__item-location">{candidate.location}</p>
          </div>
        </div>
      </div>

      <div className="in-person-proposal-status__field">
        <p className="in-person-proposal-status__field-label">진행 현황</p>
        <div className="in-person-proposal-status__status-list">
          <div className="in-person-proposal-status__status-row">
            <span className="in-person-proposal-status__status-row-label">현재 상태</span>
            <span className="in-person-proposal-status__status-badge in-person-proposal-status__status-badge--brand">
              습득자 확인 대기
            </span>
          </div>
          <div className="in-person-proposal-status__status-divider" />
          <div className="in-person-proposal-status__status-row">
            <span className="in-person-proposal-status__status-row-label">약속 장소</span>
            <span className="in-person-proposal-status__status-badge">미정</span>
          </div>
          <div className="in-person-proposal-status__status-divider" />
          <div className="in-person-proposal-status__status-row">
            <span className="in-person-proposal-status__status-row-label">약속 시간</span>
            <span className="in-person-proposal-status__status-badge">미정</span>
          </div>
        </div>
      </div>

      <div className="in-person-proposal-status__next-wrap">
        <button
          type="button"
          className="in-person-proposal-status__confirm"
          onClick={() => setResultDialogOpen(true)}
        >
          확인
        </button>
      </div>

      <Modal
        isOpen={isResultDialogOpen}
        dismissible={false}
        title="확인 결과가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={handleViewResult}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => setResultDialogOpen(false)}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 결과를 확인해주세요
      </Modal>
    </div>
  )
}
