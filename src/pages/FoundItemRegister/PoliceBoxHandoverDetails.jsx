import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconChevronRight from '../../assets/home/icon-chevron-right.svg'
import iconChevronDown from '../../assets/ai-matching/icon-chevron-down.svg'
import iconInfo from '../../assets/lost-register/icon-info.svg'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import './PoliceBoxHandoverDetails.css'

const FAQ_ITEMS = [
  {
    id: 'why-needed',
    question: '인계 내역은 왜 필요한가요?',
    answer: '분실자가 물건이 어디로 인계됐는지 확인할 수 있도록 기록해요.',
  },
  {
    id: 'what-to-enter',
    question: '어떤 정보를 입력해야 하나요?',
    answer: '인계한 지구대나 파출소 이름, 날짜와 시간을 입력해주세요.',
  },
  {
    id: 'after-submit',
    question: '인계 후에는 어떻게 되나요?',
    answer: '작성한 인계 정보를 분실자에게 안내하고, 이후 수령 절차를 이어가요.',
  },
]

export default function PoliceBoxHandoverDetails() {
  const navigate = useNavigate()
  const [isFaqOpen, setFaqOpen] = useState(false)
  const [openFaqId, setOpenFaqId] = useState(null)

  const toggleFaqItem = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="police-box-details">
      <span className="police-box-details__badge">인계 내역 작성</span>
      <h2 className="police-box-details__title">지구대 인계 내역을 작성해주세요</h2>
      <p className="police-box-details__subtitle">물건을 인계한 장소와 시간을 알려주세요.</p>

      <div className="police-box-details__callout">
        <img src={iconInfo} alt="" className="police-box-details__callout-icon" />
        <p className="police-box-details__callout-text">
          작성한 내용은 분실자에게 인계 현황을 안내하는 데
          <br />
          사용돼요.
        </p>
      </div>

      <div className="police-box-details__list">
        <button type="button" className="police-box-details__list-row" onClick={() => setFaqOpen(true)}>
          <span>자주 묻는 질문</span>
          <img src={iconChevronRight} alt="" />
        </button>
        <div className="police-box-details__list-divider" />
        <div className="police-box-details__list-row">
          <span>고객센터 문의하기</span>
          <img src={iconChevronRight} alt="" />
        </div>
      </div>

      <div className="police-box-details__actions">
        <button
          type="button"
          className="police-box-details__confirm"
          onClick={() => navigate('/found/new/station')}
        >
          인계 내역 작성하기
        </button>
      </div>

      <BottomSheet isOpen={isFaqOpen} onClose={() => setFaqOpen(false)} title="자주 묻는 질문">
        <div className="faq-sheet__list">
          {FAQ_ITEMS.map((item) => {
            const isOpenItem = openFaqId === item.id
            return (
              <div className="faq-sheet__item" key={item.id}>
                <button type="button" className="faq-sheet__item-trigger" onClick={() => toggleFaqItem(item.id)}>
                  <span className="faq-sheet__item-question">{item.question}</span>
                  <img
                    src={iconChevronDown}
                    alt=""
                    className={`faq-sheet__item-chevron${isOpenItem ? ' faq-sheet__item-chevron--open' : ''}`}
                  />
                </button>
                {isOpenItem && (
                  <div className="faq-sheet__item-body">
                    <p className="faq-sheet__item-answer">{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </BottomSheet>
    </div>
  )
}
