import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconClock from '../../assets/home/icon-clock.svg'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconReceiptGift from '../../assets/ai-matching/icon-receipt-gift.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import Modal from '../../components/common/Modal/Modal'
import { MATCH_CANDIDATES } from './matchCandidates'
import './ParcelReceiptComplete.css'

const PROGRESS_STEPS = ['발송대기', '접수완료', '배송중', '수령완료']
const candidate = MATCH_CANDIDATES[0]

export default function ParcelReceiptComplete({ receiptDoneTo }) {
  const navigate = useNavigate()
  const [isReceiptDialogOpen, setReceiptDialogOpen] = useState(false)
  return (
    <div className="parcel-receipt-complete">
      <div className="parcel-receipt-complete__graphic">
        <img src={iconReceiptGift} alt="" className="parcel-receipt-complete__graphic-icon" />
      </div>

      <h2 className="parcel-receipt-complete__title">배송이 완료 됐어요</h2>
      <p className="parcel-receipt-complete__desc">
        확인을 눌러 수령 완료를
        <br />
        확인해주세요
      </p>

      <div className="parcel-receipt-complete__progress">
        {PROGRESS_STEPS.map((label, index) => (
          <div className="parcel-receipt-complete__progress-step" key={label}>
            {index > 0 && (
              <div className={`parcel-receipt-complete__progress-connector parcel-receipt-complete__progress-connector--done${index === PROGRESS_STEPS.length - 1 ? ' progress-connector-fill' : ''}`} />
            )}
            <div className="parcel-receipt-complete__progress-node">
              <img src={iconProgressStepDone} alt="" className={`parcel-receipt-complete__progress-circle${index === PROGRESS_STEPS.length - 1 ? ' progress-step-pop' : ''}`} />
              <span className={`parcel-receipt-complete__progress-label${index === PROGRESS_STEPS.length - 1 ? ' progress-step-blink' : ''}`}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="parcel-receipt-complete__item-card">
        <div className="parcel-receipt-complete__item-photo">
          {candidate.photo && <img src={candidate.photo} alt="" />}
        </div>
        <div className="parcel-receipt-complete__item-info">
          <p className="parcel-receipt-complete__item-title">{candidate.title}</p>
          <div className="parcel-receipt-complete__item-rows">
            <p className="parcel-receipt-complete__item-row">
              <img src={iconPayment} alt="" />
              {candidate.feature}
            </p>
            <p className="parcel-receipt-complete__item-row">
              <img src={iconClock} alt="" />
              {candidate.time}
            </p>
            <p className="parcel-receipt-complete__item-location">{candidate.location}</p>
          </div>
        </div>
      </div>

      <button type="button" className="parcel-receipt-complete__link">
        배송이 안왔어요
      </button>

      <div className="parcel-receipt-complete__next-wrap">
        <button type="button" className="parcel-receipt-complete__confirm" onClick={() => setReceiptDialogOpen(true)}>
          수령 완료
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
          <div className="parcel-receipt-complete__dialog-actions">
            <button
              type="button"
              className="parcel-receipt-complete__dialog-action parcel-receipt-complete__dialog-action--primary"
              onClick={() => {
                setReceiptDialogOpen(false)
                navigate(receiptDoneTo)
              }}
            >
              확인
            </button>
            <button
              type="button"
              className="parcel-receipt-complete__dialog-action parcel-receipt-complete__dialog-action--secondary"
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
