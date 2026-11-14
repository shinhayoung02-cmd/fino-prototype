import { useState } from 'react'
import { getItemProfile } from '../../data/itemProfiles'
import { INITIAL_FOUND_DRAFT, INITIAL_FOUND_LEFT_DRAFT, INITIAL_FOUND_STATION_DRAFT } from '../drafts'
import { FOUND_MATCH_RESULT_PATH, getOwnershipQuizResultPath } from '../paths'

// AI 사진 인식 결과를 등록 draft에 반영
const withRecognizedItem = (draft, item) => ({ ...draft, name: item.category, description: item.description, itemKey: item.itemKey })

// 습득자 플로우: 습득물 등록(보관 중·두고 옴·지구대) → 소유권 퀴즈 → 반환
export default function useFoundFlow() {
  const [foundDraft, setFoundDraft] = useState(INITIAL_FOUND_DRAFT)
  const [foundLeftDraft, setFoundLeftDraft] = useState(INITIAL_FOUND_LEFT_DRAFT)
  const [foundStationDraft, setFoundStationDraft] = useState(INITIAL_FOUND_STATION_DRAFT)
  const [completedFoundItem, setCompletedFoundItem] = useState(null)
  // 홈·AI 매칭에서 '이어서 하기'로 돌아갈 화면
  const [foundFlowResumePath, setFoundFlowResumePath] = useState(FOUND_MATCH_RESULT_PATH)
  const [secondaryVerificationOrigin, setSecondaryVerificationOrigin] = useState('claimants')
  const [ownershipQuizAnswers, setOwnershipQuizAnswers] = useState([null, null, null])
  const [secondaryVerificationAnswers, setSecondaryVerificationAnswers] = useState([null, null, null])
  const [returnDeliveryMethod, setReturnDeliveryMethod] = useState('in-person')
  const [returnRetryCount, setReturnRetryCount] = useState(0)
  const [foundParcelStore, setFoundParcelStore] = useState(null)
  const [inPersonSchedulePlace, setInPersonSchedulePlace] = useState(null)
  const [inPersonScheduleSlot, setInPersonScheduleSlot] = useState(undefined)
  const [mailbox, setMailbox] = useState(null)
  const [policeBox, setPoliceBox] = useState(null)

  // 분실자 플로우를 처음부터 다시 할 때 함께 비우는 습득 등록 상태
  const resetRegistration = () => {
    setCompletedFoundItem(null)
    setFoundDraft(INITIAL_FOUND_DRAFT)
    setMailbox(null)
  }

  const reset = () => {
    resetRegistration()
    setFoundLeftDraft(INITIAL_FOUND_LEFT_DRAFT)
    setFoundStationDraft(INITIAL_FOUND_STATION_DRAFT)
    setFoundFlowResumePath(FOUND_MATCH_RESULT_PATH)
    setSecondaryVerificationOrigin('claimants')
    setOwnershipQuizAnswers([null, null, null])
    setSecondaryVerificationAnswers([null, null, null])
    setReturnDeliveryMethod('in-person')
    setReturnRetryCount(0)
    setFoundParcelStore(null)
    setInPersonSchedulePlace(null)
    setInPersonScheduleSlot(undefined)
    setPoliceBox(null)
  }

  const editCompletedItem = () => {
    if (completedFoundItem) setFoundDraft(completedFoundItem)
  }

  const editCompletedLeftItem = () => {
    if (completedFoundItem) setFoundLeftDraft(completedFoundItem)
  }

  const applyRecognizedPhoto = (item) => setFoundDraft((prev) => withRecognizedItem(prev, item))
  const applyRestrictedPhoto = (item) => setFoundStationDraft((prev) => withRecognizedItem(prev, item))

  return {
    foundDraft,
    setFoundDraft,
    foundLeftDraft,
    setFoundLeftDraft,
    foundStationDraft,
    setFoundStationDraft,
    completedFoundItem,
    setCompletedFoundItem,
    foundItemProfile: getItemProfile(completedFoundItem?.itemKey),
    editCompletedItem,
    editCompletedLeftItem,
    applyRecognizedPhoto,
    applyRestrictedPhoto,
    foundFlowResumePath,
    setFoundFlowResumePath,
    secondaryVerificationOrigin,
    setSecondaryVerificationOrigin,
    ownershipQuizResultPath: getOwnershipQuizResultPath(ownershipQuizAnswers),
    secondaryVerificationAnswers,
    setSecondaryVerificationAnswers,
    returnDeliveryMethod,
    setReturnDeliveryMethod,
    returnRetryCount,
    setReturnRetryCount,
    foundParcelStore,
    setFoundParcelStore,
    inPersonSchedulePlace,
    setInPersonSchedulePlace,
    inPersonScheduleSlot,
    setInPersonScheduleSlot,
    mailbox,
    setMailbox,
    policeBox,
    setPoliceBox,
    resetRegistration,
    reset,
  }
}
