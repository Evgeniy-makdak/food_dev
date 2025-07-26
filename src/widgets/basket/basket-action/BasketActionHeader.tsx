import { BasketActionHeaderProps } from "../../../shared/types/types"
import { SVG } from "../../../shared/ui"


import './BasketActionHeader.scss'

export default function BasketActionHeader({
  items,
  totalItems,
  clearCart
}: BasketActionHeaderProps) {
  const displayItems = totalItems || items.length

  return (
    <section className="b-page-box-flex b-page--mt32">
      <p className="b-page-num-dish">
        {displayItems} {displayItems === 1 ? 'блюдо' : displayItems < 5 ? 'блюда' : 'блюд'}
      </p>
      <div className="b-page-box-flex-wrap b-page-box-flex-wrap--gap4" style={{ gap: '15px' }}>
        <div className="b-page-icon">
          <SVG.SearchIcon2 />
        </div>
        <div className="b-page-icon" onClick={clearCart}>
          <SVG.DeleteIcon />
        </div>
      </div>
    </section>
  )
}
