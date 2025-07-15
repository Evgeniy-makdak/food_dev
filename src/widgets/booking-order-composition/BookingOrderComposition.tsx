import { useEffect, useState } from 'react'
import { useCart } from '../../features'
import { cartUtils } from '../../features/cartUtils'
import { CartItem } from '../../shared/types/types'
import { SVG } from '../../shared/ui'

export default function BookingOrderComposition() {
  const { cart } = useCart()
  const [orderItems, setOrderItems] = useState<CartItem[]>([])
  // const [isOrderSubmitted, setIsOrderSubmitted] = useState(false)

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU')
  }

  useEffect(() => {
    const checkOrderStatus = () => {
      const submitted = cartUtils.isOrderSubmitted()
      // setIsOrderSubmitted(submitted)

      if (submitted && cart.length === 0) {
        // Если заказ оформлен, но корзина пуста, показываем последний заказ
        const lastOrder = cartUtils.getLastSubmittedOrder()
        if (lastOrder && lastOrder.items) {
          setOrderItems(lastOrder.items)
        }
      } else {
        // Иначе показываем текущую корзину
        setOrderItems(cart)
      }
    }

    checkOrderStatus()
  }, [cart])

  const displayItems = orderItems.length > 0 ? orderItems : cart

  if (displayItems.length === 0) {
    return (
      <div className="composition">
        <h3>Состав заказа</h3>
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#666'
        }}>
          <p>Корзина пуста</p>
          <p style={{ fontSize: '14px' }}>
            Добавьте блюда из меню
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="composition">
      <h3 className='pl-16'>Состав заказа</h3>

      <div className="b-page-slider b-page--mt24" >
        {displayItems.map((item: CartItem, index: number) => (
          <div key={item.id || index} className="b-page-box b-page-box--slider js-item-slider" style={{ width: '358px' }}>
            <div className="dish">
              <div className="dish-slider dish-slider--small112">
                <div className="dish-slider-wrap">
                  <div style={{width: "250px"}}>
                    <img
                      className="swiper-slide swiper-slide-active"
                      src={item.image || "./img/dish1.png"}
                      alt={item.name}
                      style={{ width: '110px' }}
                    />
                  </div>

                </div>
                <div className="dish-grade">
                  <SVG.StarIcon />
                  <p className="b-page--ml2">4,95</p>
                </div>
              </div>
              <div className="dish-subscription">
                <div className="b-page-box-flex">
                  <div className="dish__tittle">{item.name}</div>
                </div>
                <div className="dish__subtitle b-page--mt8">
                  Обеденное (350 г.)
                </div>
                <div className="b-page-box-flex b-page--mt12">
                  <div className="dish-price">
                    <p>₽</p>
                    <p>{formatPrice(item.totalPrice)}</p>
                  </div>
                  <div className="dish-quantity">
                    {item.quantity} шт
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
