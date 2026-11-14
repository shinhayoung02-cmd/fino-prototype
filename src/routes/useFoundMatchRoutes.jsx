import { useNavigate } from 'react-router-dom'
import FoundMatchResult from '../pages/AiMatching/FoundMatchResult'
import OwnerQuizBuilding from '../pages/AiMatching/OwnerQuizBuilding'
import QuizSteps from '../pages/AiMatching/QuizSteps'
import QuizStepsReview from '../pages/AiMatching/QuizStepsReview'
import OwnershipQuizSubmitted from '../pages/AiMatching/OwnershipQuizSubmitted'
import OwnershipQuizWaiting from '../pages/AiMatching/OwnershipQuizWaiting'
import OwnershipQuizUndecided from '../pages/AiMatching/OwnershipQuizUndecided'
import OwnershipAdditionalEvidenceWaiting from '../pages/AiMatching/OwnershipAdditionalEvidenceWaiting'
import MultipleClaimantsWaiting from '../pages/AiMatching/MultipleClaimantsWaiting'
import MultipleClaimantsPreparing from '../pages/AiMatching/MultipleClaimantsPreparing'
import SecondaryVerificationStart from '../pages/AiMatching/SecondaryVerificationStart'
import SecondaryVerificationQuestion from '../pages/AiMatching/SecondaryVerificationQuestion'
import SecondaryVerificationReview from '../pages/AiMatching/SecondaryVerificationReview'
import MultipleClaimantsVerification from '../pages/AiMatching/MultipleClaimantsVerification'
import MultiClaimantOwnerConfirmed from '../pages/AiMatching/MultiClaimantOwnerConfirmed'
import MultipleClaimantsReturnPrep from '../pages/AiMatching/MultipleClaimantsReturnPrep'
import ReturnProposalReview from '../pages/AiMatching/ReturnProposalReview'
import ReturnProposalRetryReason from '../pages/AiMatching/ReturnProposalRetryReason'
import ReturnProposalRetrySubmitted from '../pages/AiMatching/ReturnProposalRetrySubmitted'
import InPersonScheduleConfirm from '../pages/AiMatching/InPersonScheduleConfirm'
import InPersonPlaceSelect from '../pages/AiMatching/InPersonPlaceSelect'
import InPersonScheduleReview from '../pages/AiMatching/InPersonScheduleReview'
import InPersonMeetupScheduled from '../pages/AiMatching/InPersonMeetupScheduled'
import InPersonDeliveryComplete from '../pages/AiMatching/InPersonDeliveryComplete'
import ParcelPickupAddressCheck from '../pages/AiMatching/ParcelPickupAddressCheck'
import ParcelPickupAddressForm from '../pages/AiMatching/ParcelPickupAddressForm'
import ParcelBoxSizeSelect from '../pages/AiMatching/ParcelBoxSizeSelect'
import ParcelDeliveryReview from '../pages/AiMatching/ParcelDeliveryReview'
import ParcelDeliveryTracking from '../pages/AiMatching/ParcelDeliveryTracking'
import ParcelDeliveryComplete from '../pages/AiMatching/ParcelDeliveryComplete'
import ParcelStoreDeliveryStart from '../pages/AiMatching/ParcelStoreDeliveryStart'
import ParcelStoreWeightSelect from '../pages/AiMatching/ParcelStoreWeightSelect'
import ParcelStoreInfoForm from '../pages/AiMatching/ParcelStoreInfoForm'
import ParcelStoreNearby from '../pages/AiMatching/ParcelStoreNearby'
import ParcelStoreDeliveryProgress from '../pages/AiMatching/ParcelStoreDeliveryProgress'
import ParcelStoreDeliveryComplete from '../pages/AiMatching/ParcelStoreDeliveryComplete'
import ParcelStoreSelect from '../pages/AiMatching/ParcelStoreSelect'
import { getOwnerQuiz } from '../data/ownerQuiz'
import { withObjectParticle } from '../utils/korean'
import useAppState from '../app/useAppState'
import { DELIVERY_METHOD_PICK_OPTIONS, RETRY_RETURN_PROPOSAL_DELAY } from '../app/constants'
import {
  FOUND_CLAIMANTS_PATH as CLAIMANTS,
  FOUND_CLAIMANTS_RESULT_PATH,
  FOUND_MATCH_RESULT_PATH,
  FOUND_QUIZ_PATH as QUIZ,
  FOUND_RETURN_PREP_PATH as RETURN_PREP,
  FOUND_RETURN_REVIEW_PATH as RETURN_REVIEW,
  FOUND_VERIFICATION_PATH as VERIFICATION,
} from '../app/paths'
import useStepRoute from './useStepRoute'

const IN_PERSON = `${RETURN_REVIEW}/in-person`
const PARCEL = `${RETURN_REVIEW}/parcel`
const PARCEL_STORE = `${RETURN_REVIEW}/parcel-store`

// 다시 제안 요청 사유가 '전달 방식'이면 다음 전달 방식으로 바꿔 제안
function getNextDeliveryMethod(method) {
  const order = DELIVERY_METHOD_PICK_OPTIONS.map((option) => option.id)
  return order[(order.indexOf(method) + 1) % order.length]
}

// 습득자: AI 매칭 결과 → 소유권 퀴즈 등록·채점 → (다중 분실자) 2차 검증 → 반환 제안·전달
export default function useFoundMatchRoutes() {
  const { setActiveTab, demo, lost, found, dialogs, actions } = useAppState()
  const navigate = useNavigate()
  const stepRoute = useStepRoute()
  const { foundItemProfile } = found
  const matchCandidate = foundItemProfile.matchCandidates?.[0]
  // 습득자가 등록 중인 퀴즈 (AI 초안 → 정답 수정)
  const finderQuiz = lost.ownerQuiz ?? getOwnerQuiz(found.completedFoundItem?.itemKey)

  // 홈으로 가면서 결과 알림 예약
  const goHomeAndNotify = (notification) => {
    setActiveTab('/')
    notification.notifyOnHome()
    navigate('/')
  }

  const goHome = () => navigate('/')

  const submitReturnRetryReason = (reasonId) => {
    if (reasonId === 'delivery') found.setReturnDeliveryMethod(getNextDeliveryMethod(found.returnDeliveryMethod))
    found.setReturnRetryCount((prev) => prev + 1)
    navigate(`${RETURN_REVIEW}/retry-reason/submitted`)
  }

  return [
    stepRoute(
      FOUND_MATCH_RESULT_PATH,
      { title: 'AI 매칭', className: 'found-match-result-shell', backTo: '/' },
      <FoundMatchResult
        cardTitle={matchCandidate?.title ?? `${withObjectParticle(foundItemProfile.shortDescription)} 잃어버렸어요`}
        cardDesc={matchCandidate?.feature ?? foundItemProfile.description}
        onNext={() => navigate(demo.isFoundMultipleClaimantsFlow ? CLAIMANTS : QUIZ)}
      />,
    ),
    stepRoute(
      QUIZ,
      { title: '소유권 확인 퀴즈', backTo: FOUND_MATCH_RESULT_PATH },
      <OwnerQuizBuilding onDone={() => navigate(`${QUIZ}/1`, { replace: true })} />,
    ),
    stepRoute(
      `${QUIZ}/1`,
      { title: '소유권 확인 퀴즈', backTo: QUIZ },
      <QuizSteps
        steps={finderQuiz.map((item) => ({ title: item.question, hint: `AI가 찾은 특징: ${item.feature}` }))}
        answers={finderQuiz.map((item) => item.answer)}
        onChangeAnswers={(answers) => lost.setOwnerQuiz(finderQuiz.map((item, i) => ({ ...item, answer: answers[i] })))}
        callout="AI가 사진에서 찾은 정답이에요. 다르면 고쳐주세요."
        placeholder="정답을 입력해주세요"
        onDone={() => navigate(`${QUIZ}/review`)}
      />,
    ),
    stepRoute(
      `${QUIZ}/review`,
      { title: '소유권 확인 퀴즈', backTo: `${QUIZ}/1` },
      <QuizStepsReview
        title="소유권 확인 퀴즈"
        desc="분실자에게 낼 질문과 정답을 최종 확인해주세요"
        callout="AI가 사진을 바탕으로 퀴즈를 만들었어요."
        items={finderQuiz}
        onEdit={() => navigate(`${QUIZ}/1`)}
        onSubmit={() => {
          lost.setOwnerQuiz(finderQuiz)
          navigate(`${QUIZ}/submitted`)
        }}
      />,
    ),
    stepRoute(
      `${QUIZ}/submitted`,
      { title: '등록 완료', backTo: `${QUIZ}/review` },
      <OwnershipQuizSubmitted
        title="퀴즈를 등록했어요"
        descLines={['분실자가 퀴즈를 풀면', '결과를 알려드릴게요.']}
        onViewWaiting={() => navigate(`${QUIZ}/waiting`)}
        onGoHome={() => goHomeAndNotify(dialogs.ownershipResult)}
      />,
    ),
    stepRoute(
      `${QUIZ}/waiting`,
      { title: '소유권 확인', backTo: `${QUIZ}/submitted` },
      <OwnershipQuizWaiting onConfirm={() => goHomeAndNotify(dialogs.ownershipResult)} />,
    ),
    stepRoute(
      CLAIMANTS,
      { title: '소유권 확인', backTo: '/' },
      <MultipleClaimantsWaiting onNext={() => navigate(`${CLAIMANTS}/preparing`)} />,
    ),
    stepRoute(
      `${QUIZ}/undecided`,
      { title: '소유권 확인', backTo: `${QUIZ}/waiting` },
      <OwnershipQuizUndecided onNext={() => navigate(`${QUIZ}/undecided/waiting`)} />,
    ),
    stepRoute(
      `${QUIZ}/undecided/waiting`,
      { title: '소유권 확인', backTo: `${QUIZ}/undecided` },
      <OwnershipAdditionalEvidenceWaiting onGoHome={() => goHomeAndNotify(dialogs.verificationMaterial)} />,
    ),
    stepRoute(
      `${CLAIMANTS}/preparing`,
      { title: '주인 확인', backTo: CLAIMANTS },
      <MultipleClaimantsPreparing
        onGoHome={() => {
          setActiveTab('/')
          dialogs.secondaryVerification.notifyOnHome()
        }}
      />,
    ),
    stepRoute(
      VERIFICATION,
      { title: '소유권 2차 검증', backTo: '/' },
      <SecondaryVerificationStart
        onStart={() => navigate(`${VERIFICATION}/1`)}
        cardTitle={`${withObjectParticle(foundItemProfile.category)} 습득했어요`}
        cardDesc={foundItemProfile.shortDescription}
      />,
    ),
    stepRoute(
      `${VERIFICATION}/1`,
      { title: '소유권 2차 검증', backTo: VERIFICATION },
      <SecondaryVerificationQuestion
        answers={found.secondaryVerificationAnswers}
        onChangeAnswers={found.setSecondaryVerificationAnswers}
        onSubmit={() => navigate(`${VERIFICATION}/review`)}
        steps={foundItemProfile.secondaryVerificationSteps}
      />,
    ),
    stepRoute(
      `${VERIFICATION}/review`,
      { title: '소유권 2차 검증', backTo: `${VERIFICATION}/1` },
      <SecondaryVerificationReview
        answers={found.secondaryVerificationAnswers}
        onEdit={() => navigate(`${VERIFICATION}/1`)}
        onSubmit={() => {
          if (found.secondaryVerificationOrigin === 'ownership-quiz') {
            navigate(`${QUIZ}/undecided/verification-submitted`)
          } else {
            navigate(`${VERIFICATION}/submitted`)
          }
        }}
        steps={foundItemProfile.secondaryVerificationSteps}
      />,
    ),
    stepRoute(
      `${QUIZ}/undecided/verification-submitted`,
      { title: '제출 완료', backTo: `${VERIFICATION}/review` },
      <OwnershipQuizSubmitted showWaitingButton={false} onGoHome={() => goHomeAndNotify(dialogs.ownershipQuizPass)} />,
    ),
    stepRoute(
      `${VERIFICATION}/submitted`,
      { title: '제출 완료', backTo: `${VERIFICATION}/review` },
      <OwnershipQuizSubmitted
        onViewWaiting={() => navigate(`${VERIFICATION}/waiting`)}
        onGoHome={() => goHomeAndNotify(dialogs.multiClaimantResult)}
      />,
    ),
    stepRoute(
      `${VERIFICATION}/waiting`,
      { title: '주인 확인', backTo: `${VERIFICATION}/submitted` },
      <MultipleClaimantsVerification onConfirm={() => goHomeAndNotify(dialogs.multiClaimantResult)} />,
    ),
    stepRoute(
      FOUND_CLAIMANTS_RESULT_PATH,
      { title: '소유권 확인', backTo: '/' },
      <MultiClaimantOwnerConfirmed
        onConfirm={() => navigate(RETURN_PREP)}
        cardMeta={`${matchCandidate?.location ?? '서울 마포구 홍대입구역'} 근처 · ${matchCandidate?.time ?? '오늘 오전 9~12시'}`}
        cardTitle={`${foundItemProfile.category} 습득`}
        cardDesc={foundItemProfile.shortDescription}
      />,
    ),
    stepRoute(
      RETURN_PREP,
      { title: '반환 준비', backTo: '/' },
      <MultipleClaimantsReturnPrep onGoHome={() => dialogs.returnProposal.notifyOnHome()} />,
    ),
    stepRoute(
      RETURN_REVIEW,
      { title: '감사 및 전달 방식 확인', backTo: '/' },
      <ReturnProposalReview deliveryMethod={found.returnDeliveryMethod} itemProfile={foundItemProfile} />,
    ),
    stepRoute(
      `${RETURN_REVIEW}/retry-reason`,
      { title: '다시 제안 요청', backTo: RETURN_REVIEW },
      <ReturnProposalRetryReason
        retryCount={found.returnRetryCount}
        onPrevious={() => navigate(RETURN_REVIEW)}
        onSubmit={submitReturnRetryReason}
      />,
    ),
    stepRoute(
      `${RETURN_REVIEW}/retry-reason/submitted`,
      { title: '제출 완료', backTo: `${RETURN_REVIEW}/retry-reason` },
      <ReturnProposalRetrySubmitted
        onViewWaiting={() => navigate(RETURN_PREP)}
        onGoHome={() => {
          dialogs.returnProposal.notifyOnHome(RETRY_RETURN_PROPOSAL_DELAY)
          navigate('/')
        }}
      />,
    ),
    stepRoute(
      IN_PERSON,
      { title: '대면 직거래', backTo: RETURN_REVIEW },
      <InPersonScheduleConfirm
        place={found.inPersonSchedulePlace}
        onSelectPlace={() => navigate(`${IN_PERSON}/place`)}
        slot={found.inPersonScheduleSlot}
        onSlotChange={found.setInPersonScheduleSlot}
        onNext={() => navigate(`${IN_PERSON}/confirm`)}
        itemProfile={foundItemProfile}
      />,
    ),
    stepRoute(
      `${IN_PERSON}/confirm`,
      { title: '대면 직거래', backTo: IN_PERSON },
      <InPersonScheduleReview
        place={found.inPersonSchedulePlace}
        slot={found.inPersonScheduleSlot}
        onEdit={() => navigate(IN_PERSON)}
        onConfirm={() => navigate(`${IN_PERSON}/scheduled`)}
        itemProfile={foundItemProfile}
      />,
    ),
    stepRoute(
      `${IN_PERSON}/scheduled`,
      { title: '대면 직거래', backTo: `${IN_PERSON}/confirm` },
      <InPersonMeetupScheduled
        place={found.inPersonSchedulePlace}
        slot={found.inPersonScheduleSlot}
        onNext={() => navigate(`${IN_PERSON}/complete`)}
        itemProfile={foundItemProfile}
      />,
    ),
    stepRoute(
      `${IN_PERSON}/complete`,
      { title: '수령 완료', backTo: '/' },
      <InPersonDeliveryComplete onFinishSearch={actions.finishFoundFlow} onKeepAndGoHome={goHome} itemProfile={foundItemProfile} />,
    ),
    stepRoute(PARCEL, { title: '택배 배송 접수', backTo: RETURN_REVIEW }, <ParcelPickupAddressCheck />),
    stepRoute(`${PARCEL}/address`, { title: '택배 배송 접수', backTo: PARCEL }, <ParcelPickupAddressForm />),
    stepRoute(`${PARCEL}/box-size`, { title: '택배 배송 접수', backTo: `${PARCEL}/address` }, <ParcelBoxSizeSelect />),
    stepRoute(
      `${PARCEL}/confirm`,
      { title: '택배 배송 접수', backTo: `${PARCEL}/box-size` },
      <ParcelDeliveryReview itemProfile={foundItemProfile} />,
    ),
    stepRoute(
      `${PARCEL}/tracking`,
      { title: '택배 배송', backTo: `${PARCEL}/confirm` },
      <ParcelDeliveryTracking itemProfile={foundItemProfile} />,
    ),
    stepRoute(
      `${PARCEL}/complete`,
      { title: '수령 완료', backTo: '/' },
      <ParcelDeliveryComplete onFinishSearch={actions.finishFoundFlow} onKeepAndGoHome={goHome} itemProfile={foundItemProfile} />,
    ),
    stepRoute(
      PARCEL_STORE,
      { title: '편의점 택배', backTo: RETURN_REVIEW },
      <ParcelStoreDeliveryStart itemProfile={foundItemProfile} />,
    ),
    stepRoute(`${PARCEL_STORE}/weight`, { title: '편의점 택배', backTo: PARCEL_STORE }, <ParcelStoreWeightSelect />),
    stepRoute(`${PARCEL_STORE}/info`, { title: '편의점 택배', backTo: `${PARCEL_STORE}/weight` }, <ParcelStoreInfoForm />),
    stepRoute(
      `${PARCEL_STORE}/nearby`,
      { title: '편의점 택배', backTo: `${PARCEL_STORE}/info` },
      <ParcelStoreNearby store={found.foundParcelStore} />,
    ),
    stepRoute(
      `${PARCEL_STORE}/store`,
      { title: '보낼 편의점 선택', backTo: `${PARCEL_STORE}/nearby` },
      <ParcelStoreSelect
        value={found.foundParcelStore}
        onConfirm={found.setFoundParcelStore}
        backTo={`${PARCEL_STORE}/nearby`}
      />,
    ),
    stepRoute(
      `${PARCEL_STORE}/progress`,
      { title: '편의점 택배', backTo: `${PARCEL_STORE}/nearby` },
      <ParcelStoreDeliveryProgress itemProfile={foundItemProfile} />,
    ),
    stepRoute(
      `${PARCEL_STORE}/complete`,
      { title: '수령 완료', backTo: `${PARCEL_STORE}/progress` },
      <ParcelStoreDeliveryComplete onFinishSearch={actions.finishFoundFlow} onKeepAndGoHome={goHome} itemProfile={foundItemProfile} />,
    ),
    stepRoute(
      `${IN_PERSON}/place`,
      { title: '받을 편의점 선택', backTo: IN_PERSON },
      <InPersonPlaceSelect value={found.inPersonSchedulePlace} onConfirm={found.setInPersonSchedulePlace} backTo={IN_PERSON} />,
    ),
  ]
}
