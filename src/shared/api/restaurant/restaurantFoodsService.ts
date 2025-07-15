export const fetchRestaurantData = async () => {
  try {
    const response = await fetch('/db/restaurant/restaurant_dish.json');
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