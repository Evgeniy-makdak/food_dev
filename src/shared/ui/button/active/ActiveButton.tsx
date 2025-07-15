
import './ActiveButton.scss'

export default function ActiveButton({ text, style, onClick, disabled }: { text: string, style?: React.CSSProperties, onClick?: () => void, disabled?: boolean }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        onClick && onClick()
      }}
      className="active-button"
      disabled={disabled}
      style={{
        ...style,
        borderRadius: '16px',
        padding: '16px',
        cursor: 'pointer',
        textDecoration: 'none',
      }}>{text}</button>
  )
}
