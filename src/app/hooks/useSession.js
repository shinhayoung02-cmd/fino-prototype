import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

// 로그인 세션. undefined = 확인 중, null = 로그아웃
export default function useSession() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => data.subscription.unsubscribe()
  }, [])

  return session
}
