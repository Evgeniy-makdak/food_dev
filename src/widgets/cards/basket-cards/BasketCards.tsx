import { BasketCardsProps } from "../../../shared/types/types";
import { MenuCard } from "../../../shared/ui";




export default function BasketCards({
  items,
  onRemoveItem,
  onUpdateQuantity
}: BasketCardsProps) {
  return (
    <section className='b-page--mt24 basket-cards'>
      <h3>Ланч к столу</h3>
      <div className="cards">
        {items.length === 0 ? (
          <div className="empty-cart" style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#666'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>Корзина пуста</p>
            <p style={{ fontSize: '14px' }}>Добавьте блюда из меню</p>
          </div>
        ) : (
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          items.map((item: any) => (
            <MenuCard
              key={item.id}
              item={item}
              additionalParams={"baskets"}
              onRemoveItem={onRemoveItem}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))
        )}
      </div>
    </section>
  )
}
