import { useNavigationHandler } from "../../../features";
import { BasketButtonActionProps } from "../../../shared/types/types";
import { LinkAction } from "../../../shared/ui";
import { ActiveButton } from "../../../shared/ui/button";




export default function BasketButtonAction({
  totalPrice = 0,
  totalItems = 0
}: BasketButtonActionProps) {
  const isCartEmpty = totalItems === 0
  const { handleItemClick } = useNavigationHandler();

  return (
    <div className="b-bottom b-bottom-h150" style={{ padding: '24px 0' }}>
      <div className="container">
        <div className="b-bottom-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: "100%" }}>
          <LinkAction
            to={isCartEmpty ? '/menu' : '/order'}
            text={`К оформлению • ${totalPrice} ₽`}
            style={{
              color: '#fff',
              background: isCartEmpty ? '#ccc' : '#6C452B',
              border: 'none',
              opacity: isCartEmpty ? 0.6 : 1,
              pointerEvents: isCartEmpty ? 'none' : 'auto'
            }}
          />
          <ActiveButton
            text='Открыть меню'
            onClick={() => handleItemClick('map')}
            style={{
              color: '#6C452B',
              background: '#fff',
              border: '1px solid #6C452B',
            }} />

        </div>
      </div>
    </div>
  )
}
