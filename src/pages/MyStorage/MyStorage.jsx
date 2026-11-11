import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconPayment from '../../assets/my-storage/icon-payment.svg'
import iconClock from '../../assets/my-storage/icon-clock.svg'
import iconRetry from '../../assets/my-storage/icon-retry.svg'
import iconCheck from '../../assets/my-storage/icon-check.svg'
import iconRemove from '../../assets/my-storage/icon-remove-circle.svg'
import './MyStorage.css'

const FILTERS = ['전체', '지갑/카드', '전자기기']

// ① 내 물건 보관함 - 목록 (Figma 1339:49713)
export default function MyStorage({ items, onSelectItem, onDeleteItem }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('전체')
  const [showNoPhoto, setShowNoPhoto] = useState(true)

  const noPhotoCount = items.filter((item) => item.photoUrls.length === 0).length
  const visibleItems = items.filter(
    (item) =>
      (filter === '전체' || item.category === filter) && (showNoPhoto || item.photoUrls.length > 0),
  )

  return (
    <div className="my-storage">
      <div className="my-storage__head">
        <div className="my-storage__title-row">
          <h2 className="my-storage__title">등록된 물건</h2>
          <span className="my-storage__count">{items.length}개</span>
        </div>
        <div className="my-storage__chips">
          <button
            type="button"
            className="my-storage__retry"
            aria-label="필터 초기화"
            onClick={() => {
              setFilter('전체')
              setShowNoPhoto(true)
            }}
          >
            <img src={iconRetry} alt="" />
          </button>
          <div className="my-storage__chip-group">
            {FILTERS.map((label) => (
              <button
                key={label}
                type="button"
                className={`my-storage__chip${filter === label ? ' my-storage__chip--selected' : ''}`}
                onClick={() => setFilter(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="my-storage__check-row" onClick={() => setShowNoPhoto((v) => !v)}>
          <span className={`my-storage__check${showNoPhoto ? ' my-storage__check--on' : ''}`}>
            {showNoPhoto && <img src={iconCheck} alt="" />}
          </span>
          <span className="my-storage__check-label">사진 없는 물건 ({noPhotoCount}건)</span>
        </button>
      </div>

      <ul className="my-storage__list">
        {visibleItems.map((item) => (
          <li key={item.id} className="my-storage__item">
            <button
              type="button"
              className="my-storage__delete"
              aria-label={`${item.title} 삭제`}
              onClick={() => {
                if (window.confirm(`'${item.title}'을(를) 보관함에서 삭제할까요?`)) onDeleteItem(item.id)
              }}
            >
              <img src={iconRemove} alt="" />
            </button>
            <button type="button" className="my-storage__row" onClick={() => onSelectItem(item)}>
              <span className="my-storage__thumb">
                {item.photoUrls[0] && <img src={item.photoUrls[0]} alt="" />}
              </span>
              <span className="my-storage__info">
                <span className="my-storage__item-title">{item.title}</span>
                <span className="my-storage__meta">
                  <img src={iconPayment} alt="" />
                  {item.meta}
                </span>
                <span className="my-storage__meta">
                  <img src={iconClock} alt="" />
                  {item.registeredAt}
                </span>
                {item.feature && <span className="my-storage__feature">특징: {item.feature}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="my-storage__cta-wrap">
        <button type="button" className="my-storage__cta" onClick={() => navigate('/my/storage/new')}>
          분실물 추가
        </button>
      </div>
    </div>
  )
}
