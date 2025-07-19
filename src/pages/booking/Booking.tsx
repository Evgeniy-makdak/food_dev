import { useState, useEffect } from 'react'
import { topNavItems } from '../../app/config/config'
import { PrevHeader, SliderHeader, StatusRestaurants, StatusOrder, CurrentBooking, OrderFood, BookingOrderComposition } from '../../widgets'
import { cartUtils } from '../../features/cartUtils'
import {  Order } from '../../shared/types/types'
import { BookingData } from '../../entities/booking-data/BookingData'
import './booking.scss'
import { LinkAction } from '../../shared/ui'
import { observer } from 'mobx-react-lite'

const Booking = observer(() => {

  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('current')
  const [orders, setOrders] = useState<Order[]>([])



  useEffect(() => {
    const checkOrderStatus = () => {
      const submitted = cartUtils.isOrderSubmitted()
      setIsOrderSubmitted(submitted)
    }

    checkOrderStatus()
    const interval = setInterval(checkOrderStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const loadOrders = () => {
      let ordersList: Order[] = []

      switch (activeTab) {
        case 'current': {
          const currentCart = cartUtils.getCart()
          const submittedOrders = cartUtils.getOrdersByStatus('submitted')

          if (currentCart.length > 0 && isOrderSubmitted) {
            ordersList.push({
              id: 'current',
              items: currentCart,
              comment: cartUtils.getOrderComment(),
              booking: cartUtils.getBookingData(),
              status: 'current',
              createdAt: new Date().toISOString()
            })
          }

          ordersList = [...ordersList, ...submittedOrders]
          break
        }
        case 'cancelled': {
          ordersList = cartUtils.getOrdersByStatus('cancelled')
          break
        }
        case 'completed': {
          ordersList = cartUtils.getOrdersByStatus('completed')
          break
        }
      }

      setOrders(ordersList)
    }

    loadOrders()
  }, [activeTab, isOrderSubmitted])



  const shouldShowOrders = () => {
    if (activeTab === 'current') {
      return isOrderSubmitted || orders.length > 0
    }
    return orders.length > 0
  }

  return (
    <BookingData>
      {(bookingData, restaurant) => (
        <div className='booking--page'>
          <PrevHeader />
          <div className="header--wrapper">
            <SliderHeader data={topNavItems} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {bookingData ? (
            <>
              <StatusRestaurants activeTab={activeTab} bookingData={bookingData} />
              <div className="wrapper-status-order">
                <StatusOrder />
              </div>
              <CurrentBooking bookingData={bookingData} />

              {shouldShowOrders() && (
                <>
                  {activeTab === 'current' && isOrderSubmitted && <BookingOrderComposition />}
                  {activeTab === 'cancelled' && orders.length > 0 && (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <h3>Отмененные заказы ({orders.length})</h3>
                      {orders.map((order) => (
                        <div key={order.id} style={{
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          padding: '16px',
                          margin: '8px 0',
                          backgroundColor: '#fff'
                        }}>
                          <p><strong>Заказ #{order.id}</strong></p>
                          <p>Блюд: {order.items.length}</p>
                          <p>Причина отмены: {order.cancelReason}</p>
                          <p>Дата: {new Date(order.createdAt).toLocaleDateString('ru-RU')}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'completed' && orders.length > 0 && (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <h3>Завершенные заказы ({orders.length})</h3>
                      {orders.map((order) => (
                        <div key={order.id} style={{
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          padding: '16px',
                          margin: '8px 0',
                          backgroundColor: '#fff'
                        }}>
                          <p><strong>Заказ #{order.id}</strong></p>
                          <p>Блюд: {order.items.length}</p>
                          <p>Дата завершения: {new Date(order.updatedAt || order.createdAt).toLocaleDateString('ru-RU')}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {!shouldShowOrders() && activeTab === 'current' && (
                <section className="show-menu--wrapper">
                  <div className="show-menu">
                    <div className="header">
                      <h5>Закажите еду к столу</h5>
                    </div>
                    <div className="info">
                      <p>Вы можете заказть еду к столу и выбрать удобное для вас время подачи блюд</p>
                    </div>
                    <div className="btn-menu--wrapper">
                      <LinkAction
                        text={"Посмотреть меню"}
                        to={`/foods/${bookingData?.restaurantId}`}
                        style={{
                          width: '100%',
                          color: '#fff',
                          background: '#071f2b',
                        }} />
                    </div>
                  </div>
                </section>
              )}

              {(activeTab === 'current' || activeTab === 'cancelled') &&
                <OrderFood
                  restaurant={restaurant}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isOrderSubmitted={isOrderSubmitted}
                />}
            </>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              <h3>Нету текущих заказов</h3>
              <p>Оформите заказ в <a href="/">меню</a></p>
            </div>
          )}
        </div>
      )}
    </BookingData>
  )
})

export default Booking