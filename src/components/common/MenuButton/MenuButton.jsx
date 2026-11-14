import iconMenu from '../../../assets/chat/icon-menu.svg'

// 헤더 오른쪽 ☰ 버튼 — 시연용 플로우 메뉴 열기
export default function MenuButton({ onClick }) {
  return (
    <button type="button" className="header__icon-btn" aria-label="메뉴" onClick={onClick}>
      <img src={iconMenu} alt="" className="header__icon-btn-img" />
    </button>
  )
}
