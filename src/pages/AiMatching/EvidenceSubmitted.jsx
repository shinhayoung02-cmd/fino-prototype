import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import SuccessGraphic from '../../components/common/SuccessGraphic/SuccessGraphic'
import { withObjectParticle } from '../../utils/korean'
import './EvidenceSubmitted.css'

const DEFAULT_ITEM = {
  name: '검정 반지갑',
  location: { address: '역삼1동', radius: '500m', detail: '어제 저녁 뚝섬역 근처에서...' },
  timeLabel: '오늘 오전 9~12시',
}

export default function EvidenceSubmitted({ item, onGoHome }) {
  const navigate = useNavigate()
  item = item || DEFAULT_ITEM

  const metaParts = []
  if (item.location) metaParts.push(item.location.address, `반경 ${item.location.radius}`)
  if (item.timeRange) {
    const { month, day, hour, minute } = item.timeRange
    metaParts.push(`${month} ${day} ${hour} ${minute}`)
  } else if (item.timeLabel) {
    metaParts.push(item.timeLabel)
  }

  return (
    <div className="evidence-submitted">
      <div className="evidence-submitted__callout">
        <img src={iconInfo} alt="" className="evidence-submitted__callout-icon" />
        <p className="evidence-submitted__callout-text">확인 결과가 나오면 알림으로 알려드릴게요.</p>
      </div>

      <div className="evidence-submitted__body">
        <SuccessGraphic />

        <h2 className="evidence-submitted__title">확인 자료를 제출했어요</h2>
        <p className="evidence-submitted__desc">
          습득자가 실제 물건과 비교해
          <br />
          확인할 예정이에요
        </p>

        <div className="evidence-submitted__card">
          <div className="evidence-submitted__card-meta-row">
            <p className="evidence-submitted__card-meta">{metaParts.join(' · ')}</p>
            <span className="evidence-submitted__card-pill">접수 완료</span>
          </div>
          <p className="evidence-submitted__card-title">{withObjectParticle(item.name)} 잃어버렸어요</p>
          {item.location?.detail && <p className="evidence-submitted__card-desc">{item.location.detail}</p>}
        </div>
      </div>

      <div className="evidence-submitted__next-wrap">
        <button
          type="button"
          className="evidence-submitted__action evidence-submitted__action--secondary"
          onClick={() => navigate('/matching/waiting', { state: { showApprovalOnHome: true } })}
        >
          대기 화면 보기
        </button>
        <button
          type="button"
          className="evidence-submitted__action evidence-submitted__action--primary"
          onClick={onGoHome}
        >
          홈으로
        </button>
      </div>
    </div>
  )
}
