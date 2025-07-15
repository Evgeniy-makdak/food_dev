// Теперь useCart просто использует контекст
import { useCartContext } from './CartContext'

export const useCart = () => {
  return useCartContext()
}
