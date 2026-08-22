import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconClock from '../../assets/lost-register/icon-clock.svg'
import iconSun from '../../assets/found-report/icon-sun.svg'
import iconScanner from '../../assets/found-report/icon-scanner.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './FoundItemRegister.css'

const CAMERA_TIPS = [
  { id: 'light', icon: iconSun, title: '밝은 곳에서 촬영해주세요.', desc: '밝은 곳에 배치하고 그림자를 피하세요' },
  { id: 'distance', icon: iconScanner, title: '거리를 유지해주세요.', desc: '휴대폰을 12~18인치 떨어진 곳에 고정해주세요' },
  { id: 'wait', icon: iconClock, title: '잠시만 기다려 주세요.', desc: '1-2초만 기다려주세요' },
]

export default function FoundItemRegister() {
  const navigate = useNavigate()
  const [isCameraSheetOpen, setCameraSheetOpen] = useState(false)

  return (
    <div className="found-item-register">
      <div className="found-item-register__body">
        <span className="found-item-register__badge">습득물 확인중</span>
        <h2 className="found-item-register__title">
          사진과 위치만으로
          <br />
          빠르게 등록할 수 있어요
        </h2>
        <p className="found-item-register__subtitle">상세한 글 작성 없이 빠르게 등록할 수 있어요</p>

        <div className="found-item-register__callout">
          <img src={iconInfo} alt="" className="found-item-register__callout-icon" />
          <p className="found-item-register__callout-text">
            사진을 찍으면 AI가 자동으로 물건 종류를
            <br />
            인식해드려요
          </p>
        </div>
      </div>

      <div className="found-item-register__bottom">
        <p className="found-item-register__hard-link">사진 촬영이 어려워요</p>
        <button type="button" className="found-item-register__next" onClick={() => setCameraSheetOpen(true)}>
          다음 단계로
        </button>
      </div>

      <BottomSheet isOpen={isCameraSheetOpen} onClose={() => setCameraSheetOpen(false)}>
        <div className="camera-permission-sheet__header">
          <p className="camera-permission-sheet__title">카메라 접근 허용이 필요해요</p>
          <p className="camera-permission-sheet__desc">AI가 자동으로 인식하려면 카메라 엑세스가 필요합니다</p>
        </div>
        <div className="camera-permission-sheet__footer">
          <div className="camera-permission-sheet__list">
            {CAMERA_TIPS.map((tip) => (
              <div className="camera-permission-sheet__item" key={tip.id}>
                <img src={tip.icon} alt="" className="camera-permission-sheet__item-icon" />
                <div className="camera-permission-sheet__item-body">
                  <p className="camera-permission-sheet__item-title">{tip.title}</p>
                  <p className="camera-permission-sheet__item-desc">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="camera-permission-sheet__submit"
            onClick={() => {
              setCameraSheetOpen(false)
              navigate('/found/new/camera')
            }}
          >
            카메라 액세스 활성화
          </button>
        </div>
      </BottomSheet>
    </div>
  )
}
