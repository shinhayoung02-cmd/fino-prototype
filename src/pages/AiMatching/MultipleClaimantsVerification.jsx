import { useState } from 'react'
import iconInfo from '../../assets/ai-matching/icon-callout-info.svg'
import iconVerifyLocation from '../../assets/ai-matching/icon-verify-location.svg'
import iconVerifyQuiz from '../../assets/ai-matching/icon-verify-quiz.svg'
import iconVerifyDigital from '../../assets/ai-matching/icon-verify-digital.svg'
import iconQuizChevron from '../../assets/ai-matching/icon-quiz-chevron.svg'
import './MultipleClaimantsVerification.css'

const CRITERIA_ITEMS = [
  {
    id: 'location',
    icon: iconVerifyLocation,
    title: '시공간 일치도',
    answer: '분실한 시간과 장소가 발견 정보와 얼마나 가까운지 확인해요.',
  },
  {
    id: 'quiz',
    icon: iconVerifyQuiz,
    title: '퀴즈 정답률',
    answer: '비공개 특징이 실제 물건과 얼마나 일치하는지 확인해요.',
  },
  {
    id: 'digital',
    icon: iconVerifyDigital,
    title: '디지털 증빙',
    answer: '구매 영수증이나 사용 기록 등 제출한 자료를 함께 확인해요.',
  },
]

export default function MultipleClaimantsVerification({ onConfirm }) {
  const [openItemId, setOpenItemId] = useState(null)

  const toggleItem = (id) => {
    setOpenItemId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="multiple-claimants-verification">
      <span className="multiple-claimants-verification__badge">동시 검증중</span>

      <div className="multiple-claimants-verification__intro">
        <h2 className="multiple-claimants-verification__title">
          여러 분실자의
          <br />
          정보를 함께 확인해요
        </h2>
        <p className="multiple-claimants-verification__desc">제출된 정보를 같은 기준으로 비교해 실제 주인을 확인해요.</p>
      </div>

      <div className="multiple-claimants-verification__callout">
        <img src={iconInfo} alt="" className="multiple-claimants-verification__callout-icon" />
        <p className="multiple-claimants-verification__callout-text">
          확인이 끝날 때까지 물건은 누구에게도 직접 전달하지
          <br />
          말아주세요.
        </p>
      </div>

      <div className="multiple-claimants-verification__field">
        <p className="multiple-claimants-verification__field-label">검증 기준 3가지</p>
        <div className="multiple-claimants-verification__list">
          {CRITERIA_ITEMS.map((item) => {
            const isItemOpen = openItemId === item.id
            return (
              <div className="multiple-claimants-verification__item" key={item.id}>
                <button
                  type="button"
                  className="multiple-claimants-verification__item-row"
                  onClick={() => toggleItem(item.id)}
                >
                  <img src={item.icon} alt="" className="multiple-claimants-verification__item-icon" />
                  <span className="multiple-claimants-verification__item-title">{item.title}</span>
                  <img
                    src={iconQuizChevron}
                    alt=""
                    className={`multiple-claimants-verification__item-chevron${isItemOpen ? ' multiple-claimants-verification__item-chevron--open' : ''}`}
                  />
                </button>
                {isItemOpen && <p className="multiple-claimants-verification__item-answer">{item.answer}</p>}
              </div>
            )
          })}
        </div>
      </div>

      <div className="multiple-claimants-verification__next-wrap">
        <button type="button" className="multiple-claimants-verification__next" onClick={onConfirm}>
          확인했어요
        </button>
      </div>
    </div>
  )
}
