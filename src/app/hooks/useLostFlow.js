import { useState } from 'react'
import { getItemProfile } from '../../data/itemProfiles'
import { EMPTY_EVIDENCE_FILES } from '../../pages/AiMatching/evidenceSteps'
import { INITIAL_LOST_DRAFT } from '../drafts'
import { PARCEL_GENERAL_RECEIPT_PATH } from '../paths'

// 분실자 플로우: 분실물 등록 → 소유권 확인 → 감사·전달 방식
export default function useLostFlow() {
  const [lostDraft, setLostDraft] = useState(INITIAL_LOST_DRAFT)
  const [completedItem, setCompletedItem] = useState(null)
  const [isOwnershipRequested, setOwnershipRequested] = useState(false)
  const [isVerificationReady, setVerificationReady] = useState(false)
  const [evidenceFiles, setEvidenceFiles] = useState(EMPTY_EVIDENCE_FILES)
  const [isApprovalResultReady, setApprovalResultReady] = useState(false)
  // 습득자가 등록한 주관식 퀴즈 (분실자가 풂)
  const [ownerQuiz, setOwnerQuiz] = useState(null)
  const [ownerQuizAnswers, setOwnerQuizAnswers] = useState(['', '', ''])
  const [thanksMethod, setThanksMethod] = useState(['coffee'])
  const [thanksMessage, setThanksMessage] = useState('')
  const [parcelStore, setParcelStore] = useState(null)
  const [parcelAddress, setParcelAddress] = useState(null)
  const [meetupLocations, setMeetupLocations] = useState([])
  const [meetupDates, setMeetupDates] = useState([])
  const [meetupSlotTimes, setMeetupSlotTimes] = useState({})
  const [deliveryDoneTo, setDeliveryDoneTo] = useState(PARCEL_GENERAL_RECEIPT_PATH)

  const resetOwnership = () => {
    setOwnershipRequested(false)
    setVerificationReady(false)
    setEvidenceFiles(EMPTY_EVIDENCE_FILES)
    setApprovalResultReady(false)
  }

  const resetReturnOptions = () => {
    setThanksMethod(['coffee'])
    setParcelStore(null)
    setParcelAddress(null)
  }

  const reset = () => {
    setOwnerQuiz(null)
    setOwnerQuizAnswers(['', '', ''])
    setCompletedItem(null)
    setLostDraft(INITIAL_LOST_DRAFT)
    resetOwnership()
    setMeetupLocations([])
    setMeetupDates([])
    setMeetupSlotTimes({})
    resetReturnOptions()
  }

  const editCompletedItem = () => {
    if (completedItem) setLostDraft(completedItem)
  }

  return {
    lostDraft,
    setLostDraft,
    completedItem,
    setCompletedItem,
    lostItemProfile: getItemProfile(completedItem?.itemKey),
    editCompletedItem,
    isOwnershipRequested,
    setOwnershipRequested,
    isVerificationReady,
    setVerificationReady,
    evidenceFiles,
    setEvidenceFiles,
    isApprovalResultReady,
    setApprovalResultReady,
    ownerQuiz,
    setOwnerQuiz,
    ownerQuizAnswers,
    setOwnerQuizAnswers,
    thanksMethod,
    setThanksMethod,
    thanksMessage,
    setThanksMessage,
    parcelStore,
    setParcelStore,
    parcelAddress,
    setParcelAddress,
    meetupLocations,
    setMeetupLocations,
    meetupDates,
    setMeetupDates,
    meetupSlotTimes,
    setMeetupSlotTimes,
    deliveryDoneTo,
    setDeliveryDoneTo,
    resetOwnership,
    resetReturnOptions,
    reset,
  }
}
