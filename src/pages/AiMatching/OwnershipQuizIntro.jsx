import { useState } from 'react'
import WaitingScreen from './WaitingScreen'
import HowToVerifySheet from './HowToVerifySheet'
import iconQuizQuestion from '../../assets/ai-matching/icon-quiz-question.svg'
import iconQuizCompare from '../../assets/ai-matching/icon-quiz-compare.svg'
import iconQuizAnswer from '../../assets/ai-matching/icon-quiz-answer.svg'

const HOW_TO_ITEMS = [
  {
    id: 'check-question',
    icon: iconQuizQuestion,
    title: '질문을 확인해요',
    answer: '분실자가 미리 적어둔 특징을 확인하기 쉬운 질문으로 보여드려요.',
  },
  {
    id: 'compare-item',
    icon: iconQuizCompare,
    title: '실제 물건과 비교해요',
    answer: '지금 가지고 있는 물건에 같은 특징이 있는지 확인해주세요.',
  },
  {
    id: 'pick-answer',
    icon: iconQuizAnswer,
    title: '답변을 선택해요',
    answer: '확인한 결과에 따라 맞아요 · 틀려요 · 잘 모르겠어요 중 하나를 골라주세요.',
  },
]

export default function OwnershipQuizIntro({ onConfirm, ...waitingScreenProps }) {
  const [isHowToOpen, setHowToOpen] = useState(false)

  return (
    <>
      <WaitingScreen {...waitingScreenProps} onGoHome={() => setHowToOpen(true)} />

      <HowToVerifySheet
        isOpen={isHowToOpen}
        onClose={() => setHowToOpen(false)}
        onConfirm={() => {
          setHowToOpen(false)
          onConfirm?.()
        }}
        description="분실자가 보낸 자료와 실제 물건을 차근차근 비교해요."
        items={HOW_TO_ITEMS}
      />
    </>
  )
}
