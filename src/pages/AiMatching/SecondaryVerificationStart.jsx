import { useState } from 'react'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import HowToVerifySheet from './HowToVerifySheet'
import iconQuizMaterial from '../../assets/ai-matching/icon-quiz-material.svg'
import iconQuizCompare from '../../assets/ai-matching/icon-quiz-compare.svg'
import iconQuizAnswer from '../../assets/ai-matching/icon-quiz-answer.svg'
import './SecondaryVerificationStart.css'

const HOW_TO_ITEMS = [
  {
    id: 'review-material',
    icon: iconQuizMaterial,
    title: '자료를 살펴봐요',
    answer: '분실자가 주인 확인에 필요한 자료를 보내요.',
  },
  {
    id: 'compare-item',
    icon: iconQuizCompare,
    title: '물건과 비교해요',
    answer: '받은 자료와 지금 가지고 있는 물건을 확인해요.',
  },
  {
    id: 'pick-result',
    icon: iconQuizAnswer,
    title: '결과를 선택해요',
    answer: '확인됐어요 또는 판별하기 어려워요를 선택해요.',
  },
]

export default function SecondaryVerificationStart({
  onStart,
  cardTitle = '검정 반지갑을 습득했어요',
  cardDesc = '검정색 Matin Kim 가죽 반지갑',
}) {
  const [isHowToOpen, setHowToOpen] = useState(false)

  return (
    <div className="secondary-verification-start">
      <span className="secondary-verification-start__badge">습득물 확인중</span>

      <div className="secondary-verification-start__intro">
        <h2 className="secondary-verification-start__title">
          분실자가 소유권 확인을 위해
          <br />
          추가 자료를 보냈어요
        </h2>
        <p className="secondary-verification-start__desc">분실자가 소유권을 다시 확인할 수 있는 자료를 보냈어요</p>
      </div>

      <div className="secondary-verification-start__callout">
        <img src={iconInfo} alt="" className="secondary-verification-start__callout-icon" />
        <p className="secondary-verification-start__callout-text">분실자의 개인정보(이름, 연락처)는 표시되지 않습니다.</p>
      </div>

      <div className="secondary-verification-start__card">
        <div className="secondary-verification-start__card-meta-row">
          <p className="secondary-verification-start__card-meta">역삼1동 · 반경 500m · 오늘 오전 9~12시</p>
          <span className="secondary-verification-start__card-pill">접수 완료</span>
        </div>
        <p className="secondary-verification-start__card-title">{cardTitle}</p>
        <p className="secondary-verification-start__card-desc">{cardDesc}</p>
      </div>

      <div className="secondary-verification-start__divider" />

      <div className="secondary-verification-start__next-wrap">
        <button type="button" className="secondary-verification-start__next" onClick={() => setHowToOpen(true)}>
          시작하기
        </button>
      </div>

      <HowToVerifySheet
        isOpen={isHowToOpen}
        onClose={() => setHowToOpen(false)}
        onConfirm={() => {
          setHowToOpen(false)
          onStart?.()
        }}
        description="분실자가 보낸 자료와 실제 물건을 차근차근 비교해요."
        items={HOW_TO_ITEMS}
      />
    </div>
  )
}
