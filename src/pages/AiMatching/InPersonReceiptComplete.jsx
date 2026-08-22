import { useState } from 'react'
import iconClock from '../../assets/home/icon-clock.svg'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconReceiptGift from '../../assets/ai-matching/icon-receipt-gift.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import Modal from '../../components/common/Modal/Modal'
import { MATCH_CANDIDATES } from './matchCandidates'
import './InPersonReceiptComplete.css'

const PROGRESS_STEPS = ['제안완료', '일정확정', '만남예정', '수령완료']
const candidate = MATCH_CANDIDATES[0]

export default function InPersonReceiptComplete({ onFinishSearch, onKeepAndGoHome }) {
  const [isFinishDialogOpen, setFinishDialogOpen] = useState(false)

  return (
    <div className="in-person-receipt-complete">
      <div className="in-person-receipt-complete__graphic">
        <img src={iconReceiptGift} alt="" className="in-person-receipt-complete__graphic-icon" />
      </div>

      <h2 className="in-person-receipt-complete__title">물건을 무사히 받았어요</h2>
      <p className="in-person-receipt-complete__desc">
        수령이 완료되어 이번 분실물
        <br />
        찾기가 마무리됐어요
      </p>

      <div className="in-person-receipt-complete__progress">
        {PROGRESS_STEPS.map((label, index) => (
          <div className="in-person-receipt-complete__progress-step" key={label}>
            {index > 0 && <div className="in-person-receipt-complete__progress-connector in-person-receipt-complete__progress-connector--done" />}
            <div className="in-person-receipt-complete__progress-node">
              <img
                src={iconProgressStepDone}
                alt=""
                className="in-person-receipt-complete__progress-circle"
              />
              <span className="in-person-receipt-complete__progress-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="in-person-receipt-complete__item-card">
        <div className="in-person-receipt-complete__item-photo">
          {candidate.photo && <img src={candidate.photo} alt="" />}
        </div>
        <div className="in-person-receipt-complete__item-info">
          <p className="in-person-receipt-complete__item-title">{candidate.title}</p>
          <div className="in-person-receipt-complete__item-rows">
            <p className="in-person-receipt-complete__item-row">
              <img src={iconPayment} alt="" />
              {candidate.feature}
            </p>
            <p className="in-person-receipt-complete__item-row">
              <img src={iconClock} alt="" />
              {candidate.time}
            </p>
            <p className="in-person-receipt-complete__item-location">{candidate.location}</p>
          </div>
        </div>
      </div>

      <button type="button" className="in-person-receipt-complete__link">
        배송이 안왔어요
      </button>

      <div className="in-person-receipt-complete__next-wrap">
        <button
          type="button"
          className="in-person-receipt-complete__confirm"
          onClick={() => setFinishDialogOpen(true)}
        >
          확인
        </button>
      </div>

      <Modal
        isOpen={isFinishDialogOpen}
        onClose={() => setFinishDialogOpen(false)}
        title="분실물 찾기가 완료됐어요"
        footer={
          <div className="in-person-receipt-complete__dialog-actions">
            <button
              type="button"
              className="in-person-receipt-complete__dialog-action in-person-receipt-complete__dialog-action--primary"
              onClick={() => {
                setFinishDialogOpen(false)
                onFinishSearch?.()
              }}
            >
              찾기 마치기
            </button>
            <button
              type="button"
              className="in-person-receipt-complete__dialog-action in-person-receipt-complete__dialog-action--secondary"
              onClick={() => {
                setFinishDialogOpen(false)
                onKeepAndGoHome?.()
              }}
            >
              아직 유지하기
            </button>
          </div>
        }
      >
        이번 찾기를 마치고
        <br />
        새로 시작할까요?
      </Modal>
    </div>
  )
}
