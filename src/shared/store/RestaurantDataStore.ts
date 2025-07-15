// src/shared/store/RestaurantStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { fetchRestaurantData } from '../api/restaurant/restaurantService';
import { fetchRestaurantDishData } from '../api/restaurant/restaurantDishService';
import { Dish, Restaurant } from '../types/types';

class RestaurantStore {
  restaurants: Restaurant[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  dish: Dish[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  async fetchRestaurants() {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await fetchRestaurantData();

      runInAction(() => {
        this.restaurants = data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = String(error);
        }
        this.isLoading = false;
      });
    }
  }

  async fetchDish() {
    try {
      const data = await fetchRestaurantDishData()

      runInAction(() => {
        this.dish = data;
      });
    } catch (error) {
      console.log(error)
    }
  }

  getRestoraurantById(id: number) {
    return this.restaurants.find((restaurant) => restaurant.id === id);
  }

  getDishById(id: number) {
    return this.dish.find((dish: Dish) => dish.id === id);
  }

  // setRestaurants(restaurants: any[]) {
  //   this.restaurants = restaurants;
  // }

  // Другие методы...
}

export default RestaurantStore;