import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/ai-matching/icon-info-informative.svg'
import iconClock from '../../assets/home/icon-clock.svg'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import Modal from '../../components/common/Modal/Modal'
import { MATCH_CANDIDATES } from './matchCandidates'
import './InPersonMeetupStatus.css'

const PROGRESS_STEPS = ['제안완료', '일정확정', '만남예정', '수령완료']
const DONE_COUNT = 3
const candidate = MATCH_CANDIDATES[0]

export default function InPersonMeetupStatus({ locations = [] }) {
  const navigate = useNavigate()
  const [isReceiptDialogOpen, setReceiptDialogOpen] = useState(false)

  const place = locations[0] || '홍대입구역 9번 출구'

  const handleConfirmReceipt = () => {
    setReceiptDialogOpen(false)
    navigate('/matching/result/ownership/in-person/receipt')
  }

  return (
    <div className="in-person-meetup-status">
      <div className="in-person-meetup-status__progress">
        {PROGRESS_STEPS.map((label, index) => (
          <div className="in-person-meetup-status__progress-step" key={label}>
            {index > 0 && (
              <div
                className={`in-person-meetup-status__progress-connector${index < DONE_COUNT ? ' in-person-meetup-status__progress-connector--done' : ''}`}
              />
            )}
            <div className="in-person-meetup-status__progress-node">
              {index < DONE_COUNT ? (
                <img
                  src={iconProgressStepDone}
                  alt=""
                  className="in-person-meetup-status__progress-circle in-person-meetup-status__progress-circle--active"
                />
              ) : (
                <span className="in-person-meetup-status__progress-circle" />
              )}
              <span
                className={`in-person-meetup-status__progress-label${index < DONE_COUNT ? ' in-person-meetup-status__progress-label--active' : ''}`}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="in-person-meetup-status__title-row">
        <h2 className="in-person-meetup-status__title">대면 직거래</h2>
        <span className="in-person-meetup-status__badge">습득물 확인중</span>
      </div>
      <p className="in-person-meetup-status__subtitle">
        제안한 감사 방식과 전달 방법을 습득자가 확인하고 있어요
      </p>

      <div className="in-person-meetup-status__callout">
        <img src={iconInfo} alt="" className="in-person-meetup-status__callout-icon" />
        <p className="in-person-meetup-status__callout-text">
          습득자가 승인하면 다음 반환 절차를 알려드릴게요
        </p>
      </div>

      <div className="in-person-meetup-status__item-card">
        <div className="in-person-meetup-status__item-photo">
          {candidate.photo && <img src={candidate.photo} alt="" />}
        </div>
        <div className="in-person-meetup-status__item-info">
          <p className="in-person-meetup-status__item-title">{candidate.title}</p>
          <div className="in-person-meetup-status__item-rows">
            <p className="in-person-meetup-status__item-row">
              <img src={iconPayment} alt="" />
              {candidate.feature}
            </p>
            <p className="in-person-meetup-status__item-row">
              <img src={iconClock} alt="" />
              {candidate.time}
            </p>
            <p className="in-person-meetup-status__item-location">{candidate.location}</p>
          </div>
        </div>
      </div>

      <div className="in-person-meetup-status__field">
        <p className="in-person-meetup-status__field-label">진행 현황</p>
        <div className="in-person-meetup-status__status-list">
          <div className="in-person-meetup-status__status-row">
            <span className="in-person-meetup-status__status-row-label">현재 상태</span>
            <span className="in-person-meetup-status__status-badge in-person-meetup-status__status-badge--brand">
              습득자 확인 대기
            </span>
          </div>
          <div className="in-person-meetup-status__status-divider" />
          <div className="in-person-meetup-status__status-row">
            <span className="in-person-meetup-status__status-row-label">약속 장소</span>
            <span className="in-person-meetup-status__status-badge">{place}</span>
          </div>
          <div className="in-person-meetup-status__status-divider" />
          <div className="in-person-meetup-status__status-row">
            <span className="in-person-meetup-status__status-row-label">약속 시간</span>
            <span className="in-person-meetup-status__status-badge">8월 22일 23시 00분</span>
          </div>
        </div>
      </div>

      <div className="in-person-meetup-status__actions">
        <button
          type="button"
          className="in-person-meetup-status__receipt"
          onClick={() => setReceiptDialogOpen(true)}
        >
          수령 완료
        </button>
        <button type="button" className="in-person-meetup-status__home" onClick={() => navigate('/')}>
          홈으로
        </button>
      </div>

      <Modal
        isOpen={isReceiptDialogOpen}
        onClose={() => setReceiptDialogOpen(false)}
        title={
          <>
            수령 완료를
            <br />
            누르시겠습니까?
          </>
        }
        footer={
          <div className="in-person-meetup-status__dialog-actions">
            <button
              type="button"
              className="in-person-meetup-status__dialog-action in-person-meetup-status__dialog-action--primary"
              onClick={handleConfirmReceipt}
            >
              확인
            </button>
            <button
              type="button"
              className="in-person-meetup-status__dialog-action in-person-meetup-status__dialog-action--secondary"
              onClick={() => setReceiptDialogOpen(false)}
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
