import { DishCompound } from '../../../shared/ui'
import Modal from '../../../shared/ui/modal/Modal'
import { AddToCard, DishCard, DishSwitcherInfo, Header } from '../..'
import { useCurrentButton, useCart } from '../../../features'
import './food-modal.scss'
import { FoodModalProps } from '../../../shared/types/types'

// FoodModalProps type isOpen, onClose, dishData

export default function FoodModal({ isOpen, onClose, dishData, restaurantData }:FoodModalProps) {
  const basePrice = dishData?.price || 800
  const { addToCart } = useCart()

  const { quantity, totalPrice, handleQuantityChange } = useCurrentButton({
    initialQuantity: 1,
    basePrice,
    minQuantity: 1,
    maxQuantity: 10,
    onQuantityChange: (quantity, totalPrice) => {
      console.log(`Модальное окно: ${quantity} шт., итого: ${totalPrice} ₽`);
    }
  });


  console.log(isOpen, onClose, dishData, restaurantData, "This is FoodModal component")
  if(!dishData) return null
  if(!restaurantData) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="food-modal">
      <div className='food-modal__content'>
        <Header text={restaurantData?.name || 'Блюдо'} additionalIcon={"like"} onClose={onClose} />

        <DishCard 
          quantity={quantity}
          totalPrice={totalPrice}
          onQuantityChange={handleQuantityChange}
          dishData={dishData}
        />

        <DishSwitcherInfo allergens={dishData?.allergens} nutrition={dishData?.nutrition}/>

        <DishCompound content={dishData.compound}/>

        <AddToCard 
          quantity={quantity}
          totalPrice={totalPrice}
          onAddToCart={() => {
            // Создаем стабильный ID на основе названия блюда
            const stableId = dishData?.title
              ? dishData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
              : 'unknown-dish'

            // Создаем объект для добавления в корзину
            const cartItem = {
              id: stableId,
              name: dishData?.title || 'Блюдо',
              price: basePrice,
              quantity: quantity,
              totalPrice: totalPrice,
              image: '/img/dish1.png'
            }

            // Добавляем товар в корзину через хук
            addToCart(cartItem)

            console.log(`Добавлено в корзину: ${quantity} шт. на сумму ${totalPrice} ₽`)

            onClose()
          }}
        />
      </div>
    </Modal>
  )
}
