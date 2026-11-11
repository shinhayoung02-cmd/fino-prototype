import iconMoreHoriz from '../../../assets/home/icon-more-horiz.svg'
import iconClose from '../../../assets/lost-register/icon-close.svg'
import './ScanningCard.css'

const DEFAULT_ITEM = {
  name: '지갑/카드',
  description: '검정색 Matin Kim 가죽 반지갑',
  location: { address: '서울 마포구 서교동', detail: '홍대입구역 9번 출구 인근', radius: '500m' },
  timeRange: { month: '8월', day: '21일', hour: '9시', minute: '30분' },
}

export default function ScanningCard({
  item,
  isPaused,
  onTogglePause,
  onEdit,
  topRightIcon = 'more',
  onDismiss,
  itemVerb = '잃어버렸어요',
  scanningTargetLabel = '습득물',
  statusText,
  onItemClick,
}) {
  const { name, description, location, timeRange, locationUnknown, timeUnknown } = item?.name ? item : DEFAULT_ITEM

  // Figma 1392:27913: 맨 위 '위치 · 반경 · 시간' 한 줄 (입력 안 했으면 '모름'으로라도 표시)
  const metaParts = []
  if (location) metaParts.push(location.address, `반경 ${location.radius}`)
  else metaParts.push(locationUnknown ? '위치 모름' : '위치 미입력')
  if (timeRange) metaParts.push(`${timeRange.month} ${timeRange.day} ${timeRange.hour} ${timeRange.minute}`)
  else metaParts.push(timeUnknown ? '시간 모름' : '시간 미입력')

  return (
    <div className="scanning-card">
      <div className="scanning-card__head">
        <p className="scanning-card__status">
          {statusText ??
            (isPaused
              ? `${scanningTargetLabel} 탐색을 일시정지했어요`
              : `새로운 ${scanningTargetLabel}을 계속 비교하고 있어요`)}
        </p>
        {topRightIcon === 'close' ? (
          <button type="button" className="scanning-card__head-btn" aria-label="닫기" onClick={onDismiss}>
            <img src={iconClose} alt="" />
          </button>
        ) : (
          <img src={iconMoreHoriz} alt="" className="scanning-card__more" />
        )}
      </div>
      <div
        className={`scanning-card__item${onItemClick ? ' scanning-card__item--clickable' : ''}`}
        onClick={onItemClick}
        role={onItemClick ? 'button' : undefined}
        tabIndex={onItemClick ? 0 : undefined}
      >
        <p className="scanning-card__item-meta">{metaParts.join(' · ')}</p>
        <p className="scanning-card__item-title">{name} {itemVerb}</p>
        {description && <p className="scanning-card__item-note">{description}</p>}
      </div>
      <div className="scanning-card__actions">
        <button type="button" className="scanning-card__action scanning-card__action--edit" onClick={onEdit}>
          정보 수정
        </button>
        <button type="button" className="scanning-card__action scanning-card__action--pause" onClick={onTogglePause}>
          {isPaused ? '탐색 재개' : '탐색 일시정지'}
        </button>
      </div>
    </div>
  )
}
