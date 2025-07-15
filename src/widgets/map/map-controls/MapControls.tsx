import { SVG } from '../../../shared/ui'
import './map-controls.scss'
export default function MapControls() {
  return (
    <div className="map-controls">
      <div className="zoom">
        <button className="zoom-in btn--default">
          <SVG.PlusIcon fill={"#071f2b"} />
        </button>
        <div className="liener"></div>
        <button className="zoom-out btn--default">
          <SVG.MinusIcon fill={'#071f2b'} />
        </button>
      </div>
      <button className="user-locations btn--default">
        <SVG.LocationIcon fill={"#071f2b"} />
      </button>
    </div>
  )
}
