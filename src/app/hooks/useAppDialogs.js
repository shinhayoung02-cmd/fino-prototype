import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDialog, useHomeNotification } from './useDialog'
import {
  APPROVAL_RESULT_DELAY,
  DELIVERY_DONE_DELAY,
  MATCH_RESULT_DELAY,
  PARCEL_RESULT_DELAY,
  RETURN_PROPOSAL_DELAY,
  VERIFICATION_RESULT_DELAY,
} from '../constants'

// 앱 전역 알림·팝업 상태
export default function useAppDialogs(lost) {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  // 홈으로 돌아오면 잠시 뒤 뜨는 '결과 도착' 알림
  const match = useHomeNotification(MATCH_RESULT_DELAY)
  const foundMatch = useHomeNotification(MATCH_RESULT_DELAY)
  const ownershipResult = useHomeNotification(MATCH_RESULT_DELAY)
  const verificationMaterial = useHomeNotification(MATCH_RESULT_DELAY)
  const ownershipQuizPass = useHomeNotification(MATCH_RESULT_DELAY)
  const secondaryVerification = useHomeNotification(MATCH_RESULT_DELAY)
  const multiClaimantResult = useHomeNotification(MATCH_RESULT_DELAY)
  const returnProposal = useHomeNotification(RETURN_PROPOSAL_DELAY)
  const parcelResult = useHomeNotification(PARCEL_RESULT_DELAY)
  const deliveryDone = useHomeNotification(DELIVERY_DONE_DELAY, { keepUntilShown: true })

  const verification = useDialog()
  const approval = useDialog()
  const searchComplete = useDialog()
  const cancelRequest = useDialog({ closeOnNavigate: false })
  const navMenu = useDialog()
  const flowChange = useDialog()
  const [pendingFlowToggle, setPendingFlowToggle] = useState(null)

  useEffect(() => {
    setPendingFlowToggle(null)
  }, [pathname])

  // 소유권 확인 요청 후 홈·AI 매칭에 있으면 확인 결과 알림
  const { isOwnershipRequested, isVerificationReady, setVerificationReady, setApprovalResultReady } = lost
  const { open: openVerification } = verification
  const { open: openApproval } = approval
  const { open: openSearchComplete } = searchComplete
  useEffect(() => {
    if (!isOwnershipRequested || isVerificationReady || !['/', '/matching'].includes(pathname)) return undefined

    const timer = setTimeout(() => {
      setVerificationReady(true)
      openVerification()
    }, VERIFICATION_RESULT_DELAY)
    return () => clearTimeout(timer)
  }, [isOwnershipRequested, isVerificationReady, pathname, setVerificationReady, openVerification])

  // 증빙 제출 후 홈으로 오면 승인 결과 알림
  const showApprovalResult = location.state?.showApprovalResult
  useEffect(() => {
    if (pathname !== '/' || !showApprovalResult) return undefined

    const timer = setTimeout(() => {
      setApprovalResultReady(true)
      openApproval()
      navigate('/', { replace: true, state: null })
    }, APPROVAL_RESULT_DELAY)
    return () => clearTimeout(timer)
  }, [pathname, showApprovalResult, navigate, setApprovalResultReady, openApproval])

  // 찾기 완료 후 홈으로 오면 바로 '찾기 마치기' 확인
  const showSearchComplete = location.state?.showSearchComplete
  useEffect(() => {
    if (pathname !== '/' || !showSearchComplete) return

    openSearchComplete()
    navigate('/', { replace: true, state: null })
  }, [pathname, showSearchComplete, navigate, openSearchComplete])

  // 분실자 플로우를 처음부터 다시 할 때 닫는 알림
  const resetLostNotices = () => {
    verification.close()
    match.reset()
    approval.close()
    parcelResult.reset()
    deliveryDone.reset()
    searchComplete.close()
  }

  // 습득자 플로우를 처음부터 다시 할 때 닫는 알림
  const resetFoundNotices = () => {
    foundMatch.reset()
    verificationMaterial.reset()
    ownershipQuizPass.reset()
    secondaryVerification.reset()
    multiClaimantResult.reset()
    returnProposal.reset()
    parcelResult.reset()
    deliveryDone.reset()
  }

  return {
    match,
    foundMatch,
    ownershipResult,
    verificationMaterial,
    ownershipQuizPass,
    secondaryVerification,
    multiClaimantResult,
    returnProposal,
    parcelResult,
    deliveryDone,
    verification,
    approval,
    searchComplete,
    cancelRequest,
    navMenu,
    flowChange,
    pendingFlowToggle,
    setPendingFlowToggle,
    resetLostNotices,
    resetFoundNotices,
  }
}
