import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import SuccessGraphic from '../../components/common/SuccessGraphic/SuccessGraphic'
import './FoundStationRegisterComplete.css'

function formatNowText() {
  const now = new Date()
  const hours24 = now.getHours()
  const period = hours24 < 12 ? '오전' : '오후'
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `오늘 ${period} ${hours12}:${minutes}`
}

export default function FoundStationRegisterComplete({ draft, onGoHome }) {
  const navigate = useNavigate()
  const { name, location, lost112Number } = draft

  const metaParts = []
  if (location) metaParts.push(location.address)
  metaParts.push(formatNowText())

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome()
      return
    }
    navigate('/')
  }

  return (
    <div className="station-complete">
      <div className="station-complete__callout">
        <img src={iconInfo} alt="" className="station-complete__callout-icon" />
        <p className="station-complete__callout-text">지구대에 인계된 물건은 담당 기관에서 보관해요</p>
      </div>

      <div className="station-complete__body">
        <SuccessGraphic />

        <h2 className="station-complete__title">
          인계 내역 등록이
          <br />
          완료됐어요
        </h2>
        <p className="station-complete__desc">
          분실자가 확인할 수 있도록
          <br />
          인계 정보를 전달했어요
        </p>

        <div className="station-complete__card">
          <div className="station-complete__card-meta-row">
            <p className="station-complete__card-meta">{metaParts.join(' · ')}</p>
            <span className="station-complete__card-pill">인계 완료</span>
          </div>
          <p className="station-complete__card-title">{name} 습득했어요</p>
          {lost112Number && <p className="station-complete__card-desc">LOST112 접수번호 {lost112Number}</p>}
        </div>
      </div>

      <div className="station-complete__actions">
        <button
          type="button"
          className="station-complete__secondary"
          onClick={() => navigate('/found/new/station/review')}
        >
          인계 내역 보기
        </button>
        <button type="button" className="station-complete__primary" onClick={handleGoHome}>
          홈으로
        </button>
      </div>
    </div>
  )
}
