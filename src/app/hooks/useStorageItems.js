import { useEffect, useState } from 'react'
import { fetchMyStorageItems } from '../../lib/supabase'
import { fromStorageRow } from '../../data/myStorage'
import { INITIAL_LOST_DRAFT } from '../drafts'

// 내 물건 보관함 (출시판: DB 기준, 플로우 스위치 무시)
export default function useStorageItems(session) {
  const [storageItems, setStorageItems] = useState([])
  const [storageDraft, setStorageDraft] = useState(INITIAL_LOST_DRAFT)
  const [addedStorageItem, setAddedStorageItem] = useState(null)

  useEffect(() => {
    if (!session) return
    fetchMyStorageItems()
      .then((rows) => setStorageItems(rows.map(fromStorageRow)))
      .catch((err) => console.error('[storage]', err))
  }, [session])

  return { storageItems, setStorageItems, storageDraft, setStorageDraft, addedStorageItem, setAddedStorageItem }
}
