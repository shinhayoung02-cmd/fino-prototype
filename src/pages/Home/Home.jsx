import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import heroIllustration from '../../assets/home/hero-illustration.png'
import iconSearch from '../../assets/home/icon-search.svg'
import iconChevronRight from '../../assets/home/icon-chevron-right.svg'
import mapPreview from '../../assets/home/map-preview.png'
import mapPin from '../../assets/home/map-pin-figma.svg'
import itemWallet from '../../assets/home/item-wallet.png'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconClock from '../../assets/home/icon-clock.svg'
import ScanningCard from '../../components/common/ScanningCard/ScanningCard'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import iconCheck from '../../assets/ai-matching/icon-parcel-check.svg'
import scrollHintButton from '../../assets/home/scroll-hint-button.png'
import './Home.css'

const RECENT_ACTIVITY = [
  { id: 1, text: '새로운 습득물 6건을 비교했어요', time: '오후 3:20', active: true },
  { id: 2, text: '매칭 후보 1건이 추가됐어요', time: '오후 1:05', active: false },
  { id: 3, text: '분실물 정보를 수정했어요', time: '어제', active: false },
]

const FOUND_REPORT_OPTIONS = [
  { id: 'has-it', title: '네, 제가 보관 중이에요', desc: '사진과 위치만으로 빠르게 등록할 수 있어요.' },
  { id: 'left-it', title: '아니요, 두고 왔거나 맡겼어요', desc: '본 위치 또는 맡긴 장소를 알려주세요.' },
]

const LEFT_ITEM_OPTIONS = [
  { id: 'street', title: '길에서 보고 두고 왔어요' },
  { id: 'station', title: '지구대 등에 맡겼어요' },
]

function QuickActionCard({ title, description, onClick }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag type={onClick ? 'button' : undefined} className="home-quick-card" onClick={onClick}>
      <div className="home-quick-card__head">
        <span className="home-quick-card__title">{title}</span>
        <img src={iconChevronRight} alt="" className="home-quick-card__chevron" />
      </div>
      <p className="home-quick-card__desc">{description}</p>
    </Tag>
  )
}

export default function Home({
  completedItem,
  onEditItem,
  onRegisterNew,
  completedFoundItem,
  onEditFoundItem,
  onRegisterNewFound,
  isApprovalResultReady = false,
  foundMatchResultPath = '/found/match-result',
}) {
  const [query, setQuery] = useState('')
  const [isScanPaused, setIsScanPaused] = useState(false)
  const [isFoundScanPaused, setIsFoundScanPaused] = useState(false)
  const [isFoundSheetOpen, setFoundSheetOpen] = useState(false)
  const [foundOption, setFoundOption] = useState('has-it')
  const [isLeftItemSheetOpen, setLeftItemSheetOpen] = useState(false)
  const [leftItemOption, setLeftItemOption] = useState('street')
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false)
  const rootRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const scrollEl = rootRef.current?.closest('.app-shell__content')
    if (!scrollEl) return
    const handleScroll = () => {
      const atEnd = scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 2
      setIsScrolledToEnd(atEnd)
    }
    handleScroll()
    scrollEl.addEventListener('scroll', handleScroll)
    return () => scrollEl.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search')
  }

  const handleNearbyCardClick = () => {
    if (completedItem) {
      navigate(isApprovalResultReady ? '/matching/result/ownership/approved' : '/matching/result')
    } else if (completedFoundItem) {
      navigate(foundMatchResultPath)
    }
  }
  const isNearbyCardLinked = Boolean(completedItem) || Boolean(completedFoundItem)
  const NearbyCardTag = isNearbyCardLinked ? 'button' : 'div'

  return (
    <div className="home" ref={rootRef}>
      <section className="home-hero">
        <img src={heroIllustration} alt="" className="home-hero__illustration" />
        <h2 className="home-hero__title">
          잃어버린 순간부터,
          <br />
          FINO가 함께 찾아요!
        </h2>
        <p className="home-hero__subtitle">분실물 등록하고 찾아보세요</p>
      </section>

      <div className="home__section home__section--search">
        <form className="home-search" role="search" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            className="home-search__input"
            placeholder="잃어버린 물건을 검색해보세요"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={(event) => {
              event.target.blur()
              navigate('/search')
            }}
          />
          <button type="submit" className="home-search__submit" aria-label="검색">
            <img src={iconSearch} alt="" className="home-search__icon" />
          </button>
        </form>
      </div>

      <div className="home__section">
        <div className="home-quick-row">
          <QuickActionCard
            title="분실물 등록"
            description="잃어버린 물건을 등록하고 찾기 시작해요"
            onClick={() => {
              onRegisterNew?.()
              navigate('/lost/new')
            }}
          />
          <QuickActionCard
            title="습득물 제보"
            description="발견한 물건을 빠르게 등록해요"
            onClick={() => setFoundSheetOpen(true)}
          />
        </div>
      </div>

      {completedItem && (
        <div className="home__section">
          <ScanningCard
            item={completedItem}
            isPaused={isScanPaused}
            onTogglePause={() => setIsScanPaused((prev) => !prev)}
            onEdit={() => {
              onEditItem?.()
              navigate('/lost/new')
            }}
          />
        </div>
      )}

      {!completedItem && completedFoundItem && (
        <div className="home__section">
          <ScanningCard
            item={completedFoundItem}
            isPaused={isFoundScanPaused}
            onTogglePause={() => setIsFoundScanPaused((prev) => !prev)}
            onEdit={() => {
              onEditFoundItem?.()
              navigate('/found/new/main')
            }}
            itemVerb="습득했어요"
            scanningTargetLabel="분실물"
          />
        </div>
      )}

      <div className="home__section">
        <div className="home-section-head">
          <h3 className="home-section-head__title">내 주변 습득물</h3>
          <button type="button" className="home-section-head__link" onClick={() => navigate('/map')}>
            지도보기
          </button>
        </div>
        <NearbyCardTag
          type={isNearbyCardLinked ? 'button' : undefined}
          className={`home-nearby-card${isNearbyCardLinked ? ' home-nearby-card--linked' : ''}`}
          onClick={isNearbyCardLinked ? handleNearbyCardClick : undefined}
        >
          <div className="home-map">
            <img src={mapPreview} alt="지도 미리보기" className="home-map__image" />
            <div className="home-map__pin" style={{ left: '50%', top: '50%' }}>
              <img src={mapPin} alt="" className="home-map__pin-img" />
            </div>
            <div
              className="home-map__pin"
              style={{ left: 'calc(50% + 90.5px)', top: 'calc(50% - 51px)' }}
            >
              <img src={mapPin} alt="" className="home-map__pin-img" />
            </div>
          </div>
          <div className="home-nearby-info">
            <img src={itemWallet} alt="검정 반지갑" className="home-nearby-info__photo" />
            <div className="home-nearby-info__body">
              <p className="home-nearby-info__title">검정 반지갑 습득</p>
              <p className="home-nearby-info__row">
                <img src={iconPayment} alt="" />
                검정색 Matin Kim 가죽 반지갑
              </p>
              <p className="home-nearby-info__row">
                <img src={iconClock} alt="" />
                오늘 오전 9~12시
              </p>
              <p className="home-nearby-info__location">서울 마포구 홍대입구역</p>
            </div>
          </div>
        </NearbyCardTag>
      </div>

      <div className="home__section">
        <div className="home-section-head">
          <h3 className="home-section-head__title">최근 활동</h3>
        </div>
        <div className="home-activity-card">
          {RECENT_ACTIVITY.map((item) => (
            <div className="home-activity-item" key={item.id}>
              <span className={`home-activity-item__dot${item.active ? ' home-activity-item__dot--active' : ''}`} />
              <div className="home-activity-item__body">
                <p className="home-activity-item__text">{item.text}</p>
                <p className="home-activity-item__time">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isScrolledToEnd && (
        <div className="home-scroll-hint">
          <div className="home-scroll-hint__fog" />
          <button
            type="button"
            className="home-scroll-hint__button"
            aria-label="아래로 스크롤"
            onClick={() => rootRef.current?.closest('.app-shell__content')?.scrollBy({ top: 300, behavior: 'smooth' })}
          >
            <img src={scrollHintButton} alt="" className="home-scroll-hint__icon" />
          </button>
        </div>
      )}

      <BottomSheet isOpen={isFoundSheetOpen} onClose={() => setFoundSheetOpen(false)}>
        <div className="found-report-sheet__header">
          <p className="found-report-sheet__title">지금 물건을 갖고 계신가요?</p>
          <p className="found-report-sheet__desc">상황에 맞게 선택하면 빠르게 등록할 수 있어요.</p>
        </div>
        <div className="found-report-sheet__actions">
          {FOUND_REPORT_OPTIONS.map((option) => {
            const isSelected = foundOption === option.id
            return (
              <button
                type="button"
                key={option.id}
                className={`found-report-sheet__option${isSelected ? ' found-report-sheet__option--selected' : ''}`}
                onClick={() => setFoundOption(option.id)}
              >
                <span className="found-report-sheet__option-body">
                  <span className="found-report-sheet__option-title">{option.title}</span>
                  <span className="found-report-sheet__option-desc">{option.desc}</span>
                </span>
                {isSelected && (
                  <span className="found-report-sheet__option-check">
                    <img src={iconCheck} alt="" />
                  </span>
                )}
              </button>
            )
          })}
          <button
            type="button"
            className="found-report-sheet__submit"
            onClick={() => {
              setFoundSheetOpen(false)
              if (foundOption === 'has-it') {
                onRegisterNewFound?.()
                navigate('/found/new')
              } else {
                setLeftItemSheetOpen(true)
              }
            }}
          >
            선택 완료
          </button>
        </div>
      </BottomSheet>

      <BottomSheet isOpen={isLeftItemSheetOpen} onClose={() => setLeftItemSheetOpen(false)}>
        <div className="found-report-sheet__header">
          <p className="found-report-sheet__title found-report-sheet__title--single-line">
            본 위치 또는 맡긴 장소를 알려주세요.
          </p>
          <p className="found-report-sheet__desc">상황에 맞게 선택하면 빠르게 등록할 수 있어요.</p>
        </div>
        <div className="found-report-sheet__actions">
          {LEFT_ITEM_OPTIONS.map((option) => {
            const isSelected = leftItemOption === option.id
            return (
              <button
                type="button"
                key={option.id}
                className={`left-item-sheet__option${isSelected ? ' left-item-sheet__option--selected' : ''}`}
                onClick={() => setLeftItemOption(option.id)}
              >
                <span className="left-item-sheet__option-title">{option.title}</span>
                {isSelected && (
                  <span className="found-report-sheet__option-check">
                    <img src={iconCheck} alt="" />
                  </span>
                )}
              </button>
            )
          })}
          <button
            type="button"
            className="found-report-sheet__submit"
            onClick={() => {
              setLeftItemSheetOpen(false)
              if (leftItemOption === 'street') navigate('/found/new/left')
              else if (leftItemOption === 'station') navigate('/found/new/station')
            }}
          >
            선택 완료
          </button>
        </div>
      </BottomSheet>
    </div>
  )
}
