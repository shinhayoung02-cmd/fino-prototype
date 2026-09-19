import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconRetry from '../../assets/ai-matching/icon-retry.svg'
import iconCheck from '../../assets/ai-matching/icon-check.svg'
import iconSearchLg from '../../assets/ai-matching/icon-search-lg.svg'
import iconNoPhoto from '../../assets/ai-matching/icon-no-photo.svg'
import iconPayment from '../../assets/home/icon-payment.svg'
import iconClock from '../../assets/home/icon-clock.svg'
import ScanningCard from '../../components/common/ScanningCard/ScanningCard'
import { MATCH_CANDIDATES } from './matchCandidates'
import { FOUND_MATCH_CANDIDATES } from './foundMatchCandidates'
import './AiMatching.css'

const INITIAL_CHIPS = [
  { id: 'magok', label: '마곡동 근처', selected: true },
  { id: 'godeok', label: '고덕동 근처', selected: false },
  { id: 'radius', label: '5km 이내', selected: true },
]

function MatchCandidateCard({ candidate, onClick }) {
  const isTopMatch = candidate.similarity >= 70
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className="ai-matching__candidate"
      onClick={onClick}
    >
      <span
        className={`ai-matching__candidate-badge${isTopMatch ? ' ai-matching__candidate-badge--solid' : ''}`}
      >
        유사도 {candidate.similarity}%
      </span>
      <div className="ai-matching__candidate-body">
        <div className="ai-matching__candidate-photo">
          {candidate.photo ? (
            <img src={candidate.photo} alt="" />
          ) : (
            <img src={iconNoPhoto} alt="" className="ai-matching__candidate-photo-placeholder" />
          )}
        </div>
        <div className="ai-matching__candidate-info">
          <p className="ai-matching__candidate-title">{candidate.title}</p>
          <p className="ai-matching__candidate-row">
            <img src={iconPayment} alt="" />
            {candidate.feature}
          </p>
          <p className="ai-matching__candidate-row">
            <img src={iconClock} alt="" />
            {candidate.time}
          </p>
          <p className="ai-matching__candidate-location">{candidate.location}</p>
        </div>
      </div>
    </Tag>
  )
}

export default function AiMatching({
  completedItem,
  onEditItem,
  isApprovalResultReady = false,
  completedFoundItem,
  onEditFoundItem,
  foundMatchResultPath = '/found/match-result',
}) {
  const [chips, setChips] = useState(INITIAL_CHIPS)
  const [isScanPaused, setIsScanPaused] = useState(false)
  const [isScanCardDismissed, setIsScanCardDismissed] = useState(false)
  const navigate = useNavigate()
  const isFoundFlow = !completedItem && Boolean(completedFoundItem)
  const candidates = isFoundFlow ? FOUND_MATCH_CANDIDATES : MATCH_CANDIDATES
  const scanItem = isFoundFlow ? completedFoundItem : completedItem
  const hasCandidates = Boolean(scanItem) && candidates.length > 0

  const toggleChip = (id) => {
    setChips((prev) =>
      prev.map((chip) => (chip.id === id ? { ...chip, selected: !chip.selected } : chip)),
    )
  }

  return (
    <div className="ai-matching">
      <div className="ai-matching__status">
        <div className="ai-matching__status-head">
          <h2 className="ai-matching__status-title">AI 탐색 현황</h2>
          <span className="ai-matching__badge">분실물 탐색중</span>
        </div>

        <div className="ai-matching__chip-row">
          <button type="button" className="ai-matching__retry" aria-label="다시 탐색">
            <img src={iconRetry} alt="" />
          </button>
          <div className="ai-matching__chip-group">
            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className={`ai-matching__chip${chip.selected ? ' ai-matching__chip--selected' : ''}`}
                aria-pressed={chip.selected}
                onClick={() => toggleChip(chip.id)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ai-matching__excluded">
          <span className="ai-matching__excluded-check">
            <img src={iconCheck} alt="" />
          </span>
          <span className="ai-matching__excluded-label">제외된 후보 (1건)</span>
        </div>
      </div>

      {hasCandidates ? (
        <>
          <div className="ai-matching__list">
            {candidates.map((candidate) => (
              <MatchCandidateCard
                key={candidate.id}
                candidate={candidate}
                onClick={
                  candidate.id === 'match-1'
                    ? () =>
                        navigate(
                          isApprovalResultReady
                            ? '/matching/result/ownership/approved'
                            : '/matching/result',
                        )
                    : candidate.id === 'lost-1'
                      ? () => navigate(foundMatchResultPath)
                      : undefined
                }
              />
            ))}
          </div>

          {!isScanCardDismissed && (
            <div className="ai-matching__scan-wrap">
              <ScanningCard
                item={scanItem}
                isPaused={isScanPaused}
                onTogglePause={() => setIsScanPaused((prev) => !prev)}
                onEdit={() => {
                  if (isFoundFlow) {
                    onEditFoundItem?.()
                    navigate('/found/new/main')
                  } else {
                    onEditItem?.()
                    navigate('/lost/new')
                  }
                }}
                topRightIcon="close"
                onDismiss={() => setIsScanCardDismissed(true)}
                itemVerb={isFoundFlow ? '습득했어요' : '잃어버렸어요'}
                scanningTargetLabel={isFoundFlow ? '분실물' : '습득물'}
                statusText={
                  isFoundFlow
                    ? isScanPaused
                      ? '분실 정보 탐색을 일시정지했어요'
                      : '새로운 분실 정보를 계속 비교하고 있어요'
                    : undefined
                }
              />
            </div>
          )}
        </>
      ) : (
        <div className="ai-matching__empty">
          <div className="ai-matching__empty-icon">
            <img src={iconSearchLg} alt="" />
          </div>
          <p className="ai-matching__empty-title">현재 확인할 매칭 대한 후보가 없어요</p>
          <p className="ai-matching__empty-desc">
            새로운 습득물이 등록되면
            <br />
            계속 비교해드려요
          </p>
        </div>
      )}
    </div>
  )
}
