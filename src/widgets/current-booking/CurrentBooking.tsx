import { observer } from 'mobx-react-lite';
import { SVG } from '../../shared/ui/svg/SVG'
import './current-booking.scss'
import store from '../../shared/store';
import { useEffect, useState } from 'react';
import { BookingData, Restaurant } from '../../shared/types/types';

const CurrentBooking = observer(({ bookingData }: { bookingData: BookingData }) => {
  const { restaurantsStore } = store
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      if (!bookingData?.restaurantId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        await restaurantsStore.fetchRestaurants();
        const selectedRestaurant = await restaurantsStore.getRestoraurantById(bookingData.restaurantId);

        if (selectedRestaurant) {
          setRestaurant(selectedRestaurant);
        } else {
          // Handle the case where the restaurant is not found
          setRestaurant(null);
          console.error(`Restaurant with id ${bookingData.restaurantId} not found`);
        }
      } catch (error) {
        console.error(error);
        setRestaurant(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [bookingData, restaurantsStore])
  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!bookingData || !restaurant) {
    return <div>Нет текущих бронирований</div>;
  }
  console.log(restaurant, "restaurant from useEffect hook")
  return (
    <section>

      <h3>Текущие бронирования</h3>
      <div className="b-page-box b-page-box--middle b-page--mt20 b-page-box--shadow">
        <div className="b-page-box-img b-page-box-img--rectangular">
          {/* <img src="./img/img/1.png" alt="img"> */}
          <img className='b-page-box-img' src="/img/1.png" alt="img" />
        </div>
        <div className="b-page-box-flex b-page--mt16">
          <div className="b-page-box__tittle">{restaurant.name}</div>
          <div className="b-page-box-flex-wrap b-page-box-flex-wrap--gap8">
            {Array(5).fill(0).map((_, index) => (
              <SVG.StarIcon key={index} fill='#D5ED00' />
            ))}
          </div>
        </div>
        <div className="b-page-box-flex b-page--mt16">
          <div className="b-page-box-flex-wrap">
            <SVG.LocationIcon fill='#B56C27' />
            <div className="b-page-box__subtittle b-page-box__subtittle--opacity80 b-page-box--ml6 b-page-box--mr12">г. Москва, {restaurant.address} </div>
          </div>
          <div className="b-page-box__subtittle b-page-box__subtittle--opacity80">4 км</div>
        </div>
      </div>
    </section>

  )
}
)

export default CurrentBooking;
