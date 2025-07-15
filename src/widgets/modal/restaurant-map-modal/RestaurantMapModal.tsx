import React from 'react';
// import { DishGrade, SVG } from "../../shared/ui";
import './RestaurantMapModal.scss';
import { RestaurantCard } from '../../card';
import { ActiveButton } from '../../../shared/ui/button';

interface RestaurantModalProps {
  restaurant: {
    id: number;
    name: string;
    rating: number;
    average_price: number;
    description: string;
    image: string;
  };
  isOpen: boolean;
  onClose: () => void;
  setIsModalOpenRoute: React.Dispatch<React.SetStateAction<boolean>>;
}

const RestaurantMapModal: React.FC<RestaurantModalProps> = ({ restaurant, isOpen, onClose, setIsModalOpenRoute }) => {
  if (!isOpen) return null;

  return (
    <div className="restaurant-modal-overlay" onClick={onClose}>
      <div className="restaurant-modal-content" onClick={e => e.stopPropagation()}>

        <RestaurantCard item={restaurant} />

        <ActiveButton style={{
          marginTop: '20px',
          width: '100%',
          backgroundColor: '#db3702',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',

        }} text='Построить маршрут' onClick={() => {
          setIsModalOpenRoute(true)
          onClose()
        }} />

      </div>
    </div>
  );
};

export default RestaurantMapModal;