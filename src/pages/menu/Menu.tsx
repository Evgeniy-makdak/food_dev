import { useState, useEffect } from "react";
import { topNavMeuItems } from "../../app/config/config";
import { Header, SliderHeader, SearchField, MenuCards } from "../../widgets";
import { observer } from "mobx-react-lite";
import store from "../../shared/store";
import { useParams } from "react-router";
import { Dish, Restaurant } from "../../shared/types/types";

import "./Menu.scss"
// Определение типов


const Menu = observer(() => {
  const { restaurantsStore } = store;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("current");
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<Dish[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await restaurantsStore.fetchRestaurants();
        await restaurantsStore.fetchDish();
        const selectedRestaurant = restaurantsStore.restaurants.find(r => r.id === parseInt(id as string));
        if (selectedRestaurant) {
          setRestaurant(selectedRestaurant);
          const restaurantMenuItems = selectedRestaurant.menu
            .map((dishId: number) => restaurantsStore.dish.find((dish) => dish.id === dishId))
            .filter((dish): dish is Dish => dish !== undefined);
          setMenuItems(restaurantMenuItems);
        } else {
          console.log('Restaurant not found');
        }
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };

    fetchData();
  }, [restaurantsStore, id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (query: string) => {
    console.log('Menu received search query:', query);
    setSearchQuery(query);
  };

  return (
    <div className="menu--page">
      <Header text={restaurant?.name} />
      <div className="menu-page--wrapper">
        <SliderHeader data={topNavMeuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchField
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {restaurant && (
        <MenuCards
          menuItems={menuItems}
          searchQuery={debouncedSearchQuery}
          restaurant={restaurant}
        />
      )}
    </div>
  );
});

export default Menu;