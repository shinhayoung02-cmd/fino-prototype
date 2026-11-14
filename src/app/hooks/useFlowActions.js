import { useNavigate } from 'react-router-dom'
import { INITIAL_LOST_DRAFT } from '../drafts'

// 여러 플로우에 걸친 초기화·전환 동작
export default function useFlowActions({ demo, lost, found, dialogs, setSplash }) {
  const navigate = useNavigate()

  const resetLostFlow = () => {
    lost.reset()
    found.resetRegistration()
    dialogs.resetLostNotices()
  }

  // 습득자(찾은 사람) 쪽 플로우 전체를 처음 상태로 되돌림
  const resetFoundFlow = () => {
    found.reset()
    lost.resetReturnOptions()
    demo.turnOffFlowSwitches()
    dialogs.resetFoundNotices()
  }

  // 분실자 '찾기 마치기'
  const finishSearch = () => {
    resetLostFlow()
    navigate('/')
  }

  // 습득자 '찾기 마치기'
  const finishFoundFlow = () => {
    resetFoundFlow()
    navigate('/')
  }

  const closeOwnershipResults = () => {
    lost.resetOwnership()
    dialogs.verification.close()
    dialogs.approval.close()
  }

  const startNewRegistration = () => {
    lost.setLostDraft(INITIAL_LOST_DRAFT)
    closeOwnershipResults()
  }

  const cancelOwnershipRequest = () => {
    dialogs.cancelRequest.close()
    closeOwnershipResults()
    navigate('/matching/result')
  }

  // 플로우 설정 변경은 확인 팝업을 거친다
  const requestFlowChange = (toggle) => {
    dialogs.navMenu.close()
    dialogs.setPendingFlowToggle(toggle)
    dialogs.flowChange.open()
  }

  const cancelFlowChange = () => {
    dialogs.setPendingFlowToggle(null)
    dialogs.flowChange.close()
  }

  const FLOW_TOGGLES = {
    claimants: demo.toggleMultipleClaimantsFlow,
    'quiz-fail': demo.toggleQuizFailFlow,
    'found-restricted': demo.toggleFoundRestrictedFlow,
  }

  const confirmFlowChange = () => {
    FLOW_TOGGLES[dialogs.pendingFlowToggle]?.()
    cancelFlowChange()
    resetLostFlow()
    navigate('/')
    setSplash({ id: Date.now(), withProgress: true })
  }

  // 다시 시작: 진행 상태만 초기화, 플로우 설정은 그대로
  const restartDemo = () => {
    dialogs.navMenu.close()
    resetLostFlow()
    resetFoundFlow()
    // 진행 초기화가 스위치도 끄므로 고른 플로우 설정을 다시 적용
    demo.restoreFlowSwitches(demo)
    navigate('/')
    setSplash({ id: Date.now(), withProgress: false })
  }

  return {
    finishSearch,
    finishFoundFlow,
    startNewRegistration,
    cancelOwnershipRequest,
    requestFlowChange,
    cancelFlowChange,
    confirmFlowChange,
    restartDemo,
  }
}
