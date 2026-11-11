import { useEffect } from 'react'
import WaitingScreen from './WaitingScreen'

// 습득자: AI가 사진으로 퀴즈를 만드는 중 → 잠시 뒤 자동으로 다음 화면
export default function OwnerQuizBuilding({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => onDone?.(), 2500)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <WaitingScreen
      badge="퀴즈 만드는 중"
      title={
        <>
          AI가 주인을 확인할
          <br />
          퀴즈를 만드는 중이에요
        </>
      }
      subtitle="습득물 사진에서 주인만 알 수 있는 특징을 찾고 있어요."
      calloutText="만들어진 퀴즈는 등록 전에 직접 고칠 수 있어요."
      ctaLabel="퀴즈 확인하기"
      showList={false}
      onGoHome={onDone}
    />
  )
}
