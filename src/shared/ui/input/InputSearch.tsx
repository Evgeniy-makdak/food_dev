import { ChangeEvent } from 'react'
import { SVG } from '../svg/SVG'
import './InputSearch.scss'

interface InputSearchProps {
  setIsOpen?: (isOpen: boolean) => void;
  onChange?: (value: string) => void;
  label: string
  value?: string
  disabled?: boolean
}

export default function InputSearch({ setIsOpen, value, onChange, label, disabled }: InputSearchProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return null
    onChange(e.target.value);
  };


  const handleFilterClick = () => {
    if (setIsOpen) {
      setIsOpen(true);
    }
  };
  return (
    <div className="search-panel--wrapper">
      <label>
        <SVG.SearchIcon />
        <input
          className='btn--default input--search'
          onChange={handleInputChange}
          type={value}
          placeholder={label}
          disabled={disabled}
        />
      </label>

      <button className='btn--default' onClick={handleFilterClick}>
        <SVG.FilterIcon />
      </button>


    </div>
  )
}