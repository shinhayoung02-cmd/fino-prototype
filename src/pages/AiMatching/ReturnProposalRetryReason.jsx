import { useState } from 'react'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import './ReturnProposalRetryReason.css'

const RETRY_REASONS = [
  { id: 'delivery', title: '전달 방법이 어려워요', desc: '다른 전달 방법으로 받고 싶어요' },
  { id: 'proposal', title: '제안 내용을 다시 조정하고 싶어요', desc: '장소나 시간 등 제안 내용을 다시 확인하고 싶어요' },
  { id: 'etc', title: '기타 사유가 있어요', desc: '직접 이유를 간단히 적을게요' },
]

export default function ReturnProposalRetryReason({ retryCount = 0, onPrevious, onSubmit }) {
  const [selectedId, setSelectedId] = useState('delivery')
  const isRetryLimitReached = retryCount >= 2

  return (
    <div className="retry-reason">
      <span className="retry-reason__badge">제안 확인 중</span>

      <div className="retry-reason__intro">
        <h2 className="retry-reason__title">어떤 내용을 바꾸면 좋을까요?</h2>
        <p className="retry-reason__desc">분실자에게 변경이 필요한 내용을 알려주세요.</p>
      </div>

      <div className="retry-reason__callout">
        <img src={iconInfo} alt="" className="retry-reason__callout-icon" />
        <p className="retry-reason__callout-text">
          선택한 내용만 분실자에게 전달돼요.
          <br />
          {' 분실자가 다시 제안하면 알림으로 알려드릴게요.'}
        </p>
      </div>

      <div className="retry-reason__options">
        {RETRY_REASONS.map((reason) => {
          const isSelected = selectedId === reason.id
          return (
            <button
              type="button"
              key={reason.id}
              className={`retry-reason__option${isSelected ? ' retry-reason__option--selected' : ''}`}
              onClick={() => setSelectedId(reason.id)}
            >
              <span className="retry-reason__option-body">
                <span className="retry-reason__option-title">{reason.title}</span>
                <span className="retry-reason__option-desc">{reason.desc}</span>
              </span>
              <span
                className={`retry-reason__option-radio${isSelected ? ' retry-reason__option-radio--selected' : ''}`}
              />
            </button>
          )
        })}
      </div>

      <div className="retry-reason__actions">
        <button type="button" className="retry-reason__previous" onClick={onPrevious}>
          이전
        </button>
        <button
          type="button"
          className="retry-reason__submit"
          disabled={isRetryLimitReached}
          onClick={() => onSubmit?.(selectedId)}
        >
          다시 제안 요청하기
        </button>
      </div>
    </div>
  )
}
