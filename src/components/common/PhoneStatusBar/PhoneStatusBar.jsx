import iconSignal from '../../../assets/home/icon-signal.svg'
import iconWifi from '../../../assets/home/icon-wifi.svg'
import iconBattery from '../../../assets/home/icon-battery.svg'
import './PhoneStatusBar.css'

export default function PhoneStatusBar() {
  return (
    <div className="phone-status-bar">
      <span className="phone-status-bar__time">9:41</span>
      <div className="phone-status-bar__icons">
        <img src={iconSignal} alt="" className="phone-status-bar__icon phone-status-bar__icon--signal" />
        <img src={iconWifi} alt="" className="phone-status-bar__icon phone-status-bar__icon--wifi" />
        <img src={iconBattery} alt="" className="phone-status-bar__icon phone-status-bar__icon--battery" />
      </div>
    </div>
  )
}
