import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconCheckPositive from '../../assets/ai-matching/icon-check-positive.svg'
import iconChevronDown from '../../assets/ai-matching/icon-chevron-down.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './OwnershipVerified.css'

const ANSWER_SUMMARY = [
  { label: '현재 상태 물건 색상', value: '회색 계열이라고 답변', tone: 'muted' },
  { label: '특이사항', value: '스크래치 없다고 답변', tone: 'muted' },
  { label: '결과', value: '주인 확인 완료', tone: 'positive' },
]

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

export default function OwnershipVerified() {
  const navigate = useNavigate()
  const [isSheetOpen, setSheetOpen] = useState(false)
  const [openStepId, setOpenStepId] = useState(null)

  const toggleStep = (id) => {
    setOpenStepId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="ownership-verified">
      <span className="ownership-verified__badge">소유권 확인 완료</span>

      <h2 className="ownership-verified__title">주인 확인이 완료됐어요</h2>
      <p className="ownership-verified__subtitle">습득자가 확인한 특징과 등록한 내용이 일치했어요.</p>

      <div className="ownership-verified__callout">
        <img src={iconCheckPositive} alt="" className="ownership-verified__callout-icon" />
        <p className="ownership-verified__callout-text">
          이제 확인된 분실자와 감사 및 전달 방식 절차로 이어집니다.
        </p>
      </div>

      <div className="ownership-verified__summary">
        <p className="ownership-verified__summary-label">습득자 답변 요약</p>
        <div className="ownership-verified__summary-list">
          {ANSWER_SUMMARY.map((row) => (
            <div className="ownership-verified__summary-row" key={row.label}>
              <span className="ownership-verified__summary-row-label">{row.label}</span>
              <span
                className={`ownership-verified__summary-row-value ownership-verified__summary-row-value--${row.tone}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="ownership-verified__actions">
        <button type="button" className="ownership-verified__action" onClick={() => setSheetOpen(true)}>
          확인
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
