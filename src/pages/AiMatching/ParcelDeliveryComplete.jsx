import { ITEM_PROFILES } from '../../data/itemProfiles'
import { useState } from 'react'
import iconPayment from '../../assets/ai-matching/icon-payment.svg'
import iconClock from '../../assets/ai-matching/icon-clock.svg'
import iconReceiptGift from '../../assets/ai-matching/icon-receipt-gift.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import Modal from '../../components/common/Modal/Modal'
import './ParcelDeliveryComplete.css'

const PROGRESS_STEPS = ['발송대기', '접수완료', '배송중', '수령완료']

export default function ParcelDeliveryComplete({ onFinishSearch, onKeepAndGoHome, itemProfile = ITEM_PROFILES['wallet-normal'] }) {
  const [isFinishDialogOpen, setFinishDialogOpen] = useState(false)

  return (
    <div className="parcel-delivery-complete">
      <div className="parcel-delivery-complete__graphic">
        <img src={iconReceiptGift} alt="" className="parcel-delivery-complete__graphic-icon" />
      </div>

      <h2 className="parcel-delivery-complete__title">물건을 무사히 전달됐어요</h2>
      <p className="parcel-delivery-complete__desc">
        수령이 완료되어 이번 분실물
        <br />
        찾기가 마무리됐어요
      </p>

      <div className="parcel-delivery-complete__progress">
        {PROGRESS_STEPS.map((label, index) => (
          <div className="parcel-delivery-complete__progress-step" key={label}>
            {index > 0 && (
              <div
                className={`parcel-delivery-complete__progress-connector parcel-delivery-complete__progress-connector--done${
                  index === PROGRESS_STEPS.length - 1 ? ' parcel-delivery-complete__progress-connector--latest' : ''
                }`}
              />
            )}
            <div className="parcel-delivery-complete__progress-node">
              <img
                src={iconProgressStepDone}
                alt=""
                className={`parcel-delivery-complete__progress-circle${
                  index === PROGRESS_STEPS.length - 1 ? ' parcel-delivery-complete__progress-circle--latest' : ''
                }`}
              />
              <span className="parcel-delivery-complete__progress-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="parcel-delivery-complete__item-card">
        <div className="parcel-delivery-complete__item-photo">
          <img src={itemProfile.photo} alt="" />
        </div>
        <div className="parcel-delivery-complete__item-info">
          <p className="parcel-delivery-complete__item-title">{itemProfile.category} 습득</p>
          <div className="parcel-delivery-complete__item-rows">
            <p className="parcel-delivery-complete__item-row">
              <img src={iconPayment} alt="" />
              {itemProfile.shortDescription}
            </p>
            <p className="parcel-delivery-complete__item-row">
              <img src={iconClock} alt="" />
              오늘 오전 9~12시
            </p>
            <p className="parcel-delivery-complete__item-location">서울 마포구 홍대입구역</p>
          </div>
        </div>
      </div>

      <div className="parcel-delivery-complete__next-wrap">
        <button
          type="button"
          className="parcel-delivery-complete__confirm"
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
          <div className="parcel-delivery-complete__dialog-actions">
            <button
              type="button"
              className="parcel-delivery-complete__dialog-action parcel-delivery-complete__dialog-action--primary"
              onClick={() => {
                setFinishDialogOpen(false)
                onFinishSearch?.()
              }}
            >
              찾기 마치기
            </button>
            <button
              type="button"
              className="parcel-delivery-complete__dialog-action parcel-delivery-complete__dialog-action--secondary"
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
