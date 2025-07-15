import { DownloadButton, LikeButton, SVG } from "../../shared/ui"
import IsOpen from "../../shared/ui/common/is-open/IsOpen"
import "./IntroRestaurant.scss"
import img from '../../../public/img/1.png';
import { Restaurant } from "../../shared/types/types";
export default function IntroRestaurant({ restaurant }: { restaurant: Restaurant }) {

  return (
    <div className="intro--image">
      <div className="img" style={{ backgroundImage: `url(${img})` }}>
        <div className="header">
          <p className="average">
            {
              restaurant.average_price > 0 ? `Средний чек от - ${restaurant.average_price} ₽` : 'Нет информации'
            }
          </p>

          <div className="active">
            <LikeButton />
            <DownloadButton />
          </div>
        </div>
        <div className="footer">
          <a href={`/foods/${restaurant.id}`}><span>Меню</span> <div className="reverse"><SVG.ArrowIcon size="12" /></div></a>
        </div>
      </div>
      <div className="info">
        <h3 className="title">{restaurant.name}</h3>
        <div className="subtitle">
          <p className="category">{restaurant.category_eat}</p>
          <div className="restaurant-rating">
            <div className="rating--info ya--info">

              <SVG.YaMapIcon />
              <span>{restaurant.rating.ya}</span>
            </div>
            <div className="rating--info gis--info">
              <SVG.StarIcon size={"16"} />
              <span>{restaurant.rating.gis}</span>
            </div>


          </div>
        </div>
        <div className="time">
          <IsOpen time={restaurant.working_time} />
          <div className="position">
            <SVG.LocationMarkerIcon />
            <span>4км</span>
          </div>
        </div>
      </div>

    </div>
  )
}
