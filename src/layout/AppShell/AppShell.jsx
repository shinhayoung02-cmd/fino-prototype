import PhoneStatusBar from '../../components/common/PhoneStatusBar/PhoneStatusBar'
import './AppShell.css'

export default function AppShell({ header, bottomNav, children, className }) {
  return (
    <div className={`app-shell${bottomNav ? '' : ' app-shell--no-nav'}${className ? ` ${className}` : ''}`}>
      <PhoneStatusBar />
      {header}
      <main className="app-shell__content">{children}</main>
      {bottomNav ?? (
        <div className="app-shell__indicator-area">
          <div className="app-shell__indicator" />
        </div>
      )}
    </div>
  )
}
