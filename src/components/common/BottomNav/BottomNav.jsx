import { Link } from 'react-router-dom'
import './BottomNav.css'

export default function BottomNav({ items = [], activeTab, onSelect }) {
  return (
    <div className="bottom-nav-area">
      <nav className="bottom-nav">
        <div className="bottom-nav__divider" />
        {items.map((item) => {
          const isSelected = item.path === activeTab
          const maskValue = `url("${item.icon}")`
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`bottom-nav__item${isSelected ? ' bottom-nav__item--active' : ''}`}
              onClick={() => onSelect?.(item.path)}
            >
              <span className="bottom-nav__icon" aria-hidden="true">
                <span
                  className="bottom-nav__icon-glyph"
                  style={{ WebkitMaskImage: maskValue, maskImage: maskValue }}
                />
              </span>
              <span className="bottom-nav__label">{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="bottom-nav-area__indicator" />
    </div>
  )
}
