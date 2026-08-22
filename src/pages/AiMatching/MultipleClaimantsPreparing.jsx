import { useNavigate } from 'react-router-dom'
import WaitingScreen from './WaitingScreen'
import iconWarningCritical from '../../assets/ai-matching/icon-warning-critical.svg'
import './MultipleClaimantsPreparing.css'

export default function MultipleClaimantsPreparing({ onGoHome }) {
  const navigate = useNavigate()

  const handleGoHome = () => {
    onGoHome?.()
    navigate('/')
  }

  return (
    <div className="multiple-claimants-preparing">
      <WaitingScreen
        badge="추가 자료 대기중"
        badgeTone="critical-border"
        title={
          <>
            분실자가 확인 자료를
            <br />
            준비하고 있어요
          </>
        }
        subtitle="자료가 도착하면 실제 물건과 비교해 확인해주세요."
        calloutText={
          <>
            혼선을 막기 위해 결과가 나오기 전까지는
            <br />
            직접 전달을 잠시 기다려주세요.
          </>
        }
        calloutIcon={iconWarningCritical}
        calloutTone="critical"
        ctaLabel="홈으로"
        showList={false}
        onGoHome={handleGoHome}
      />
    </div>
  )
}
