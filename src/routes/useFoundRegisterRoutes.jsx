import { Route, useNavigate } from 'react-router-dom'
import AppShell from '../layout/AppShell/AppShell'
import { NAV_ITEMS } from '../layout/Screens/navItems'
import BottomNav from '../components/common/BottomNav/BottomNav'
import FoundItemRegister from '../pages/FoundItemRegister/FoundItemRegister'
import FoundItemRestricted from '../pages/FoundItemRegister/FoundItemRestricted'
import MailboxHandover from '../pages/FoundItemRegister/MailboxHandover'
import MailboxSelect from '../pages/FoundItemRegister/MailboxSelect'
import MailboxHandoverComplete from '../pages/FoundItemRegister/MailboxHandoverComplete'
import PoliceBoxHandover from '../pages/FoundItemRegister/PoliceBoxHandover'
import PoliceBoxHandoverDetails from '../pages/FoundItemRegister/PoliceBoxHandoverDetails'
import FoundItemCamera from '../pages/FoundItemCamera/FoundItemCamera'
import FoundItemMain from '../pages/FoundItemRegister/FoundItemMain'
import FoundLeftItemMain, { STREET_PHOTO_OPTIONS, STATION_PHOTO_OPTIONS } from '../pages/FoundItemRegister/FoundLeftItemMain'
import FoundLeftRegisterComplete from '../pages/FoundItemRegister/FoundLeftRegisterComplete'
import FoundStationLocationPicker from '../pages/FoundItemRegister/FoundStationLocationPicker'
import FoundStationLostReport from '../pages/FoundItemRegister/FoundStationLostReport'
import FoundStationRegisterComplete from '../pages/FoundItemRegister/FoundStationRegisterComplete'
import FoundRegisterComplete from '../pages/FoundItemRegister/FoundRegisterComplete'
import WaitingScreen from '../pages/AiMatching/WaitingScreen'
import LocationPicker from '../pages/LostItemRegister/LocationPicker'
import useAppState from '../app/useAppState'
import trySave from '../app/trySave'
import { INITIAL_FOUND_DRAFT, INITIAL_FOUND_LEFT_DRAFT } from '../app/drafts'
import useStepRoute from './useStepRoute'

// 지구대에 맡긴 습득물 입력 화면 문구
const STATION_FORM_TEXTS = {
  timeSectionTitle: '습득 시간 범위',
  timeHint: '습득한 시간을 선택해 주세요',
  timeSheetTitle: '습득 시간 범위',
  timeSheetDesc: '습득 시간을 선택해주세요',
  timeSheetDayLabel: '습득 날짜',
  timeSheetTimeLabel: '습득 시간',
  locationSectionTitle: '맡긴 장소는 어디인가요?',
  locationRowDesc: '지도에서 대략적인 위치를 선택해요',
  locationRoute: '/found/new/station/location',
}

// 습득물 등록: 보관 중(main) · 두고 옴(left) · 지구대 맡김(station) · 보관 제한 물건(restricted)
export default function useFoundRegisterRoutes() {
  const { setActiveTab, found, dialogs, actions } = useAppState()
  const navigate = useNavigate()
  const stepRoute = useStepRoute()

  const goHomeWithSearchComplete = () => {
    setActiveTab('/')
    navigate('/', { state: { showSearchComplete: true } })
  }

  const registerFoundItem = async () => {
    if (!(await trySave('found', found.foundDraft, { custody: 'keep' }))) return
    found.setCompletedFoundItem(found.foundDraft)
    found.setFoundDraft(INITIAL_FOUND_DRAFT)
    navigate('/found/new/done')
  }

  const registerFoundLeftItem = async () => {
    if (!(await trySave('found', found.foundLeftDraft, { custody: 'left' }))) return
    found.setCompletedFoundItem(found.foundLeftDraft)
    found.setFoundLeftDraft(INITIAL_FOUND_LEFT_DRAFT)
    navigate('/found/new/left/done')
  }

  const registerFoundStationItem = async () => {
    const { foundStationDraft } = found
    if (!(await trySave('found', foundStationDraft, { custody: 'station', lost112Number: foundStationDraft.lost112Number }))) return
    navigate('/found/new/station/done')
  }

  const keepRestrictedItem = () => {
    const { name, description, itemKey } = found.foundStationDraft
    found.setFoundDraft((prev) => ({ ...prev, name, description, itemKey }))
    navigate('/found/new/main')
  }

  const leftItemDraft = found.completedFoundItem ?? found.foundLeftDraft

  return [
    stepRoute(
      '/found/new',
      { title: '습득물 등록', backTo: '/', hasMenu: false },
      <FoundItemRegister onRecognized={found.applyRecognizedPhoto} onRestrictedRecognized={found.applyRestrictedPhoto} />,
    ),
    stepRoute(
      '/found/new/restricted',
      { title: '습득물 등록', backTo: '/found/new/camera', hasMenu: false },
      <FoundItemRestricted onKeepItem={keepRestrictedItem} />,
    ),
    stepRoute(
      '/found/new/restricted/mailbox',
      { title: '인계 안내', backTo: '/found/new/restricted' },
      <MailboxHandover mailbox={found.mailbox} />,
    ),
    stepRoute(
      '/found/new/restricted/mailbox/select',
      { title: '내 근처 우체통', backTo: '/found/new/restricted/mailbox' },
      <MailboxSelect value={found.mailbox} onConfirm={found.setMailbox} backTo="/found/new/restricted/mailbox" />,
    ),
    stepRoute(
      '/found/new/restricted/mailbox/complete',
      { title: '우체통 인계 완료', backTo: '/found/new/restricted/mailbox' },
      <MailboxHandoverComplete onFinishSearch={actions.finishFoundFlow} onKeepAndGoHome={() => navigate('/')} />,
    ),
    stepRoute(
      '/found/new/restricted/police-box',
      { title: '인계 안내', backTo: '/found/new/restricted' },
      <PoliceBoxHandover
        policeBox={found.policeBox ? { title: found.policeBox.address, desc: found.policeBox.detail } : undefined}
      />,
    ),
    stepRoute(
      '/found/new/restricted/police-box/location',
      { title: '습득 위치 선택', backTo: '/found/new/restricted/police-box' },
      <FoundStationLocationPicker
        value={found.policeBox}
        onConfirm={found.setPoliceBox}
        backTo="/found/new/restricted/police-box"
      />,
    ),
    stepRoute(
      '/found/new/restricted/police-box/report',
      { title: '지구대 인계', backTo: '/found/new/restricted/police-box' },
      <PoliceBoxHandoverDetails />,
    ),
    <Route
      key="/found/new/camera"
      path="/found/new/camera"
      element={
        <AppShell
          className="found-camera-shell"
          bottomNav={<BottomNav items={NAV_ITEMS} activeTab="/" onSelect={setActiveTab} />}
        >
          <FoundItemCamera onRecognized={found.applyRecognizedPhoto} onRestrictedRecognized={found.applyRestrictedPhoto} />
        </AppShell>
      }
    />,
    stepRoute(
      '/found/new/main',
      { title: '습득물 등록', backTo: '/found/new' },
      <FoundItemMain draft={found.foundDraft} onDraftChange={found.setFoundDraft} onRegister={registerFoundItem} />,
    ),
    stepRoute(
      '/found/new/location',
      { title: '습득 위치 선택', backTo: '/found/new/main' },
      <LocationPicker
        value={found.foundDraft.location}
        onConfirm={(location) => found.setFoundDraft((prev) => ({ ...prev, location }))}
        backTo="/found/new/main"
        type="found"
      />,
    ),
    stepRoute(
      '/found/new/left',
      { title: '습득물 등록', backTo: '/' },
      <FoundLeftItemMain
        draft={found.foundLeftDraft}
        onDraftChange={found.setFoundLeftDraft}
        onRegister={registerFoundLeftItem}
        photoOptions={STREET_PHOTO_OPTIONS}
      />,
    ),
    stepRoute(
      '/found/new/left/location',
      { title: '발견 위치 선택', backTo: '/found/new/left' },
      <LocationPicker
        value={found.foundLeftDraft.location}
        onConfirm={(location) => found.setFoundLeftDraft((prev) => ({ ...prev, location }))}
        backTo="/found/new/left"
        type="discovered"
      />,
    ),
    stepRoute(
      '/found/new/station',
      { title: '습득물 등록', backTo: '/' },
      <FoundLeftItemMain
        draft={found.foundStationDraft}
        onDraftChange={found.setFoundStationDraft}
        {...STATION_FORM_TEXTS}
        onRegister={() => navigate('/found/new/station/report')}
        photoOptions={STATION_PHOTO_OPTIONS}
      />,
    ),
    stepRoute(
      '/found/new/station/location',
      { title: '습득 위치 선택', backTo: '/found/new/station' },
      <FoundStationLocationPicker
        value={found.foundStationDraft.location}
        onConfirm={(location) => found.setFoundStationDraft((prev) => ({ ...prev, location }))}
        backTo="/found/new/station"
      />,
    ),
    stepRoute(
      '/found/new/station/report',
      { title: '습득물 등록', backTo: '/found/new/station' },
      <FoundStationLostReport
        draft={found.foundStationDraft}
        onDraftChange={found.setFoundStationDraft}
        onPrev={() => navigate('/found/new/station')}
        onRegister={registerFoundStationItem}
      />,
    ),
    stepRoute(
      '/found/new/station/done',
      { title: '습득물 등록', backTo: '/' },
      <FoundStationRegisterComplete draft={found.foundStationDraft} onGoHome={goHomeWithSearchComplete} />,
    ),
    stepRoute(
      '/found/new/station/review',
      { title: '습득물 등록', backTo: '/found/new/station/done' },
      <FoundLeftItemMain
        draft={found.foundStationDraft}
        onDraftChange={found.setFoundStationDraft}
        {...STATION_FORM_TEXTS}
        onRegister={() => navigate('/found/new/station/review/report')}
        mode="readonly"
      />,
    ),
    stepRoute(
      '/found/new/station/review/report',
      { title: '습득물 등록', backTo: '/found/new/station/review' },
      <FoundStationLostReport
        draft={found.foundStationDraft}
        onDraftChange={found.setFoundStationDraft}
        mode="review"
        onEdit={() => navigate('/found/new/station/report')}
        onGoHome={goHomeWithSearchComplete}
      />,
    ),
    stepRoute(
      '/found/new/left/done',
      { title: '발견물 등록', backTo: '/' },
      <FoundLeftRegisterComplete draft={leftItemDraft} onGoHome={goHomeWithSearchComplete} />,
    ),
    stepRoute(
      '/found/new/left/report',
      { title: '발견물 등록', backTo: '/found/new/left/done' },
      <FoundLeftItemMain
        draft={leftItemDraft}
        onDraftChange={found.setCompletedFoundItem}
        mode="review"
        onEdit={() => {
          found.editCompletedLeftItem()
          navigate('/found/new/left')
        }}
        onGoHome={goHomeWithSearchComplete}
      />,
    ),
    stepRoute(
      '/found/new/done',
      { title: '습득물 등록', backTo: '/' },
      <FoundRegisterComplete
        draft={found.completedFoundItem ?? found.foundDraft}
        onKeepAndGoHome={() => {
          setActiveTab('/')
          dialogs.foundMatch.notifyOnHome()
        }}
      />,
    ),
    stepRoute(
      '/found/new/waiting',
      { title: '분실자 매칭', backTo: '/found/new/done' },
      <WaitingScreen
        badge="분실자 매칭중"
        title="분실자를 찾고 있어요"
        subtitle="등록한 습득물과 새로 올라오는 분실 정보를 계속 비교하고 있어요."
        calloutText="매칭되는 분실자가 나타나면 알림으로 알려드릴게요."
        onGoHome={() => {
          setActiveTab('/')
          dialogs.foundMatch.notifyOnHome()
          navigate('/')
        }}
      />,
    ),
  ]
}
