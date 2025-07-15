
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import store from '../../../shared/store';
import { observer } from 'mobx-react-lite';
import { descriptionInPhoto, topNavResaurantItems } from '../../../app/config/config';
import { Header, MapRestaurnatInfo, SliderHeader } from '../../../widgets';

import "./Resaurant.scss"
import IntroRestaurant from '../../../widgets/intro-restaurant/IntroRestaurant';
import SliderRestaurantPhoto from '../../../widgets/sliders/slider-restaurant-photo/SliderRestaurantPhoto';
import { Awards, RestaurantCard } from '../../../widgets/card';
import ReviewsCard from '../../../widgets/card/reviews-card/ReviewsCard';
import ExpandableText from '../../../shared/ui/expandable-text/ExpandableText';
import Accordion from '../../../shared/ui/accardion/Accordion';
import { LinkAction, SVG } from '../../../shared/ui';
import NavigationTabs from '../../../shared/ui/navigation-tabs-link/NavigationTabs';
import { getColorForStation } from '../../../shared/lib/color-for-circle/get-color-for-station';
import { ActiveButton } from '../../../shared/ui/button';
import BookingActiveModal from '../../../widgets/modal/booking-active-modal/BookingActiveModal';
import { Restaurant as RestaurantTypes } from '../../../shared/types/types';
// import {getColorForStation} from '../../../shared/utils/colorUtils';

const Restaurant = observer(() => {
  const { restaurantsStore } = store;
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTabHeader, setActiveTabHeader] = useState('about');
  const [activeTab, setActiveTab] = useState('interior');

  const [isOpenBooking, setIsOpenBooking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await restaurantsStore.fetchRestaurants();
        const selectedRestaurant = restaurantsStore.restaurants.find(r => r.id === parseInt(id as string));
        if (selectedRestaurant) {
          setRestaurant(selectedRestaurant);
        } else {
          setError('Restaurant not found');
        }
      } catch (err) {
        console.error('Error loading restaurants:', err);
        setError('Failed to load restaurant data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [restaurantsStore, id]);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }




  return (

    <>
      <section className='restaurant' id="about">
        <div className="name--header">
          {/* <h1>{restaurant.name}</h1> */}

        </div>

        <Header text={restaurant.name}></Header>

        <NavigationTabs
          items={topNavResaurantItems}
          activeTab={activeTabHeader}
          setActiveTab={setActiveTabHeader}
        />

        <div className="intro" >
          {/* <RestaurantCard item={restaurant} /> */}
          <IntroRestaurant restaurant={restaurant} />
        </div>
        <div className="description" id="reviews">
          <h4>Описание</h4>
          <ExpandableText text={restaurant.description} maxLength={82} />

        </div>
        <div className="map--info">
          <MapRestaurnatInfo restaurant={restaurant} />
          <div className="stations">
            {
              restaurant.metro_station.map((station: string) => (
                <div key={station} className="metro-station">
                  <div
                    className="circle"
                    style={{ backgroundColor: getColorForStation(station) }}></div>
                  <span>{station}</span>
                </div>
              ))
            }
          </div>
        </div>

        <SliderHeader data={descriptionInPhoto} activeTab={activeTab} setActiveTab={setActiveTab} />




        <SliderRestaurantPhoto category={activeTab} />

        <div className="awards" id="awards">
          <h2>Награды</h2>
          <div className="awards--cards">
            {restaurant.awards.map((id: number) => (
              <Awards key={id} awardsId={id} />
            ))}
          </div>
        </div>

        <div className="reviews" id="reviews_users">
          <h2>Отзывы</h2>
          <div className="reviews--cards">
            {restaurant.reviews.map((id: number) => (
              <ReviewsCard key={id} reviewsId={id} />
            ))}
          </div>
        </div>


        <div className='extra_seat' id="additional_info">
          <h2>Дополнительная информация</h2>
          <div className="extra_seat--list">
            <div className="parking">
              <div className="icon--accardion">
                <SVG.CarIcon fill="#DB3702" size="24" />
              </div>
              <span>Есть парковка</span>
            </div>

            <Accordion title="Детям" icon={<div className='icon--accardion'><SVG.ChildernIcon /></div>}>
              <ul>
                <li>Детская комната</li>
                <li>Детские стульчики</li>
                <li>Детское меню</li>
              </ul>
            </Accordion>

            <Accordion title="Особенности" icon={<div className='icon--accardion'><SVG.StarIcon2 /></div>}>
              <ul>
                <li>Летняя веранда</li>
                <li>Панорамный вид</li>
              </ul>
            </Accordion>

            <div className="phone">
              <div className="name">
                <div className="icon--accardion">
                  <SVG.PhoneIcon size="24" fill="#db3702" />
                </div>
                <div className="info">
                  <p className="title">Телефон заведения</p>
                  <a href={`tel:${restaurant.phone_number.replace(/\D/g, '')}`} className="phone-number">
                    <span>+7</span>{restaurant.phone_number.slice(2)}
                  </a>
                </div>
              </div>

              <div className="reverse">
                <SVG.ArrowIcon size="24" />
              </div>
            </div>
          </div>
        </div>

        <div className="near" id="near">
          <h2>Ближайшие заведения</h2>
          <div className="near--list">
            {
              restaurantsStore.restaurants.slice(0, 4).map((restaurant: RestaurantTypes) => (
                <a href={`/restaurants/${restaurant.id}`}>

                  <RestaurantCard key={restaurant.id} item={restaurant} />
                </a>
              ))
            }
          </div>
        </div>

        <div className="btn-wrapper--restaurant">
          <ActiveButton
            text={"Забронировать"}

            onClick={() => setIsOpenBooking(true)}
            // onClick={() => handleItemClick('orders')}
            style={{
              width: '100%',
              color: '#fff',
              background: '#db3702',
              border: 'none',
            }} />
          <LinkAction
            text={"Позвонить"}
            to={`tel:${restaurant.phone_number.replace(/\D/g, '')}`}
            style={{
              width: '100%',
              color: '#db3702',
              background: '#fff',
              border: '1px solid #db3702',

            }} />

        </div>

      </section>

      <BookingActiveModal restaurant={restaurant} isOpen={isOpenBooking} onClose={() => setIsOpenBooking(false)} />
    </>
  )
});

export default Restaurant;