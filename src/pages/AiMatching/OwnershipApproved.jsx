import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SuccessGraphic from '../../components/common/SuccessGraphic/SuccessGraphic'
import iconChevronDown from '../../assets/ai-matching/icon-chevron-down.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './OwnershipVerified.css'
import './OwnershipApproved.css'

const LOST_ITEM_SUMMARY = {
  meta: '역삼1동 · 반경 500m · 오늘 오전 9~12시',
  status: '접수 완료',
  title: '검정 반지갑 잃어버렸어요',
  desc: '어제 저녁 뚝섬역 근처에서...',
}

const PROCESS_STEPS = [
  {
    id: 'thanks-delivery',
    badge: '1단계',
    title: '감사·전달 선택',
    desc: '원하는 감사 방식과 물건을 받을 방법을 선택해요.\n선택한 내용은 습득자에게 전달돼요.',
  },
  {
    id: 'finder-confirm',
    badge: '2단계',
    title: '습득자 확인',
    desc: '습득자가 제안한 내용을 확인해요.\n확인되면 약속한 방법으로 반환을 준비해요.',
  },
  {
    id: 'return',
    badge: '3단계',
    title: '반환 진행',
    desc: '정해진 방법으로 물건을 전달받아요.\n전달이 끝나면 감사도 함께 전해져요.',
  },
]

export default function OwnershipApproved() {
  const navigate = useNavigate()
  const [isSheetOpen, setSheetOpen] = useState(false)
  const [openStepId, setOpenStepId] = useState(null)

  const toggleStep = (id) => {
    setOpenStepId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="ownership-approved">
      <div className="ownership-approved__hero">
        <SuccessGraphic />
        <h2 className="ownership-approved__title">
          소유권 승인 권한이
          <br />
          부여 됐어요
        </h2>
        <p className="ownership-approved__subtitle">정상 반환 절차 진입에 들어갈께요.</p>
      </div>

      <div className="ownership-approved__card">
        <div className="ownership-approved__card-meta">
          <span className="ownership-approved__card-meta-text">{LOST_ITEM_SUMMARY.meta}</span>
          <span className="ownership-approved__card-pill">{LOST_ITEM_SUMMARY.status}</span>
        </div>
        <p className="ownership-approved__card-title">{LOST_ITEM_SUMMARY.title}</p>
        <p className="ownership-approved__card-desc">{LOST_ITEM_SUMMARY.desc}</p>
      </div>

      <div className="ownership-approved__actions">
        <button type="button" className="ownership-approved__action" onClick={() => setSheetOpen(true)}>
          인계 방법 확인
        </button>
      </div>

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={() => setSheetOpen(false)}
        footer={
          <button
            type="button"
            className="process-sheet__confirm"
            onClick={() => navigate('/matching/result/ownership/thanks')}
          >
            다음 단계 확인하기
          </button>
        }
      >
        <div className="process-sheet__header">
          <p className="process-sheet__title">이렇게 진행돼요</p>
          <p className="process-sheet__desc">분실자가 보낸 자료와 실제 물건을 차근차근 비교해요.</p>
        </div>
        <div className="process-sheet__list">
          {PROCESS_STEPS.map((step) => {
            const isOpenStep = openStepId === step.id
            return (
              <div className="process-sheet__item" key={step.id}>
                <button
                  type="button"
                  className="process-sheet__item-trigger"
                  onClick={() => toggleStep(step.id)}
                >
                  <span className="process-sheet__item-badge">{step.badge}</span>
                  <span className="process-sheet__item-title">{step.title}</span>
                  <img
                    src={iconChevronDown}
                    alt=""
                    className={`process-sheet__item-chevron${isOpenStep ? ' process-sheet__item-chevron--open' : ''}`}
                  />
                </button>
                {isOpenStep && (
                  <div className="process-sheet__item-body">
                    {step.desc.split('\n').map((line) => (
                      <p className="process-sheet__item-desc" key={line}>
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </BottomSheet>
    </div>
  )
}
