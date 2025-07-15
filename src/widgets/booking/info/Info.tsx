import { SVG } from '../../../shared/ui'

import './Info.scss'
export default function Info({ name, addres } : { name: string, addres: string }) {
  return (
    <div className='info-container'>
      <div className="info">
        <p>{name}</p>
        <div className="map-action">
          <p>Карта</p>
          <div className="reverse">
            <SVG.ArrowIcon size={"18"} fill='#DB3702' />
          </div>
        </div>
      </div>

      <div className="addres">
        <span className='addres--test'>{addres}</span>
        <span className='size--text'>4 км</span>
      </div>
    </div>

  )
}
