import { useState, useEffect } from 'react'
import { topNavItems } from '../../app/config/config'
import { PrevHeader, SliderHeader, StatusRestaurants, StatusOrder, CurrentBooking, OrderFood, BookingOrderComposition } from '../../widgets'
import { cartUtils } from '../../features/cartUtils'
import { BookingData, Order, Restaurant } from '../../shared/types/types'

import './booking.scss'
import { LinkAction } from '../../shared/ui'
import { observer } from 'mobx-react-lite'
import store from '../../shared/store'


const Booking = observer(() => {
  const { restaurantsStore } = store

  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('current')
  const [orders, setOrders] = useState<Order[]>([])
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!bookingData?.restaurantId) {
        return;
      }

      try {
        await restaurantsStore.fetchRestaurants();
        const selectedRestaurant = await restaurantsStore.getRestoraurantById(bookingData.restaurantId);

        if (selectedRestaurant) {
          setRestaurant(selectedRestaurant);
        } else {
          setRestaurant(null); // Устанавливаем null, если ресторан не найден
          console.warn(`Restaurant with id ${bookingData.restaurantId} not found`);
        }
      } catch (error) {
        console.error(error);
        setRestaurant(null); // Устанавливаем null в случае ошибки
      } finally {
        console.log('Booking data loaded');
      }
    };
    fetchData()
  }, [bookingData, restaurantsStore])

  useEffect(() => {

  }, [bookingData])

  // Проверяем статус заказа при загрузке компонента
  useEffect(() => {
    const checkOrderStatus = () => {
      const submitted = cartUtils.isOrderSubmitted()
      setIsOrderSubmitted(submitted)
    }

    checkOrderStatus()

    // Проверяем статус каждые 1 секунду (для синхронизации между вкладками)
    const interval = setInterval(checkOrderStatus, 1000)

    return () => clearInterval(interval)
  }, [])

  // Загружаем заказы в зависимости от активного таба
  useEffect(() => {
    const loadOrders = () => {
      let ordersList: Order[] = []

      switch (activeTab) {
        case 'current': {
          // Текущий заказ + заказы со статусом submitted из истории
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

  useEffect(() => {
    const loadBookingData = () => {
      const storedBookingData = localStorage.getItem('bookingData');
      if (storedBookingData) {
        setBookingData(JSON.parse(storedBookingData));
      }
    };

    loadBookingData();

    // Добавляем слушатель для отслеживания изменений в localStorage
    window.addEventListener('storage', loadBookingData);

    return () => {
      window.removeEventListener('storage', loadBookingData);
    };
  }, []);

  // Определяем, показывать ли заказы для текущего таба
  const shouldShowOrders = () => {
    if (activeTab === 'current') {
      return isOrderSubmitted || orders.length > 0
    }
    return orders.length > 0
  }


  if (!bookingData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
        <h3>
          Нету текущих заказов
        </h3>
        <p>
          Оформите заказ в <a href="/">меню</a>

        </p>
      </div>
    )
  }
  return (
    <div className='booking--page'>
      <PrevHeader />
      <SliderHeader data={topNavItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      <StatusRestaurants activeTab={activeTab} bookingData={bookingData} />
      <div className="wrapper-status-order">
        <StatusOrder />
      </div>
      <CurrentBooking bookingData={bookingData} />

      {/* Показываем заказы в зависимости от активного таба */}
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

      {/* Показываем пустое состояние если нет заказов */}
      {!shouldShowOrders() && (
        <>
          {activeTab === 'current' && (
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

        </>

      )}

      {/* Показываем кнопки действий только для текущих заказов */}
      {(activeTab === 'current' || activeTab === 'cancelled') &&
        <OrderFood
          restaurant={restaurant}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOrderSubmitted={isOrderSubmitted}
        />}
    </div>
  )
})

export default Booking


//           <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>

//   <h3>
//     {/* {activeTab === 'current' && 'Нет текущих заказов'} */}
//     {activeTab === 'cancelled' && 'Нет отмененных заказов'}
//     {activeTab === 'completed' && 'Нет завершенных заказов'}
//   </h3>
//   <p>
//     {/* {activeTab === 'current' && 'Оформите заказ в меню'} */}
//     {activeTab === 'cancelled' && 'Отмененные заказы будут отображаться здесь'}
//     {activeTab === 'completed' && 'Завершенные заказы будут отображаться здесь'}
//   </p>
// </div>