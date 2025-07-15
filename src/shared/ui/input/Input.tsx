
import { InputProps } from '../../types/types'



export default function Input({ type, className, style, value, onChange, disabled, text }: InputProps) {
  return (
    <input
      type={type}
      className={className}
      style={style}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={text}
    />
  )
}
