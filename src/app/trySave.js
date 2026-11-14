import { saveItem } from '../lib/supabase'

// 저장 실패 시 사용자에게 알리고 false — 화면은 그대로 둔다(입력 유실 방지)
export default async function trySave(...args) {
  try {
    return await saveItem(...args)
  } catch (err) {
    console.error('[save]', err)
    alert('저장하지 못했어요. 인터넷 연결을 확인하고 다시 시도해주세요.')
    return false
  }
}
