import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button/Button'
import './Playground.css'

export default function DetailPreview() {
  const navigate = useNavigate()

  return (
    <div className="playground">
      <p className="playground__note">
        Header의 뒤로가기(‹) 버튼과 아래 버튼 모두 이전 화면으로 이동합니다. Bottom Nav가 없는 하위
        화면 레이아웃 확인용입니다.
      </p>
      <Button variant="primary" onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </div>
  )
}
