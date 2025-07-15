import { BasketComment, Header, OrderComposition, OrderCustomer, OrderMethodsPay, OrderReservation, OrderTime, OrderTotalPay, OrderItemsList, OrderButtonAction } from '../../widgets'
import { useCart } from '../../features'
import './order.scss'

export default function Order() {
  const { cart, getTotalItems, getTotalPrice } = useCart()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  // Если корзина пуста, показываем сообщение
  if (totalItems === 0) {
    return (
      <div className='order--page'>
        <Header text="Оформление заказа" />
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#666'
        }}>
          <h3>Корзина пуста</h3>
          <p>Добавьте блюда из меню для оформления заказа</p>
        </div>
      </div>
    )
  }
  return (
    <div className='order--page'>
      <Header text="Оформление заказа" />
      <OrderComposition
        items={cart}
        totalItems={totalItems}
      />
      <OrderItemsList items={cart} />
      <BasketComment />
      <OrderReservation />
      <OrderTime />

      <OrderCustomer />

      <OrderMethodsPay />

      <OrderTotalPay
        totalPrice={totalPrice}
      />

      <OrderButtonAction />
    </div>
  )
}
