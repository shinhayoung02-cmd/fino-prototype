import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchMyLostMatches } from '../../lib/supabase'

// 출시판 매칭 후보 { candidates, excludedCount }
export default function useLiveMatches(session) {
  const { pathname } = useLocation()
  const [liveMatches, setLiveMatches] = useState(null)
  const [selectedMatch, setSelectedMatch] = useState(null)

  // AI 매칭 탭에 들어올 때마다 DB 후보를 새로 불러옴(새 습득물이 등록됐을 수 있음)
  useEffect(() => {
    if (!session || pathname !== '/matching') return
    fetchMyLostMatches()
      .then(setLiveMatches)
      .catch((err) => console.error('[matches]', err))
  }, [session, pathname])

  return { liveMatches, selectedMatch, setSelectedMatch }
}
