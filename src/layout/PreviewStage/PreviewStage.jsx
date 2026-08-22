import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MobileFrame from '../MobileFrame/MobileFrame'
import stepCircle from '../../assets/preview-stage/step-circle.svg'
import flowIcon1 from '../../assets/preview-stage/flow-icon-1.svg'
import flowIcon2 from '../../assets/preview-stage/flow-icon-2.svg'
import flowIcon3 from '../../assets/preview-stage/flow-icon-3.svg'
import flowIcon4 from '../../assets/preview-stage/flow-icon-4.svg'
import flowIcon5 from '../../assets/preview-stage/flow-icon-5.svg'
import iconChevronCollapse from '../../assets/preview-stage/icon-chevron-collapse.svg'
import iconCamera from '../../assets/preview-stage/icon-camera.svg'
import foundFlowIcon2 from '../../assets/preview-stage/found-flow-icon-2.svg'
import iconAccountCircle from '../../assets/preview-stage/icon-account-circle.svg'
import iconLock2 from '../../assets/preview-stage/icon-lock2.svg'
import iconSafe from '../../assets/preview-stage/icon-safe.svg'
import iconHelpBubbleArrow from '../../assets/preview-stage/icon-help-bubble-arrow.svg'
import heroIllustration from '../../assets/preview-stage/hero-illustration.png'
import './PreviewStage.css'

const LOSER_FLOW_STEPS = [
  { icon: flowIcon1, label: '등록' },
  { icon: flowIcon2, label: 'AI 매칭' },
  { icon: flowIcon3, label: '후보 확인' },
  { icon: flowIcon4, label: '소유자 검증' },
  { icon: flowIcon5, label: '회수' },
]

const FINDER_FLOW_STEPS = [
  { icon: iconCamera, label: '제보', framed: true, iconW: 18.83, iconH: 16.95 },
  { icon: foundFlowIcon2, label: '단서 구조화', framed: false },
  { icon: iconAccountCircle, label: '소유자 후보', framed: true, iconW: 18.83, iconH: 18.83 },
  { icon: iconLock2, label: '비공개 검증', framed: true, iconW: 16.95, iconH: 19.77 },
  { icon: iconSafe, label: '안전한 반환', framed: true, iconW: 18.83, iconH: 17.89 },
]

// 등록/제보(1) → 진행 중(2~3) → 반환(4~5). Ordered most-specific prefix first.
const LOSER_STEP_ROUTES = [
  ['/matching/result/ownership/delivery', 5],
  ['/matching/result/ownership/parcel', 5],
  ['/matching/result/ownership/in-person', 5],
  ['/matching/result/ownership/proposal', 5],
  ['/matching/result/ownership', 4],
  ['/matching/quiz-result', 3],
  ['/matching/result', 3],
  ['/matching/waiting', 2],
  ['/matching', 2],
  ['/lost/new', 1],
]

const FINDER_STEP_ROUTES = [
  ['/found/match-result/quiz/claimants/return-prep', 5],
  ['/found/match-result/quiz', 4],
  ['/found/match-result', 3],
  ['/found/new/waiting', 2],
  ['/found/new', 1],
]

function getFlowStep(pathname, routes) {
  const match = routes.find(([prefix]) => pathname.startsWith(prefix))
  return match ? match[1] : null
}

function OptionCard({ tone, selected, title, desc, onClick, bubble }) {
  return (
    <div className="preview-stage__option-wrap">
      <button
        type="button"
        className={`preview-stage__option preview-stage__option--${tone}${selected ? ' preview-stage__option--selected' : ''}`}
        onClick={onClick}
      >
        <p className="preview-stage__option-title">{title}</p>
        <p className="preview-stage__option-desc">{desc}</p>
      </button>
      {selected && bubble && (
        <div className="preview-stage__help-bubble">
          <img src={iconHelpBubbleArrow} alt="" className="preview-stage__help-bubble-arrow" />
          <p className="preview-stage__help-bubble-title">{bubble.title}</p>
          <p className="preview-stage__help-bubble-desc">{bubble.desc}</p>
        </div>
      )}
    </div>
  )
}

export default function PreviewStage({
  children,
  hasCompletedLostItem,
  isMultipleClaimantsFlow,
  onSelectMultipleClaimants,
  isQuizFailFlow,
  onSelectQuizFail,
  isFoundRestrictedFlow,
  onSelectFoundRestricted,
  isFoundMultipleClaimantsFlow,
  onSelectFoundMultipleClaimants,
  isParcelDeliveryFlow,
  onSelectParcelDelivery,
  isParcelStoreDeliveryFlow,
  onSelectParcelStoreDelivery,
  onSelectInPerson,
}) {
  const isInPersonSelected = !isParcelDeliveryFlow && !isParcelStoreDeliveryFlow
  const [isLoserSelectOpen, setIsLoserSelectOpen] = useState(true)
  const [isFinderSelectOpen, setIsFinderSelectOpen] = useState(true)
  const heroImgRef = useRef(null)
  const location = useLocation()
  let loserStep = getFlowStep(location.pathname, LOSER_STEP_ROUTES)
  // '/matching' is a persistent bottom-nav tab reachable with nothing registered yet
  // (empty state) — only counts as "in progress" once a lost item actually exists.
  if (location.pathname === '/matching' && !hasCompletedLostItem) {
    loserStep = null
  }
  const finderStep = getFlowStep(location.pathname, FINDER_STEP_ROUTES)
  const isLoserInProgress = loserStep !== null && loserStep <= 3
  const isFinderInProgress = finderStep !== null && finderStep <= 3

  useEffect(() => {
    const FADE_DISTANCE = 500
    const BASE_OPACITY = 0.55
    const handleScroll = (e) => {
      if (!e.target?.classList?.contains('app-shell__content') || !heroImgRef.current) return
      const progress = Math.min(1, e.target.scrollTop / FADE_DISTANCE)
      heroImgRef.current.style.opacity = BASE_OPACITY * (1 - progress)
    }
    document.addEventListener('scroll', handleScroll, true)
    return () => document.removeEventListener('scroll', handleScroll, true)
  }, [])

  return (
    <div className="preview-stage">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="preview-stage-crayon">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="preview-stage__row">
        <div className="preview-stage__col preview-stage__col--loser">
          <div className="preview-stage__intro">
            <p className="preview-stage__brand">FINO</p>
            <p className="preview-stage__headline">
              잃어버린 순간부터, <br />
              FINO가 함께 찾아요!
            </p>
            <p className="preview-stage__subcopy">
              분실물과 습득물을 AI가 계속 비교하고,  비공개 특징으로 <br />
              주인을 확인한 뒤 안전한 반환까지 이어줘요.
            </p>
          </div>

          <div className="preview-stage__stepper">
            <span className="preview-stage__step-item">
              <span className="preview-stage__step-circle preview-stage__step-circle--pulse" style={{ animationDelay: '0s' }}>
                <img src={stepCircle} alt="" />
              </span>
              <span className="preview-stage__step-label">AI 매칭</span>
            </span>
            <span className="preview-stage__step-connector preview-stage__step-connector--strong" />
            <span className="preview-stage__step-item">
              <span className="preview-stage__step-circle preview-stage__step-circle--pulse" style={{ animationDelay: '0.4s' }}>
                <img src={stepCircle} alt="" />
              </span>
              <span className="preview-stage__step-label">주인 확인</span>
            </span>
            <span className="preview-stage__step-connector" />
            <span className="preview-stage__step-item">
              <span className="preview-stage__step-circle preview-stage__step-circle--pulse" style={{ animationDelay: '0.8s' }}>
                <img src={stepCircle} alt="" />
              </span>
              <span className="preview-stage__step-label">안전 반환</span>
            </span>
          </div>

          <div className="preview-stage__panel">
            <div className="preview-stage__panel-title-row">
              <p className="preview-stage__panel-title">분실자 ㅣ</p>
              {isLoserInProgress && <span className="preview-stage__progress-badge">진행 중</span>}
            </div>
            <div className="preview-stage__how-card preview-stage__how-card--loser">
              <p className="preview-stage__how-desc">
                잃어버린 물건을 등록해요 <br />
                AI가 새로운 습득물을 계속 비교하고, <br />
                주인이 확인되면 반환 방법을 정해요.
              </p>
              <div className="preview-stage__flow-row">
                {LOSER_FLOW_STEPS.map((step, index) => (
                  <span className="preview-stage__flow-step" key={step.label}>
                    <span className="preview-stage__flow-icon-col">
                      <span className="preview-stage__flow-icon">
                        <img src={step.icon} alt="" />
                      </span>
                      <span className="preview-stage__flow-caption">{step.label}</span>
                    </span>
                    {index < LOSER_FLOW_STEPS.length - 1 && (
                      <span className="preview-stage__flow-arrow">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="preview-stage__select">
            <button
              type="button"
              className="preview-stage__select-header"
              onClick={() => setIsLoserSelectOpen((open) => !open)}
            >
              <p>분실자 상황 선택</p>
              <img
                src={iconChevronCollapse}
                alt=""
                className={isLoserSelectOpen ? '' : 'preview-stage__chevron--collapsed'}
              />
            </button>
            {isLoserSelectOpen && (
              <div className="preview-stage__options">
                <OptionCard
                  tone="loser"
                  selected={isMultipleClaimantsFlow}
                  title="여러 사람이 같은 물건을 찾는 경우"
                  desc="같은 물건을 찾는 사람이 여러 명인 상황"
                  onClick={onSelectMultipleClaimants}
                />
                <OptionCard
                  tone="loser"
                  selected={isQuizFailFlow}
                  title="추가 확인이 필요한 경우"
                  desc="주인 확인이 한 번에 되지 않는 상황"
                  onClick={onSelectQuizFail}
                />
              </div>
            )}
          </div>
        </div>

        <div className="preview-stage__phone-wrap">
          <img ref={heroImgRef} src={heroIllustration} alt="" className="preview-stage__hero-bg" />
          <MobileFrame>{children}</MobileFrame>
        </div>

        <div className="preview-stage__col preview-stage__col--finder">
          <div className="preview-stage__panel preview-stage__panel--finder">
            <div className="preview-stage__panel-title-row">
              <p className="preview-stage__panel-title preview-stage__panel-title--finder">습득자 ㅣ</p>
              {isFinderInProgress && <span className="preview-stage__progress-badge">진행 중</span>}
            </div>
            <div className="preview-stage__how-card preview-stage__how-card--finder">
              <p className="preview-stage__how-desc preview-stage__how-desc--finder">
                발견한 물건을 알려주세요 <br />
                AI가 분실자 후보를 연결하고, <br />
                주인을 확인한 뒤 안전하게 돌려줘요.
              </p>
              <div className="preview-stage__flow-row preview-stage__flow-row--finder">
                {FINDER_FLOW_STEPS.map((step, index) => (
                  <span className="preview-stage__flow-step" key={step.label}>
                    <span className="preview-stage__flow-icon-col">
                      <span
                        className={`preview-stage__flow-icon${step.framed ? ' preview-stage__flow-icon--framed' : ''}`}
                      >
                        <img
                          src={step.icon}
                          alt=""
                          style={step.framed ? { width: step.iconW, height: step.iconH } : undefined}
                        />
                      </span>
                      <span className="preview-stage__flow-caption preview-stage__flow-caption--finder">
                        {step.label}
                      </span>
                    </span>
                    {index < FINDER_FLOW_STEPS.length - 1 && (
                      <span className="preview-stage__flow-arrow preview-stage__flow-arrow--finder">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="preview-stage__select">
            <button
              type="button"
              className="preview-stage__select-header"
              onClick={() => setIsFinderSelectOpen((open) => !open)}
            >
              <p>습득자 상황 선택</p>
              <img
                src={iconChevronCollapse}
                alt=""
                className={isFinderSelectOpen ? '' : 'preview-stage__chevron--collapsed'}
              />
            </button>
            {isFinderSelectOpen && (
              <div className="preview-stage__options">
                <OptionCard
                  tone="finder"
                  selected={isFoundRestrictedFlow}
                  title="안전 인계가 필요한 경우"
                  desc="직접 보관하기 어려운 물건이 등록된 상황"
                  onClick={onSelectFoundRestricted}
                  bubble={{ title: '습득물 제보', desc: '"네, 보관중이에요"를 눌러야 돼요.' }}
                />
                <OptionCard
                  tone="finder"
                  selected={isFoundMultipleClaimantsFlow}
                  title="여러 사람이 같은 물건을 찾는 경우"
                  desc="같은 물건을 찾는 사람이 여러 명인 상황"
                  onClick={onSelectFoundMultipleClaimants}
                />
              </div>
            )}
            <p className="preview-stage__return-label">분실물 반환 제안 선택</p>
            <div className="preview-stage__chip-row">
              <button
                type="button"
                className={`preview-stage__chip${isInPersonSelected ? ' preview-stage__chip--selected' : ''}`}
                onClick={onSelectInPerson}
              >
                대면 직거래
              </button>
              <button
                type="button"
                className={`preview-stage__chip${isParcelDeliveryFlow ? ' preview-stage__chip--selected' : ''}`}
                onClick={onSelectParcelDelivery}
              >
                일반 택배
              </button>
              <button
                type="button"
                className={`preview-stage__chip${isParcelStoreDeliveryFlow ? ' preview-stage__chip--selected' : ''}`}
                onClick={onSelectParcelStoreDelivery}
              >
                편의점 택배
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
