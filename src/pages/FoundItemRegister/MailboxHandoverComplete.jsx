import { useState } from 'react'
import iconInfo from '../../assets/ai-matching/icon-info-informative.svg'
import Modal from '../../components/common/Modal/Modal'
import SuccessGraphic from '../../components/common/SuccessGraphic/SuccessGraphic'
import './MailboxHandoverComplete.css'

export default function MailboxHandoverComplete({ onFinishSearch, onKeepAndGoHome }) {
  const [isFinishDialogOpen, setFinishDialogOpen] = useState(false)

  return (
    <div className="mailbox-handover-complete">
      <div className="mailbox-handover-complete__callout">
        <img src={iconInfo} alt="" className="mailbox-handover-complete__callout-icon" />
        <p className="mailbox-handover-complete__callout-text">개인 간 직접 전달 없이 안전하게 인계했어요</p>
      </div>

      <div className="mailbox-handover-complete__graphic">
        <SuccessGraphic />
      </div>

      <h2 className="mailbox-handover-complete__title">
        물건을 안전하게
        <br />
        인계했어요
      </h2>
      <p className="mailbox-handover-complete__desc">선택한 우체통으로 인계가 완료됐어요.</p>

      <div className="mailbox-handover-complete__card">
        <div className="mailbox-handover-complete__card-meta-row">
          <p className="mailbox-handover-complete__card-meta">역삼1동 · 반경 500m · 오늘 오전 9~12시</p>
          <span className="mailbox-handover-complete__card-pill">인계 완료</span>
        </div>
        <p className="mailbox-handover-complete__card-title">검정색 반지갑</p>
        <p className="mailbox-handover-complete__card-desc">검정색 Matin Kim 가죽 반지갑</p>
      </div>

      <div className="mailbox-handover-complete__next-wrap">
        <button type="button" className="mailbox-handover-complete__home" onClick={() => setFinishDialogOpen(true)}>
          홈으로
        </button>
      </div>

      <Modal
        isOpen={isFinishDialogOpen}
        onClose={() => setFinishDialogOpen(false)}
        title="분실물 찾기가 완료됐어요"
        footer={
          <div className="mailbox-handover-complete__dialog-actions">
            <button
              type="button"
              className="mailbox-handover-complete__dialog-action mailbox-handover-complete__dialog-action--primary"
              onClick={() => {
                setFinishDialogOpen(false)
                onFinishSearch?.()
              }}
            >
              찾기 마치기
            </button>
            <button
              type="button"
              className="mailbox-handover-complete__dialog-action mailbox-handover-complete__dialog-action--secondary"
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
