import { useNavigate } from 'react-router-dom'
import mapPoliceBox from '../../assets/parcel-store-select/map-bg.png'
import pinHalo from '../../assets/parcel-store-select/pin-halo.svg'
import pinBody from '../../assets/parcel-store-select/pin-body.svg'
import { useKakaoMap } from '../../lib/kakaoMaps'
import './PoliceBoxPickupGuide.css'

const PICKUP_STEPS = [
  { id: 1, text: '관할 파출소를 방문하세요' },
  { id: 2, text: '신분증으로 본인 확인을 진행해요' },
  { id: 3, text: '확인 완료 후 물건을 수령해요' },
]

export default function PoliceBoxPickupGuide({
  station = { title: 'OO경찰서 OO지구대', desc: '서울특별시 OO구 OO로 000 (수 Placeholder)', hours: '평일 09:00~18:00', distance: '7분' },
  onConfirm,
}) {
  const navigate = useNavigate()
  const { containerRef: mapContainerRef, mapReady, mapFailed } = useKakaoMap()

  return (
    <div className="police-pickup-guide">
      <h2 className="police-pickup-guide__title">관할 파출소 정보</h2>

      <div className="police-pickup-guide__map">
        <div
          ref={mapContainerRef}
          className="police-pickup-guide__map-canvas"
          style={{ visibility: mapReady && !mapFailed ? 'visible' : 'hidden' }}
        />
        {(!mapReady || mapFailed) && (
          <img src={mapPoliceBox} alt="지도" className="police-pickup-guide__map-img" />
        )}
        <div className="police-pickup-guide__pin">
          <img src={pinHalo} alt="" className="police-pickup-guide__pin-halo" />
          <img src={pinBody} alt="" className="police-pickup-guide__pin-body" />
        </div>
        <span className="police-pickup-guide__map-badge">{station.distance}</span>
      </div>

      <div className="police-pickup-guide__station">
        <p className="police-pickup-guide__station-title">{station.title} (관할 지구대)</p>
        <p className="police-pickup-guide__station-desc">{station.desc}</p>
        <p className="police-pickup-guide__station-hours">{station.hours}</p>
      </div>

      <div className="police-pickup-guide__steps">
        <p className="police-pickup-guide__steps-label">수령 절차</p>
        <ol className="police-pickup-guide__steps-list">
          {PICKUP_STEPS.map((step) => (
            <li className="police-pickup-guide__step" key={step.id}>
              <span className="police-pickup-guide__step-index">{step.id}</span>
              <span className="police-pickup-guide__step-text">{step.text}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="police-pickup-guide__actions">
        <button
          type="button"
          className="police-pickup-guide__confirm"
          onClick={() => {
            onConfirm?.()
            navigate('/')
          }}
        >
          확인
        </button>
      </div>
    </div>
  )
}
