
import { SVG } from '../../shared/ui/svg/SVG'
import './prev-header.scss'

export default function PrevHeader() {
  return (
    <div className="header--shadow">
      <div className="container">
        <div className="header-flex header__pt12 header__pb12">
          <div className="header-flex-wrap">
            <div className="header__icon header--mr12">
              <SVG.ArrowIcon fill='#301207' />
            </div>
            <div className="header__tittle">Бронирования</div>
          </div>
        </div>
      </div>
    </div>
  )
}
