import { SVG } from '../../../shared/ui'

export default function MapRestaurnatInfo({ restaurant }: { restaurant: any }) {
  return (
    <div className="b-page-map">
      <div className="b-page-map-wrap">
        <img src="/img/map-moskow.png" alt="img" />
        <div className="b-page-map-wrap-discription">
          <div className="b-page-map-wrap-discription-left">
            <SVG.CarIcon />
            <div className="b-page--ml8">
              <p>1</p>
              <span>мин</span>
            </div>
          </div>
          <div className="b-page-map-wrap-discription-right b-page--ml12">
            <div className="b-page-map-wrap-discription-right__tittle">{restaurant?.name}</div>
            <div className="b-page-box-flex-wrap">
              <p>Ср. чек:</p>
              <span>от {restaurant?.average_price} ₽</span>
            </div>
          </div>
          <div className="dish-grade dish-grade--map">
            <SVG.StarIcon fill='#D5ED00' />
            <p className="b-page--ml2">{restaurant?.rating.total}</p>
          </div>
        </div>
        <div className="b-page-map-wrap__location">
          <div className='food-location'>
            <SVG.FoodLocationIcon />

          </div>
        </div>
        <div className="b-page-map-wrap__pointer">
          <SVG.PersonLocationIcon backgroundColor="#6C452B" foregroundColor="white" />
        </div>
      </div>
      <div className="b-page-box-flex-wrap b-page--mt12">
        <SVG.LocationIcon fill='#B56C27' />
        <div className="b-page-box__subtittle b-page-box__subtittle--color-orange b-page-box--ml6">
          г. Москва,  {restaurant?.address}</div>
      </div>
    </div>
  )
}
