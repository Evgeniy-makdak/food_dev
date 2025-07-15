/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItem } from '../shared/types/types'

// Утилиты для работы с корзиной
export const cartUtils = {
  // Получить корзину из localStorage
  getCart: (): CartItem[] => {
    try {
      const cart = localStorage.getItem('cart')
      return cart ? JSON.parse(cart) : []
    } catch (error) {
      console.error('Ошибка при получении корзины:', error)
      return []
    }
  },

  // Показать содержимое корзины в консоли
  showCart: (): void => {
    const cart = cartUtils.getCart()
    const comment = cartUtils.getOrderComment()
    const status = cartUtils.getOrderStatus()
    const booking = cartUtils.getBookingData()
    const history = cartUtils.getOrderHistory()

    console.group('🛒 Полная информация о заказах')

    // Текущий заказ
    console.group('📋 Текущий заказ')

    // Информация о бронировании
    console.group('📅 Данные бронирования')
    console.log(`Дата: ${booking.date}`)
    console.log(`Время: ${booking.time}`)
    console.log(`Количество людей: ${booking.persons}`)
    console.groupEnd()

    // Содержимое корзины
    console.group('🍽️ Содержимое корзины')
    if (cart.length === 0) {
      console.log('Корзина пуста')
    } else {
      cart.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - ${item.quantity} шт. - ${item.totalPrice} ₽`)
      })

      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0)

      console.log(`Итого: ${totalItems} товаров на сумму ${totalPrice} ₽`)
    }
    console.groupEnd()

    // Дополнительная информация
    if (comment) {
      console.log(`💬 Комментарий: "${comment}"`)
    }

    console.log(`📋 Статус заказа: ${status}`)
    console.log(`✅ Заказ оформлен: ${cartUtils.isOrderSubmitted() ? 'ДА' : 'НЕТ'}`)

    console.groupEnd()

    // История заказов
    if (history.length > 0) {
      console.group('📚 История заказов')

      const currentOrders = history.filter(order => order.status === 'submitted')
      const cancelledOrders = history.filter(order => order.status === 'cancelled')
      const completedOrders = history.filter(order => order.status === 'completed')

      if (currentOrders.length > 0) {
        console.group(`📋 Текущие заказы (${currentOrders.length})`)
        currentOrders.forEach((order, index) => {
          console.log(`${index + 1}. Заказ #${order.id} - ${order.items.length} блюд - ${order.createdAt}`)
        })
        console.groupEnd()
      }

      if (cancelledOrders.length > 0) {
        console.group(`❌ Отмененные заказы (${cancelledOrders.length})`)
        cancelledOrders.forEach((order, index) => {
          console.log(`${index + 1}. Заказ #${order.id} - ${order.items.length} блюд - Причина: ${order.cancelReason}`)
        })
        console.groupEnd()
      }

      if (completedOrders.length > 0) {
        console.group(`✅ Завершенные заказы (${completedOrders.length})`)
        completedOrders.forEach((order, index) => {
          console.log(`${index + 1}. Заказ #${order.id} - ${order.items.length} блюд - ${order.updatedAt}`)
        })
        console.groupEnd()
      }

      console.groupEnd()
    }

    console.groupEnd()
  },

  // Очистить корзину
  clearCart: (): void => {
    localStorage.removeItem('cart')
    console.log('Корзина очищена')
  },

  // Получить общее количество товаров
  getTotalItems: (): number => {
    const cart = cartUtils.getCart()
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  },

  // Получить общую стоимость
  getTotalPrice: (): number => {
    const cart = cartUtils.getCart()
    return cart.reduce((sum, item) => sum + item.totalPrice, 0)
  },

  // Получить комментарий к заказу
  getOrderComment: (): string => {
    try {
      return localStorage.getItem('orderComment') || ''
    } catch (error) {
      console.error('Ошибка при получении комментария:', error)
      return ''
    }
  },

  // Сохранить комментарий к заказу
  setOrderComment: (comment: string): void => {
    try {
      localStorage.setItem('orderComment', comment)
    } catch (error) {
      console.error('Ошибка при сохранении комментария:', error)
    }
  },

  // Очистить комментарий
  clearOrderComment: (): void => {
    try {
      localStorage.removeItem('orderComment')
    } catch (error) {
      console.error('Ошибка при очистке комментария:', error)
    }
  },

  // Очистить весь заказ (корзина + комментарий)
  clearOrder: (): void => {
    cartUtils.clearCart()
    cartUtils.clearOrderComment()
    cartUtils.clearOrderStatus()
    console.log('Заказ полностью очищен')
  },

  // Получить статус заказа
  getOrderStatus: (): string => {
    try {
      return localStorage.getItem('orderStatus') || 'draft' // draft, submitted, confirmed, completed, cancelled
    } catch (error) {
      console.error('Ошибка при получении статуса заказа:', error)
      return 'draft'
    }
  },

  // Установить статус заказа
  setOrderStatus: (status: string): void => {
    try {
      localStorage.setItem('orderStatus', status)
      console.log(`Статус заказа изменен на: ${status}`)
    } catch (error) {
      console.error('Ошибка при установке статуса заказа:', error)
    }
  },

  // Очистить статус заказа
  clearOrderStatus: (): void => {
    try {
      localStorage.removeItem('orderStatus')
    } catch (error) {
      console.error('Ошибка при очистке статуса заказа:', error)
    }
  },

  // Проверить, оформлен ли заказ
  isOrderSubmitted: (): boolean => {
    const status = cartUtils.getOrderStatus()
    return status === 'submitted' || status === 'confirmed' || status === 'completed'
  },

  // Оформить заказ
  submitOrder: (): void => {
    const cart = cartUtils.getCart()
    const comment = cartUtils.getOrderComment()

    if (cart.length === 0) {
      console.warn('Нельзя оформить пустой заказ')
      return
    }

    cartUtils.setOrderStatus('submitted')
    cartUtils.clearOrderComment()

    console.log('Заказ успешно оформлен!')
    console.log(`Товаров: ${cart.length}`)
    console.log(`Комментарий: ${comment || 'Нет комментария'}`)
  },

  // Получить данные бронирования
  getBookingData: (): { date: string; time: string; persons: number } => {
    try {
      return {
        date: localStorage.getItem('bookingDate') || new Date().toISOString().split('T')[0],
        time: localStorage.getItem('bookingTime') || '10:30',
        persons: parseInt(localStorage.getItem('bookingPersons') || '4')
      }
    } catch (error) {
      console.error('Ошибка при получении данных бронирования:', error)
      return {
        date: new Date().toISOString().split('T')[0],
        time: '10:30',
        persons: 4
      }
    }
  },

  // Установить данные бронирования
  setBookingData: (date: string, time: string, persons: number): void => {
    try {
      localStorage.setItem('bookingDate', date)
      localStorage.setItem('bookingTime', time)
      localStorage.setItem('bookingPersons', persons.toString())
      console.log(`Данные бронирования обновлены: ${date} ${time}, ${persons} чел.`)
    } catch (error) {
      console.error('Ошибка при сохранении данных бронирования:', error)
    }
  },

  // Очистить данные бронирования
  clearBookingData: (): void => {
    try {
      localStorage.removeItem('bookingDate')
      localStorage.removeItem('bookingTime')
      localStorage.removeItem('bookingPersons')
      console.log('Данные бронирования очищены')
    } catch (error) {
      console.error('Ошибка при очистке данных бронирования:', error)
    }
  },



  // Получить историю заказов
  getOrderHistory: (): any[] => {
    try {
      const history = localStorage.getItem('orderHistory')
      return history ? JSON.parse(history) : []
    } catch (error) {
      console.error('Ошибка при получении истории заказов:', error)
      return []
    }
  },

  // Получить заказы по статусу
  getOrdersByStatus: (status: 'submitted' | 'cancelled' | 'completed'): any[] => {
    try {
      const history = cartUtils.getOrderHistory()
      return history.filter(order => order.status === status)
    } catch (error) {
      console.error('Ошибка при фильтрации заказов по статусу:', error)
      return []
    }
  },

  // Отменить текущий заказ
  cancelCurrentOrder: (reason: string): void => {
    try {
      // Сначала проверяем, есть ли оформленный заказ в истории
      const submittedOrders = cartUtils.getOrdersByStatus('submitted')

      if (submittedOrders.length > 0) {
        // Берем последний оформленный заказ
        const lastSubmittedOrder = submittedOrders.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0]

        // Создаем отмененный заказ на основе оформленного
        const cancelledOrder = {
          ...lastSubmittedOrder,
          id: Date.now().toString(),
          status: 'cancelled',
          cancelReason: reason,
          updatedAt: new Date().toISOString()
        }

        // Получаем существующую историю
        const existingHistory = localStorage.getItem('orderHistory')
        const history = existingHistory ? JSON.parse(existingHistory) : []

        // Удаляем оформленный заказ из истории
        const updatedHistory = history.filter((order: any) => order.id !== lastSubmittedOrder.id)

        // Добавляем отмененный заказ
        updatedHistory.push(cancelledOrder)

        // Сохраняем обновленную историю
        localStorage.setItem('orderHistory', JSON.stringify(updatedHistory))

        console.log(`Оформленный заказ отменен и перемещен в отмененные. Причина: ${reason}`)
      } else {
        // Если нет оформленных заказов, проверяем корзину
        const cart = cartUtils.getCart()
        const comment = cartUtils.getOrderComment()
        const booking = cartUtils.getBookingData()

        if (cart.length === 0) {
          console.warn('Нет заказа для отмены')
          return
        }

        // Сохраняем заказ из корзины в историю как отмененный
        const order = {
          id: Date.now().toString(),
          items: cart,
          comment,
          booking,
          status: 'cancelled',
          cancelReason: reason,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        // Получаем существующую историю
        const existingHistory = localStorage.getItem('orderHistory')
        const history = existingHistory ? JSON.parse(existingHistory) : []

        // Добавляем отмененный заказ
        history.push(order)

        // Сохраняем обновленную историю
        localStorage.setItem('orderHistory', JSON.stringify(history))

        // Очищаем текущий заказ
        cartUtils.clearCart()
        cartUtils.clearOrderComment()

        console.log(`Заказ из корзины отменен и сохранен в историю. Причина: ${reason}`)
      }

      // В любом случае сбрасываем статус
      cartUtils.setOrderStatus('draft')

    } catch (error) {
      console.error('Ошибка при отмене заказа:', error)
    }
  },

  // Завершить заказ
  completeOrder: (): void => {
    try {
      const cart = cartUtils.getCart()
      const comment = cartUtils.getOrderComment()
      const booking = cartUtils.getBookingData()

      if (cart.length === 0) {
        console.warn('Нет заказа для завершения')
        return
      }

      // Сохраняем заказ в историю как завершенный
      const order = {
        id: Date.now().toString(),
        items: cart,
        comment,
        booking,
        status: 'completed',
        cancelReason: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Получаем существующую историю
      const existingHistory = localStorage.getItem('orderHistory')
      const history = existingHistory ? JSON.parse(existingHistory) : []

      // Добавляем завершенный заказ
      history.push(order)

      // Сохраняем обновленную историю
      localStorage.setItem('orderHistory', JSON.stringify(history))

      // Очищаем текущий заказ
      cartUtils.clearCart()
      cartUtils.clearOrderComment()
      cartUtils.setOrderStatus('draft')

      console.log('Заказ завершен и сохранен в историю')
    } catch (error) {
      console.error('Ошибка при завершении заказа:', error)
    }
  },

  // Очистить историю заказов
  clearOrderHistory: (): void => {
    try {
      localStorage.removeItem('orderHistory')
      console.log('История заказов очищена')
    } catch (error) {
      console.error('Ошибка при очистке истории заказов:', error)
    }
  },

  // Получить общее количество товаров в корзине
  getTotalItemsCount: (): number => {
    try {
      const cart = cartUtils.getCart()
      return cart.reduce((sum, item) => sum + item.quantity, 0)
    } catch (error) {
      console.error('Ошибка при подсчете товаров в корзине:', error)
      return 0
    }
  },

  // Проверить, есть ли товары в корзине
  hasItems: (): boolean => {
    try {
      return cartUtils.getTotalItemsCount() > 0
    } catch (error) {
      console.error('Ошибка при проверке наличия товаров в корзине:', error)
      return false
    }
  },

  // Получить последний оформленный заказ
  getLastSubmittedOrder: (): any | null => {
    try {
      const submittedOrders = cartUtils.getOrdersByStatus('submitted')
      if (submittedOrders.length === 0) return null

      // Возвращаем последний заказ (с самой поздней датой)
      return submittedOrders.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0]
    } catch (error) {
      console.error('Ошибка при получении последнего заказа:', error)
      return null
    }
  },

  // Проверить, есть ли оформленные заказы
  hasSubmittedOrders: (): boolean => {
    try {
      const submittedOrders = cartUtils.getOrdersByStatus('submitted')
      return submittedOrders.length > 0
    } catch (error) {
      console.error('Ошибка при проверке оформленных заказов:', error)
      return false
    }
  }
}


