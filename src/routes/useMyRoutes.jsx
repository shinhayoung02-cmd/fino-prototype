import { Route, useNavigate } from 'react-router-dom'
import BackTabScreen from '../layout/Screens/BackTabScreen'
import MyPage from '../pages/MyPage/MyPage'
import ActivityPage from '../pages/Home/RecentActivity'
import MyStorage from '../pages/MyStorage/MyStorage'
import StorageAddComplete from '../pages/MyStorage/StorageAddComplete'
import LostItemRegister from '../pages/LostItemRegister/LostItemRegister'
import { toStorageItem, toPhotoEntries } from '../data/myStorage'
import { deleteStorageItem } from '../lib/supabase'
import useAppState from '../app/useAppState'
import trySave from '../app/trySave'
import { INITIAL_LOST_DRAFT } from '../app/drafts'
import useStepRoute from './useStepRoute'

// 마이페이지 · 최근 활동 · 내 물건 보관함
export default function useMyRoutes() {
  const { activeTab, setActiveTab, lost, storage, flowHistory } = useAppState()
  const navigate = useNavigate()
  const stepRoute = useStepRoute()

  const deleteFromStorage = async (id) => {
    try {
      await deleteStorageItem(id)
      storage.setStorageItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error('[storage delete]', err)
      alert('삭제하지 못했어요. 다시 시도해주세요.')
    }
  }

  // 보관함 물건 → 분실물 등록 폼에 불러오기
  const loadIntoLostDraft = async (item) => {
    const photos = await toPhotoEntries(item)
    lost.setLostDraft({ ...INITIAL_LOST_DRAFT, photos, name: item.name, description: item.description, featureAnswers: [item.feature ?? '', '', ''], fromStorage: true })
    navigate('/lost/new')
  }

  const saveStorageItem = async () => {
    const id = await trySave('storage', storage.storageDraft)
    if (!id) return
    const item = { ...toStorageItem(storage.storageDraft), id }
    storage.setStorageItems((prev) => [item, ...prev])
    storage.setAddedStorageItem(item)
    storage.setStorageDraft(INITIAL_LOST_DRAFT)
    navigate('/my/storage/done')
  }

  return [
    <Route
      key="/my"
      path="/my"
      element={
        <BackTabScreen title="마이페이지" activeTab={activeTab} onSelectTab={setActiveTab}>
          <MyPage />
        </BackTabScreen>
      }
    />,
    stepRoute('/activity', { title: '최근 활동', backTo: '/', hasMenu: false }, <ActivityPage flowHistory={flowHistory} />),
    stepRoute(
      '/my/storage',
      { title: '내 물건 보관함', backTo: '/my', hasMenu: false },
      <MyStorage items={storage.storageItems} onDeleteItem={deleteFromStorage} onSelectItem={loadIntoLostDraft} />,
    ),
    stepRoute(
      '/my/storage/new',
      { title: '분실물 추가', backTo: '/my/storage' },
      <LostItemRegister
        mode="storage"
        draft={storage.storageDraft}
        onDraftChange={storage.setStorageDraft}
        onSave={saveStorageItem}
      />,
    ),
    stepRoute('/my/storage/done', { title: '분실물 등록', backTo: '/my/storage' }, <StorageAddComplete item={storage.addedStorageItem} />),
  ]
}
