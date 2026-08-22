import { useNavigate } from 'react-router-dom'
import WaitingScreen from './WaitingScreen'
import iconInfoInformative from '../../assets/ai-matching/icon-info-informative.svg'
import './MultipleClaimantsReturnPrep.css'

export default function MultipleClaimantsReturnPrep({ onGoHome }) {
  const navigate = useNavigate()

  const handleGoHome = () => {
    onGoHome?.()
    navigate('/')
  }

  return (
    <div className="multiple-claimants-return-prep">
      <WaitingScreen
        badge="제안 대기중"
        badgeTone="critical-border"
        title={
          <>
            분실자가 반환 방법을
            <br />
            준비하고 있어요
          </>
        }
        subtitle="감사 방식과 물건을 받을 방법을 정하고 있어요."
        calloutText="제안이 도착하면 내용을 확인하고 승인해주세요."
        calloutIcon={iconInfoInformative}
        ctaLabel="홈으로"
        showList={false}
        onGoHome={handleGoHome}
      />
    </div>
  )
}
