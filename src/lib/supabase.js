// Supabase REST(PostgREST) 직접 호출 — supabase-js 없이 insert/select만 쓴다.
const URL = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const headers = { apikey: KEY, 'Content-Type': 'application/json' }

export async function saveItem(row) {
  if (!URL) return
  try {
    const res = await fetch(`${URL}/rest/v1/items`, { method: 'POST', headers, body: JSON.stringify(row) })
    if (!res.ok) console.error('[supabase] saveItem', res.status, await res.text())
  } catch (err) {
    console.error('[supabase] saveItem', err)
  }
}

export async function fetchRecentItems(limit = 3) {
  if (!URL) return []
  try {
    const res = await fetch(`${URL}/rest/v1/items?select=*&order=created_at.desc&limit=${limit}`, { headers })
    return res.ok ? await res.json() : []
  } catch {
    return []
  }
}
