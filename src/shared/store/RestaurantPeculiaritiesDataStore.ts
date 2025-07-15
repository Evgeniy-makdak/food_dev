// src/shared/store/RestaurantStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { fetchRestaurantPeculiaritiesData } from '../api/restaurant/restaurantPeculiaritiesService';
import { Restaurant } from '../types/types';

class RestaurantPeculiaritiesStore {
  restaurantsPeculiarities: Restaurant[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRestaurantsPeculiarities() {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await fetchRestaurantPeculiaritiesData();

      runInAction(() => {
        this.restaurantsPeculiarities = data;
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

  // setRestaurants(restaurants: any[]) {
  //   this.restaurants = restaurants;
  // }

  // Другие методы...
}

export default RestaurantPeculiaritiesStore;