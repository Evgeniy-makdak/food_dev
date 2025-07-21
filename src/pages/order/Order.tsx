import { BasketComment, Header, OrderComposition, OrderCustomer, OrderMethodsPay, OrderReservation, OrderTime, OrderTotalPay, OrderItemsList, OrderButtonAction } from '../../widgets'
import { useCart } from '../../features'
import './order.scss'
import { observer } from 'mobx-react-lite'
import { BookingData } from '../../entities/booking-data/BookingData'
import { useState } from 'react'
// import { Restaurant } from '../../shared/types/types'

const Order = observer(() => {
  const { cart, getTotalItems, getTotalPrice } = useCart()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
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
    <BookingData>
      {(bookingData, restaurant) => (
        <div className='order--page'>
          <Header text="Оформление заказа" />
          <OrderComposition
            items={cart}
            totalItems={totalItems}
          />
          <OrderItemsList items={cart} />
          <BasketComment />
          <OrderReservation restaurant={restaurant} />
          <OrderTime />
          <OrderCustomer bookingData={bookingData} />
          <OrderMethodsPay selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment}/>
          <OrderTotalPay
            totalPrice={totalPrice}
          />
          <OrderButtonAction  selectedPayment={selectedPayment}/>
        </div>
      )}
    </BookingData>
  )
})

export default Order