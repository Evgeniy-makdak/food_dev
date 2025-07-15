import { useNavigationHandler } from '../../../../features'
import { ButtonCloseProps } from '../../../types/types';
import { SVG } from '../../svg/SVG'
import './button-close.scss'



export default function ButtonClose({ redirectTo, onClick }: ButtonCloseProps) {
  const { handleItemClick } = useNavigationHandler();

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (redirectTo) {
      handleItemClick(redirectTo)
    }
  }

  return (
    <div className="header__icon">
      <button className="btn--default btn-close" onClick={handleClick}>
        <SVG.CloseIcon />
      </button>
    </div>
  )
}
