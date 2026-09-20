import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import mapPoliceBox from '../../assets/parcel-store-select/map-bg.png'
import pinHalo from '../../assets/parcel-store-select/pin-halo.svg'
import pinBody from '../../assets/parcel-store-select/pin-body.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import { useKakaoMap } from '../../lib/kakaoMaps'
import './PoliceBoxHandover.css'

const CHECK_STEPS = [
  { id: 1, badge: '단계 1', text: '안내된 관할 파출소로 직접 방문하세요' },
  { id: 2, badge: '단계 2', text: '현장에서 신분증으로 본인 확인 절차를 진행해요' },
  { id: 3, badge: '단계 3', text: '확인 완료 후 담당 경찰관에게 물건을 전달해요' },
]

export default function PoliceBoxHandover({ policeBox }) {
  const navigate = useNavigate()
  const selected = policeBox || { title: '연남파출소', desc: '서울 마포구 연남동 373-20' }
  const [isCheckSheetOpen, setCheckSheetOpen] = useState(false)
  const { containerRef: mapContainerRef, mapReady, mapFailed } = useKakaoMap()

  return (
    <div className="police-box-handover">
      <div className="police-box-handover__head">
        <h2 className="police-box-handover__title">지구대 인계 안내</h2>
        <span className="police-box-handover__badge">지구대 인계 등록</span>
      </div>
      <p className="police-box-handover__subtitle">지구대 또는 파출소에 인계한 정보를 등록해요</p>

      <div className="police-box-handover__callout">
        <img src={iconInfo} alt="" className="police-box-handover__callout-icon" />
        <p className="police-box-handover__callout-text">개인 간 직접 전달은 불가합니다.</p>
      </div>

      <div className="police-box-handover__field">
        <p className="police-box-handover__field-label">내 근처 파출소</p>

        <button
          type="button"
          className="police-box-handover__map"
          onClick={() => navigate('/found/new/restricted/police-box/location')}
        >
          <div
            ref={mapContainerRef}
            className="police-box-handover__map-canvas"
            style={{ visibility: mapReady && !mapFailed ? 'visible' : 'hidden' }}
          />
          {(!mapReady || mapFailed) && (
            <img src={mapPoliceBox} alt="지도" className="police-box-handover__map-img" />
          )}
          <div className="police-box-handover__pin">
            <img src={pinHalo} alt="" className="police-box-handover__pin-halo" />
            <img src={pinBody} alt="" className="police-box-handover__pin-body" />
            <span className="police-box-handover__pin-center" />
          </div>
          <div className="police-box-handover__selected">
            <span className="police-box-handover__selected-title">{selected.title}</span>
            <span className="police-box-handover__selected-desc">{selected.desc}</span>
          </div>
        </button>

        <p className="police-box-handover__hint">가까운 인계 가능한 파출소를 찾아보세요.</p>
      </div>

      <div className="police-box-handover__actions">
        <button type="button" className="police-box-handover__confirm" onClick={() => setCheckSheetOpen(true)}>
          다음
        </button>
      </div>

      <BottomSheet isOpen={isCheckSheetOpen} onClose={() => setCheckSheetOpen(false)}>
        <div className="police-box-check-sheet__header">
          <p className="police-box-check-sheet__title">접수 전에 확인해주세요</p>
          <p className="police-box-check-sheet__desc">습득자는 별도 결제 없이 편의점에서 접수할 수 있어요</p>
        </div>
        <div className="police-box-check-sheet__list">
          {CHECK_STEPS.map((step, index) => (
            <div key={step.id}>
              {index > 0 && <div className="police-box-check-sheet__divider" />}
              <div className="police-box-check-sheet__item">
                <span className="police-box-check-sheet__item-badge">{step.badge}</span>
                <p className="police-box-check-sheet__item-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="police-box-check-sheet__confirm"
          onClick={() => {
            setCheckSheetOpen(false)
            navigate('/found/new/restricted/police-box/report')
          }}
        >
          확인
        </button>
      </BottomSheet>
    </div>
  )
}
