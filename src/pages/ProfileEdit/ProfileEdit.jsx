import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMyProfile, updateMyProfile } from '../../lib/supabase'
import iconClose from '../../assets/lost-register/icon-close.svg'
import '../LostItemRegister/LostItemRegister.css'

// 프로필 수정 — 분실물 등록 폼(LostItemRegister) 레이아웃 재사용
function TextField({ value, onChange, placeholder, maxLength }) {
  return (
    <div className="lost-register__field">
      <input
        type="text"
        className="lost-register__field-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {value && (
        <button type="button" className="lost-register__field-clear" aria-label="지우기" onClick={() => onChange('')}>
          <img src={iconClose} alt="" />
        </button>
      )}
    </div>
  )
}

export default function ProfileEdit() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const [region, setRegion] = useState('')
  const [isSaving, setSaving] = useState(false)

  useEffect(() => {
    fetchMyProfile()
      .then((profile) => {
        setNickname(profile?.nickname ?? '')
        setRegion(profile?.region ?? '')
      })
      .catch((err) => console.error('[profile]', err))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateMyProfile({ nickname: nickname.trim(), region: region.trim() || null })
      navigate('/my')
    } catch (err) {
      console.error('[profile save]', err)
      alert('저장하지 못했어요. 다시 시도해주세요.')
      setSaving(false)
    }
  }

  return (
    <div className="lost-register">
      <div className="lost-register__scroll">
        <section className="lost-register__section">
          <h2 className="lost-register__section-title">닉네임</h2>
          <TextField value={nickname} onChange={setNickname} placeholder="닉네임을 입력해주세요" maxLength={20} />
        </section>

        <section className="lost-register__section">
          <h2 className="lost-register__section-title">내 동네</h2>
          <TextField value={region} onChange={setRegion} placeholder="예: 일상2동" maxLength={20} />
          <p className="lost-register__hint">자주 다니는 동네를 적어주세요</p>
        </section>

        <div className="lost-register__next-wrap lost-register__next-wrap--bottom">
          <button type="button" className="lost-register__next" disabled={!nickname.trim() || isSaving} onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
