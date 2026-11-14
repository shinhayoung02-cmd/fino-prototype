import iconClose from '../../../assets/lost-register/icon-close.svg'
import './TextField.css'

// 한 줄 입력칸 + 값이 있으면 오른쪽 지우기(×) 버튼
export default function TextField({ value, onChange, placeholder, maxLength }) {
  return (
    <div className="text-field">
      <input
        type="text"
        className="text-field__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {value && (
        <button type="button" className="text-field__clear" aria-label="지우기" onClick={() => onChange('')}>
          <img src={iconClose} alt="" />
        </button>
      )}
    </div>
  )
}
