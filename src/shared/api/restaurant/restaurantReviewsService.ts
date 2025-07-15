import { Review } from "../../types/types";

export const fetchRestaurantReviewsService = async ({id}: {id: string}) => {
  try {
    const response = await fetch('/db/restaurant/restaurant_reviews.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Reviews:', data);
    
    // Преобразуем id в число перед сравнением
    const numericId = parseInt(id, 10);
    return data.find((review: Review) => review.id === numericId);

  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    throw error;
  }
};