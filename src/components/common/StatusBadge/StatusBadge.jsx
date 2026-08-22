import './StatusBadge.css'

const TONE_CLASS = {
  neutral: 'status-badge--neutral',
  info: 'status-badge--info',
  success: 'status-badge--success',
  warning: 'status-badge--warning',
  danger: 'status-badge--danger',
}

export default function StatusBadge({ tone = 'neutral', children }) {
  const toneClass = TONE_CLASS[tone] ?? TONE_CLASS.neutral
  return <span className={`status-badge ${toneClass}`}>{children}</span>
}
