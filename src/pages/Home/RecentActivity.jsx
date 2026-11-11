import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchRecentItems } from '../../lib/supabase'

const RECENT_ACTIVITY = [
  { id: 1, text: '새로운 습득물 6건을 비교했어요', time: '오후 3:20' },
  { id: 2, text: '매칭 후보 1건이 추가됐어요', time: '오후 1:05' },
  { id: 3, text: '분실물 정보를 수정했어요', time: '어제' },
]

const formatTime = (value) =>
  new Date(value).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit' })

// 진행한 플로우(flowHistory) + 등록 기록(Supabase)을 한 목록으로
export function useRecentActivity(flowHistory) {
  const [registered, setRegistered] = useState(RECENT_ACTIVITY)
  useEffect(() => {
    fetchRecentItems().then(
      (rows) =>
        rows.length &&
        setRegistered(
          rows.map((row) => ({
            id: `db-${row.id}`,
            text: `${row.kind === 'lost' ? '분실물' : '습득물'} '${row.name}'을 등록했어요`,
            time: formatTime(row.created_at),
          })),
        ),
    )
  }, [])
  const flows = flowHistory.map((h) => ({
    id: h.path,
    path: h.path,
    text: `${h.flow ? `[${h.flow}] ` : ''}'${h.label}'까지 진행했어요`,
    time: `${formatTime(h.at)} · 눌러서 이어하기`,
  }))
  return [...flows, ...registered]
}

// Figma 711:27964 최근 활동 카드 (첫 항목만 주황 점, 점을 잇는 세로선)
export function ActivityTimeline({ items }) {
  const navigate = useNavigate()
  return (
    <div className="home-activity-card">
      {items.map((item, i) => {
        const Tag = item.path ? 'button' : 'div'
        return (
          <Tag
            key={item.id}
            type={item.path ? 'button' : undefined}
            className={`home-activity-item${item.path ? ' home-activity-item--flow' : ''}`}
            onClick={item.path ? () => navigate(item.path) : undefined}
          >
            <span className={`home-activity-item__dot${i === 0 ? ' home-activity-item__dot--active' : ''}`} />
            <div className="home-activity-item__body">
              <p className="home-activity-item__text">{item.text}</p>
              <p className="home-activity-item__time">{item.time}</p>
            </div>
          </Tag>
        )
      })}
    </div>
  )
}

// '더보기' → 전체 활동 페이지
export default function ActivityPage({ flowHistory = [] }) {
  const items = useRecentActivity(flowHistory)
  return (
    <div className="activity-page">
      <ActivityTimeline items={items} />
    </div>
  )
}
