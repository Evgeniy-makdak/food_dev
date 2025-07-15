import { OrderItemsListProps } from '../../../shared/types/types'
import './order-items-list.scss'



export default function OrderItemsList({ items }: OrderItemsListProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU')
  }

  if (items.length === 0) {
    return (
      <section className="order-items-list">
        <div className="b-page-wrap b-page--mt20">
          <div className="b-page-title-registration">Детали заказа</div>
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            <p>Нет товаров в заказе</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="order-items-list">
      <div className="b-page-wrap b-page--mt20">
        <div className="b-page-title-registration">Детали заказа</div>
        <div className="order-items">
          {items.map((item, index) => (
            <div key={item.id || index} className="order-item">
              <div className="order-item-info">
                <div className="order-item-image">
                  <img src={item.image || '/img/dish1.png'} alt={item.name} />
                </div>
                <div className="order-item-details">
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-quantity">{item.quantity} шт.</div>
                </div>
              </div>
              <div className="order-item-price">
                <div className="dish-price">
                  <p>₽</p>
                  <p className="b-page-box__price">{formatPrice(item.totalPrice)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
