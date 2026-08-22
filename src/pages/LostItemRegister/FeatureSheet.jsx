import { useState } from 'react'
import iconFeaturePhoto from '../../assets/lost-register/icon-feature-photo.svg'
import iconFeatureItem from '../../assets/lost-register/icon-feature-item.svg'
import iconFeatureMark from '../../assets/lost-register/icon-feature-mark.svg'
import iconChevronDown from '../../assets/lost-register/icon-chevron-down.svg'
import './FeatureSheet.css'

const ITEMS = [
  {
    key: 'photo',
    icon: iconFeaturePhoto,
    label: '사진으로 알기 어려운 특징',
    desc: '겉으로 잘 보이지 않는 안쪽 색상이나 모양을 적어주세요.',
    example: '예: 안쪽 색상, 뒷면 모양, 숨겨진 표시',
  },
  {
    key: 'accessory',
    icon: iconFeatureItem,
    label: '함께 있던 물건이나 부속품',
    desc: '물건과 함께 있던 구성품이나 소지품을 적어주세요.',
    example: '예: 키링, 케이스, 카드, 충전기',
  },
  {
    key: 'mark',
    icon: iconFeatureMark,
    label: '나만 아는 흔적이나 표시',
    desc: '주인이라면 알아볼 수 있는 흔적이나 표시를 적어주세요.',
    example: '예: 흠집, 스티커, 각인, 얼룩',
  },
]

export default function FeatureSheet({ isOpen, onClose, onConfirm }) {
  const [openKey, setOpenKey] = useState(null)

  if (!isOpen) return null

  const toggleItem = (key) => {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <div className="feature-sheet-overlay" onClick={onClose}>
      <div className="feature-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="feature-sheet__handle" />
        <div className="feature-sheet__header">
          <p className="feature-sheet__title">주인만 알 수 있는 특징을 알려주세요</p>
          <p className="feature-sheet__desc">
            나중에 비슷한 물건이 발견되면,
            <br />
            실제 주인인지 확인하는 데 사용해요.
          </p>
        </div>
        <div className="feature-sheet__footer">
          <div className="feature-sheet__list">
            {ITEMS.map((item) => {
              const isItemOpen = openKey === item.key
              return (
                <div className="feature-sheet__item" key={item.key}>
                  <button
                    type="button"
                    className="feature-sheet__item-trigger"
                    onClick={() => toggleItem(item.key)}
                  >
                    <span className="feature-sheet__item-icon-box">
                      <img src={item.icon} alt="" className="feature-sheet__item-icon" />
                    </span>
                    <span className="feature-sheet__item-label">{item.label}</span>
                    <span className="feature-sheet__item-chevron-box">
                      <img
                        src={iconChevronDown}
                        alt=""
                        className={`feature-sheet__item-chevron${isItemOpen ? ' feature-sheet__item-chevron--open' : ''}`}
                      />
                    </span>
                  </button>
                  {isItemOpen && (
                    <div className="feature-sheet__item-body">
                      <p className="feature-sheet__item-desc">{item.desc}</p>
                      <p className="feature-sheet__item-example">{item.example}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <button type="button" className="feature-sheet__confirm" onClick={handleConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
