import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconChevronRight from '../../assets/ai-matching/icon-chevron-right.svg'
import mapBg from '../../assets/location-picker/map-bg.png'
import pinHalo from '../../assets/home/pin-halo.svg'
import pinBody from '../../assets/home/pin-body.svg'
import { useKakaoMap } from '../../lib/kakaoMaps'
import './ParcelStoreNearby.css'

export default function ParcelStoreNearby({ store }) {
  const navigate = useNavigate()
  const { containerRef: mapContainerRef, mapReady, mapFailed } = useKakaoMap()

  return (
    <div className="parcel-store-nearby">
      <div className="parcel-store-nearby__head">
        <h2 className="parcel-store-nearby__title">편의점 택배</h2>
        <span className="parcel-store-nearby__badge">반환 접수</span>
      </div>
      <p className="parcel-store-nearby__subtitle">습득자는 별도 결제 없이 편의점에서 접수할 수 있어요</p>

      <div className="parcel-store-nearby__callout">
        <img src={iconInfo} alt="" className="parcel-store-nearby__callout-icon" />
        <p className="parcel-store-nearby__callout-text">7일 안에, 편의점에서 택배를 보내주세요</p>
      </div>

      <div className="parcel-store-nearby__field">
        <p className="parcel-store-nearby__field-label">내 근처 편의점</p>

        <button
          type="button"
          className="parcel-store-nearby__list-row"
          onClick={() =>
            navigate('/found/match-result/quiz/claimants/return-prep/review/parcel-store/store')
          }
        >
          <span className="parcel-store-nearby__list-row-body">
            <span className="parcel-store-nearby__list-row-title">{store ? store.title : '장소 선택하기'}</span>
            <span className="parcel-store-nearby__list-row-desc">
              {store ? store.desc : '지도에서 대략적인 위치를 선택해요'}
            </span>
          </span>
          <img src={iconChevronRight} alt="" />
        </button>

        <div className="parcel-store-nearby__map">
          <div
            ref={mapContainerRef}
            className="parcel-store-nearby__map-canvas"
            style={{ visibility: mapReady && !mapFailed ? 'visible' : 'hidden' }}
          />
          {(!mapReady || mapFailed) && <img src={mapBg} alt="지도" className="parcel-store-nearby__map-img" />}
          <div className="parcel-store-nearby__pin">
            <img src={pinHalo} alt="" className="parcel-store-nearby__pin-halo" />
            <img src={pinBody} alt="" className="parcel-store-nearby__pin-body" />
          </div>
        </div>

        <p className="parcel-store-nearby__hint">가까운 수령 가능 매장을 찾아보세요.</p>
      </div>

      <div className="parcel-store-nearby__actions">
        <button
          type="button"
          className="parcel-store-nearby__confirm"
          disabled={!store}
          onClick={() => navigate('/found/match-result/quiz/claimants/return-prep/review/parcel-store/progress')}
        >
          확인
        </button>
        <button
          type="button"
          className="parcel-store-nearby__edit"
          onClick={() => navigate('/found/match-result/quiz/claimants/return-prep/review/parcel-store/info')}
        >
          수정하기
        </button>
      </div>
    </div>
  )
}
