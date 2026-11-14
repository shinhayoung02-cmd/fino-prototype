import { useEffect, useState } from 'react'
import { readJson, writeJson } from '../../utils/storage'

const FLOW_SETTINGS_KEY = 'fino-flow-settings'

// 시연용 플로우 설정 스위치. 새로고침·다시 시작해도 유지
export default function useDemoSettings() {
  const [saved] = useState(() => readJson(FLOW_SETTINGS_KEY, {}))
  // '보관함 물건 있음' — 끄면 보관함이 빈 상태로 보임
  const [hasStorageItems, setHasStorageItems] = useState(saved.hasStorageItems ?? false)
  const [isMultipleClaimantsFlow, setMultipleClaimantsFlow] = useState(saved.isMultipleClaimantsFlow ?? false)
  const [isQuizFailFlow, setQuizFailFlow] = useState(saved.isQuizFailFlow ?? false)
  const [isFoundRestrictedFlow, setFoundRestrictedFlow] = useState(saved.isFoundRestrictedFlow ?? false)
  const [isFoundMultipleClaimantsFlow, setFoundMultipleClaimantsFlow] = useState(saved.isFoundMultipleClaimantsFlow ?? false)
  // 반환 방식은 플로우 설정에서 고름 (시트 없음)
  const [deliveryMethodPick, setDeliveryMethodPick] = useState(saved.deliveryMethodPick ?? 'in-person')

  useEffect(() => {
    writeJson(FLOW_SETTINGS_KEY, {
      hasStorageItems,
      isMultipleClaimantsFlow,
      isQuizFailFlow,
      isFoundRestrictedFlow,
      isFoundMultipleClaimantsFlow,
      deliveryMethodPick,
    })
  }, [hasStorageItems, isMultipleClaimantsFlow, isQuizFailFlow, isFoundRestrictedFlow, isFoundMultipleClaimantsFlow, deliveryMethodPick])

  // 다중 분실자·퀴즈 실패는 동시에 켤 수 없음
  const toggleMultipleClaimantsFlow = () => {
    setMultipleClaimantsFlow((prev) => {
      const next = !prev
      if (next) setQuizFailFlow(false)
      return next
    })
  }

  const toggleQuizFailFlow = () => {
    setQuizFailFlow((prev) => {
      const next = !prev
      if (next) setMultipleClaimantsFlow(false)
      return next
    })
  }

  const toggleFoundRestrictedFlow = () => setFoundRestrictedFlow((prev) => !prev)
  const toggleFoundMultipleClaimantsFlow = () => setFoundMultipleClaimantsFlow((prev) => !prev)
  const toggleHasStorageItems = () => setHasStorageItems((prev) => !prev)

  // 습득자 플로우를 마치면 플로우 스위치를 모두 끈다
  const turnOffFlowSwitches = () => {
    setMultipleClaimantsFlow(false)
    setQuizFailFlow(false)
    setFoundRestrictedFlow(false)
    setFoundMultipleClaimantsFlow(false)
  }

  // 저장해 둔 스위치 값으로 되돌림 (다시 시작)
  const restoreFlowSwitches = (switches) => {
    setMultipleClaimantsFlow(switches.isMultipleClaimantsFlow)
    setQuizFailFlow(switches.isQuizFailFlow)
    setFoundRestrictedFlow(switches.isFoundRestrictedFlow)
    setFoundMultipleClaimantsFlow(switches.isFoundMultipleClaimantsFlow)
  }

  return {
    hasStorageItems,
    toggleHasStorageItems,
    isMultipleClaimantsFlow,
    toggleMultipleClaimantsFlow,
    isQuizFailFlow,
    toggleQuizFailFlow,
    isFoundRestrictedFlow,
    toggleFoundRestrictedFlow,
    isFoundMultipleClaimantsFlow,
    toggleFoundMultipleClaimantsFlow,
    deliveryMethodPick,
    setDeliveryMethodPick,
    turnOffFlowSwitches,
    restoreFlowSwitches,
  }
}
