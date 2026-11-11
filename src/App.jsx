import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom'
import PreviewStage from './layout/PreviewStage/PreviewStage'
import AppShell from './layout/AppShell/AppShell'
import Header from './components/common/Header/Header'
import MainTopBar from './components/common/MainTopBar/MainTopBar'
import BottomNav from './components/common/BottomNav/BottomNav'
import Home from './pages/Home/Home'
import NearbyMapView from './pages/Home/NearbyMapView'
import SearchPage from './pages/Home/SearchPage'
import iconSettingsGear from './assets/my-page/icon-settings-gear.svg'
import AiMatching from './pages/AiMatching/AiMatching'
import { saveItem } from './lib/supabase'
import { ITEM_PROFILES, getItemProfile } from './data/itemProfiles'
import { withObjectParticle } from './utils/korean'
import { MATCH_CANDIDATES } from './pages/AiMatching/matchCandidates'
import MatchDetail from './pages/AiMatching/MatchDetail'
import OwnershipRequested from './pages/AiMatching/OwnershipRequested'
import WaitingScreen from './pages/AiMatching/WaitingScreen'
import OwnershipStatus from './pages/AiMatching/OwnershipStatus'
import OwnershipConfirmed from './pages/AiMatching/OwnershipConfirmed'
import OwnershipVerified from './pages/AiMatching/OwnershipVerified'
import OwnershipApproved from './pages/AiMatching/OwnershipApproved'
import PoliceBoxPickupGuide from './pages/AiMatching/PoliceBoxPickupGuide'
import ThanksMethodSelect from './pages/AiMatching/ThanksMethodSelect'
import DeliveryMethodSelect from './pages/AiMatching/DeliveryMethodSelect'
import ParcelDeliveryInfo from './pages/AiMatching/ParcelDeliveryInfo'
import ParcelAddressForm from './pages/AiMatching/ParcelAddressForm'
import ParcelRecipientInfo from './pages/AiMatching/ParcelRecipientInfo'
import InPersonExchange from './pages/AiMatching/InPersonExchange'
import InPersonLocationPicker from './pages/AiMatching/InPersonLocationPicker'
import ProposalConfirm from './pages/AiMatching/ProposalConfirm'
import InPersonProposalStatus from './pages/AiMatching/InPersonProposalStatus'
import InPersonMeetupStatus from './pages/AiMatching/InPersonMeetupStatus'
import InPersonReceiptComplete from './pages/AiMatching/InPersonReceiptComplete'
import ParcelDeliveryStatus from './pages/AiMatching/ParcelDeliveryStatus'
import ParcelPickupStatus from './pages/AiMatching/ParcelPickupStatus'
import ParcelReceiptComplete from './pages/AiMatching/ParcelReceiptComplete'
import ParcelStoreLocation from './pages/AiMatching/ParcelStoreLocation'
import ParcelStoreSelect from './pages/AiMatching/ParcelStoreSelect'
import ParcelStoreDeliveryStatus from './pages/AiMatching/ParcelStoreDeliveryStatus'
import ParcelStorePickupStatus from './pages/AiMatching/ParcelStorePickupStatus'
import OwnershipEvidence from './pages/AiMatching/OwnershipEvidence'
import QuizFailedResult from './pages/AiMatching/QuizFailedResult'
import EvidenceUpload from './pages/AiMatching/EvidenceUpload'
import EvidenceReview from './pages/AiMatching/EvidenceReview'
import EvidenceSubmitted from './pages/AiMatching/EvidenceSubmitted'
import { EMPTY_EVIDENCE_FILES } from './pages/AiMatching/evidenceSteps'
import FinderReviewing from './pages/AiMatching/FinderReviewing'
import FoundMatchResult from './pages/AiMatching/FoundMatchResult'
import OwnershipQuizIntro from './pages/AiMatching/OwnershipQuizIntro'
import OwnershipQuizQuestion from './pages/AiMatching/OwnershipQuizQuestion'
import OwnershipQuizReview from './pages/AiMatching/OwnershipQuizReview'
import OwnershipQuizSubmitted from './pages/AiMatching/OwnershipQuizSubmitted'
import OwnershipQuizWaiting from './pages/AiMatching/OwnershipQuizWaiting'
import OwnershipQuizUndecided from './pages/AiMatching/OwnershipQuizUndecided'
import OwnershipAdditionalEvidenceWaiting from './pages/AiMatching/OwnershipAdditionalEvidenceWaiting'
import MultipleClaimantsWaiting from './pages/AiMatching/MultipleClaimantsWaiting'
import MultipleClaimantsPreparing from './pages/AiMatching/MultipleClaimantsPreparing'
import SecondaryVerificationStart from './pages/AiMatching/SecondaryVerificationStart'
import SecondaryVerificationQuestion from './pages/AiMatching/SecondaryVerificationQuestion'
import SecondaryVerificationReview from './pages/AiMatching/SecondaryVerificationReview'
import MultipleClaimantsVerification from './pages/AiMatching/MultipleClaimantsVerification'
import MultiClaimantOwnerConfirmed from './pages/AiMatching/MultiClaimantOwnerConfirmed'
import MultipleClaimantsReturnPrep from './pages/AiMatching/MultipleClaimantsReturnPrep'
import ReturnProposalReview from './pages/AiMatching/ReturnProposalReview'
import ReturnProposalRetryReason from './pages/AiMatching/ReturnProposalRetryReason'
import ReturnProposalRetrySubmitted from './pages/AiMatching/ReturnProposalRetrySubmitted'
import InPersonScheduleConfirm from './pages/AiMatching/InPersonScheduleConfirm'
import InPersonPlaceSelect from './pages/AiMatching/InPersonPlaceSelect'
import InPersonScheduleReview from './pages/AiMatching/InPersonScheduleReview'
import InPersonMeetupScheduled from './pages/AiMatching/InPersonMeetupScheduled'
import InPersonDeliveryComplete from './pages/AiMatching/InPersonDeliveryComplete'
import ParcelPickupAddressCheck from './pages/AiMatching/ParcelPickupAddressCheck'
import ParcelPickupAddressForm from './pages/AiMatching/ParcelPickupAddressForm'
import ParcelBoxSizeSelect from './pages/AiMatching/ParcelBoxSizeSelect'
import ParcelDeliveryReview from './pages/AiMatching/ParcelDeliveryReview'
import ParcelDeliveryTracking from './pages/AiMatching/ParcelDeliveryTracking'
import ParcelDeliveryComplete from './pages/AiMatching/ParcelDeliveryComplete'
import ParcelStoreDeliveryStart from './pages/AiMatching/ParcelStoreDeliveryStart'
import ParcelStoreWeightSelect from './pages/AiMatching/ParcelStoreWeightSelect'
import ParcelStoreInfoForm from './pages/AiMatching/ParcelStoreInfoForm'
import ParcelStoreNearby from './pages/AiMatching/ParcelStoreNearby'
import ParcelStoreDeliveryProgress from './pages/AiMatching/ParcelStoreDeliveryProgress'
import ParcelStoreDeliveryComplete from './pages/AiMatching/ParcelStoreDeliveryComplete'
import MultipleClaimants from './pages/AiMatching/MultipleClaimants'
import Chat from './pages/Chat/Chat'
import ChatRoom from './pages/Chat/ChatRoom'
import FoundItemRegister from './pages/FoundItemRegister/FoundItemRegister'
import FoundItemRestricted from './pages/FoundItemRegister/FoundItemRestricted'
import MailboxHandover from './pages/FoundItemRegister/MailboxHandover'
import MailboxSelect from './pages/FoundItemRegister/MailboxSelect'
import MailboxHandoverComplete from './pages/FoundItemRegister/MailboxHandoverComplete'
import PoliceBoxHandover from './pages/FoundItemRegister/PoliceBoxHandover'
import PoliceBoxHandoverDetails from './pages/FoundItemRegister/PoliceBoxHandoverDetails'
import FoundItemCamera from './pages/FoundItemCamera/FoundItemCamera'
import FoundItemMain from './pages/FoundItemRegister/FoundItemMain'
import FoundLeftItemMain, {
  STREET_PHOTO_OPTIONS,
  STATION_PHOTO_OPTIONS,
} from './pages/FoundItemRegister/FoundLeftItemMain'
import FoundLeftRegisterComplete from './pages/FoundItemRegister/FoundLeftRegisterComplete'
import FoundStationLocationPicker from './pages/FoundItemRegister/FoundStationLocationPicker'
import FoundStationLostReport from './pages/FoundItemRegister/FoundStationLostReport'
import FoundStationRegisterComplete from './pages/FoundItemRegister/FoundStationRegisterComplete'
import FoundRegisterComplete from './pages/FoundItemRegister/FoundRegisterComplete'
import LostItemRegister from './pages/LostItemRegister/LostItemRegister'
import LocationPicker from './pages/LostItemRegister/LocationPicker'
import MyStorage from './pages/MyStorage/MyStorage'
import ActivityPage from './pages/Home/RecentActivity'
import './pages/Home/Home.css'
import StorageAddComplete from './pages/MyStorage/StorageAddComplete'
import { INITIAL_STORAGE_ITEMS, toStorageItem, toPhotoEntries } from './data/myStorage'
import RegisterComplete from './pages/LostItemRegister/RegisterComplete'
import Playground from './pages/Playground/Playground'
import DetailPreview from './pages/Playground/DetailPreview'
import MyPage from './pages/MyPage/MyPage'
import Notifications from './pages/Notifications/Notifications'
import Modal from './components/common/Modal/Modal'
import BottomSheet from './components/common/BottomSheet/BottomSheet'
import FlowChangeModal from './components/common/FlowChangeModal/FlowChangeModal'
import Splash from './components/common/Splash/Splash'
import iconCheckNeutral from './assets/ai-matching/icon-check-neutral.svg'
import NavMenu, { FLOW_LABELS } from './components/common/NavMenu/NavMenu'

import iconHomeFill from './assets/home/icon-home-fill.svg'
import iconGps from './assets/home/icon-gps.svg'
import iconChatting from './assets/home/icon-chatting.svg'
import iconStory from './assets/home/icon-story.svg'
import iconMenu from './assets/chat/icon-menu.svg'
import './App.css'

const MATCH_RESULT_DELAY = 1300
const VERIFICATION_RESULT_DELAY = 1000
const APPROVAL_RESULT_DELAY = 1300
const PARCEL_RESULT_DELAY = 3000
const DELIVERY_DONE_DELAY = 1000
const PARCEL_PROGRESS_STEPS = ['발송대기', '접수완료', '배송중', '수령완료']
const RETURN_PROPOSAL_DELAY = 2000
const RETRY_RETURN_PROPOSAL_DELAY = 3000

const DELIVERY_METHOD_PICK_OPTIONS = [
  { id: 'in-person', label: '직접 만나서 전달' },
  { id: 'parcel', label: '일반 택배로 전달' },
  { id: 'parcel-store', label: '편의점 택배로 전달' },
]

const OWNERSHIP_QUIZ_FAQ_ITEMS = [
  {
    id: 'why-check',
    question: '왜 특징을 확인해야 하나요?',
    answer: '분실자가 적어둔 특징과 실제 물건을 비교해 주인이 맞는지 확인하기 위해서예요.',
  },
  {
    id: 'unsure-feature',
    question: '확인하기 어려운 특징은 어떻게 하나요?',
    answer: '직접 확인하기 어렵다면 잘 모르겠어요를 선택해도 괜찮아요.',
  },
  {
    id: 'info-visibility',
    question: '분실자가 적은 정보는 모두 볼 수 있나요?',
    answer: '아니요. 주인 확인에 필요한 특징만 질문 형태로 보여드려요.',
  },
]

const NAV_ITEMS = [
  { path: '/', label: '분실 홈', icon: iconHomeFill },
  { path: '/matching', label: 'AI 매칭', icon: iconGps },
  { path: '/chat', label: '채팅', icon: iconChatting },
  { path: '/my', label: '작성글 관리', icon: iconStory },
]

function TabScreen({ children, activeTab, onSelectTab }) {
  const location = useLocation()
  return (
    <AppShell
      key={location.pathname}
      header={<MainTopBar />}
      bottomNav={<BottomNav items={NAV_ITEMS} activeTab={activeTab} onSelect={onSelectTab} />}
    >
      {children}
    </AppShell>
  )
}

function useGoTo(path, onSelectTab) {
  const navigate = useNavigate()
  return () => {
    onSelectTab(path)
    navigate(path)
  }
}

function BackTabScreen({ title, children, activeTab, onSelectTab, rightSlot }) {
  const goHome = useGoTo('/', onSelectTab)
  const location = useLocation()
  // 하단 네비 탭 목적지(AI 매칭·채팅·작성글 관리)는 뒤로가기 없이 하단 네비 표시
  const isNavTab = NAV_ITEMS.some((item) => item.path === location.pathname)
  return (
    <AppShell
      key={location.pathname}
      header={<Header title={title} showBack={!isNavTab} onBack={goHome} rightSlot={rightSlot} />}
      bottomNav={isNavTab ? <BottomNav items={NAV_ITEMS} activeTab={activeTab} onSelect={onSelectTab} /> : undefined}
    >
      {children}
    </AppShell>
  )
}

function MenuButton({ onClick }) {
  return (
    <button type="button" className="header__icon-btn" aria-label="메뉴" onClick={onClick}>
      <img src={iconMenu} alt="" className="header__icon-btn-img" />
    </button>
  )
}

function SubStepScreen({ title, backTo, children, rightSlot, activeTab, onSelectTab, className }) {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <AppShell
      className={className}
      key={location.pathname}
      header={
        <Header title={title} showBack onBack={() => navigate(backTo)} rightSlot={rightSlot} />
      }
    >
      {children}
    </AppShell>
  )
}

const PROPOSAL_SENT_CONFIG = {
  parcel: { title: '일반 택배', Component: ParcelDeliveryStatus },
  'parcel-store': { title: '편의점 택배', Component: ParcelStoreDeliveryStatus },
}

function ProposalSentScreen({ activeTab, onSelectTab, onOpenNavMenu, onConfirmParcel }) {
  const location = useLocation()
  const deliveryMethod = location.state?.deliveryMethod
  const { title = '대면 직거래', Component = InPersonProposalStatus } =
    PROPOSAL_SENT_CONFIG[deliveryMethod] ?? {}
  const componentProps = deliveryMethod === 'parcel' ? { onConfirm: onConfirmParcel } : {}

  return (
    <SubStepScreen
      title={title}
      backTo="/matching/result/ownership/proposal-confirm"
      rightSlot={<MenuButton onClick={onOpenNavMenu} />}
      activeTab={activeTab}
      onSelectTab={onSelectTab}
    >
      <Component {...componentProps} />
    </SubStepScreen>
  )
}

function ChatRoomScreen({ activeTab, onSelectTab, onReadRoom, onOpenNavMenu }) {
  const goToChatList = useGoTo('/chat', onSelectTab)
  const { roomId } = useParams()

  useEffect(() => {
    onReadRoom(roomId)
  }, [roomId, onReadRoom])

  return (
    <AppShell
      key={roomId}
      className="chat-room-shell"
      header={
        <Header title="채팅" showBack onBack={goToChatList} rightSlot={<MenuButton onClick={onOpenNavMenu} />} />
      }
      bottomNav={<BottomNav items={NAV_ITEMS} activeTab="/chat" onSelect={onSelectTab} />}
    >
      <ChatRoom roomId={roomId} />
    </AppShell>
  )
}

function SearchScreen({ activeTab, onSelectTab }) {
  const location = useLocation()
  return (
    <AppShell
      key={location.pathname}
      header={
        <Header
          title="검색어를 입력해주세요"
          showBack
          rightSlot={
            <button type="button" className="header__icon-btn" aria-label="설정">
              <img src={iconSettingsGear} alt="" style={{ width: 19.2, height: 19.2 }} />
            </button>
          }
        />
      }
    >
      <SearchPage />
    </AppShell>
  )
}

function DetailScreen() {
  return (
    <AppShell header={<Header title="Detail Preview" showBack />}>
      <DetailPreview />
    </AppShell>
  )
}

// 등록 draft → Supabase items 행 (사진은 아직 저장 안 함)
const toItemRow = (kind, flow, d, extra = null) => ({
  kind,
  flow,
  name: d.name,
  description: d.description,
  item_key: d.itemKey ?? null,
  time_range: d.timeRange,
  location: d.location,
  extra,
})

const INITIAL_LOST_DRAFT = {
  photos: [],
  name: '',
  description: '',
  timeRange: null,
  location: null,
  featureAnswers: ['', '', ''],
}

const INITIAL_FOUND_DRAFT = {
  name: ITEM_PROFILES['wallet-normal'].category,
  description: ITEM_PROFILES['wallet-normal'].description,
  timeRange: null,
  location: null,
  itemKey: 'wallet-normal',
}

const INITIAL_FOUND_LEFT_DRAFT = {
  photos: [],
  name: '',
  description: '',
  timeRange: null,
  location: null,
}

const INITIAL_FOUND_STATION_DRAFT = {
  ...INITIAL_FOUND_LEFT_DRAFT,
  lost112Photos: [],
  lost112Number: '',
}

function App() {
  const [activeTab, setActiveTab] = useState(null)
  // 플로우 설정은 새로고침·다시 시작해도 유지 (시연용)
  const [savedFlowSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fino-flow-settings')) ?? {}
    } catch {
      return {}
    }
  })
  // 첫 진입: 스플래시, 플로우 초기화: 스플래시 + 하단 로딩 바
  const [splash, setSplash] = useState({ id: 0, withProgress: false })
  const [readRoomIds, setReadRoomIds] = useState(() => new Set())
  const [lostDraft, setLostDraft] = useState(INITIAL_LOST_DRAFT)
  const [foundDraft, setFoundDraft] = useState(INITIAL_FOUND_DRAFT)
  const [foundLeftDraft, setFoundLeftDraft] = useState(INITIAL_FOUND_LEFT_DRAFT)
  const [foundStationDraft, setFoundStationDraft] = useState(INITIAL_FOUND_STATION_DRAFT)
  const [completedItem, setCompletedItem] = useState(null)
  const [storageItems, setStorageItems] = useState(INITIAL_STORAGE_ITEMS)
  // 플로우 설정 '보관함 물건 있음' — 끄면 보관함이 빈 상태로 보임
  const [hasStorageItems, setHasStorageItems] = useState(() => savedFlowSettings.hasStorageItems ?? false)
  const visibleStorageItems = hasStorageItems ? storageItems : []
  const [storageDraft, setStorageDraft] = useState(INITIAL_LOST_DRAFT)
  const [addedStorageItem, setAddedStorageItem] = useState(null)
  const [completedFoundItem, setCompletedFoundItem] = useState(null)
  const [isMatchDialogOpen, setMatchDialogOpen] = useState(false)
  const [isAwaitingMatchNotification, setAwaitingMatchNotification] = useState(false)
  const [isFoundMatchDialogOpen, setFoundMatchDialogOpen] = useState(false)
  const [isAwaitingFoundMatchNotification, setAwaitingFoundMatchNotification] = useState(false)
  const [foundFlowResumePath, setFoundFlowResumePath] = useState('/found/match-result')
  const [isOwnershipResultDialogOpen, setOwnershipResultDialogOpen] = useState(false)
  const [isAwaitingOwnershipResultNotification, setAwaitingOwnershipResultNotification] = useState(false)
  const [isVerificationMaterialDialogOpen, setVerificationMaterialDialogOpen] = useState(false)
  const [isAwaitingVerificationMaterialNotification, setAwaitingVerificationMaterialNotification] = useState(false)
  const [secondaryVerificationOrigin, setSecondaryVerificationOrigin] = useState('claimants')
  const [isOwnershipQuizPassDialogOpen, setOwnershipQuizPassDialogOpen] = useState(false)
  const [isAwaitingOwnershipQuizPassNotification, setAwaitingOwnershipQuizPassNotification] = useState(false)
  const [isSecondaryVerificationDialogOpen, setSecondaryVerificationDialogOpen] = useState(false)
  const [isAwaitingSecondaryVerificationNotification, setAwaitingSecondaryVerificationNotification] = useState(false)
  const [isMultiClaimantResultDialogOpen, setMultiClaimantResultDialogOpen] = useState(false)
  const [isAwaitingMultiClaimantResultNotification, setAwaitingMultiClaimantResultNotification] = useState(false)
  const [isReturnProposalDialogOpen, setReturnProposalDialogOpen] = useState(false)
  // 반환 방식은 플로우 설정에서 고름 (시트 없음)
  const [deliveryMethodPick, setDeliveryMethodPick] = useState(() => savedFlowSettings.deliveryMethodPick ?? 'in-person')
  const [isAwaitingReturnProposalNotification, setAwaitingReturnProposalNotification] = useState(false)
  const [isAwaitingRetryReturnProposalNotification, setAwaitingRetryReturnProposalNotification] = useState(false)
  const [isOwnershipRequested, setOwnershipRequested] = useState(false)
  const [isVerificationDialogOpen, setVerificationDialogOpen] = useState(false)
  const [isVerificationReady, setVerificationReady] = useState(false)
  const [evidenceFiles, setEvidenceFiles] = useState(EMPTY_EVIDENCE_FILES)
  const [isApprovalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [isApprovalResultReady, setApprovalResultReady] = useState(false)
  const [isAwaitingParcelNotification, setAwaitingParcelNotification] = useState(false)
  const [isParcelResultDialogOpen, setParcelResultDialogOpen] = useState(false)
  const [isAwaitingDeliveryDone, setAwaitingDeliveryDone] = useState(false)
  const [isDeliveryDoneDialogOpen, setDeliveryDoneDialogOpen] = useState(false)
  const [isCancelRequestDialogOpen, setCancelRequestDialogOpen] = useState(false)
  const [deliveryDoneTo, setDeliveryDoneTo] = useState('/matching/result/ownership/parcel/general/receipt')
  const [isSearchCompleteDialogOpen, setSearchCompleteDialogOpen] = useState(false)
  const [isFlowChangeDialogOpen, setFlowChangeDialogOpen] = useState(false)
  const [pendingFlowToggle, setPendingFlowToggle] = useState(null)
  const [isNavMenuOpen, setNavMenuOpen] = useState(false)
  const [isMultipleClaimantsFlow, setMultipleClaimantsFlow] = useState(() => savedFlowSettings.isMultipleClaimantsFlow ?? false)
  const [ownershipQuizAnswers, setOwnershipQuizAnswers] = useState([null, null, null])
  const [secondaryVerificationAnswers, setSecondaryVerificationAnswers] = useState([null, null, null])
  const [isQuizFailFlow, setQuizFailFlow] = useState(() => savedFlowSettings.isQuizFailFlow ?? false)
  const [isFoundRestrictedFlow, setFoundRestrictedFlow] = useState(() => savedFlowSettings.isFoundRestrictedFlow ?? false)
  const [returnDeliveryMethod, setReturnDeliveryMethod] = useState('in-person')
  const [returnRetryCount, setReturnRetryCount] = useState(0)
  const [isFoundMultipleClaimantsFlow, setFoundMultipleClaimantsFlow] = useState(() => savedFlowSettings.isFoundMultipleClaimantsFlow ?? false)
  const [meetupLocations, setMeetupLocations] = useState([])
  const [meetupDates, setMeetupDates] = useState([])
  const [meetupSlotTimes, setMeetupSlotTimes] = useState({})
  const [thanksMethod, setThanksMethod] = useState(['coffee'])
  const [thanksMessage, setThanksMessage] = useState('')
  const [parcelStore, setParcelStore] = useState(null)
  const [parcelAddress, setParcelAddress] = useState(null)
  const [foundParcelStore, setFoundParcelStore] = useState(null)
  const [inPersonSchedulePlace, setInPersonSchedulePlace] = useState(null)
  const [inPersonScheduleSlot, setInPersonScheduleSlot] = useState(undefined)
  const [mailbox, setMailbox] = useState(null)
  const [policeBox, setPoliceBox] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // 최근 활동: 방문한 플로우 화면 기록 (경로별 최신 1건, 최대 5건, 새로고침해도 유지)
  const [flowHistory, setFlowHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fino-flow-history')) ?? []
    } catch {
      return []
    }
  })
  useEffect(() => {
    const path = location.pathname
    if (path === '/' || path === '/activity') return undefined
    const timer = setTimeout(() => {
      const title = document.querySelector('.header__title, .header h1')?.textContent?.trim()
      const label = FLOW_LABELS[path] ?? title
      if (!label) return
      const flow = path.startsWith('/found') ? '습득자' : path.startsWith('/my/storage') ? '보관함' : path.startsWith('/lost') || path.startsWith('/matching') ? '분실자' : null
      setFlowHistory((prev) => {
        const next = [{ path, label, flow, at: Date.now() }, ...prev.filter((h) => h.path !== path)].slice(0, 5)
        try {
          localStorage.setItem('fino-flow-history', JSON.stringify(next))
        } catch {
          /* 저장 실패해도 화면 표시엔 영향 없음 */
        }
        return next
      })
    }, 0)
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    setMatchDialogOpen(false)
    setFoundMatchDialogOpen(false)
    setOwnershipResultDialogOpen(false)
    setVerificationMaterialDialogOpen(false)
    setOwnershipQuizPassDialogOpen(false)
    setSecondaryVerificationDialogOpen(false)
    setMultiClaimantResultDialogOpen(false)
    setReturnProposalDialogOpen(false)
    setVerificationDialogOpen(false)
    setApprovalDialogOpen(false)
    setParcelResultDialogOpen(false)
    setDeliveryDoneDialogOpen(false)
    setSearchCompleteDialogOpen(false)
    setFlowChangeDialogOpen(false)
    setPendingFlowToggle(null)
    setNavMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/' || !isAwaitingMatchNotification) return undefined

    setAwaitingMatchNotification(false)
    const timer = setTimeout(() => setMatchDialogOpen(true), MATCH_RESULT_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/' || !isAwaitingFoundMatchNotification) return undefined

    setAwaitingFoundMatchNotification(false)
    const timer = setTimeout(() => setFoundMatchDialogOpen(true), MATCH_RESULT_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/' || !isAwaitingOwnershipResultNotification) return undefined

    setAwaitingOwnershipResultNotification(false)
    const timer = setTimeout(() => setOwnershipResultDialogOpen(true), MATCH_RESULT_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/' || !isAwaitingVerificationMaterialNotification) return undefined

    setAwaitingVerificationMaterialNotification(false)
    const timer = setTimeout(() => setVerificationMaterialDialogOpen(true), MATCH_RESULT_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/' || !isAwaitingOwnershipQuizPassNotification) return undefined

    setAwaitingOwnershipQuizPassNotification(false)
    const timer = setTimeout(() => setOwnershipQuizPassDialogOpen(true), MATCH_RESULT_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/' || !isAwaitingSecondaryVerificationNotification) return undefined

    setAwaitingSecondaryVerificationNotification(false)
    const timer = setTimeout(() => setSecondaryVerificationDialogOpen(true), MATCH_RESULT_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/' || !isAwaitingMultiClaimantResultNotification) return undefined

    setAwaitingMultiClaimantResultNotification(false)
    const timer = setTimeout(() => setMultiClaimantResultDialogOpen(true), MATCH_RESULT_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/' || !isAwaitingReturnProposalNotification) return undefined

    setAwaitingReturnProposalNotification(false)
    const timer = setTimeout(() => setReturnProposalDialogOpen(true), RETURN_PROPOSAL_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/' || !isAwaitingRetryReturnProposalNotification) return undefined

    setAwaitingRetryReturnProposalNotification(false)
    const timer = setTimeout(() => setReturnProposalDialogOpen(true), RETRY_RETURN_PROPOSAL_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/' || !location.state?.showApprovalResult) return undefined

    const timer = setTimeout(() => {
      setApprovalResultReady(true)
      setApprovalDialogOpen(true)
      navigate('/', { replace: true, state: null })
    }, APPROVAL_RESULT_DELAY)
    return () => clearTimeout(timer)
  }, [location.pathname, location.state?.showApprovalResult, navigate])

  useEffect(() => {
    if (location.pathname !== '/' || !location.state?.showSearchComplete) return

    setSearchCompleteDialogOpen(true)
    navigate('/', { replace: true, state: null })
  }, [location.pathname, location.state?.showSearchComplete, navigate])

  useEffect(() => {
    if (location.pathname !== '/' || !isAwaitingParcelNotification) return undefined

    setAwaitingParcelNotification(false)
    const timer = setTimeout(() => setParcelResultDialogOpen(true), PARCEL_RESULT_DELAY)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (!isAwaitingDeliveryDone || location.pathname !== '/') return undefined

    const timer = setTimeout(() => {
      setAwaitingDeliveryDone(false)
      setDeliveryDoneDialogOpen(true)
    }, DELIVERY_DONE_DELAY)
    return () => clearTimeout(timer)
  }, [isAwaitingDeliveryDone, location.pathname])

  useEffect(() => {
    if (!isOwnershipRequested || isVerificationReady || !['/', '/matching'].includes(location.pathname)) return undefined

    const timer = setTimeout(() => {
      setVerificationReady(true)
      setVerificationDialogOpen(true)
    }, VERIFICATION_RESULT_DELAY)
    return () => clearTimeout(timer)
  }, [isOwnershipRequested, isVerificationReady, location.pathname])

  const markRoomRead = (roomId) => {
    setReadRoomIds((prev) => (prev.has(roomId) ? prev : new Set(prev).add(roomId)))
  }

  const handleEditCompletedItem = () => {
    if (completedItem) setLostDraft(completedItem)
  }

  const handleEditCompletedFoundItem = () => {
    if (completedFoundItem) setFoundDraft(completedFoundItem)
  }

  const handleEditCompletedFoundLeftItem = () => {
    if (completedFoundItem) setFoundLeftDraft(completedFoundItem)
  }

  const handleRegisterNewFound = () => {
    setCompletedFoundItem(null)
  }

  const handleRegisterFoundItem = () => {
    saveItem(toItemRow('found', 'keep', foundDraft))
    setCompletedFoundItem(foundDraft)
    setFoundDraft(INITIAL_FOUND_DRAFT)
    navigate('/found/new/done')
  }

  const handleRegisterFoundLeftItem = () => {
    saveItem(toItemRow('found', 'left', foundLeftDraft))
    setCompletedFoundItem(foundLeftDraft)
    setFoundLeftDraft(INITIAL_FOUND_LEFT_DRAFT)
    navigate('/found/new/left/done')
  }

  const handleFinishFoundReport = () => {
    resetFoundFlowState()
    navigate('/')
  }

  const handleFoundPhotoRecognized = (item) => {
    setFoundDraft((prev) => ({ ...prev, name: item.category, description: item.description, itemKey: item.itemKey }))
  }

  const handleRestrictedPhotoRecognized = (item) => {
    setFoundStationDraft((prev) => ({ ...prev, name: item.category, description: item.description, itemKey: item.itemKey }))
  }

  const foundItemProfile = getItemProfile(completedFoundItem?.itemKey)
  const lostItemProfile = getItemProfile(completedItem?.itemKey)

  const handleGoHomeAfterFoundSubmit = () => {
    setActiveTab('/')
    setAwaitingFoundMatchNotification(true)
    navigate('/')
  }

  const handleGoHomeAfterOwnershipQuiz = () => {
    setActiveTab('/')
    setAwaitingOwnershipResultNotification(true)
    navigate('/')
  }

  const getOwnershipQuizResultPath = () => {
    const incorrectCount = ownershipQuizAnswers.filter((answer) => answer === 'incorrect').length
    const unsureCount = ownershipQuizAnswers.filter((answer) => answer === 'unsure').length
    if (unsureCount >= 1) return '/found/match-result/quiz/claimants'
    if (incorrectCount >= 1) return '/found/match-result/quiz/undecided'
    return '/found/match-result/quiz/claimants/result'
  }

  const handleGoHomeAfterClaimantsPreparing = () => {
    setActiveTab('/')
    setAwaitingSecondaryVerificationNotification(true)
  }

  const handleGoHomeAfterMultiClaimantVerification = () => {
    setActiveTab('/')
    setAwaitingMultiClaimantResultNotification(true)
    navigate('/')
  }

  const handleChooseReturnDeliveryMethod = (method) => {
    setReturnDeliveryMethod(method)
    navigate('/found/match-result/quiz/claimants/return-prep/review')
  }

  const handleSubmitReturnRetryReason = (reasonId) => {
    if (reasonId === 'delivery') {
      const order = DELIVERY_METHOD_PICK_OPTIONS.map((option) => option.id)
      const nextMethod = order[(order.indexOf(returnDeliveryMethod) + 1) % order.length]
      setReturnDeliveryMethod(nextMethod)
    }
    setReturnRetryCount((prev) => prev + 1)
    navigate('/found/match-result/quiz/claimants/return-prep/review/retry-reason/submitted')
  }

  const handleViewFoundMatchResult = () => {
    setFoundMatchDialogOpen(false)
    navigate('/found/match-result')
  }

  // 보관함 물건 → 분실물 등록 폼에 불러오기 (보관함 화면·홈 시트 공용)
  const loadStorageItemIntoLostDraft = async (item) => {
    const photos = await toPhotoEntries(item)
    setLostDraft({ ...INITIAL_LOST_DRAFT, photos, name: item.name, description: item.description, featureAnswers: [item.feature ?? '', '', ''], fromStorage: true })
    navigate('/lost/new')
  }

  const handleStartNewRegistration = () => {
    setLostDraft(INITIAL_LOST_DRAFT)
    setOwnershipRequested(false)
    setVerificationReady(false)
    setVerificationDialogOpen(false)
    setEvidenceFiles(EMPTY_EVIDENCE_FILES)
    setApprovalResultReady(false)
    setApprovalDialogOpen(false)
  }

  const handleViewMatchResult = () => {
    setMatchDialogOpen(false)
    navigate('/matching/result')
  }

  const handleGoHomeAfterSubmit = () => {
    navigate('/')
  }

  const handleGoHomeWithSearchComplete = () => {
    setActiveTab('/')
    navigate('/', { state: { showSearchComplete: true } })
  }

  // 습득자(찾은 사람) 쪽 플로우 전체를 처음 상태로 되돌림 — "찾기 마치기" 버튼에서 사용
  const resetFoundFlowState = () => {
    setFoundDraft(INITIAL_FOUND_DRAFT)
    setFoundLeftDraft(INITIAL_FOUND_LEFT_DRAFT)
    setFoundStationDraft(INITIAL_FOUND_STATION_DRAFT)
    setCompletedFoundItem(null)
    setFoundMatchDialogOpen(false)
    setAwaitingFoundMatchNotification(false)
    setFoundFlowResumePath('/found/match-result')
    setVerificationMaterialDialogOpen(false)
    setAwaitingVerificationMaterialNotification(false)
    setSecondaryVerificationOrigin('claimants')
    setOwnershipQuizPassDialogOpen(false)
    setAwaitingOwnershipQuizPassNotification(false)
    setSecondaryVerificationDialogOpen(false)
    setAwaitingSecondaryVerificationNotification(false)
    setMultiClaimantResultDialogOpen(false)
    setAwaitingMultiClaimantResultNotification(false)
    setReturnProposalDialogOpen(false)
    setAwaitingReturnProposalNotification(false)
    setAwaitingRetryReturnProposalNotification(false)
    setAwaitingParcelNotification(false)
    setParcelResultDialogOpen(false)
    setAwaitingDeliveryDone(false)
    setDeliveryDoneDialogOpen(false)
    setMultipleClaimantsFlow(false)
    setOwnershipQuizAnswers([null, null, null])
    setSecondaryVerificationAnswers([null, null, null])
    setQuizFailFlow(false)
    setFoundRestrictedFlow(false)
    setReturnDeliveryMethod('in-person')
    setReturnRetryCount(0)
    setFoundMultipleClaimantsFlow(false)
    setThanksMethod(['coffee'])
    setParcelStore(null)
    setParcelAddress(null)
    setFoundParcelStore(null)
    setInPersonSchedulePlace(null)
    setInPersonScheduleSlot(undefined)
    setMailbox(null)
    setPoliceBox(null)
  }

  const handleFinishFoundFlow = () => {
    resetFoundFlowState()
    navigate('/')
  }

  const resetFlowState = () => {
    setCompletedItem(null)
    setLostDraft(INITIAL_LOST_DRAFT)
    setOwnershipRequested(false)
    setVerificationReady(false)
    setVerificationDialogOpen(false)
    setEvidenceFiles(EMPTY_EVIDENCE_FILES)
    setApprovalResultReady(false)
    setAwaitingMatchNotification(false)
    setMatchDialogOpen(false)
    setApprovalDialogOpen(false)
    setAwaitingParcelNotification(false)
    setParcelResultDialogOpen(false)
    setAwaitingDeliveryDone(false)
    setDeliveryDoneDialogOpen(false)
    setSearchCompleteDialogOpen(false)
    setMeetupLocations([])
    setMeetupDates([])
    setMeetupSlotTimes({})
    setThanksMethod(['coffee'])
    setParcelStore(null)
    setParcelAddress(null)
    setCompletedFoundItem(null)
    setFoundDraft(INITIAL_FOUND_DRAFT)
    setMailbox(null)
  }

  const handleFinishSearch = () => {
    resetFlowState()
    navigate('/')
  }

  const handleGoHomeAfterEvidenceSubmit = () => {
    navigate('/', { state: { showApprovalResult: true } })
  }

  const handleCancelOwnershipRequest = () => {
    setCancelRequestDialogOpen(false)
    setOwnershipRequested(false)
    setVerificationReady(false)
    setVerificationDialogOpen(false)
    setEvidenceFiles(EMPTY_EVIDENCE_FILES)
    setApprovalResultReady(false)
    setApprovalDialogOpen(false)
    navigate('/matching/result')
  }

  const handleToggleMultipleClaimantsFlow = () => {
    setMultipleClaimantsFlow((prev) => {
      const next = !prev
      if (next) setQuizFailFlow(false)
      return next
    })
  }

  const handleToggleQuizFailFlow = () => {
    setQuizFailFlow((prev) => {
      const next = !prev
      if (next) setMultipleClaimantsFlow(false)
      return next
    })
  }

  const requestToggleMultipleClaimantsFlow = () => {
    setNavMenuOpen(false)
    setPendingFlowToggle('claimants')
    setFlowChangeDialogOpen(true)
  }

  const requestToggleQuizFailFlow = () => {
    setNavMenuOpen(false)
    setPendingFlowToggle('quiz-fail')
    setFlowChangeDialogOpen(true)
  }

  const requestEnterFoundRestrictedFlow = () => {
    setNavMenuOpen(false)
    setPendingFlowToggle('found-restricted')
    setFlowChangeDialogOpen(true)
  }

  const handleCancelFlowChange = () => {
    setPendingFlowToggle(null)
    setFlowChangeDialogOpen(false)
  }

  useEffect(() => {
    try {
      localStorage.setItem(
        'fino-flow-settings',
        JSON.stringify({ hasStorageItems, isMultipleClaimantsFlow, isQuizFailFlow, isFoundRestrictedFlow, isFoundMultipleClaimantsFlow, deliveryMethodPick }),
      )
    } catch {
      // 저장 불가 환경이면 무시
    }
  }, [hasStorageItems, isMultipleClaimantsFlow, isQuizFailFlow, isFoundRestrictedFlow, isFoundMultipleClaimantsFlow, deliveryMethodPick])

  // 다시 시작: 진행 상태만 초기화, 플로우 설정은 그대로
  const handleRestartDemo = () => {
    setNavMenuOpen(false)
    resetFlowState()
    resetFoundFlowState()
    // 진행 초기화 함수가 스위치도 끄므로 고른 플로우 설정을 다시 적용
    setMultipleClaimantsFlow(isMultipleClaimantsFlow)
    setQuizFailFlow(isQuizFailFlow)
    setFoundRestrictedFlow(isFoundRestrictedFlow)
    setFoundMultipleClaimantsFlow(isFoundMultipleClaimantsFlow)
    navigate('/')
    setSplash({ id: Date.now(), withProgress: false })
  }

  const handleConfirmFlowChange = () => {
    const toggle = pendingFlowToggle
    if (toggle === 'claimants') handleToggleMultipleClaimantsFlow()
    else if (toggle === 'quiz-fail') handleToggleQuizFailFlow()
    else if (toggle === 'found-restricted') setFoundRestrictedFlow((prev) => !prev)
    setPendingFlowToggle(null)
    setFlowChangeDialogOpen(false)
    resetFlowState()
    navigate('/')
    setSplash({ id: Date.now(), withProgress: true })
  }

  const verificationResultPath = isMultipleClaimantsFlow
    ? '/matching/result/ownership/claimants'
    : isQuizFailFlow
      ? '/matching/result/ownership/quiz-failed'
      : '/matching/result/ownership/verified'

  // 소유권 확인 결과는 플로우 설정 스위치(다중 분실자·퀴즈 실패)를 따라감
  const handleViewVerificationResult = () => {
    setVerificationDialogOpen(false)
    navigate(verificationResultPath)
  }

  const handleViewApprovalResult = () => {
    setApprovalDialogOpen(false)
    navigate('/matching/result/ownership/verified')
  }

  const handleGoHomeAfterParcelSubmit = () => {
    setAwaitingParcelNotification(true)
    navigate('/')
  }

  const handleViewParcelResult = () => {
    setParcelResultDialogOpen(false)
    navigate('/matching/result/ownership/parcel/general/pickup')
  }

  const handleGoHomeAfterParcelPickup = (receiptPath) => {
    setDeliveryDoneTo(receiptPath)
    setAwaitingDeliveryDone(true)
    navigate('/')
  }

  const handleViewDeliveryDone = () => {
    setDeliveryDoneDialogOpen(false)
    navigate(deliveryDoneTo)
  }

  return (
    <>
      <PreviewStage
        hasCompletedLostItem={Boolean(completedItem)}
        isMultipleClaimantsFlow={isMultipleClaimantsFlow}
        onSelectMultipleClaimants={requestToggleMultipleClaimantsFlow}
        isQuizFailFlow={isQuizFailFlow}
        onSelectQuizFail={requestToggleQuizFailFlow}
        isFoundRestrictedFlow={isFoundRestrictedFlow}
        onSelectFoundRestricted={requestEnterFoundRestrictedFlow}
        isFoundMultipleClaimantsFlow={isFoundMultipleClaimantsFlow}
        onSelectFoundMultipleClaimants={() => setFoundMultipleClaimantsFlow((prev) => !prev)}
      >
      <Routes>
        <Route
          path="/"
          element={
            <TabScreen activeTab={activeTab} onSelectTab={setActiveTab}>
              <Home
                completedItem={completedItem}
                onEditItem={handleEditCompletedItem}
                onRegisterNew={handleStartNewRegistration}
                storageItems={visibleStorageItems}
                completedFoundItem={completedFoundItem}
                onEditFoundItem={handleEditCompletedFoundItem}
                onRegisterNewFound={handleRegisterNewFound}
                isApprovalResultReady={isApprovalResultReady}
                foundMatchResultPath={foundFlowResumePath}
                flowHistory={flowHistory}
              />
            </TabScreen>
          }
        />
        <Route
          path="/map"
          element={
            <SubStepScreen
              title="내 주변 습득물"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <NearbyMapView />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching"
          element={
            <BackTabScreen title="AI 매칭" activeTab={activeTab} onSelectTab={setActiveTab}>
              <AiMatching
                completedItem={completedItem}
                onEditItem={handleEditCompletedItem}
                isApprovalResultReady={isApprovalResultReady}
                completedFoundItem={completedFoundItem}
                onEditFoundItem={handleEditCompletedFoundItem}
                foundMatchResultPath={foundFlowResumePath}
                lostItemResumePath={isQuizFailFlow ? '/matching/result/ownership/quiz-failed' : undefined}
              />
            </BackTabScreen>
          }
        />
        <Route
          path="/matching/result"
          element={
            <SubStepScreen
              title="AI 매칭 결과"
              backTo="/matching"
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <MatchDetail
                completedItem={completedItem}
                isOwnershipRequested={isOwnershipRequested}
                onRequestOwnership={() => setOwnershipRequested(true)}
                isVerificationReady={isVerificationReady}
                verificationResultPath={verificationResultPath}
                candidate={{
                  ...MATCH_CANDIDATES[0],
                  ...lostItemProfile.lostMatchCandidates?.[0],
                  gallery: [lostItemProfile.photo, lostItemProfile.photoBack],
                }}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership"
          element={
            <SubStepScreen
              title="AI 매칭 결과"
              backTo="/matching/result"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <OwnershipRequested />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/waiting"
          element={
            <SubStepScreen
              title="분실자 매칭"
              backTo="/matching/result/ownership"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              {location.state?.showApprovalOnHome ? (
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
                  onSecondaryCta={() => setCancelRequestDialogOpen(true)}
                  onGoHome={handleGoHomeAfterEvidenceSubmit}
                />
              ) : (
                <WaitingScreen onGoHome={handleGoHomeAfterSubmit} />
              )}
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/claimants"
          element={
            <SubStepScreen
              title="분실자 매칭"
              backTo="/matching/result/ownership"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <MultipleClaimants />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/quiz-result"
          element={
            <SubStepScreen
              title="소유권 확인"
              backTo="/matching/result/ownership/claimants"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <OwnershipStatus onGoHome={() => navigate('/')} />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/confirmed"
          element={
            <SubStepScreen
              title="소유권 확인"
              backTo="/matching/quiz-result"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <OwnershipConfirmed />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/verified"
          element={
            <SubStepScreen
              title="소유권 확인"
              backTo="/matching/result/ownership/confirmed"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <OwnershipVerified />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/quiz-failed"
          element={
            <SubStepScreen
              title="퀴즈 검증 결과"
              backTo="/matching/waiting"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <QuizFailedResult />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/quiz-failed/evidence"
          element={
            <SubStepScreen
              title="소유권 증빙 제출"
              backTo="/matching/result/ownership/quiz-failed"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <OwnershipEvidence />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/thanks"
          element={
            <SubStepScreen
              title="감사 방식 선택"
              backTo="/matching/result/ownership/verified"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ThanksMethodSelect
                value={thanksMethod}
                message={thanksMessage}
                onConfirm={(method, message) => {
                  setThanksMethod(method)
                  setThanksMessage(message)
                }}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/delivery"
          element={
            <SubStepScreen
              title="전달 방식 선택"
              backTo="/matching/result/ownership/thanks"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <DeliveryMethodSelect onSelect={setReturnDeliveryMethod} />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/parcel/general"
          element={
            <SubStepScreen
              title="일반 택배"
              backTo="/matching/result/ownership/delivery"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelDeliveryInfo type="general" />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/parcel/general/address"
          element={
            <SubStepScreen
              title="일반 택배"
              backTo="/matching/result/ownership/parcel/general"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelAddressForm value={parcelAddress} onSubmit={setParcelAddress} />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/parcel/store"
          element={
            <SubStepScreen
              title="편의점 택배"
              backTo="/matching/result/ownership/delivery"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelDeliveryInfo type="store" />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/parcel/store/info"
          element={
            <SubStepScreen
              title="편의점 택배"
              backTo="/matching/result/ownership/parcel/store"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelRecipientInfo />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/parcel/store/location"
          element={
            <SubStepScreen
              title="편의점 택배"
              backTo="/matching/result/ownership/parcel/store/info"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelStoreLocation store={parcelStore} />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/parcel/store/location/select"
          element={
            <SubStepScreen
              title="받을 편의점 선택"
              backTo="/matching/result/ownership/parcel/store/location"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelStoreSelect
                value={parcelStore}
                onConfirm={setParcelStore}
                backTo="/matching/result/ownership/parcel/store/location"
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/in-person"
          element={
            <SubStepScreen
              title="대면 직거래"
              backTo="/matching/result/ownership/delivery"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <InPersonExchange
                locations={meetupLocations}
                dates={meetupDates}
                onDatesChange={setMeetupDates}
                slotTimes={meetupSlotTimes}
                onSlotTimesChange={setMeetupSlotTimes}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/in-person/location"
          element={
            <SubStepScreen
              title="위치 선택"
              backTo="/matching/result/ownership/in-person"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <InPersonLocationPicker
                value={meetupLocations}
                onConfirm={setMeetupLocations}
                backTo="/matching/result/ownership/in-person"
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/proposal-confirm"
          element={
            <SubStepScreen
              title="제안 내용 확인"
              backTo="/matching/result/ownership/in-person"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ProposalConfirm thanksMethod={thanksMethod} thanksMessage={thanksMessage} />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/proposal-sent"
          element={
            <ProposalSentScreen
              activeTab="/matching"
              onSelectTab={setActiveTab}
              onOpenNavMenu={() => setNavMenuOpen(true)}
              onConfirmParcel={handleGoHomeAfterParcelSubmit}
            />
          }
        />
        <Route
          path="/matching/result/ownership/parcel/general/pickup"
          element={
            <SubStepScreen
              title="제안 내용 확인"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <ParcelPickupStatus onGoHome={() => handleGoHomeAfterParcelPickup('/matching/result/ownership/parcel/general/receipt')} />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/parcel/general/receipt"
          element={
            <SubStepScreen
              title="배송 완료"
              backTo="/matching/result/ownership/parcel/general/pickup"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <ParcelReceiptComplete receiptDoneTo="/matching/result/ownership/parcel/general/receipt/done" />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/parcel/general/receipt/done"
          element={
            <SubStepScreen
              title="수령 완료"
              className="parcel-receipt-done"
              backTo="/matching/result/ownership/parcel/general/receipt"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <InPersonReceiptComplete
                steps={PARCEL_PROGRESS_STEPS}
                onFinishSearch={handleFinishSearch}
                onKeepAndGoHome={handleGoHomeAfterSubmit}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/parcel/store/pickup"
          element={
            <SubStepScreen
              title="편의점 택배"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <ParcelStorePickupStatus onGoHome={() => handleGoHomeAfterParcelPickup('/matching/result/ownership/parcel/store/receipt')} />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/parcel/store/receipt"
          element={
            <SubStepScreen
              title="배송 완료"
              backTo="/matching/result/ownership/parcel/store/pickup"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <ParcelReceiptComplete receiptDoneTo="/matching/result/ownership/parcel/store/receipt/done" />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/parcel/store/receipt/done"
          element={
            <SubStepScreen
              title="수령 완료"
              className="parcel-receipt-done"
              backTo="/matching/result/ownership/parcel/store/receipt"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <InPersonReceiptComplete
                steps={PARCEL_PROGRESS_STEPS}
                onFinishSearch={handleFinishSearch}
                onKeepAndGoHome={handleGoHomeAfterSubmit}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/in-person/status"
          element={
            <SubStepScreen
              title="대면 직거래"
              backTo="/matching/result/ownership/proposal-sent"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <InPersonMeetupStatus locations={meetupLocations} />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/in-person/receipt"
          element={
            <SubStepScreen
              title="수령 완료"
              backTo="/matching/result/ownership/in-person/status"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <InPersonReceiptComplete
                onFinishSearch={handleFinishSearch}
                onKeepAndGoHome={handleGoHomeAfterSubmit}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/evidence"
          element={
            <SubStepScreen
              title="소유권 증빙 제출"
              backTo="/matching/result/ownership/claimants"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <OwnershipEvidence />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/evidence/upload"
          element={
            <SubStepScreen
              title="소유권 증빙 제출"
              backTo="/matching/result/ownership/evidence"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <EvidenceUpload
                filesByStep={evidenceFiles}
                onFilesByStepChange={setEvidenceFiles}
                steps={lostItemProfile.evidenceSteps}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/evidence/review"
          element={
            <SubStepScreen
              title="확인 자료 보내기"
              backTo="/matching/result/ownership/evidence/upload"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <EvidenceReview filesByStep={evidenceFiles} steps={lostItemProfile.evidenceSteps} />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/evidence/submitted"
          element={
            <SubStepScreen
              title="제출 완료"
              backTo="/matching/result/ownership/evidence/review"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <EvidenceSubmitted item={completedItem} onGoHome={handleGoHomeAfterEvidenceSubmit} />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/finder-review"
          element={
            <SubStepScreen
              title="분실자 매칭"
              backTo="/matching/result/ownership/evidence/upload"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <FinderReviewing />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/approved"
          element={
            <SubStepScreen
              title="AI 매칭 결과"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <OwnershipApproved />
            </SubStepScreen>
          }
        />
        <Route
          path="/matching/result/ownership/police-pickup"
          element={
            <SubStepScreen
              title="지구대 수령 안내"
              backTo="/matching/result/ownership/approved"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <PoliceBoxPickupGuide />
            </SubStepScreen>
          }
        />
        <Route
          path="/chat"
          element={
            <BackTabScreen title="채팅" activeTab={activeTab} onSelectTab={setActiveTab}>
              <Chat readRoomIds={readRoomIds} isFlowActive={Boolean(completedItem) || Boolean(completedFoundItem)} />
            </BackTabScreen>
          }
        />
        <Route
          path="/chat/:roomId"
          element={
            <ChatRoomScreen
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              onReadRoom={markRoomRead}
              onOpenNavMenu={() => setNavMenuOpen(true)}
            />
          }
        />
        <Route path="/search" element={<SearchScreen activeTab={activeTab} onSelectTab={setActiveTab} />} />
        <Route
          path="/found/new"
          element={
            <SubStepScreen title="습득물 등록" backTo="/" activeTab="/" onSelectTab={setActiveTab}>
              <FoundItemRegister onRecognized={handleFoundPhotoRecognized} onRestrictedRecognized={handleRestrictedPhotoRecognized} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/restricted"
          element={
            <SubStepScreen title="습득물 등록" backTo="/found/new/camera" activeTab="/" onSelectTab={setActiveTab}>
              <FoundItemRestricted
                onKeepItem={() => {
                  setFoundDraft((prev) => ({ ...prev, name: foundStationDraft.name, description: foundStationDraft.description, itemKey: foundStationDraft.itemKey }))
                  navigate('/found/new/main')
                }}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/restricted/mailbox"
          element={
            <SubStepScreen
              title="인계 안내"
              backTo="/found/new/restricted"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <MailboxHandover mailbox={mailbox} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/restricted/mailbox/select"
          element={
            <SubStepScreen
              title="내 근처 우체통"
              backTo="/found/new/restricted/mailbox"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <MailboxSelect
                value={mailbox}
                onConfirm={setMailbox}
                backTo="/found/new/restricted/mailbox"
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/restricted/mailbox/complete"
          element={
            <SubStepScreen
              title="우체통 인계 완료"
              backTo="/found/new/restricted/mailbox"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <MailboxHandoverComplete
                onFinishSearch={handleFinishFoundReport}
                onKeepAndGoHome={() => navigate('/')}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/restricted/police-box"
          element={
            <SubStepScreen
              title="인계 안내"
              backTo="/found/new/restricted"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <PoliceBoxHandover
                policeBox={policeBox ? { title: policeBox.address, desc: policeBox.detail } : undefined}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/restricted/police-box/location"
          element={
            <SubStepScreen
              title="습득 위치 선택"
              backTo="/found/new/restricted/police-box"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundStationLocationPicker
                value={policeBox}
                onConfirm={setPoliceBox}
                backTo="/found/new/restricted/police-box"
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/restricted/police-box/report"
          element={
            <SubStepScreen
              title="지구대 인계"
              backTo="/found/new/restricted/police-box"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <PoliceBoxHandoverDetails />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/camera"
          element={
            <AppShell
              className="found-camera-shell"
              bottomNav={<BottomNav items={NAV_ITEMS} activeTab="/" onSelect={setActiveTab} />}
            >
              <FoundItemCamera onRecognized={handleFoundPhotoRecognized} onRestrictedRecognized={handleRestrictedPhotoRecognized} />
            </AppShell>
          }
        />
        <Route
          path="/found/new/main"
          element={
            <SubStepScreen
              title="습득물 등록"
              backTo="/found/new"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundItemMain draft={foundDraft} onDraftChange={setFoundDraft} onRegister={handleRegisterFoundItem} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/location"
          element={
            <SubStepScreen
              title="습득 위치 선택"
              backTo="/found/new/main"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
               <LocationPicker
                 value={foundDraft.location}
                 onConfirm={(location) => setFoundDraft((prev) => ({ ...prev, location }))}
                 backTo="/found/new/main"
                 type="found"
               />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/left"
          element={
            <SubStepScreen
              title="습득물 등록"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundLeftItemMain
                draft={foundLeftDraft}
                onDraftChange={setFoundLeftDraft}
                onRegister={handleRegisterFoundLeftItem}
                photoOptions={STREET_PHOTO_OPTIONS}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/left/location"
          element={
            <SubStepScreen
              title="발견 위치 선택"
              backTo="/found/new/left"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
                <LocationPicker
                  value={foundLeftDraft.location}
                  onConfirm={(location) => setFoundLeftDraft((prev) => ({ ...prev, location }))}
                  backTo="/found/new/left"
                  type="discovered"
                />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/station"
          element={
            <SubStepScreen
              title="습득물 등록"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundLeftItemMain
                draft={foundStationDraft}
                onDraftChange={setFoundStationDraft}
                timeSectionTitle="습득 시간 범위"
                timeHint="습득한 시간을 선택해 주세요"
                timeSheetTitle="습득 시간 범위"
                timeSheetDesc="습득 시간을 선택해주세요"
                timeSheetDayLabel="습득 날짜"
                timeSheetTimeLabel="습득 시간"
                locationSectionTitle="맡긴 장소는 어디인가요?"
                locationRowDesc="지도에서 대략적인 위치를 선택해요"
                locationRoute="/found/new/station/location"
                onRegister={() => navigate('/found/new/station/report')}
                photoOptions={STATION_PHOTO_OPTIONS}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/station/location"
          element={
            <SubStepScreen
              title="습득 위치 선택"
              backTo="/found/new/station"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundStationLocationPicker
                value={foundStationDraft.location}
                onConfirm={(location) => setFoundStationDraft((prev) => ({ ...prev, location }))}
                backTo="/found/new/station"
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/station/report"
          element={
            <SubStepScreen
              title="습득물 등록"
              backTo="/found/new/station"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundStationLostReport
                draft={foundStationDraft}
                onDraftChange={setFoundStationDraft}
                onPrev={() => navigate('/found/new/station')}
                onRegister={() => {
                  saveItem(toItemRow('found', 'station', foundStationDraft, { lost112Number: foundStationDraft.lost112Number }))
                  navigate('/found/new/station/done')
                }}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/station/done"
          element={
            <SubStepScreen
              title="습득물 등록"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundStationRegisterComplete
                draft={foundStationDraft}
                onGoHome={handleGoHomeWithSearchComplete}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/station/review"
          element={
            <SubStepScreen
              title="습득물 등록"
              backTo="/found/new/station/done"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundLeftItemMain
                draft={foundStationDraft}
                onDraftChange={setFoundStationDraft}
                timeSectionTitle="습득 시간 범위"
                timeHint="습득한 시간을 선택해 주세요"
                timeSheetTitle="습득 시간 범위"
                timeSheetDesc="습득 시간을 선택해주세요"
                timeSheetDayLabel="습득 날짜"
                timeSheetTimeLabel="습득 시간"
                locationSectionTitle="맡긴 장소는 어디인가요?"
                locationRowDesc="지도에서 대략적인 위치를 선택해요"
                locationRoute="/found/new/station/location"
                onRegister={() => navigate('/found/new/station/review/report')}
                mode="readonly"
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/station/review/report"
          element={
            <SubStepScreen
              title="습득물 등록"
              backTo="/found/new/station/review"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundStationLostReport
                draft={foundStationDraft}
                onDraftChange={setFoundStationDraft}
                mode="review"
                onEdit={() => navigate('/found/new/station/report')}
                onGoHome={handleGoHomeWithSearchComplete}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/left/done"
          element={
            <SubStepScreen
              title="발견물 등록"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundLeftRegisterComplete
                draft={completedFoundItem ?? foundLeftDraft}
                onGoHome={handleGoHomeWithSearchComplete}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/left/report"
          element={
            <SubStepScreen
              title="발견물 등록"
              backTo="/found/new/left/done"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundLeftItemMain
                draft={completedFoundItem ?? foundLeftDraft}
                onDraftChange={setCompletedFoundItem}
                mode="review"
                onEdit={() => {
                  handleEditCompletedFoundLeftItem()
                  navigate('/found/new/left')
                }}
                onGoHome={handleGoHomeWithSearchComplete}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/done"
          element={
            <SubStepScreen
              title="습득물 등록"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundRegisterComplete
                draft={completedFoundItem ?? foundDraft}
                onKeepAndGoHome={() => {
                  setActiveTab('/')
                  setAwaitingFoundMatchNotification(true)
                }}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/new/waiting"
          element={
            <SubStepScreen
              title="분실자 매칭"
              backTo="/found/new/done"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <WaitingScreen
                badge="분실자 매칭중"
                title="분실자를 찾고 있어요"
                subtitle="등록한 습득물과 새로 올라오는 분실 정보를 계속 비교하고 있어요."
                calloutText="매칭되는 분실자가 나타나면 알림으로 알려드릴게요."
                onGoHome={handleGoHomeAfterFoundSubmit}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result"
          element={
            <SubStepScreen
              className="found-match-result-shell"
              title="AI 매칭"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <FoundMatchResult
                cardTitle={foundItemProfile.matchCandidates?.[0]?.title ?? `${withObjectParticle(foundItemProfile.shortDescription)} 잃어버렸어요`}
                cardDesc={foundItemProfile.matchCandidates?.[0]?.feature ?? foundItemProfile.description}
                onNext={() =>
                  navigate(
                    isFoundMultipleClaimantsFlow ? '/found/match-result/quiz/claimants' : '/found/match-result/quiz',
                  )
                }
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz"
          element={
            <SubStepScreen
              title="소유권 확인 퀴즈"
              backTo="/found/match-result"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <OwnershipQuizIntro
                badge="주인 확인중"
                title="물건의 주인을 확인해주세요"
                subtitle="분실자가 적어둔 특징과 지금 가지고 있는 물건을 비교해보세요."
                calloutText="비공개 정보는 주인 확인에만 사용돼요."
                ctaLabel="특징 확인하기"
                faqItems={OWNERSHIP_QUIZ_FAQ_ITEMS}
                onConfirm={() => navigate('/found/match-result/quiz/1')}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/1"
          element={
            <SubStepScreen
              title="소유권 확인 퀴즈"
              backTo="/found/match-result/quiz"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <OwnershipQuizQuestion
                answers={ownershipQuizAnswers}
                onChangeAnswers={setOwnershipQuizAnswers}
                onSubmit={() => navigate('/found/match-result/quiz/review')}
                steps={foundItemProfile.verificationQuestions}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/review"
          element={
            <SubStepScreen
              title="소유권 확인 퀴즈"
              backTo="/found/match-result/quiz/1"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <OwnershipQuizReview
                answers={ownershipQuizAnswers}
                onEdit={() => navigate('/found/match-result/quiz/1')}
                onSubmit={() => navigate('/found/match-result/quiz/submitted')}
                steps={foundItemProfile.verificationQuestions}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/submitted"
          element={
            <SubStepScreen
              title="제출 완료"
              backTo="/found/match-result/quiz/review"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <OwnershipQuizSubmitted
                onViewWaiting={() => navigate('/found/match-result/quiz/waiting')}
                onGoHome={handleGoHomeAfterOwnershipQuiz}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/waiting"
          element={
            <SubStepScreen
              title="소유권 확인"
              backTo="/found/match-result/quiz/submitted"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <OwnershipQuizWaiting onConfirm={handleGoHomeAfterOwnershipQuiz} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants"
          element={
            <SubStepScreen
              title="소유권 확인"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <MultipleClaimantsWaiting onNext={() => navigate('/found/match-result/quiz/claimants/preparing')} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/undecided"
          element={
            <SubStepScreen
              title="소유권 확인"
              backTo="/found/match-result/quiz/waiting"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <OwnershipQuizUndecided
                onNext={() => navigate('/found/match-result/quiz/undecided/waiting')}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/undecided/waiting"
          element={
            <SubStepScreen
              title="소유권 확인"
              backTo="/found/match-result/quiz/undecided"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <OwnershipAdditionalEvidenceWaiting
                onGoHome={() => {
                  setActiveTab('/')
                  setAwaitingVerificationMaterialNotification(true)
                  navigate('/')
                }}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/preparing"
          element={
            <SubStepScreen
              title="주인 확인"
              backTo="/found/match-result/quiz/claimants"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <MultipleClaimantsPreparing onGoHome={handleGoHomeAfterClaimantsPreparing} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/verification"
          element={
            <SubStepScreen
              title="소유권 2차 검증"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <SecondaryVerificationStart
                onStart={() => navigate('/found/match-result/quiz/claimants/verification/1')}
                cardTitle={`${withObjectParticle(foundItemProfile.category)} 습득했어요`}
                cardDesc={foundItemProfile.shortDescription}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/verification/1"
          element={
            <SubStepScreen
              title="소유권 2차 검증"
              backTo="/found/match-result/quiz/claimants/verification"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <SecondaryVerificationQuestion
                answers={secondaryVerificationAnswers}
                onChangeAnswers={setSecondaryVerificationAnswers}
                onSubmit={() => navigate('/found/match-result/quiz/claimants/verification/review')}
                steps={foundItemProfile.secondaryVerificationSteps}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/verification/review"
          element={
            <SubStepScreen
              title="소유권 2차 검증"
              backTo="/found/match-result/quiz/claimants/verification/1"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <SecondaryVerificationReview
                answers={secondaryVerificationAnswers}
                onEdit={() => navigate('/found/match-result/quiz/claimants/verification/1')}
                onSubmit={() => {
                  if (secondaryVerificationOrigin === 'ownership-quiz') {
                    navigate('/found/match-result/quiz/undecided/verification-submitted')
                  } else {
                    navigate('/found/match-result/quiz/claimants/verification/submitted')
                  }
                }}
                steps={foundItemProfile.secondaryVerificationSteps}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/undecided/verification-submitted"
          element={
            <SubStepScreen
              title="제출 완료"
              backTo="/found/match-result/quiz/claimants/verification/review"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <OwnershipQuizSubmitted
                showWaitingButton={false}
                onGoHome={() => {
                  setActiveTab('/')
                  setAwaitingOwnershipQuizPassNotification(true)
                  navigate('/')
                }}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/verification/submitted"
          element={
            <SubStepScreen
              title="제출 완료"
              backTo="/found/match-result/quiz/claimants/verification/review"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <OwnershipQuizSubmitted
                onViewWaiting={() => navigate('/found/match-result/quiz/claimants/verification/waiting')}
                onGoHome={() => {
                  setActiveTab('/')
                  setAwaitingMultiClaimantResultNotification(true)
                  navigate('/')
                }}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/verification/waiting"
          element={
            <SubStepScreen
              title="주인 확인"
              backTo="/found/match-result/quiz/claimants/verification/submitted"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <MultipleClaimantsVerification onConfirm={handleGoHomeAfterMultiClaimantVerification} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/result"
          element={
            <SubStepScreen
              title="소유권 확인"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <MultiClaimantOwnerConfirmed
                onConfirm={() => navigate('/found/match-result/quiz/claimants/return-prep')}
                cardMeta={`${foundItemProfile.matchCandidates?.[0]?.location ?? '서울 마포구 홍대입구역'} 근처 · ${foundItemProfile.matchCandidates?.[0]?.time ?? '오늘 오전 9~12시'}`}
                cardTitle={`${foundItemProfile.category} 습득`}
                cardDesc={foundItemProfile.shortDescription}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep"
          element={
            <SubStepScreen
              title="반환 준비"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <MultipleClaimantsReturnPrep onGoHome={() => setAwaitingReturnProposalNotification(true)} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review"
          element={
            <SubStepScreen
              title="감사 및 전달 방식 확인"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ReturnProposalReview deliveryMethod={returnDeliveryMethod} itemProfile={foundItemProfile} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/retry-reason"
          element={
            <SubStepScreen
              title="다시 제안 요청"
              backTo="/found/match-result/quiz/claimants/return-prep/review"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ReturnProposalRetryReason
                retryCount={returnRetryCount}
                onPrevious={() => navigate('/found/match-result/quiz/claimants/return-prep/review')}
                onSubmit={handleSubmitReturnRetryReason}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/retry-reason/submitted"
          element={
            <SubStepScreen
              title="제출 완료"
              backTo="/found/match-result/quiz/claimants/return-prep/review/retry-reason"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ReturnProposalRetrySubmitted
                onViewWaiting={() => navigate('/found/match-result/quiz/claimants/return-prep')}
                onGoHome={() => {
                  setAwaitingRetryReturnProposalNotification(true)
                  navigate('/')
                }}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/in-person"
          element={
            <SubStepScreen
              title="대면 직거래"
              backTo="/found/match-result/quiz/claimants/return-prep/review"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <InPersonScheduleConfirm
                place={inPersonSchedulePlace}
                onSelectPlace={() =>
                  navigate('/found/match-result/quiz/claimants/return-prep/review/in-person/place')
                }
                slot={inPersonScheduleSlot}
                onSlotChange={setInPersonScheduleSlot}
                onNext={() => navigate('/found/match-result/quiz/claimants/return-prep/review/in-person/confirm')}
                itemProfile={foundItemProfile}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/in-person/confirm"
          element={
            <SubStepScreen
              title="대면 직거래"
              backTo="/found/match-result/quiz/claimants/return-prep/review/in-person"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <InPersonScheduleReview
                place={inPersonSchedulePlace}
                slot={inPersonScheduleSlot}
                onEdit={() => navigate('/found/match-result/quiz/claimants/return-prep/review/in-person')}
                onConfirm={() =>
                  navigate('/found/match-result/quiz/claimants/return-prep/review/in-person/scheduled')
                }
                itemProfile={foundItemProfile}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/in-person/scheduled"
          element={
            <SubStepScreen
              title="대면 직거래"
              backTo="/found/match-result/quiz/claimants/return-prep/review/in-person/confirm"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <InPersonMeetupScheduled
                place={inPersonSchedulePlace}
                slot={inPersonScheduleSlot}
                onNext={() =>
                  navigate('/found/match-result/quiz/claimants/return-prep/review/in-person/complete')
                }
                itemProfile={foundItemProfile}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/in-person/complete"
          element={
            <SubStepScreen
              title="수령 완료"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <InPersonDeliveryComplete
                onFinishSearch={handleFinishFoundFlow}
                onKeepAndGoHome={() => navigate('/')}
                itemProfile={foundItemProfile}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel"
          element={
            <SubStepScreen
              title="택배 배송 접수"
              backTo="/found/match-result/quiz/claimants/return-prep/review"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelPickupAddressCheck />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel/address"
          element={
            <SubStepScreen
              title="택배 배송 접수"
              backTo="/found/match-result/quiz/claimants/return-prep/review/parcel"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelPickupAddressForm />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel/box-size"
          element={
            <SubStepScreen
              title="택배 배송 접수"
              backTo="/found/match-result/quiz/claimants/return-prep/review/parcel/address"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelBoxSizeSelect />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel/confirm"
          element={
            <SubStepScreen
              title="택배 배송 접수"
              backTo="/found/match-result/quiz/claimants/return-prep/review/parcel/box-size"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelDeliveryReview itemProfile={foundItemProfile} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel/tracking"
          element={
            <SubStepScreen
              title="택배 배송"
              backTo="/found/match-result/quiz/claimants/return-prep/review/parcel/confirm"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelDeliveryTracking itemProfile={foundItemProfile} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel/complete"
          element={
            <SubStepScreen
              title="수령 완료"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelDeliveryComplete
                onFinishSearch={handleFinishFoundFlow}
                onKeepAndGoHome={() => navigate('/')}
                itemProfile={foundItemProfile}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel-store"
          element={
            <SubStepScreen
              title="편의점 택배"
              backTo="/found/match-result/quiz/claimants/return-prep/review"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelStoreDeliveryStart itemProfile={foundItemProfile} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel-store/weight"
          element={
            <SubStepScreen
              title="편의점 택배"
              backTo="/found/match-result/quiz/claimants/return-prep/review/parcel-store"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelStoreWeightSelect />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel-store/info"
          element={
            <SubStepScreen
              title="편의점 택배"
              backTo="/found/match-result/quiz/claimants/return-prep/review/parcel-store/weight"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelStoreInfoForm />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel-store/nearby"
          element={
            <SubStepScreen
              title="편의점 택배"
              backTo="/found/match-result/quiz/claimants/return-prep/review/parcel-store/info"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelStoreNearby store={foundParcelStore} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel-store/store"
          element={
            <SubStepScreen
              title="보낼 편의점 선택"
              backTo="/found/match-result/quiz/claimants/return-prep/review/parcel-store/nearby"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelStoreSelect
                value={foundParcelStore}
                onConfirm={setFoundParcelStore}
                backTo="/found/match-result/quiz/claimants/return-prep/review/parcel-store/nearby"
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel-store/progress"
          element={
            <SubStepScreen
              title="편의점 택배"
              backTo="/found/match-result/quiz/claimants/return-prep/review/parcel-store/nearby"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelStoreDeliveryProgress itemProfile={foundItemProfile} />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/parcel-store/complete"
          element={
            <SubStepScreen
              title="수령 완료"
              backTo="/found/match-result/quiz/claimants/return-prep/review/parcel-store/progress"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <ParcelStoreDeliveryComplete
                onFinishSearch={handleFinishFoundFlow}
                onKeepAndGoHome={() => navigate('/')}
                itemProfile={foundItemProfile}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/found/match-result/quiz/claimants/return-prep/review/in-person/place"
          element={
            <SubStepScreen
              title="받을 편의점 선택"
              backTo="/found/match-result/quiz/claimants/return-prep/review/in-person"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/matching"
              onSelectTab={setActiveTab}
            >
              <InPersonPlaceSelect
                value={inPersonSchedulePlace}
                onConfirm={setInPersonSchedulePlace}
                backTo="/found/match-result/quiz/claimants/return-prep/review/in-person"
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/lost/new"
          element={
            <BackTabScreen
              title="분실물 등록"
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
            >
              <LostItemRegister
                draft={lostDraft}
                onDraftChange={setLostDraft}
                onRegister={() => {
                  saveItem(toItemRow('lost', null, lostDraft, { featureAnswers: lostDraft.featureAnswers }))
                  setCompletedItem(lostDraft)
                  setLostDraft(INITIAL_LOST_DRAFT)
                  setAwaitingMatchNotification(true)
                }}
              />
            </BackTabScreen>
          }
        />
        <Route
          path="/lost/new/location"
          element={
            <SubStepScreen
              title="분실 위치 선택"
              backTo="/lost/new"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab={activeTab}
              onSelectTab={setActiveTab}
            >
              <LocationPicker
                value={lostDraft.location}
                onConfirm={(location) => setLostDraft((prev) => ({ ...prev, location, locationUnknown: false }))}
                onUnknown={() => setLostDraft((prev) => ({ ...prev, location: null, locationUnknown: true }))}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/lost/new/done"
          element={
            <SubStepScreen
              title="분실물 등록"
              backTo="/"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <RegisterComplete
                item={completedItem}
                onNext={() => setActiveTab('/')}
                onRemember={(item) => setStorageItems((prev) => [toStorageItem(item), ...prev])}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/my"
          element={
            <BackTabScreen title="마이페이지" activeTab={activeTab} onSelectTab={setActiveTab}>
              <MyPage />
            </BackTabScreen>
          }
        />
        <Route
          path="/activity"
          element={
            <SubStepScreen title="최근 활동" backTo="/">
              <ActivityPage flowHistory={flowHistory} />
            </SubStepScreen>
          }
        />
        <Route
          path="/my/storage"
          element={
            <SubStepScreen title="내 물건 보관함" backTo="/my">
              <MyStorage
                items={visibleStorageItems}
                onDeleteItem={(id) => setStorageItems((prev) => prev.filter((item) => item.id !== id))}
                onSelectItem={loadStorageItemIntoLostDraft}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/my/storage/new"
          element={
            <SubStepScreen
              title="분실물 추가"
              backTo="/my/storage"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
            >
              <LostItemRegister
                mode="storage"
                draft={storageDraft}
                onDraftChange={setStorageDraft}
                onSave={() => {
                  const item = toStorageItem(storageDraft)
                  setStorageItems((prev) => [item, ...prev])
                  setAddedStorageItem(item)
                  setStorageDraft(INITIAL_LOST_DRAFT)
                  navigate('/my/storage/done')
                }}
              />
            </SubStepScreen>
          }
        />
        <Route
          path="/my/storage/done"
          element={
            <SubStepScreen
              title="분실물 등록"
              backTo="/my/storage"
              rightSlot={<MenuButton onClick={() => setNavMenuOpen(true)} />}
              activeTab="/"
              onSelectTab={setActiveTab}
            >
              <StorageAddComplete item={addedStorageItem} />
            </SubStepScreen>
          }
        />
        <Route
          path="/notifications"
          element={
            <BackTabScreen title="알림" activeTab={activeTab} onSelectTab={setActiveTab}>
              <Notifications />
            </BackTabScreen>
          }
        />
        <Route path="/playground" element={<TabScreen><Playground /></TabScreen>} />
        <Route path="/detail" element={<DetailScreen />} />
      </Routes>

      <Modal
        isOpen={isSearchCompleteDialogOpen}
        onClose={() => setSearchCompleteDialogOpen(false)}
        title="분실물 찾기가 완료됐어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--brand"
              onClick={handleFinishSearch}
            >
              찾기 마치기
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => setSearchCompleteDialogOpen(false)}
            >
              아직 유지하기
            </button>
          </div>
        }
      >
        이번 찾기를 마치고
        <br />
        새로 시작할까요?
      </Modal>

      <Modal
        isOpen={isMatchDialogOpen}
        onClose={() => setMatchDialogOpen(false)}
        dismissible={false}
        title="AI 매칭 결과가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button type="button" className="match-dialog__action match-dialog__action--primary" onClick={handleViewMatchResult}>
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => setMatchDialogOpen(false)}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 결과를 확인해주세요
      </Modal>

      <Modal
        isOpen={isFoundMatchDialogOpen}
        onClose={() => setFoundMatchDialogOpen(false)}
        dismissible={false}
        title="AI 매칭 결과가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button type="button" className="match-dialog__action match-dialog__action--primary" onClick={handleViewFoundMatchResult}>
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => {
                setFoundMatchDialogOpen(false)
                setFoundFlowResumePath('/found/match-result')
              }}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 결과를 확인해주세요
      </Modal>

      <Modal
        isOpen={isOwnershipResultDialogOpen}
        onClose={() => setOwnershipResultDialogOpen(false)}
        dismissible={false}
        title="확인 결과가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={() => {
                setOwnershipResultDialogOpen(false)
                navigate(getOwnershipQuizResultPath())
              }}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => {
                setOwnershipResultDialogOpen(false)
                setFoundFlowResumePath(getOwnershipQuizResultPath())
              }}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 결과를 확인해주세요
      </Modal>

      <Modal
        isOpen={isVerificationMaterialDialogOpen}
        onClose={() => setVerificationMaterialDialogOpen(false)}
        dismissible={false}
        title="검증 자료가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={() => {
                setVerificationMaterialDialogOpen(false)
                setSecondaryVerificationOrigin('ownership-quiz')
                navigate('/found/match-result/quiz/claimants/verification')
              }}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => {
                setVerificationMaterialDialogOpen(false)
                setSecondaryVerificationOrigin('ownership-quiz')
                setFoundFlowResumePath('/found/match-result/quiz/claimants/verification')
              }}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 자료를 확인해주세요
      </Modal>

      <Modal
        isOpen={isOwnershipQuizPassDialogOpen}
        onClose={() => setOwnershipQuizPassDialogOpen(false)}
        dismissible={false}
        title="결과가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={() => {
                setOwnershipQuizPassDialogOpen(false)
                navigate('/found/match-result/quiz/claimants/result')
              }}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => {
                setOwnershipQuizPassDialogOpen(false)
                setFoundFlowResumePath('/found/match-result/quiz/claimants/result')
              }}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 결과를 확인해주세요
      </Modal>

      <Modal
        isOpen={isSecondaryVerificationDialogOpen}
        onClose={() => setSecondaryVerificationDialogOpen(false)}
        dismissible={false}
        title="검증 자료가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={() => {
                setSecondaryVerificationDialogOpen(false)
                setSecondaryVerificationOrigin('claimants')
                navigate('/found/match-result/quiz/claimants/verification')
              }}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => {
                setSecondaryVerificationDialogOpen(false)
                setSecondaryVerificationOrigin('claimants')
                setFoundFlowResumePath('/found/match-result/quiz/claimants/verification')
              }}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 자료를 확인해주세요
      </Modal>

      <Modal
        isOpen={isMultiClaimantResultDialogOpen}
        onClose={() => setMultiClaimantResultDialogOpen(false)}
        dismissible={false}
        title="결과가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={() => {
                setMultiClaimantResultDialogOpen(false)
                navigate('/found/match-result/quiz/claimants/result')
              }}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => {
                setMultiClaimantResultDialogOpen(false)
                setFoundFlowResumePath('/found/match-result/quiz/claimants/result')
              }}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 결과를 확인해주세요
      </Modal>

      <Modal
        isOpen={isReturnProposalDialogOpen}
        onClose={() => setReturnProposalDialogOpen(false)}
        dismissible={false}
        title={
          <>
            분실물 반환 제안이
            <br />
            도착했어요
          </>
        }
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={() => {
                setReturnProposalDialogOpen(false)
                handleChooseReturnDeliveryMethod(deliveryMethodPick)
              }}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => setReturnProposalDialogOpen(false)}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 확인해주세요
      </Modal>

      <Modal
        isOpen={isVerificationDialogOpen}
        onClose={() => setVerificationDialogOpen(false)}
        dismissible={false}
        title="확인 결과가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={handleViewVerificationResult}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => setVerificationDialogOpen(false)}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 결과를 확인해주세요
      </Modal>

      <Modal
        isOpen={isApprovalDialogOpen}
        onClose={() => setApprovalDialogOpen(false)}
        dismissible={false}
        title="확인 결과가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={handleViewApprovalResult}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => setApprovalDialogOpen(false)}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 결과를 확인해주세요
      </Modal>

      <Modal
        isOpen={isCancelRequestDialogOpen}
        onClose={() => setCancelRequestDialogOpen(false)}
        title="요청을 취소할까요?"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={handleCancelOwnershipRequest}
            >
              취소하기
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => setCancelRequestDialogOpen(false)}
            >
              닫기
            </button>
          </div>
        }
      >
        제출한 증빙은 삭제되고, 습득자 확인이 중단돼요
      </Modal>

      <Modal
        isOpen={isDeliveryDoneDialogOpen}
        onClose={() => setDeliveryDoneDialogOpen(false)}
        dismissible={false}
        title="배송이 완료 됐어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={handleViewDeliveryDone}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => setDeliveryDoneDialogOpen(false)}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 결과를 확인해주세요
      </Modal>

      <Modal
        isOpen={isParcelResultDialogOpen}
        onClose={() => setParcelResultDialogOpen(false)}
        dismissible={false}
        title="확인 결과가 도착했어요"
        footer={
          <div className="match-dialog__actions">
            <button
              type="button"
              className="match-dialog__action match-dialog__action--primary"
              onClick={handleViewParcelResult}
            >
              확인
            </button>
            <button
              type="button"
              className="match-dialog__action match-dialog__action--secondary"
              onClick={() => setParcelResultDialogOpen(false)}
            >
              취소
            </button>
          </div>
        }
      >
        확인을 눌러 결과를 확인해주세요
      </Modal>

      <FlowChangeModal
        isOpen={isFlowChangeDialogOpen}
        onClose={handleCancelFlowChange}
        onConfirm={handleConfirmFlowChange}
      />

      <NavMenu
        isOpen={isNavMenuOpen}
        onClose={() => setNavMenuOpen(false)}
        onNavigate={(path, state) => {
          setNavMenuOpen(false)
          navigate(path, state ? { state } : undefined)
        }}
        isMultipleClaimantsFlow={isMultipleClaimantsFlow}
        onToggleMultipleClaimantsFlow={requestToggleMultipleClaimantsFlow}
        isQuizFailFlow={isQuizFailFlow}
        onToggleQuizFailFlow={requestToggleQuizFailFlow}
        isFoundRestrictedFlow={isFoundRestrictedFlow}
        onToggleFoundRestrictedFlow={requestEnterFoundRestrictedFlow}
        isFoundMultipleClaimantsFlow={isFoundMultipleClaimantsFlow}
        onToggleFoundMultipleClaimantsFlow={() => setFoundMultipleClaimantsFlow((prev) => !prev)}
        hasStorageItems={hasStorageItems}
        onToggleHasStorageItems={() => setHasStorageItems((prev) => !prev)}
        onRestart={handleRestartDemo}
        deliveryMethodOptions={DELIVERY_METHOD_PICK_OPTIONS}
        deliveryMethodPick={deliveryMethodPick}
        onSelectDeliveryMethod={setDeliveryMethodPick}
      />

      {splash && <Splash key={splash.id} withProgress={splash.withProgress} onDone={() => setSplash(null)} />}
      </PreviewStage>
    </>
  )
}

export default App
