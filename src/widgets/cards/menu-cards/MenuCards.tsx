import { memo, useMemo, useState } from 'react'
import { Dish, MenuCardsProps } from '../../../shared/types/types'
import './menu-cards.scss'
import { MenuCard } from '../../../shared/ui'
import { FoodModal } from '../..' // Убедитесь, что путь импорта правильный

const MenuCards = memo(({ searchQuery = "", menuItems = [], restaurant }: MenuCardsProps) => {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Фильтруем и мемоизируем список карточек
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return menuItems
    }

    const query = searchQuery.toLowerCase().trim()
    return menuItems.filter((item: Dish) =>
      item.title.toLowerCase().includes(query)
    )
  }, [searchQuery, menuItems])

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const menuCards = useMemo(() =>
    filteredItems.map((item: Dish, index: number) => (
      <div onClick={()=>handleDishClick(item)}>
        <MenuCard
          key={`${item.id}-${index}`}
          item={item}
          additionalParams={"search"}
        />
      </div>

    )), [filteredItems]
  )

  return (
    <>
      <section className='menu-cards'>
        <h3>
          Меню ресторана
          {searchQuery && (
            <span style={{ fontSize: '14px', color: '#666', marginLeft: '8px' }}>
              ({filteredItems.length} из {menuItems.length})
            </span>
          )}
        </h3>
        <div className="cards">
          {menuCards.length > 0 ? (
            menuCards
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#666'
            }}>
              <p>Блюда не найдены</p>
              <p style={{ fontSize: '14px' }}>
                Попробуйте изменить поисковый запрос
              </p>
            </div>
          )}
        </div>
      </section>
      <FoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dishData={selectedDish}
        restaurantData={restaurant}
      />
    </>
  )
})

MenuCards.displayName = 'MenuCards'

export default MenuCards