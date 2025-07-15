import React, { useState, useEffect } from 'react';

interface BookingUpdateProviderProps {
  children: React.ReactNode;
}

export interface BookingUpdateContextType {
  selectedHall: string;
  selectedGuests: number;
  selectedDate: string;
  selectedTime: string;
  onUpdate: (field: string, value: string | number) => void;
}

export const BookingUpdateContext = React.createContext<BookingUpdateContextType | null>(null);

export const BookingUpdateProvider: React.FC<BookingUpdateProviderProps> = ({ children }) => {
  const [selectedHall, setSelectedHall] = useState('Зал 1');
  const [selectedGuests, setSelectedGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('12:00');

  useEffect(() => {
    const storedBookingData = localStorage.getItem('bookingData');
    if (storedBookingData) {
      const parsedData = JSON.parse(storedBookingData);
      setSelectedHall(parsedData.selectedHall || 'Зал 1');
      setSelectedGuests(parsedData.selectedGuests || 1);
      setSelectedDate(parsedData.selectedDate || new Date().toISOString().split('T')[0]);
      setSelectedTime(parsedData.selectedTime || '12:00');
    }
  }, []);

  const onUpdate = (field: string, value: string | number) => {
    switch (field) {
      case 'selectedHall':
        setSelectedHall(value as string);
        break;
      case 'selectedGuests':
        setSelectedGuests(value as number);
        break;
      case 'selectedDate':
        setSelectedDate(value as string);
        break;
      case 'selectedTime':
        setSelectedTime(value as string);
        break;
    }

    // Обновляем данные в localStorage
    const updatedBookingData = {
      selectedHall,
      selectedGuests,
      selectedDate,
      selectedTime,
      [field]: value
    };
    localStorage.setItem('bookingData', JSON.stringify(updatedBookingData));
  };

  return (
    <BookingUpdateContext.Provider
      value={{
        selectedHall,
        selectedGuests,
        selectedDate,
        selectedTime,
        onUpdate,
      }}
    >
      {children}
    </BookingUpdateContext.Provider>
  );
};

export const useBookingUpdate = () => {
  const context = React.useContext(BookingUpdateContext);
  if (!context) {
    throw new Error('useBookingUpdate must be used within a BookingUpdateProvider');
  }
  return context;
};