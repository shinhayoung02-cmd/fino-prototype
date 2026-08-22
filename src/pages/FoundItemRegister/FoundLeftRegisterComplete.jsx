import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import SuccessGraphic from '../../components/common/SuccessGraphic/SuccessGraphic'
import './FoundLeftRegisterComplete.css'

export default function FoundLeftRegisterComplete({ draft, onGoHome }) {
  const navigate = useNavigate()
  const { name, timeRange, location } = draft

  const metaParts = []
  if (location) metaParts.push(`${location.address} 근처`)
  if (timeRange) metaParts.push(`${timeRange.month} ${timeRange.day} · ${timeRange.hour} ${timeRange.minute}`)

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome()
      return
    }
    navigate('/')
  }

  return (
    <div className="found-complete">
      <div className="found-complete__callout">
        <img src={iconInfo} alt="" className="found-complete__callout-icon" />
        <p className="found-complete__callout-text">지도에 '제보 핀' 72시간 노출 후 자동 숨겨집니다.</p>
      </div>

      <div className="found-complete__body">
        <SuccessGraphic />

        <h2 className="found-complete__title">
          발견물 등록이
          <br />
          완료됐어요
        </h2>
        <p className="found-complete__desc">AI 매칭 결과는 알림으로 알려드려요</p>

        <div className="found-complete__card">
          <div className="found-complete__card-meta-row">
            <p className="found-complete__card-meta">{metaParts.join(' · ')}</p>
            <span className="found-complete__card-pill">제보 완료</span>
          </div>
          <p className="found-complete__card-title">{name} 발견했어요</p>
          <p className="found-complete__card-desc">길에서 발견 후 두고 왔어요</p>
        </div>
      </div>

      <div className="found-complete__actions">
        <button type="button" className="found-complete__secondary" onClick={() => navigate('/found/new/left/report')}>
          제보 내용 보기
        </button>
        <button type="button" className="found-complete__primary" onClick={handleGoHome}>
          홈으로
        </button>
      </div>
    </div>
  )
}
