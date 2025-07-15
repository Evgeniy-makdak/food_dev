
import './pay-info.scss'

import { ActiveButton } from '../../shared/ui/button'
import { useNavigationHandler } from '../../features';
import { SVG } from '../../shared/ui';

export default function PayInfo() {
  const { handleItemClick } = useNavigationHandler();

  return (
    <div className="b-pop-up">
      <div className="container b-pop-up--container">
        <SVG.DocumentCheckIcon />
        <p className="b-pop-up__text b-page--mt16">
          Спасибо за заказ, с вами свяжется
          менеджер для уточнения заказа
        </p>
      </div>
      <div className="container b-pop-up--bottom">
        <ActiveButton
          text='Перейти в бронирование'
          onClick={() => handleItemClick('booking')}
          style={{
            width: '100%',
            color: '#fff',
            background: '#6C452B',
            border: 'none',
          }}
        />

      </div>
    </div>
  )
}
