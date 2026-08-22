import { useNavigate } from 'react-router-dom'
import iconChevronLeft from '../../../assets/ai-matching/icon-chevron-left.svg'
import './Header.css'

export default function Header({ title, showBack = false, onBack, leftSlot, rightSlot }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) onBack()
    else navigate(-1)
  }

  return (
    <header className="header">
      <div className="header__side header__side--left">
        {showBack ? (
          <button
            type="button"
            className="header__icon-btn"
            onClick={handleBack}
            aria-label="뒤로가기"
          >
            <img src={iconChevronLeft} alt="" className="header__icon-btn-img" />
          </button>
        ) : (
          leftSlot
        )}
      </div>
      <h1 className="header__title">{title}</h1>
      <div className="header__side header__side--right">{rightSlot}</div>
    </header>
  )
}
