// import { Restaurant } from '../shared/types/types';
// import res from '../../../app/db/restaurant/restaurant.json'
export const fetchRestaurantPeculData = async () => {
  try {
    const response = await fetch('/db/restaurant/restaurant_peculiarities.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    throw error;
  }
};