import WaitingScreen from './WaitingScreen'
import './OwnershipAdditionalEvidenceWaiting.css'

export default function OwnershipAdditionalEvidenceWaiting({ onGoHome }) {
  return (
    <div className="ownership-additional-evidence-waiting">
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
        showCallout={false}
        showList={false}
        onGoHome={onGoHome}
      />
    </div>
  )
}
