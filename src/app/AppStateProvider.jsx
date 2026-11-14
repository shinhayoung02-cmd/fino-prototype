import { useState } from 'react'
import { AppStateContext } from './appStateContext'
import useSession from './hooks/useSession'
import useDemoSettings from './hooks/useDemoSettings'
import useLostFlow from './hooks/useLostFlow'
import useFoundFlow from './hooks/useFoundFlow'
import useStorageItems from './hooks/useStorageItems'
import useLiveMatches from './hooks/useLiveMatches'
import useFlowHistory from './hooks/useFlowHistory'
import useAppDialogs from './hooks/useAppDialogs'
import useFlowActions from './hooks/useFlowActions'
import { getVerificationResultPath } from './paths'

// 화면 사이에서 공유하는 앱 상태. 각 영역은 hooks/의 훅이 맡는다
export default function AppStateProvider({ children }) {
  const session = useSession()
  const [activeTab, setActiveTab] = useState(null)
  // 첫 진입: 스플래시, 플로우 초기화: 스플래시 + 하단 로딩 바
  const [splash, setSplash] = useState({ id: 0, withProgress: false })
  const [readRoomIds, setReadRoomIds] = useState(() => new Set())
  const demo = useDemoSettings()
  const lost = useLostFlow()
  const found = useFoundFlow()
  const storage = useStorageItems(session)
  const matches = useLiveMatches(session)
  const flowHistory = useFlowHistory()
  const dialogs = useAppDialogs(lost)
  const actions = useFlowActions({ demo, lost, found, dialogs, setSplash })

  const markRoomRead = (roomId) => {
    setReadRoomIds((prev) => (prev.has(roomId) ? prev : new Set(prev).add(roomId)))
  }

  const value = {
    session,
    activeTab,
    setActiveTab,
    splash,
    setSplash,
    readRoomIds,
    markRoomRead,
    flowHistory,
    demo,
    lost,
    found,
    storage,
    matches,
    dialogs,
    actions,
    verificationResultPath: getVerificationResultPath(demo),
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
