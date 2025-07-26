import React, { useState, useCallback, memo, useMemo } from 'react';
import { CurrentButton, DishGrade, DishPrice, SVG } from '../../../shared/ui';
import CustomSwiper from '../../../shared/ui/swiper/Swiper';
import { DEFAULT_IMAGES } from '../../../shared/constants/constants';
import { Dish, MenuCardProps } from '../../../shared/types/types';
import FoodModal from '../../modal/food-modal/FoodModal';
import "./menu-card.scss";

const MenuCard: React.FC<MenuCardProps> = memo(function MenuCard({
  item,
  additionalParams,
  onRemoveItem,
  onUpdateQuantity
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCardClick = useCallback(() => {
    if (additionalParams !== "baskets") {
      setIsModalOpen(true);
    }
  }, [additionalParams]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const containerStyle = useMemo(() =>
    additionalParams === "baskets" ? { position: 'relative' as const } : {},
    [additionalParams]
  );

  const cursorStyle = useMemo(() => ({
    cursor: additionalParams !== "baskets" ? 'pointer' as const : 'default' as const
  }), [additionalParams]);

  const deleteButtonStyle = useMemo(() => ({
    position: 'absolute' as const,
    top: '8px',
    right: '8px'
  }), []);

  const handleDeleteClick = useCallback(() => {
    if (onRemoveItem) {
      onRemoveItem(item.id);
    }
  }, [onRemoveItem, item.id]);

  const calories = useMemo(() => {
    if (item.nutrition && Array.isArray(item.nutrition)) {
      const caloriesItem = item.nutrition.find((el: { name: string; }) => el.name === "Калории");
      return caloriesItem && caloriesItem.value !== undefined ? caloriesItem.value : 'Н/Д';
    }
    return 'Н/Д';
  }, [item.nutrition]);

  const rating = useMemo(() => {
    return item.rating && typeof item.rating === 'object' && 'value' in item.rating
      ? item.rating.value
      : null;
  }, [item.rating]);

  const cardContent = (
    <div className="b-page-box b-page--mt20" style={containerStyle}>
      {additionalParams === "baskets" && (
        <div className="dish-delete" style={deleteButtonStyle}>
          <button className='btn--default' onClick={handleDeleteClick}>
            <SVG.DeleteIcon />
          </button>
        </div>
      )}
      <div className="dish">
        <div className={`dish-slider ${additionalParams === "baskets" ? 'dish-slider--small112' : 'dish-slider--big140'} swiper swiper-initialized swiper-horizontal swiper-ios swiper-backface-hidden`}>
          <CustomSwiper images={DEFAULT_IMAGES} />
          {additionalParams === "baskets" ? (
            rating !== null && <DishGrade rating={rating} />
          ) : (
            <div className='time-ready'>
              <SVG.TimeIcon size='14' color='#DB3702' />
              <span>{item.time ?? 'Н/Д'} мин</span>
            </div>
          )}
        </div>
        <div className="dish-subscription">
          <div className="dish-wrapper">
            <div className="dish__tittle">{item.title}</div>
            <div className="dish__subtitle b-page--mt8">{item.position}</div>
          </div>
          {additionalParams !== "baskets" && (
            <div className="allergens">
              {item.allergens && item.allergens.length !== 0 ? (
                <>
                  <span className='red-bg'>Есть аллергены</span>
                  <span className='silver-bg'>{calories} Ккал</span>
                </>
              ) : (
                <>
                  <span className='green-bg'>Нет аллергенов</span>
                  <span className='silver-bg'>{calories} Ккал</span>
                </>
              )}
            </div>
          )}
          <div className={`b-page-box-flex ${additionalParams === "baskets" ? 'b-page-mt8' : ''}`}>
            <DishPrice price={item.price} />
            {additionalParams === "baskets" ? (
              <CurrentButton
                initialValue={item.quantity}
                minValue={1}
                maxValue={10}
                onChange={(quantity) => {
                  if (onUpdateQuantity) {
                    onUpdateQuantity(item.id.toString(), quantity);
                  }
                }}
              />
            ) : (
              additionalParams === "search" ? (
                <button className="dish-btn btn--default" style={{ cursor: 'pointer' }} title="Добавить в корзину">
                  <SVG.PlusIcon />
                </button>
              ) : ''
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const dishData = useMemo<Dish>(() => ({
    ...item,
    image: '/img/dish1.png'
  }), [item]);

  return (
    <>
      <FoodModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        dishData={dishData}
      />
      <div
        className={`dish-link ${additionalParams !== "baskets" ? 'clickable' : ''}`}
        onClick={additionalParams !== "baskets" ? handleCardClick : undefined}
        style={cursorStyle}
      >
        {cardContent}
      </div>
    </>
  );
});

export default MenuCard;