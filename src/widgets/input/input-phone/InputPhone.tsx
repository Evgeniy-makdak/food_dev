import { SVG } from "../../../shared/ui"
import "./InputPhone.scss"

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputPhone({ value, onChange }: InputProps) {
  return (
    <label>
      <div className="icon">
        <SVG.PhoneIcon fill="#DB3702" />
      </div>
      <div className="field tel">
        <p>Телефон</p>
        <input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="+7 (ххх) ххх хх хх"
        />
      </div>
    </label>
  )
}
