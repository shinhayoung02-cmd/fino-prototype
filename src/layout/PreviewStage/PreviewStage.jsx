import MobileFrame from '../MobileFrame/MobileFrame'
import './PreviewStage.css'

export default function PreviewStage({ children }) {
  return (
    <div className="preview-stage">
      <div className="preview-stage__row">
        <div className="preview-stage__phone-wrap">
          <MobileFrame>{children}</MobileFrame>
        </div>
      </div>
    </div>
  )
}
