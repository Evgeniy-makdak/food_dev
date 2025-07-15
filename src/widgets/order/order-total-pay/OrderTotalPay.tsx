import { OrderTotalPayProps } from '../../../shared/types/types'
import './order-total-pay.scss'



export default function OrderTotalPay({ totalPrice }: OrderTotalPayProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU')
  }

  const prepayment = Math.round(totalPrice * 0.5)

  return (
    <section>
      <div className="b-page-wrap b-page--mt40">
        <div className="b-page-box-flex">
          <div className="b-page-text b-page-box__subtittle--opacity80">Итоговая сумма</div>
          <div className="dish-price">
            <p>₽</p>
            <p className="b-page-box__price">{formatPrice(totalPrice)}</p>
          </div>
        </div>
        <div className="b-page-box-line b-page-box-line--small8"></div>
        <div className="b-page-box-flex b-page--mt16">
          <div>
            <div className="b-page-subtext"><b>Предоплата</b></div>
            <div className="b-page-box__subtittle b-page-box__subtittle--opacity80">(50% от суммы)</div>
          </div>
          <div className="dish-price">
           <p>₽</p>
            <p className="b-page-box__price-big">{formatPrice(prepayment)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
