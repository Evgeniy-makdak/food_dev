import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react'
import { CartItem } from '../shared/types/types'

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'addedAt'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Инициализируем состояние с данными из localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      const parsedCart = savedCart ? JSON.parse(savedCart) : []
      console.log('🔄 Инициализация корзины из localStorage:', parsedCart.map((item: CartItem) => ({ id: item.id, name: item.name, quantity: item.quantity })))
      return parsedCart
    } catch (error) {
      console.error('❌ Ошибка при инициализации корзины:', error)
      return []
    }
  })

  // Сохраняем корзину в localStorage
  useEffect(() => {
    console.log('💾 Сохраняем корзину в localStorage:', cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })))
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Мемоизируем вычисления для производительности
  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.totalPrice, 0)
  }, [cart])

  const addToCart = useCallback((newItem: Omit<CartItem, 'addedAt'>) => {
    const timestamp = Date.now()
    console.log(`🛒 [${timestamp}] CartContext: Добавляем в корзину:`, newItem)
    
    const cartItem: CartItem = {
      ...newItem,
      addedAt: new Date().toISOString()
    }

    setCart(prevCart => {
      console.log(`📦 [${timestamp}] CartContext: Текущая корзина в момент обновления:`, prevCart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })))
      const existingItemIndex = prevCart.findIndex(item => item.id === cartItem.id)

      if (existingItemIndex !== -1) {
        // Если товар уже есть, обновляем количество
        console.log(`✅ [${timestamp}] CartContext: Товар "${cartItem.name}" найден в корзине (индекс ${existingItemIndex}), увеличиваем количество с ${prevCart[existingItemIndex].quantity} до ${prevCart[existingItemIndex].quantity + cartItem.quantity}`)
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += cartItem.quantity
        updatedCart[existingItemIndex].totalPrice =
          updatedCart[existingItemIndex].quantity * updatedCart[existingItemIndex].price
        console.log(`📦 [${timestamp}] CartContext: Обновленная корзина:`, updatedCart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })))
        return updatedCart
      } else {
        // Если товара нет, добавляем новый
        console.log(`➕ [${timestamp}] CartContext: Добавляем новый товар "${cartItem.name}" в корзину`)
        const newCart = [...prevCart, cartItem]
        console.log(`📦 [${timestamp}] CartContext: Новая корзина:`, newCart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })))
        return newCart
      }
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    console.log(`🗑️ CartContext: Удаляем товар с ID: ${id}`)
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    console.log(`🔄 CartContext: Обновляем количество товара ${id} на ${quantity}`)
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity, totalPrice: quantity * item.price }
          : item
      )
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    console.log('🧹 CartContext: Очищаем корзину')
    setCart([])
  }, [])

  const getTotalItems = useCallback(() => {
    return totalItems
  }, [totalItems])

  const getTotalPrice = useCallback(() => {
    return totalPrice
  }, [totalPrice])

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
