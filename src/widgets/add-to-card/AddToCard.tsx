import { LinkAction } from '../../shared/ui'
import { useCart } from '../../features'
import { AddToCardProps } from '../../shared/types/types'



export default function AddToCard({
  quantity = 1,
  totalPrice = 800,
  onAddToCart,
  dishData
}: AddToCardProps) {
  const { addToCart } = useCart()

  const handleClick = () => {
    if (onAddToCart) {
      onAddToCart()
    } else if (dishData) {
      // Если нет кастомного обработчика, но есть данные о блюде
      const cartItem = {
        id: dishData.id,
        name: dishData.title,
        price: dishData.price,
        quantity: quantity,
        totalPrice: totalPrice,
        image: dishData.image,
        restaurantId: dishData.restaurantId,
      }

      addToCart(cartItem)
      console.log(`Добавлено в корзину: ${quantity} шт. на сумму ${totalPrice} ₽`)
    }
  }

  return (
    <div className="b-bottom b-bottom-h100">
      <div className="container">
        {onAddToCart ? (
          <button
            className="link-action"
            onClick={handleClick}
            style={{
              backgroundColor: '#db3702',
              color: '#fff',
              width: '100%',
              border: 'none',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            {`Добавить в корзину • ${quantity} шт. • ${totalPrice} ₽`}
          </button>
        ) : (
          <LinkAction
            to='/backets'
            text={`Добавить в корзину • ${quantity} шт. • ${totalPrice} ₽`}
            style={{backgroundColor: '#db3702', color: '#fff'}}
          />
        )}
      </div>
    </div>
  )
}
