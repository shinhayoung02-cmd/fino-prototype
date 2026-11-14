import { Route, useLocation, useNavigate } from 'react-router-dom'
import BackTabScreen from '../layout/Screens/BackTabScreen'
import AiMatching from '../pages/AiMatching/AiMatching'
import { MATCH_CANDIDATES } from '../pages/AiMatching/matchCandidates'
import MatchDetail from '../pages/AiMatching/MatchDetail'
import OwnershipRequested from '../pages/AiMatching/OwnershipRequested'
import WaitingScreen from '../pages/AiMatching/WaitingScreen'
import OwnershipStatus from '../pages/AiMatching/OwnershipStatus'
import OwnershipConfirmed from '../pages/AiMatching/OwnershipConfirmed'
import OwnershipVerified from '../pages/AiMatching/OwnershipVerified'
import OwnershipApproved from '../pages/AiMatching/OwnershipApproved'
import PoliceBoxPickupGuide from '../pages/AiMatching/PoliceBoxPickupGuide'
import ThanksMethodSelect from '../pages/AiMatching/ThanksMethodSelect'
import DeliveryMethodSelect from '../pages/AiMatching/DeliveryMethodSelect'
import ParcelDeliveryInfo from '../pages/AiMatching/ParcelDeliveryInfo'
import ParcelAddressForm from '../pages/AiMatching/ParcelAddressForm'
import ParcelRecipientInfo from '../pages/AiMatching/ParcelRecipientInfo'
import InPersonExchange from '../pages/AiMatching/InPersonExchange'
import InPersonLocationPicker from '../pages/AiMatching/InPersonLocationPicker'
import ProposalConfirm from '../pages/AiMatching/ProposalConfirm'
import InPersonMeetupStatus from '../pages/AiMatching/InPersonMeetupStatus'
import InPersonReceiptComplete from '../pages/AiMatching/InPersonReceiptComplete'
import ParcelPickupStatus from '../pages/AiMatching/ParcelPickupStatus'
import ParcelReceiptComplete from '../pages/AiMatching/ParcelReceiptComplete'
import ParcelStoreLocation from '../pages/AiMatching/ParcelStoreLocation'
import ParcelStoreSelect from '../pages/AiMatching/ParcelStoreSelect'
import ParcelStorePickupStatus from '../pages/AiMatching/ParcelStorePickupStatus'
import OwnershipEvidence from '../pages/AiMatching/OwnershipEvidence'
import QuizFailedResult from '../pages/AiMatching/QuizFailedResult'
import EvidenceUpload from '../pages/AiMatching/EvidenceUpload'
import EvidenceReview from '../pages/AiMatching/EvidenceReview'
import EvidenceSubmitted from '../pages/AiMatching/EvidenceSubmitted'
import FinderReviewing from '../pages/AiMatching/FinderReviewing'
import QuizSteps from '../pages/AiMatching/QuizSteps'
import MultipleClaimants from '../pages/AiMatching/MultipleClaimants'
import { getOwnerQuiz } from '../data/ownerQuiz'
import { dismissMatch } from '../lib/supabase'
import useAppState from '../app/useAppState'
import { PARCEL_PROGRESS_STEPS } from '../app/constants'
import { OWNERSHIP_PATH as OWNERSHIP, PARCEL_GENERAL_RECEIPT_PATH } from '../app/paths'
import useStepRoute from './useStepRoute'
import ProposalSentScreen from './screens/ProposalSentScreen'

// 분실자: AI 매칭 결과 → 소유권 확인 → 감사·전달 방식 → 수령
export default function useMatchingRoutes() {
  const { activeTab, setActiveTab, demo, lost, found, matches, dialogs, actions, verificationResultPath } = useAppState()
  const navigate = useNavigate()
  const location = useLocation()
  const stepRoute = useStepRoute()
  const { lostItemProfile } = lost

  const goHome = () => navigate('/')

  const goHomeAfterEvidenceSubmit = () => {
    navigate('/', { state: { showApprovalResult: true } })
  }

  const goHomeAfterParcelPickup = (receiptPath) => {
    lost.setDeliveryDoneTo(receiptPath)
    dialogs.deliveryDone.notifyOnHome()
    navigate('/')
  }

  const excludeSelectedMatch = async () => {
    try {
      await dismissMatch(matches.selectedMatch.id)
      matches.setSelectedMatch(null)
      navigate('/matching')
    } catch (err) {
      console.error('[dismiss]', err)
      alert('제외하지 못했어요. 다시 시도해주세요.')
    }
  }

  const receiptComplete = (
    <InPersonReceiptComplete steps={PARCEL_PROGRESS_STEPS} onFinishSearch={actions.finishSearch} onKeepAndGoHome={goHome} />
  )

  return [
    <Route
      key="/matching"
      path="/matching"
      element={
        <BackTabScreen title="AI 매칭" activeTab={activeTab} onSelectTab={setActiveTab}>
          <AiMatching
            completedItem={lost.completedItem}
            onEditItem={lost.editCompletedItem}
            isApprovalResultReady={lost.isApprovalResultReady}
            completedFoundItem={found.completedFoundItem}
            onEditFoundItem={found.editCompletedItem}
            foundMatchResultPath={found.foundFlowResumePath}
            lostItemResumePath={demo.isQuizFailFlow ? `${OWNERSHIP}/quiz-failed` : undefined}
            liveMatches={matches.liveMatches}
            onSelectCandidate={(candidate) => {
              matches.setSelectedMatch(candidate)
              navigate('/matching/result')
            }}
          />
        </BackTabScreen>
      }
    />,
    stepRoute(
      '/matching/result',
      { title: 'AI 매칭 결과', backTo: '/matching', hasMenu: false },
      <MatchDetail
        completedItem={lost.completedItem}
        isOwnershipRequested={lost.isOwnershipRequested}
        isVerificationReady={lost.isVerificationReady}
        verificationResultPath={verificationResultPath}
        candidate={
          matches.selectedMatch ?? {
            ...MATCH_CANDIDATES[0],
            ...lostItemProfile.lostMatchCandidates?.[0],
            gallery: [lostItemProfile.photo, lostItemProfile.photoBack],
          }
        }
        onExclude={matches.selectedMatch ? excludeSelectedMatch : undefined}
      />,
    ),
    stepRoute(OWNERSHIP, { title: 'AI 매칭 결과', backTo: '/matching/result' }, <OwnershipRequested />),
    stepRoute(
      '/matching/waiting',
      { title: '분실자 매칭', backTo: OWNERSHIP },
      location.state?.showApprovalOnHome ? (
        <WaitingScreen
          title={
            <>
              습득자가 물건의
              <br />
              특징을 확인하고 있어요
            </>
          }
          subtitle="분실할 때 등록한 비공개 표시와 실제 물건을 비교해요"
          calloutText="비공개 정보는 소유권 검증 목적으로만 사용돼요."
          statusItems={[
            { label: '제출한 증빙 접수', value: '완료', tone: 'brand' },
            { label: '현재 상태', value: '대기 중', tone: 'neutral' },
          ]}
          secondaryCtaLabel="요청 취소하기"
          onSecondaryCta={dialogs.cancelRequest.open}
          onGoHome={goHomeAfterEvidenceSubmit}
        />
      ) : (
        <WaitingScreen onGoHome={goHome} />
      ),
    ),
    stepRoute(
      `${OWNERSHIP}/quiz`,
      { title: '소유권 확인 퀴즈', backTo: '/matching/result' },
      <QuizSteps
        steps={(lost.ownerQuiz ?? getOwnerQuiz(lost.completedItem?.itemKey)).map((item) => ({
          title: item.question,
          hint: '습득자가 낸 질문이에요. 기억나는 대로 적어주세요',
        }))}
        answers={lost.ownerQuizAnswers}
        onChangeAnswers={lost.setOwnerQuizAnswers}
        callout="AI가 습득자의 정답과 비교해 주인을 확인해요."
        lastLabel="답변 보내기"
        onDone={() => {
          lost.setOwnershipRequested(true)
          navigate(OWNERSHIP)
        }}
      />,
    ),
    stepRoute(`${OWNERSHIP}/claimants`, { title: '분실자 매칭', backTo: OWNERSHIP }, <MultipleClaimants />),
    stepRoute(
      '/matching/quiz-result',
      { title: '소유권 확인', backTo: `${OWNERSHIP}/claimants` },
      <OwnershipStatus onGoHome={goHome} />,
    ),
    stepRoute(`${OWNERSHIP}/confirmed`, { title: '소유권 확인', backTo: '/matching/quiz-result' }, <OwnershipConfirmed />),
    stepRoute(`${OWNERSHIP}/verified`, { title: '소유권 확인', backTo: `${OWNERSHIP}/confirmed` }, <OwnershipVerified />),
    stepRoute(`${OWNERSHIP}/quiz-failed`, { title: '퀴즈 검증 결과', backTo: '/matching/waiting' }, <QuizFailedResult />),
    stepRoute(
      `${OWNERSHIP}/quiz-failed/evidence`,
      { title: '소유권 증빙 제출', backTo: `${OWNERSHIP}/quiz-failed` },
      <OwnershipEvidence />,
    ),
    stepRoute(
      `${OWNERSHIP}/thanks`,
      { title: '감사 방식 선택', backTo: `${OWNERSHIP}/verified` },
      <ThanksMethodSelect
        value={lost.thanksMethod}
        message={lost.thanksMessage}
        onConfirm={(method, message) => {
          lost.setThanksMethod(method)
          lost.setThanksMessage(message)
        }}
      />,
    ),
    stepRoute(
      `${OWNERSHIP}/delivery`,
      { title: '전달 방식 선택', backTo: `${OWNERSHIP}/thanks` },
      <DeliveryMethodSelect onSelect={found.setReturnDeliveryMethod} />,
    ),
    stepRoute(
      `${OWNERSHIP}/parcel/general`,
      { title: '일반 택배', backTo: `${OWNERSHIP}/delivery` },
      <ParcelDeliveryInfo type="general" />,
    ),
    stepRoute(
      `${OWNERSHIP}/parcel/general/address`,
      { title: '일반 택배', backTo: `${OWNERSHIP}/parcel/general` },
      <ParcelAddressForm value={lost.parcelAddress} onSubmit={lost.setParcelAddress} />,
    ),
    stepRoute(
      `${OWNERSHIP}/parcel/store`,
      { title: '편의점 택배', backTo: `${OWNERSHIP}/delivery` },
      <ParcelDeliveryInfo type="store" />,
    ),
    stepRoute(
      `${OWNERSHIP}/parcel/store/info`,
      { title: '편의점 택배', backTo: `${OWNERSHIP}/parcel/store` },
      <ParcelRecipientInfo />,
    ),
    stepRoute(
      `${OWNERSHIP}/parcel/store/location`,
      { title: '편의점 택배', backTo: `${OWNERSHIP}/parcel/store/info` },
      <ParcelStoreLocation store={lost.parcelStore} />,
    ),
    stepRoute(
      `${OWNERSHIP}/parcel/store/location/select`,
      { title: '받을 편의점 선택', backTo: `${OWNERSHIP}/parcel/store/location` },
      <ParcelStoreSelect
        value={lost.parcelStore}
        onConfirm={lost.setParcelStore}
        backTo={`${OWNERSHIP}/parcel/store/location`}
      />,
    ),
    stepRoute(
      `${OWNERSHIP}/in-person`,
      { title: '대면 직거래', backTo: `${OWNERSHIP}/delivery` },
      <InPersonExchange
        locations={lost.meetupLocations}
        dates={lost.meetupDates}
        onDatesChange={lost.setMeetupDates}
        slotTimes={lost.meetupSlotTimes}
        onSlotTimesChange={lost.setMeetupSlotTimes}
      />,
    ),
    stepRoute(
      `${OWNERSHIP}/in-person/location`,
      { title: '위치 선택', backTo: `${OWNERSHIP}/in-person` },
      <InPersonLocationPicker
        value={lost.meetupLocations}
        onConfirm={lost.setMeetupLocations}
        backTo={`${OWNERSHIP}/in-person`}
      />,
    ),
    stepRoute(
      `${OWNERSHIP}/proposal-confirm`,
      { title: '제안 내용 확인', backTo: `${OWNERSHIP}/in-person` },
      <ProposalConfirm thanksMethod={lost.thanksMethod} thanksMessage={lost.thanksMessage} />,
    ),
    <Route
      key={`${OWNERSHIP}/proposal-sent`}
      path={`${OWNERSHIP}/proposal-sent`}
      element={
        <ProposalSentScreen
          onOpenNavMenu={dialogs.navMenu.open}
          onConfirmParcel={() => {
            dialogs.parcelResult.notifyOnHome()
            navigate('/')
          }}
        />
      }
    />,
    stepRoute(
      `${OWNERSHIP}/parcel/general/pickup`,
      { title: '제안 내용 확인', backTo: '/' },
      <ParcelPickupStatus onGoHome={() => goHomeAfterParcelPickup(PARCEL_GENERAL_RECEIPT_PATH)} />,
    ),
    stepRoute(
      PARCEL_GENERAL_RECEIPT_PATH,
      { title: '배송 완료', backTo: `${OWNERSHIP}/parcel/general/pickup` },
      <ParcelReceiptComplete receiptDoneTo={`${PARCEL_GENERAL_RECEIPT_PATH}/done`} />,
    ),
    stepRoute(
      `${PARCEL_GENERAL_RECEIPT_PATH}/done`,
      { title: '수령 완료', className: 'parcel-receipt-done', backTo: PARCEL_GENERAL_RECEIPT_PATH },
      receiptComplete,
    ),
    stepRoute(
      `${OWNERSHIP}/parcel/store/pickup`,
      { title: '편의점 택배', backTo: '/' },
      <ParcelStorePickupStatus onGoHome={() => goHomeAfterParcelPickup(`${OWNERSHIP}/parcel/store/receipt`)} />,
    ),
    stepRoute(
      `${OWNERSHIP}/parcel/store/receipt`,
      { title: '배송 완료', backTo: `${OWNERSHIP}/parcel/store/pickup` },
      <ParcelReceiptComplete receiptDoneTo={`${OWNERSHIP}/parcel/store/receipt/done`} />,
    ),
    stepRoute(
      `${OWNERSHIP}/parcel/store/receipt/done`,
      { title: '수령 완료', className: 'parcel-receipt-done', backTo: `${OWNERSHIP}/parcel/store/receipt` },
      receiptComplete,
    ),
    stepRoute(
      `${OWNERSHIP}/in-person/status`,
      { title: '대면 직거래', backTo: `${OWNERSHIP}/proposal-sent` },
      <InPersonMeetupStatus locations={lost.meetupLocations} />,
    ),
    stepRoute(
      `${OWNERSHIP}/in-person/receipt`,
      { title: '수령 완료', backTo: `${OWNERSHIP}/in-person/status` },
      <InPersonReceiptComplete onFinishSearch={actions.finishSearch} onKeepAndGoHome={goHome} />,
    ),
    stepRoute(
      `${OWNERSHIP}/evidence`,
      { title: '소유권 증빙 제출', backTo: `${OWNERSHIP}/claimants` },
      <OwnershipEvidence />,
    ),
    stepRoute(
      `${OWNERSHIP}/evidence/upload`,
      { title: '소유권 증빙 제출', backTo: `${OWNERSHIP}/evidence` },
      <EvidenceUpload
        filesByStep={lost.evidenceFiles}
        onFilesByStepChange={lost.setEvidenceFiles}
        steps={lostItemProfile.evidenceSteps}
      />,
    ),
    stepRoute(
      `${OWNERSHIP}/evidence/review`,
      { title: '확인 자료 보내기', backTo: `${OWNERSHIP}/evidence/upload` },
      <EvidenceReview filesByStep={lost.evidenceFiles} steps={lostItemProfile.evidenceSteps} />,
    ),
    stepRoute(
      `${OWNERSHIP}/evidence/submitted`,
      { title: '제출 완료', backTo: `${OWNERSHIP}/evidence/review` },
      <EvidenceSubmitted item={lost.completedItem} onGoHome={goHomeAfterEvidenceSubmit} />,
    ),
    stepRoute(
      `${OWNERSHIP}/finder-review`,
      { title: '분실자 매칭', backTo: `${OWNERSHIP}/evidence/upload` },
      <FinderReviewing />,
    ),
    stepRoute(`${OWNERSHIP}/approved`, { title: 'AI 매칭 결과', backTo: '/' }, <OwnershipApproved />),
    stepRoute(
      `${OWNERSHIP}/police-pickup`,
      { title: '지구대 수령 안내', backTo: `${OWNERSHIP}/approved` },
      <PoliceBoxPickupGuide />,
    ),
  ]
}
