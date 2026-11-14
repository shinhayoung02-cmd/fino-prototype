import { useNavigate } from 'react-router-dom'
import ResultDialog from '../components/common/ResultDialog/ResultDialog'
import FlowChangeModal from '../components/common/FlowChangeModal/FlowChangeModal'
import useAppState from './useAppState'
import {
  FOUND_CLAIMANTS_RESULT_PATH,
  FOUND_MATCH_RESULT_PATH,
  FOUND_RETURN_REVIEW_PATH,
  FOUND_VERIFICATION_PATH,
  OWNERSHIP_PATH,
} from './paths'

const RESULT_ARRIVED = '확인을 눌러 결과를 확인해주세요'
const MATERIAL_ARRIVED = '확인을 눌러 자료를 확인해주세요'

// 앱 전역 알림 팝업
export default function AppDialogs() {
  const { demo, lost, found, dialogs, actions, verificationResultPath } = useAppState()
  const navigate = useNavigate()

  // 확인: 결과 화면으로 이동 / 취소: 홈·AI 매칭의 '이어서 하기'가 결과 화면을 가리키게
  const openFoundResult = (dialog, path) => {
    dialog.close()
    navigate(path)
  }
  const deferFoundResult = (dialog, path) => {
    dialog.close()
    found.setFoundFlowResumePath(path)
  }

  // 2차 검증 자료 도착 — 어디서 시작한 검증인지 기억
  const openSecondaryVerification = (dialog, origin) => {
    found.setSecondaryVerificationOrigin(origin)
    openFoundResult(dialog, FOUND_VERIFICATION_PATH)
  }
  const deferSecondaryVerification = (dialog, origin) => {
    found.setSecondaryVerificationOrigin(origin)
    deferFoundResult(dialog, FOUND_VERIFICATION_PATH)
  }

  const { searchComplete, match, foundMatch, ownershipResult, verificationMaterial, ownershipQuizPass, secondaryVerification } =
    dialogs
  const { multiClaimantResult, returnProposal, verification, approval, cancelRequest, deliveryDone, parcelResult } = dialogs

  return (
    <>
      <ResultDialog
        isOpen={searchComplete.isOpen}
        onClose={searchComplete.close}
        dismissible
        title="분실물 찾기가 완료됐어요"
        confirmTone="brand"
        confirmLabel="찾기 마치기"
        cancelLabel="아직 유지하기"
        onConfirm={actions.finishSearch}
      >
        이번 찾기를 마치고
        <br />
        새로 시작할까요?
      </ResultDialog>

      <ResultDialog
        isOpen={match.isOpen}
        onClose={match.close}
        title="AI 매칭 결과가 도착했어요"
        onConfirm={() => {
          match.close()
          navigate('/matching/result')
        }}
      >
        {RESULT_ARRIVED}
      </ResultDialog>

      <ResultDialog
        isOpen={foundMatch.isOpen}
        onClose={foundMatch.close}
        title="AI 매칭 결과가 도착했어요"
        onConfirm={() => openFoundResult(foundMatch, FOUND_MATCH_RESULT_PATH)}
        onCancel={() => deferFoundResult(foundMatch, FOUND_MATCH_RESULT_PATH)}
      >
        {RESULT_ARRIVED}
      </ResultDialog>

      <ResultDialog
        isOpen={ownershipResult.isOpen}
        onClose={ownershipResult.close}
        title="확인 결과가 도착했어요"
        onConfirm={() => openFoundResult(ownershipResult, found.ownershipQuizResultPath)}
        onCancel={() => deferFoundResult(ownershipResult, found.ownershipQuizResultPath)}
      >
        {RESULT_ARRIVED}
      </ResultDialog>

      <ResultDialog
        isOpen={verificationMaterial.isOpen}
        onClose={verificationMaterial.close}
        title="검증 자료가 도착했어요"
        onConfirm={() => openSecondaryVerification(verificationMaterial, 'ownership-quiz')}
        onCancel={() => deferSecondaryVerification(verificationMaterial, 'ownership-quiz')}
      >
        {MATERIAL_ARRIVED}
      </ResultDialog>

      <ResultDialog
        isOpen={ownershipQuizPass.isOpen}
        onClose={ownershipQuizPass.close}
        title="결과가 도착했어요"
        onConfirm={() => openFoundResult(ownershipQuizPass, FOUND_CLAIMANTS_RESULT_PATH)}
        onCancel={() => deferFoundResult(ownershipQuizPass, FOUND_CLAIMANTS_RESULT_PATH)}
      >
        {RESULT_ARRIVED}
      </ResultDialog>

      <ResultDialog
        isOpen={secondaryVerification.isOpen}
        onClose={secondaryVerification.close}
        title="검증 자료가 도착했어요"
        onConfirm={() => openSecondaryVerification(secondaryVerification, 'claimants')}
        onCancel={() => deferSecondaryVerification(secondaryVerification, 'claimants')}
      >
        {MATERIAL_ARRIVED}
      </ResultDialog>

      <ResultDialog
        isOpen={multiClaimantResult.isOpen}
        onClose={multiClaimantResult.close}
        title="결과가 도착했어요"
        onConfirm={() => openFoundResult(multiClaimantResult, FOUND_CLAIMANTS_RESULT_PATH)}
        onCancel={() => deferFoundResult(multiClaimantResult, FOUND_CLAIMANTS_RESULT_PATH)}
      >
        {RESULT_ARRIVED}
      </ResultDialog>

      <ResultDialog
        isOpen={returnProposal.isOpen}
        onClose={returnProposal.close}
        title={
          <>
            분실물 반환 제안이
            <br />
            도착했어요
          </>
        }
        onConfirm={() => {
          returnProposal.close()
          found.setReturnDeliveryMethod(demo.deliveryMethodPick)
          navigate(FOUND_RETURN_REVIEW_PATH)
        }}
      >
        확인을 눌러 확인해주세요
      </ResultDialog>

      <ResultDialog
        isOpen={verification.isOpen}
        onClose={verification.close}
        title="확인 결과가 도착했어요"
        onConfirm={() => {
          verification.close()
          navigate(verificationResultPath)
        }}
      >
        {RESULT_ARRIVED}
      </ResultDialog>

      <ResultDialog
        isOpen={approval.isOpen}
        onClose={approval.close}
        title="확인 결과가 도착했어요"
        onConfirm={() => {
          approval.close()
          navigate(`${OWNERSHIP_PATH}/verified`)
        }}
      >
        {RESULT_ARRIVED}
      </ResultDialog>

      <ResultDialog
        isOpen={cancelRequest.isOpen}
        onClose={cancelRequest.close}
        dismissible
        title="요청을 취소할까요?"
        confirmLabel="취소하기"
        cancelLabel="닫기"
        onConfirm={actions.cancelOwnershipRequest}
      >
        제출한 증빙은 삭제되고, 습득자 확인이 중단돼요
      </ResultDialog>

      <ResultDialog
        isOpen={deliveryDone.isOpen}
        onClose={deliveryDone.close}
        title="배송이 완료 됐어요"
        onConfirm={() => {
          deliveryDone.close()
          navigate(lost.deliveryDoneTo)
        }}
      >
        {RESULT_ARRIVED}
      </ResultDialog>

      <ResultDialog
        isOpen={parcelResult.isOpen}
        onClose={parcelResult.close}
        title="확인 결과가 도착했어요"
        onConfirm={() => {
          parcelResult.close()
          navigate(`${OWNERSHIP_PATH}/parcel/general/pickup`)
        }}
      >
        {RESULT_ARRIVED}
      </ResultDialog>

      <FlowChangeModal isOpen={dialogs.flowChange.isOpen} onClose={actions.cancelFlowChange} onConfirm={actions.confirmFlowChange} />
    </>
  )
}
