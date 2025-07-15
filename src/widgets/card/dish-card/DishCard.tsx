
import { DishCardProps } from '../../../shared/types/types'
import { CurrentButton, DishPrice, SVG } from '../../../shared/ui'
import CustomSwiper from '../../../shared/ui/swiper/Swiper'
import './dish-card.scss'



export default function DishCard({
  quantity = 1,
  totalPrice = 800,
  onQuantityChange,
  dishData
}: DishCardProps) {
  if (!dishData) {
    return null; // or some fallback UI
  }
  return (
    <section className="b-page-box" style={{ marginTop: '32px' }}>
      <div className="dish-img">
        <CustomSwiper images={["/img/2.png", "/img/2.png", "/img/2.png", "/img/2.png"]} />
      </div>
      <div className="b-page-box-flex b-page--mt12">
        <div className="dish-info-wrapper">
          <div className="dish__tittle">{dishData?.title}</div>
          <div className="dish__subtitle b-page--mt8">{dishData?.position}</div>
        </div>
        <a href="#" className="dish-grade-link">
          <div>
            <SVG.StarIcon fill='#D5ED00' />
            <p className="b-page--ml2">{dishData.rating.value}</p>
          </div>
          <span>{`${dishData.rating.count} оценок`}</span>
        </a>
      </div>

      <div className="b-page-box-flex b-page--mt20">
        <DishPrice price={totalPrice.toString()} />
        <CurrentButton
          initialValue={quantity}
          minValue={1}
          maxValue={10}
          onChange={onQuantityChange}
        />
      </div>
    </section>
  )
}