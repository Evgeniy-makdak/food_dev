import { makeAutoObservable } from "mobx";
import { bottomNavItems } from "../../app/config/config";
import { NavItemId } from "../types/types";

export class NavBarStore {
  items = bottomNavItems;

  constructor() {
    makeAutoObservable(this);
  }

  setActive = (id: NavItemId) => {
    this.items = this.items.map((item) => ({
      ...item,
      isActive: item.id === id,
    }));
  };
}

