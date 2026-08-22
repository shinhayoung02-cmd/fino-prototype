import './Card.css'

export default function Card({ children, onClick, padding = true, className = '' }) {
  const Tag = onClick ? 'button' : 'div'
  const classes = [
    'card',
    padding ? 'card--padded' : '',
    onClick ? 'card--clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag type={onClick ? 'button' : undefined} className={classes} onClick={onClick}>
      {children}
    </Tag>
  )
}
