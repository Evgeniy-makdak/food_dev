/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./map.scss"
import { DishGrade, SVG } from "../../shared/ui";
import RestaurantModal from "../modal/restaurant-map-modal/RestaurantMapModal";
import MainRestaurantModal from "../modal/main-restaurant-modal/MainRestaurantModal";
import { fetchStoriesData } from "../../shared/api/stories/storiesService";
import store from "../../shared/store/";
import { observer } from "mobx-react-lite";
import MapControls from "./map-controls/MapControls";
import RouteMapModal from "../modal/route-map-moda;/RouteMapModal";
import { Restaurant } from "../../shared/types/types";

const Map = observer(() => {
  const { restaurantsStore, restaurantsPeculiaritiesStore } = store;
  const [stories, setStories] = useState<any[]>([]);
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [selectedCoords, setSelectedCoords] = useState<any>(null);
  const [isModalOpenRoute, setIsModalOpenRoute] = useState(false);

  const handleMarkerClick = (restaurant: any, event: React.MouseEvent) => {
    event.stopPropagation();
    if (activeMarkerId) {
      setActiveMarkerId(null);
    }
    setActiveMarkerId(prevId => prevId === restaurant.id ? null : restaurant.id);
    setSelectedRestaurant(restaurant);
    setSelectedCoords(restaurant.coords);
  }

  const handleCloseRestaurantModal = () => {
    setSelectedRestaurant(null);
    // Не сбрасываем координаты здесь, чтобы они оставались доступными для RouteMapModal
  }

  useEffect(() => {
    restaurantsStore.fetchRestaurants();
    restaurantsStore.fetchDish();
    restaurantsPeculiaritiesStore.fetchRestaurantsPeculiarities();
    fetchStoriesData().then(setStories).catch(console.error);
  }, [restaurantsStore]);



  function handleIcon(restaurant: Restaurant) {
    switch (restaurant.category) {
      case "Ресторан":
        return <SVG.FoodLocationIcon size={activeMarkerId === restaurant.id ? "25" : "20"} />

      case "Фастфуд":
        return <SVG.CoffeeIcon size={activeMarkerId === restaurant.id ? "25" : "20"} />
      case "Бар":
        return <SVG.BarIcon size={activeMarkerId === restaurant.id ? "25" : "20"} />
      case "Кафе":
        return <SVG.CoffeeIcon size={activeMarkerId === restaurant.id ? "25" : "20"} />
      default:
        return <SVG.CoffeeIcon size={activeMarkerId === restaurant.id ? "25" : "20"} />
    }
  }

  return (
    <>
      <div className='map'>
        <MainRestaurantModal stories={stories} restaurants={restaurantsStore.restaurants} />
        <img src="./img/map-moskow.png" alt="map" />
        <MapControls />
        <div className="personal-location">
          <SVG.PersonLocationIcon backgroundColor={"#DB3702"} />
        </div>
        {restaurantsStore.restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-marker" style={{ top: `${restaurant.map_position.t}`, left: `${restaurant.map_position.l}` }}>
            {activeMarkerId === restaurant.id && (
              <div className="map-wrap-discription" style={{ zIndex: 8 }}>
                <div className="rating-wrapper">
                  <DishGrade rating={restaurant.rating.total} />
                </div>
                {restaurant.name && <b className="title">{restaurant.name}</b>}
                <p className="average-info">Средний чек <b>от {restaurant.average_price} ₽</b></p>
              </div>
            )}
            <div className="map-marker-wrapper">
              <div
                className={`map-marker ${activeMarkerId === restaurant.id ? 'active-marker' : ''}`}
                onClick={(event) => handleMarkerClick(restaurant, event)}
              >
                {/* fdsfs */}
                {/* <SVG.FoodLocationIcon size={activeMarkerId === restaurant.id ? "25" : "20"} /> */}
                {handleIcon(restaurant)}
              </div>
            </div>
          </div>
        ))}
        {selectedRestaurant && (
          <RestaurantModal
            restaurant={selectedRestaurant}
            isOpen={!!selectedRestaurant}
            setIsModalOpenRoute={setIsModalOpenRoute}
            onClose={handleCloseRestaurantModal}
          />
        )}
      </div>

      <RouteMapModal
        coords={selectedCoords}
        setIsModalOpenRoute={setIsModalOpenRoute}
        isModalOpenRoute={isModalOpenRoute}
      />
    </>
  )
});

export default Map;