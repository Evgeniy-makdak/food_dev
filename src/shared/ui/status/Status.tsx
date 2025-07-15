import { StatusProps } from '../../types/types'
import { SVG } from '../svg/SVG'
import './status.scss'



export default function Status({ status = 'waiting' }: StatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'cancelled':
        return {
          className: 'b-page-box-marker--red',
          icon: <SVG.CloseIcon fill='#fff' size={16} />,
          text: 'Отменен'
        }
      case 'completed':
        return {
          className: 'b-page-box-marker--green',
          icon: <SVG.CheckIcon fill='#fff' size={16} />,
          text: 'Завершен'
        }
      case 'waiting':
      default:
        return {
          className: 'b-page-box-marker--yellow',
          icon: <SVG.TimeIcon color='#301207' />,
          text: 'Ожидает'
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className={`b-page-box-marker ${config.className}`}>
      {config.icon}
      <p className="b-page--ml4">{config.text}</p>
    </div>
  )
}
