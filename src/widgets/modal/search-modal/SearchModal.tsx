import { useState, useEffect } from 'react'
import { MenuCard, Modal, SVG } from '../../../shared/ui'
import InputSearch from '../../../shared/ui/input/InputSearch'
import { FilterModal, FoodModal, Header } from '../..'
import { observer } from 'mobx-react-lite'
import "./SearchModal.scss"
import store from '../../../shared/store'
import { Dish, Restaurant } from '../../../shared/types/types'
import img_restaurant from '../../../../public/img/restaurants/1.png'
import { ActiveButton } from '../../../shared/ui/button'

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}



const SearchModal: React.FC<SearchModalProps> = observer(({ isOpen, onClose }) => {
  const { restaurantsStore } = store
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)
  const [isOpenFood, setIsOpenFood] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('');
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    restaurantsStore.fetchRestaurants();
    restaurantsStore.fetchDish();
  }, [restaurantsStore]);

  useEffect(() => {
    if (searchText) {
      const dishes = restaurantsStore.dish
        .filter((dish: { title: string }) => dish.title.toLowerCase().includes(searchText.toLowerCase()))
        .map((dish: Dish) => dish as Dish);

      const restaurants = restaurantsStore.restaurants
        .filter(restaurant => restaurant.name.toLowerCase().includes(searchText.toLowerCase()) ||
          restaurant.menu.some((dishId: number) => dishes.some((dish: { id: number }) => dish.id === dishId)))
        .map(restaurant => restaurant as Restaurant);

      setFilteredDishes(dishes);
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredDishes([]);
      setFilteredRestaurants([]);
    }
    setIsSearched(false);
  }, [searchText, restaurantsStore.restaurants, restaurantsStore.dish]);

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setIsSearched(false);
  };

  const handleFindClick = () => {
    if (searchText) {
      setIsSearched(true);
      localStorage.setItem('lastSearch', searchText);
    }
  };

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    const restaurant = filteredRestaurants.find(r => r.menu.includes(dish.id));
    setSelectedRestaurant(restaurant || null);
    setIsOpenFood(true);
  };


  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <div className='search--modal'>
          <Header text={"Москва"} onClose={onClose} />
          <div className="search--modal--wrapper">
            <InputSearch label={"Поиск"} onChange={handleSearchChange} setIsOpen={setIsOpenFilter} value={searchText} />
            <div className="btn-wrapper--search">
              <ActiveButton
                text='Найти'
                onClick={handleFindClick}
                disabled={!searchText}
                style={{
                  width: '100%',
                  color: '#fff',
                  background: '#db3702',
                  border: 'none',
                }}
              />
            </div>

            <div className="content">
              {!isSearched ? (
                <>
                  {filteredDishes.length > 0 && (
                    <div className="search-dish">
                      <h3>Блюда</h3>
                      <div className="dish--list">
                        {filteredDishes.map((dish, index) => (
                          <div key={index} className="item" onClick={() => handleDishClick(dish)}>

                            <div className="icon">
                              <SVG.LocationIcon fill='#DB3702' />
                            </div>

                            <p className="item__name--text">{dish.title}</p>
                            {/* <div className="item__price">{dish.price} руб.</div> */}
                          </div>
                        ))}
                      </div>

                    </div>
                  )}
                  {filteredRestaurants.length > 0 && (
                    <div className="search-restaurant">
                      <h3>Заведения</h3>
                      <div className="search-restaurant--list">
                        {filteredRestaurants.map((restaurant, index) => (
                          <a key={index} href={`/restaurants/${restaurant.id}`}>
                            <div className="item-content--wrapper">
                              <div className="item">
                                <div className="bg">
                                  <img src="./img/restaurants/1.png" alt="img" />
                                </div>
                                <div className="info">
                                  <p className='name--text'>{restaurant.name}</p>
                                  <p className='adress--text'>{restaurant.address}</p>
                                </div>


                                {/* <div className="item__name">{restaurant.name}</div> */}
                              </div>
                              <div className="size--text">
                                <span>100м</span>
                              </div>
                            </div>

                          </a>
                        ))}
                      </div>

                    </div>
                  )}
                </>
              ) : (
                <>
                  {filteredRestaurants.length > 0 && (
                    <div className="section-restaurant">
                      <h3>Найдено {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'ресторан' : 'ресторана'}</h3>
                      <div className="restaurant--cards">
                        {filteredRestaurants.map((restaurant, index) => (
                          <a href={`/restaurants/${restaurant.id}`}>
                            <div key={index} className="restaurant--card">

                              <div className="bg" style={{ backgroundImage: `url(${img_restaurant})` }}>
                                <p className='average_price--text'>Ср. чек - <span>{restaurant.average_price} ₽</span></p>
                                <div className="icon">
                                  <SVG.HeartIcon />
                                </div>
                              </div>
                              <div className="info">
                                <div className="name">
                                  <h5>{restaurant.name}</h5>
                                  <div className="rating">
                                    <SVG.StarIcon size='14' fill='#e3a400' />
                                    <span><b>{restaurant.rating.total}</b> / 200</span>
                                  </div>
                                </div>
                                <p className='name'>{restaurant.category}</p>
                                <div className="category-eat">
                                  <p className='category-eat--text'>{restaurant.category_eat}</p>
                                  <p className='size--text'>4км</p>

                                </div>
                              </div>

                            </div>
                          </a>
                        ))}
                      </div>

                    </div>
                  )}
                  {filteredDishes.length > 0 && (
                    <div className="section">
                      <h3>{searchText}</h3>
                      {filteredDishes.map((dish, index) => (
                        <div className='menu-card--wrapper' onClick={() => handleDishClick(dish)}>

                          <MenuCard additionalParams="search" key={index} item={dish} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              {filteredDishes.length === 0 && filteredRestaurants.length === 0 && searchText && (
                <div className="no-results">Ничего не найдено</div>
              )}
            </div>
          </div>

        </div>
      </Modal>
      <FilterModal onClose={() => setIsOpenFilter(false)} isOpen={isOpenFilter} />
      <FoodModal
        onClose={() => setIsOpenFood(false)}
        isOpen={isOpenFood}
        dishData={selectedDish}
        restaurantData={selectedRestaurant}
      />
    </>
  )
})

export default SearchModal