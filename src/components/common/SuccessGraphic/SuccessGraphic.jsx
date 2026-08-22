import iconSuccessCircle from '../../../assets/lost-register/icon-success-circle.svg'
import iconSuccessCheck from '../../../assets/lost-register/icon-success-check.svg'
import './SuccessGraphic.css'

export default function SuccessGraphic() {
  return (
    <div className="success-graphic">
      <img src={iconSuccessCircle} alt="" className="success-graphic__circle" />
      <img src={iconSuccessCheck} alt="" className="success-graphic__check" />
    </div>
  )
}
