import { OrderCompositionProps } from '../../../shared/types/types'
import './order-composition.scss'



export default function OrderComposition({ items, totalItems }: OrderCompositionProps) {
  const getItemsText = (count: number) => {
    if (count === 1) return '1 блюдо'
    if (count < 5) return `${count} блюда`
    return `${count} блюд`
  }

  return (
    <section className='order-composition'>
      <div className="title">
        <div className="b-page-box-flex b-page--mt20">
          <div className="b-page-title-registration">Состав заказа</div>
          <p className="b-page-num-dish">{getItemsText(totalItems)}</p>
        </div>
      </div>
      <div className="b-page-slider b-page--mt22 b-page-slider--gap14">
        {items.length === 0 ? (
          <div className="b-page-slider-item">
            <div className="b-page-slider-item-img">
              <img src="./img/dish2.png" alt="Пустая корзина"/>
            </div>
            <p>Корзина пуста</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={item.id || index} className="b-page-slider-item">
              {item.quantity > 1 && <p>{item.quantity} шт</p>}
              <div className="b-page-slider-item-img">
                <img src={item.image || "./img/dish2.png"} alt={item.name}/>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
