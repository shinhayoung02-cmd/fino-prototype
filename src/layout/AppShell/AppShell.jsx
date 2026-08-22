import PhoneStatusBar from '../../components/common/PhoneStatusBar/PhoneStatusBar'
import './AppShell.css'

export default function AppShell({ header, bottomNav, children, className }) {
  return (
    <div className={className ? `app-shell ${className}` : 'app-shell'}>
      <PhoneStatusBar />
      {header}
      <main className="app-shell__content">{children}</main>
      {bottomNav}
    </div>
  )
}
