import { useEffect, useState } from 'react'
import { fetchMyProfile } from '../../lib/supabase'

// 로그인한 사용자의 프로필 { nickname, avatar_url, region }. 불러오기 전엔 null
export default function useMyProfile() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetchMyProfile()
      .then(setProfile)
      .catch((err) => console.error('[profile]', err))
  }, [])

  return profile
}
