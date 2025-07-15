// src/app/store/RootStore.ts

import { NavBarStore } from "./NavBarStore";
import RestaurantStore from "./RestaurantDataStore";
import RestaurantPeculiaritiesStore from "./RestaurantPeculiaritiesDataStore";



export class RootStore {
  navBarStore: NavBarStore;
  restaurantsStore: RestaurantStore;
  restaurantsPeculiaritiesStore: RestaurantPeculiaritiesStore;

  constructor() {
    this.navBarStore = new NavBarStore();
    this.restaurantsStore = new RestaurantStore();
    this.restaurantsPeculiaritiesStore = new RestaurantPeculiaritiesStore();
  }
}

