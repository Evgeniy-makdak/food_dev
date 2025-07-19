import React, { useEffect, useState } from 'react';
import { BookingData as BookingDataType, Restaurant } from '../../shared/types/types';
import store from '../../shared/store';

type BookingDataProps = {
  children: (bookingData: BookingDataType | null, restaurant: Restaurant | null) => React.ReactNode;
};

export const BookingData: React.FC<BookingDataProps> = ({ children }) => {
  const { restaurantsStore } = store;
  const [bookingData, setBookingData] = useState<BookingDataType | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const loadBookingData = () => {
      const storedBookingData = localStorage.getItem('bookingData');
      if (storedBookingData) {
        setBookingData(JSON.parse(storedBookingData));
      }
    };

    loadBookingData();

    window.addEventListener('storage', loadBookingData);

    return () => {
      window.removeEventListener('storage', loadBookingData);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!bookingData?.restaurantId) {
        return;
      }

      try {
        await restaurantsStore.fetchRestaurants();
        const selectedRestaurant = await restaurantsStore.getRestoraurantById(bookingData.restaurantId);

        if (selectedRestaurant) {
          setRestaurant(selectedRestaurant);
        } else {
          setRestaurant(null);
          console.warn(`Restaurant with id ${bookingData.restaurantId} not found`);
        }
      } catch (error) {
        console.error(error);
        setRestaurant(null);
      }
    };
    fetchData();
  }, [bookingData, restaurantsStore]);

  return <>{children(bookingData, restaurant)}</>;
};