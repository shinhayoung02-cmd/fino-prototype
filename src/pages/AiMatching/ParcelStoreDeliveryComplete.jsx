import { useState } from 'react'
import iconPayment from '../../assets/ai-matching/icon-payment.svg'
import iconClock from '../../assets/ai-matching/icon-clock.svg'
import iconReceiptGift from '../../assets/ai-matching/icon-receipt-gift.svg'
import iconProgressStepDone from '../../assets/ai-matching/icon-progress-step-done.svg'
import walletPhoto from '../../assets/ai-matching/samples/wallet-matin-kim-photo.jpg'
import Modal from '../../components/common/Modal/Modal'
import './ParcelStoreDeliveryComplete.css'

const PROGRESS_STEPS = ['발송대기', '접수완료', '배송중', '수령완료']

export default function ParcelStoreDeliveryComplete({ onFinishSearch, onKeepAndGoHome }) {
  const [isFinishDialogOpen, setFinishDialogOpen] = useState(false)

  return (
    <div className="parcel-store-delivery-complete">
      <div className="parcel-store-delivery-complete__graphic">
        <img src={iconReceiptGift} alt="" className="parcel-store-delivery-complete__graphic-icon" />
      </div>

      <h2 className="parcel-store-delivery-complete__title">물건을 무사히 전달됐어요</h2>
      <p className="parcel-store-delivery-complete__desc">
        수령이 완료되어 이번 분실물
        <br />
        찾기가 마무리됐어요
      </p>

      <div className="parcel-store-delivery-complete__progress">
        {PROGRESS_STEPS.map((label, index) => (
          <div className="parcel-store-delivery-complete__progress-step" key={label}>
            {index > 0 && (
              <div className="parcel-store-delivery-complete__progress-connector parcel-store-delivery-complete__progress-connector--done" />
            )}
            <div className="parcel-store-delivery-complete__progress-node">
              <img src={iconProgressStepDone} alt="" className="parcel-store-delivery-complete__progress-circle" />
              <span className="parcel-store-delivery-complete__progress-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="parcel-store-delivery-complete__item-card">
        <div className="parcel-store-delivery-complete__item-photo">
          <img src={walletPhoto} alt="" />
        </div>
        <div className="parcel-store-delivery-complete__item-info">
          <p className="parcel-store-delivery-complete__item-title">검정 반지갑 습득</p>
          <div className="parcel-store-delivery-complete__item-rows">
            <p className="parcel-store-delivery-complete__item-row">
              <img src={iconPayment} alt="" />
              검정색 Matin Kim 가죽 반지갑
            </p>
            <p className="parcel-store-delivery-complete__item-row">
              <img src={iconClock} alt="" />
              오늘 오전 9~12시
            </p>
            <p className="parcel-store-delivery-complete__item-location">서울 마포구 홍대입구역</p>
          </div>
        </div>
      </div>

      <div className="parcel-store-delivery-complete__next-wrap">
        <button
          type="button"
          className="parcel-store-delivery-complete__confirm"
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
          <div className="parcel-store-delivery-complete__dialog-actions">
            <button
              type="button"
              className="parcel-store-delivery-complete__dialog-action parcel-store-delivery-complete__dialog-action--primary"
              onClick={() => {
                setFinishDialogOpen(false)
                onFinishSearch?.()
              }}
            >
              찾기 마치기
            </button>
            <button
              type="button"
              className="parcel-store-delivery-complete__dialog-action parcel-store-delivery-complete__dialog-action--secondary"
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
