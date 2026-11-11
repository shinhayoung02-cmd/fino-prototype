import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SuccessGraphic from '../../components/common/SuccessGraphic/SuccessGraphic'
import './RegisterComplete.css'

const DEFAULT_ITEM = {
  name: '지갑/카드',
  description: '검정색 Matin Kim 가죽 반지갑',
  location: { address: '서울 마포구 서교동', detail: '홍대입구역 9번 출구 인근', radius: '500m' },
  timeRange: { month: '8월', day: '21일', hour: '9시', minute: '30분' },
}

function getObjectParticle(value) {
  const lastCharacter = value.trim().at(-1)
  const code = lastCharacter?.charCodeAt(0)

  if (code >= 0xac00 && code <= 0xd7a3) {
    return (code - 0xac00) % 28 === 0 ? '를' : '을'
  }

  return '을'
}

export default function RegisterComplete({ item, onNext, onRemember }) {
  const navigate = useNavigate()
  // ⑤ 분실물 기억 카드 (Figma 1343:53910) — 보관함에서 불러온 물건이면 안 띄움
  const [isRememberOpen, setRememberOpen] = useState(Boolean(onRemember) && !item?.fromStorage)

  if (!item) return null

  const { name, description, location, timeRange } = item.name ? item : DEFAULT_ITEM

  const metaParts = []
  if (location) metaParts.push(location.address, `반경 ${location.radius}`)
  else if (item.locationUnknown) metaParts.push('위치 모름')
  if (timeRange) metaParts.push(`${timeRange.month} ${timeRange.day} ${timeRange.hour} ${timeRange.minute}`)
  else if (item.timeUnknown) metaParts.push('시간 모름')

  const handleNext = () => {
    onNext?.()
    navigate('/')
  }

  return (
    <div className="register-complete">
      <div className="register-complete__body">
        <SuccessGraphic />

        <h2 className="register-complete__title">
          분실물 등록이
          <br />
          완료됐어요
        </h2>
        <p className="register-complete__desc">AI 매칭 결과는 알림으로 알려드려요</p>

        <div className="register-complete__card">
          <div className="register-complete__card-meta-row">
            <p className="register-complete__card-meta">{metaParts.join(' · ')}</p>
            <span className="register-complete__card-pill">접수 완료</span>
          </div>
          <p className="register-complete__card-title">
            {name}{getObjectParticle(name)} 잃어버렸어요
          </p>
          <p className="register-complete__card-desc">{description}</p>
        </div>
      </div>

      <div className="register-complete__next-wrap">
        {isRememberOpen && (
          <div className="register-complete__remember">
            <div className="register-complete__remember-head">
              <p className="register-complete__remember-text">이 물건을 내 물건 보관함에 기억해둘까요?</p>
            </div>
            <div className="register-complete__remember-actions">
              <button
                type="button"
                className="register-complete__remember-btn"
                onClick={() => setRememberOpen(false)}
              >
                괜찮아요
              </button>
              <button
                type="button"
                className="register-complete__remember-btn register-complete__remember-btn--primary"
                onClick={() => {
                  onRemember(item)
                  setRememberOpen(false)
                }}
              >
                기억하기
              </button>
            </div>
          </div>
        )}
        <button type="button" className="register-complete__next" onClick={handleNext}>
          홈으로
        </button>
      </div>
    </div>
  )
}
