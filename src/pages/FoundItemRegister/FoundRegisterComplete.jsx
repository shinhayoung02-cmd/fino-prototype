import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info-blue.svg'
import SuccessGraphic from '../../components/common/SuccessGraphic/SuccessGraphic'
import Modal from '../../components/common/Modal/Modal'
import './FoundRegisterComplete.css'

export default function FoundRegisterComplete({ draft, onFinishSearch, onKeepAndGoHome }) {
  const navigate = useNavigate()
  const { name, description, timeRange, location } = draft
  const [isFinishDialogOpen, setFinishDialogOpen] = useState(false)

  const metaParts = []
  if (location) metaParts.push(location.address, `반경 ${location.radius}`)
  if (timeRange) metaParts.push(`${timeRange.month} ${timeRange.day} ${timeRange.hour} ${timeRange.minute}`)

  return (
    <div className="found-complete">
      <div className="found-complete__callout">
        <img src={iconInfo} alt="" className="found-complete__callout-icon" />
        <p className="found-complete__callout-text">지도에 '제보 핀' 72시간 노출 후 자동 숨겨집니다.</p>
      </div>

      <div className="found-complete__body">
        <SuccessGraphic />

        <h2 className="found-complete__title">
          습득물 등록이
          <br />
          완료됐어요
        </h2>
        <p className="found-complete__desc">AI 매칭 결과는 알림으로 알려드려요</p>

        <div className="found-complete__card">
          <div className="found-complete__card-meta-row">
            <p className="found-complete__card-meta">{metaParts.join(' · ')}</p>
            <span className="found-complete__card-pill">접수 완료</span>
          </div>
          <p className="found-complete__card-title">{name} 습득했어요</p>
          {description && <p className="found-complete__card-desc">{description}</p>}
        </div>
      </div>

      <div className="found-complete__actions">
        <button type="button" className="found-complete__secondary" onClick={() => navigate('/found/new/waiting')}>
          대기 화면 보기
        </button>
        <button type="button" className="found-complete__primary" onClick={() => setFinishDialogOpen(true)}>
          홈으로
        </button>
      </div>

      <Modal
        isOpen={isFinishDialogOpen}
        onClose={() => setFinishDialogOpen(false)}
        title="분실물 찾기가 완료됐어요"
        footer={
          <div className="found-complete__dialog-actions">
            <button
              type="button"
              className="found-complete__dialog-action found-complete__dialog-action--primary"
              onClick={() => {
                setFinishDialogOpen(false)
                onFinishSearch?.()
              }}
            >
              찾기 마치기
            </button>
            <button
              type="button"
              className="found-complete__dialog-action found-complete__dialog-action--secondary"
              onClick={() => {
                setFinishDialogOpen(false)
                onKeepAndGoHome?.()
                navigate('/')
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
