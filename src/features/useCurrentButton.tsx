import { useState } from 'react'

interface UseCurrentButtonProps {
  initialQuantity?: number
  basePrice?: number
  minQuantity?: number
  maxQuantity?: number
  onQuantityChange?: (quantity: number, totalPrice: number) => void
}

interface UseCurrentButtonReturn {
  quantity: number
  totalPrice: number
  handleQuantityChange: (newQuantity: number) => void
}

export const useCurrentButton = ({
  initialQuantity = 1,
  basePrice = 0,
  minQuantity = 1,
  maxQuantity = 99,
  onQuantityChange
}: UseCurrentButtonProps): UseCurrentButtonReturn => {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleQuantityChange = (newQuantity: number) => {
    // Проверяем границы
    if (newQuantity < minQuantity || newQuantity > maxQuantity) {
      return
    }

    setQuantity(newQuantity)
    const totalPrice = basePrice * newQuantity

    // Логируем изменение
    console.log(`Количество изменено на: ${newQuantity}, общая цена: ${totalPrice}`)

    // Вызываем callback если он передан
    onQuantityChange?.(newQuantity, totalPrice)
  }
  

  const totalPrice = basePrice * quantity
  return {
    quantity,
    totalPrice,
    handleQuantityChange
  }
}