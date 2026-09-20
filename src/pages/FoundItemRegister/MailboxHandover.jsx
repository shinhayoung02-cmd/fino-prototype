import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import mapMailbox from '../../assets/parcel-store-select/map-bg.png'
import pinHalo from '../../assets/parcel-store-select/pin-halo.svg'
import pinBody from '../../assets/parcel-store-select/pin-body.svg'
import { useKakaoMap } from '../../lib/kakaoMaps'
import './MailboxHandover.css'

export default function MailboxHandover({ mailbox }) {
  const navigate = useNavigate()
  const selected = mailbox || { title: '홍대입구역 인근 우체통', desc: '현재 위치에서 350m' }
  const { containerRef: mapContainerRef, mapReady, mapFailed } = useKakaoMap({ draggable: false, zoomable: false })

  return (
    <div className="mailbox-handover">
      <div className="mailbox-handover__head">
        <h2 className="mailbox-handover__title">가까운 우체통을 확인해주세요</h2>
        <span className="mailbox-handover__badge">지구대 인계 등록</span>
      </div>
      <p className="mailbox-handover__subtitle">가까운 우체통에 넣어 안전하게 인계할 수 있어요</p>

      <div className="mailbox-handover__callout">
        <img src={iconInfo} alt="" className="mailbox-handover__callout-icon" />
        <p className="mailbox-handover__callout-text">개인 간 직접 전달 없이 인계할 수 있어요</p>
      </div>

      <div className="mailbox-handover__field">
        <p className="mailbox-handover__field-label">내 근처 우체통</p>

        <button
          type="button"
          className="mailbox-handover__map"
          onClick={() => navigate('/found/new/restricted/mailbox/select')}
        >
          <div
            ref={mapContainerRef}
            className="mailbox-handover__map-canvas"
            style={{ visibility: mapReady && !mapFailed ? 'visible' : 'hidden' }}
          />
          {(!mapReady || mapFailed) && (
            <img src={mapMailbox} alt="지도" className="mailbox-handover__map-img" />
          )}
          <div className="mailbox-handover__pin">
            <img src={pinHalo} alt="" className="mailbox-handover__pin-halo" />
            <img src={pinBody} alt="" className="mailbox-handover__pin-body" />
            <span className="mailbox-handover__pin-center" />
          </div>
          <div className="mailbox-handover__selected">
            <span className="mailbox-handover__selected-title">{selected.title}</span>
            <span className="mailbox-handover__selected-desc">{selected.desc}</span>
          </div>
        </button>

        <p className="mailbox-handover__hint">가까운 우체통을 선택해주세요</p>
      </div>

      <div className="mailbox-handover__actions">
        <button
          type="button"
          className="mailbox-handover__confirm"
          onClick={() => navigate('/found/new/restricted/mailbox/complete')}
        >
          이 우체통으로 인계하기
        </button>
      </div>
    </div>
  )
}
