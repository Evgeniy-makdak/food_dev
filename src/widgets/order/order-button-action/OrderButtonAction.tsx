import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cartUtils } from '../../../features/cartUtils'
import { useCart } from '../../../features'
import { LinkAction } from '../../../shared/ui'


export default function OrderButtonAction() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      alert('Корзина пуста! Добавьте товары для оформления заказа.')
      return
    }

    setIsSubmitting(true)

    try {
      // Сохраняем заказ в историю перед очисткой корзины
      const comment = cartUtils.getOrderComment()
      const booking = cartUtils.getBookingData()

      const order = {
        id: Date.now().toString(),
        items: cart,
        comment,
        booking,
        status: 'submitted',
        cancelReason: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Получаем существующую историю
      const existingHistory = localStorage.getItem('orderHistory')
      const history = existingHistory ? JSON.parse(existingHistory) : []

      // Добавляем новый заказ
      history.push(order)

      // Сохраняем обновленную историю
      localStorage.setItem('orderHistory', JSON.stringify(history))

      // Оформляем заказ (устанавливаем статус)
      cartUtils.submitOrder()

      // Очищаем корзину через контекст React
      clearCart()

      // Показываем уведомление
      alert('Заказ успешно оформлен! Переходим к оплате...')

      // Переходим на страницу оплаты
      navigate('/pay')
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error)
      alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="b-bottom b-bottom-h150" style={{ padding: '24px 0' }}>
      <div className="container">
        <div className="b-bottom-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: "100%" }}>
          <button
            onClick={handleSubmitOrder}
            disabled={isSubmitting || cart.length === 0}
            style={{
              width: '100%',
              color: '#fff',
              background: cart.length === 0 ? '#ccc' : '#6C452B',
              border: 'none',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Оформляем заказ...' : 'Оформить заказ и оплатить'}
          </button>

          <LinkAction
            to='/baskets'
            text='Перейти в корзину'
            style={{
              width: '100%',
              color: '#6C452B',
              background: '#fff',
              border: '1px solid #6C452B',
            }}
          />
        </div>
      </div>
    </div>
  )
}
