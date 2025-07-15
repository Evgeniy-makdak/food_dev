// import { Restaurant } from '../shared/types/types';

import { Award } from "../../types/types";

// import res from '../../../app/db/restaurant/restaurant.json'
export const fetchRestauranAwardstData = async ({ id }: { id: number }) => {
  try {
    const response = await fetch('/db/restaurant/restaurant_awards.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.find((award: Award) => award.id === id);

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    throw error;
  }
};