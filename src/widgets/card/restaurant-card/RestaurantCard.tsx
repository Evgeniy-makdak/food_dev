/* eslint-disable @typescript-eslint/no-explicit-any */
import { LikeButton, SVG } from '../../../shared/ui'
import IsOpen from '../../../shared/ui/common/is-open/IsOpen'
import img from "../../../../public/img/1.png"
// ../../../public/img/restaurants/1.png
import "./RestaurantCard.scss"
export default function RestaurantCard({ item }: any) {
  return (
    <div key={item.id} className="restaurant-card">
      
      <div className="image-wrapper">
        <div className="image" style={{ backgroundImage: `url(${img})` }}>
          <div className="is_open--wrapper">

            <IsOpen time={item.working_time} />
          </div>

          <LikeButton />
        </div>

      </div>
      <div className="info b-page--mt12">
        <p className="name">{item.name}</p>
        <div className="rating--card">
          <div className="ya"><p> <SVG.YaMapIcon /> {item.rating.ya}</p></div>
          <div className="2gis"><p><SVG.StarIcon fill={"#E3A400"} size={"16"} /> {item.rating.gis}</p></div>
        </div>
      </div>
      <p className='category--text'>{item.category}</p>
      <div className="location--wrapper"><p className='station_name--text'>{item.metro_station[0]}</p> <p className='distance--text'>4км</p></div>

    </div>
  )
}
