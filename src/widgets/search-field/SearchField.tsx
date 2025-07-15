import React from 'react'
import Input from '../../shared/ui/input/Input'
import './search-field.scss'
import { SVG } from '../../shared/ui/svg/SVG'
import { SearchFieldProps } from '../../shared/types/types'



export default function SearchField({ value, onChange }: SearchFieldProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    console.log('Search input changed:', newValue)
    onChange(newValue)
  }

  const handleClearSearch = () => {
    onChange("")
  }

  return (
    <section className="b-page-search">
      <div className="search-icon">
        <SVG.SearchIcon />
      </div>
      
      <Input
        type="text"
        className="b-page-search__input"
        style={{}}
        value={value}
        onChange={handleInputChange}
        disabled={false}
        text="Поиск блюд..."
      />
      {value && (
        <button
          className="clear-search-btn"
          onClick={handleClearSearch}
          title="Очистить поиск"
        >
          ×
        </button>
      )}
    </section>
  )
}
