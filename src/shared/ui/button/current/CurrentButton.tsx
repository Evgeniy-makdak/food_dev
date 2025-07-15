import { useState, useEffect, useCallback, memo } from 'react'
import './current-button.scss'
import { SVG } from '../../svg/SVG'
import { CurrentButtonProps } from '../../../types/types'

const CurrentButton = memo(function CurrentButton({
  initialValue = 1,
  minValue = 1,
  maxValue = 99,
  onChange
}: CurrentButtonProps) {
  const [count, setCount] = useState(initialValue)

  // Синхронизируем внутреннее состояние с внешним
  useEffect(() => {
    setCount(initialValue)
  }, [initialValue])

  const handleDecrease = useCallback((e: React.MouseEvent) => {
    e.preventDefault()

    setCount(prevCount => {
      if (prevCount > minValue) {
        const newValue = prevCount - 1
        onChange?.(newValue)
        return newValue
      }
      return prevCount
    })
  }, [minValue, onChange])

  const handleIncrease = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setCount(prevCount => {
      if (prevCount < maxValue) {
        const newValue = prevCount + 1
        onChange?.(newValue)
        return newValue
      }
      return prevCount
    })
  }, [maxValue, onChange])

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return (
    <div className="dish-calc" onClick={handleContainerClick}>
      <button
        className={`dish-calc__btn ${count <= minValue ? 'dish-calc__btn--disabled' : ''}`}
        onClick={handleDecrease}
        disabled={count <= minValue}
        type="button"
      >
        <SVG.MinusIcon />
      </button>
      <div className="dish-calc__num">{count}</div>
      <button
        className={`dish-calc__btn ${count >= maxValue ? 'dish-calc__btn--disabled' : ''}`}
        onClick={handleIncrease}
        disabled={count >= maxValue}
        type="button"
      >
        <SVG.PlusIcon />
      </button>
    </div>
  )
})

export default CurrentButton
