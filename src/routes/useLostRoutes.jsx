import { Route } from 'react-router-dom'
import BackTabScreen from '../layout/Screens/BackTabScreen'
import MenuButton from '../components/common/MenuButton/MenuButton'
import LostItemRegister from '../pages/LostItemRegister/LostItemRegister'
import LocationPicker from '../pages/LostItemRegister/LocationPicker'
import RegisterComplete from '../pages/LostItemRegister/RegisterComplete'
import { toStorageItem } from '../data/myStorage'
import useAppState from '../app/useAppState'
import trySave from '../app/trySave'
import { INITIAL_LOST_DRAFT } from '../app/drafts'
import useStepRoute from './useStepRoute'

// 분실물 등록
export default function useLostRoutes() {
  const { activeTab, setActiveTab, lost, storage, dialogs } = useAppState()
  const stepRoute = useStepRoute()

  const registerLostItem = async () => {
    if (!(await trySave('lost', lost.lostDraft))) return
    lost.setCompletedItem(lost.lostDraft)
    lost.setLostDraft(INITIAL_LOST_DRAFT)
    dialogs.match.notifyOnHome()
  }

  const rememberInStorage = async (item) => {
    const id = await trySave('storage', item)
    if (id) storage.setStorageItems((prev) => [{ ...toStorageItem(item), id }, ...prev])
  }

  return [
    <Route
      key="/lost/new"
      path="/lost/new"
      element={
        <BackTabScreen
          title="분실물 등록"
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          rightSlot={<MenuButton onClick={dialogs.navMenu.open} />}
        >
          <LostItemRegister draft={lost.lostDraft} onDraftChange={lost.setLostDraft} onRegister={registerLostItem} />
        </BackTabScreen>
      }
    />,
    stepRoute(
      '/lost/new/location',
      { title: '분실 위치 선택', backTo: '/lost/new' },
      <LocationPicker
        value={lost.lostDraft.location}
        onConfirm={(location) => lost.setLostDraft((prev) => ({ ...prev, location, locationUnknown: false }))}
        onUnknown={() => lost.setLostDraft((prev) => ({ ...prev, location: null, locationUnknown: true }))}
      />,
    ),
    stepRoute(
      '/lost/new/done',
      { title: '분실물 등록', backTo: '/' },
      <RegisterComplete item={lost.completedItem} onNext={() => setActiveTab('/')} onRemember={rememberInStorage} />,
    ),
  ]
}
