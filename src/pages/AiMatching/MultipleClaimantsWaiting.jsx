import WaitingScreen from './WaitingScreen'
import iconWarningCritical from '../../assets/ai-matching/icon-warning-critical.svg'
import './MultipleClaimantsWaiting.css'

const CLAIMANTS_FAQ_ITEMS = [
  {
    id: 'why-wait',
    question: '왜 바로 전달하면 안 되나요?',
    answer: '같은 물건을 찾는 사람이 여러 명이라 실제 주인이 확인될 때까지 개인 전달을 잠시 기다려야 해요.',
  },
  {
    id: 'how-verify',
    question: '주인은 어떻게 확인하나요?',
    answer: '분실한 시간과 위치, 비공개 특징 퀴즈 결과, 제출한 확인 자료를 함께 비교해요.',
  },
  {
    id: 'other-info',
    question: '다른 분실자의 정보도 볼 수 있나요?',
    answer: '아니요. 다른 분실자의 개인정보와 제출 자료는 공개되지 않아요.',
  },
  {
    id: 'after-result',
    question: '결과가 나오면 어떻게 되나요?',
    answer: '주인이 확인되면 반환 절차를 안내하고, 확인이 어려우면 안전한 인계 방법을 알려드려요.',
  },
]

export default function MultipleClaimantsWaiting({ onNext }) {
  return (
    <div className="multiple-claimants-waiting">
      <WaitingScreen
        badge="소유권 확인중"
        title={
          <>
            동일 물건에 여러 명이
            <br />
            소유권을 주장하고 있어요
          </>
        }
        subtitle="선착순이 아닌 동시 검증으로 실제 주인을 확인하고 있어요"
        calloutText={
          <>
            혼선을 막기 위해 결과가 나오기 전까지는
            <br />
            직접 전달을 잠시 기다려주세요.
          </>
        }
        calloutIcon={iconWarningCritical}
        calloutTone="critical"
        ctaLabel="다음"
        faqItems={CLAIMANTS_FAQ_ITEMS}
        onGoHome={onNext}
      />
    </div>
  )
}
