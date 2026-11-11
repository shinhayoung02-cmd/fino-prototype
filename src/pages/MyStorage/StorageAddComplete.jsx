import { useNavigate } from 'react-router-dom'
import SuccessGraphic from '../../components/common/SuccessGraphic/SuccessGraphic'
import '../LostItemRegister/RegisterComplete.css'
import './MyStorage.css'

// ③ 분실물 추가 - 보관함 추가 완료 (Figma 1343:53699)
export default function StorageAddComplete({ item }) {
  const navigate = useNavigate()
  if (!item) return null

  const metaParts = [item.category, `사진 ${item.photoUrls.length}장`]
  if (item.featureCount) metaParts.push(`특징 ${item.featureCount}개`)

  return (
    <div className="register-complete">
      <div className="register-complete__body">
        <SuccessGraphic />
        <h2 className="register-complete__title">
          내 물건 보관함에
          <br />
          추가됐어요
        </h2>
        <p className="register-complete__desc">잃어버리면 보관함에서 바로 불러올 수 있어요</p>

        <div className="register-complete__card">
          <div className="register-complete__card-meta-row">
            <p className="register-complete__card-meta">{metaParts.join(' · ')}</p>
            <span className="register-complete__card-pill">등록 완료</span>
          </div>
          <p className="register-complete__card-title">{item.title}</p>
          {item.feature && <p className="register-complete__card-desc">{item.feature}</p>}
        </div>
      </div>

      <div className="register-complete__next-wrap storage-complete__actions">
        <button type="button" className="storage-complete__home" onClick={() => navigate('/')}>
          홈으로 돌아가기
        </button>
        <button type="button" className="register-complete__next" onClick={() => navigate('/my/storage')}>
          보관함으로
        </button>
      </div>
    </div>
  )
}
