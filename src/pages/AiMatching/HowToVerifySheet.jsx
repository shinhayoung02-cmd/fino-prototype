import { useState } from 'react'
import BottomSheet from '../../components/common/BottomSheet/BottomSheet'
import iconQuizChevron from '../../assets/ai-matching/icon-quiz-chevron.svg'
import './HowToVerifySheet.css'

export default function HowToVerifySheet({ isOpen, onClose, onConfirm, description, items }) {
  const [openItemId, setOpenItemId] = useState(null)

  const toggleItem = (id) => {
    setOpenItemId((prev) => (prev === id ? null : id))
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="이렇게 확인해요"
      overlayClassName="how-to-verify-sheet-overlay"
      footer={
        <button type="button" className="how-to-verify-sheet__confirm" onClick={onConfirm}>
          확인
        </button>
      }
    >
      <p className="how-to-verify-sheet__desc">{description}</p>
      <div className="how-to-verify-sheet__list">
        {items.map((item) => {
          const isItemOpen = openItemId === item.id
          return (
            <div className="how-to-verify-sheet__item" key={item.id}>
              <button
                type="button"
                className="how-to-verify-sheet__item-trigger"
                onClick={() => toggleItem(item.id)}
              >
                <img src={item.icon} alt="" className="how-to-verify-sheet__item-icon" />
                <span className="how-to-verify-sheet__item-title">{item.title}</span>
                <img
                  src={iconQuizChevron}
                  alt=""
                  className={`how-to-verify-sheet__item-chevron${isItemOpen ? ' how-to-verify-sheet__item-chevron--open' : ''}`}
                />
              </button>
              {isItemOpen && <p className="how-to-verify-sheet__item-answer">{item.answer}</p>}
            </div>
          )
        })}
      </div>
    </BottomSheet>
  )
}
