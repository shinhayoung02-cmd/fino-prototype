import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import iconCheckBrand from '../../assets/ai-matching/icon-check-brand.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import { MATCH_CANDIDATES } from './matchCandidates'
import './MatchDetail.css'

const candidate = MATCH_CANDIDATES[0]

export default function MatchDetail({
  completedItem,
  isOwnershipRequested,
  onRequestOwnership,
  isVerificationReady,
  verificationResultPath,
}) {
  const [isExcludeSheetOpen, setExcludeSheetOpen] = useState(false)
  const navigate = useNavigate()

  const metaParts = []
  if (completedItem?.location) {
    metaParts.push(completedItem.location.address, `반경 ${completedItem.location.radius}`)
  }
  if (completedItem?.timeRange) {
    const { month, day, hour, minute } = completedItem.timeRange
    metaParts.push(`${month} ${day} ${hour} ${minute}`)
  }

  return (
    <div className="match-detail">
      <div className="match-detail__callout">
        <img src={iconInfo} alt="" className="match-detail__callout-icon" />
        <p className="match-detail__callout-text">사진과 발견 정보 확인 후 다음 단계를 선택해주세요</p>
      </div>

      <div className="match-detail__divider" />

      <div className="match-detail__info">
        <span className="match-detail__info-badge">유사도 {candidate.similarity}%</span>
        {metaParts.length > 0 && <p className="match-detail__info-meta">{metaParts.join(' · ')}</p>}
        <p className="match-detail__info-title">{candidate.title}</p>
        <p className="match-detail__info-feature">{candidate.feature}</p>
      </div>

      <div className="match-detail__divider" />

      <div className="match-detail__gallery">
        {candidate.gallery.map((photo, index) => (
          <div className="match-detail__gallery-item" key={photo}>
            <img src={photo} alt={`${candidate.title} 사진 ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="match-detail__reasons">
        <p className="match-detail__reasons-title">AI 매칭 근거</p>
        <ul className="match-detail__reasons-list">
          {candidate.matchReasons.map((reason) => (
            <li className="match-detail__reasons-item" key={reason}>
              <img src={iconCheckBrand} alt="" />
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {!isExcludeSheetOpen && (
        <div className="match-detail__actions">
          {isOwnershipRequested ? (
            <button
              type="button"
              className="match-detail__action match-detail__action--primary-dark"
              onClick={() => navigate(isVerificationReady ? verificationResultPath : '/matching/waiting')}
            >
              대기 화면 보기
            </button>
          ) : (
            <>
              <button
                type="button"
                className="match-detail__action match-detail__action--primary"
                onClick={() => {
                  onRequestOwnership?.()
                  navigate('/matching/result/ownership')
                }}
              >
                소유권 확인하기
              </button>
              <button
                type="button"
                className="match-detail__action match-detail__action--secondary"
                onClick={() => setExcludeSheetOpen(true)}
              >
                내 물건이 아니에요
              </button>
            </>
          )}
        </div>
      )}

      <BottomSheet
        isOpen={isExcludeSheetOpen}
        onClose={() => setExcludeSheetOpen(false)}
        title="이 습득물을 후보에서 제외할까요?"
        footer={
          <div className="match-exclude-sheet__actions">
            <button type="button" className="match-exclude-sheet__action match-exclude-sheet__action--primary" disabled>
              확인
            </button>
            <button
              type="button"
              className="match-exclude-sheet__action match-exclude-sheet__action--secondary"
              onClick={() => setExcludeSheetOpen(false)}
            >
              취소
            </button>
          </div>
        }
      >
        <p className="match-exclude-sheet__desc">제외하면 같은 습득물은 다시 추천되지 않아요.</p>
      </BottomSheet>
    </div>
  )
}
