import { Modal, SVG } from '../../../shared/ui'
import { Header } from '../..'
import "./RouteMapModal.scss"
export default function RouteMapModal({ setIsModalOpenRoute, isModalOpenRoute, coords }: { setIsModalOpenRoute: React.Dispatch<React.SetStateAction<boolean>>, isModalOpenRoute: boolean, coords: {lat: string, lng: string} }) {
  return (
    <Modal isOpen={isModalOpenRoute} onClose={() => setIsModalOpenRoute(false)} className="route-map-modal">
      <div className="route_map">
        <div className="line-container">
          <div className="line"></div>
        </div>
        <Header text="Карта" onClose={() => console.log('Modal closed')} />
        <div className="links_map">
          <a href={`https://yandex.by/maps/213/moscow/?pt=${coords?.lng}%2C${coords?.lat}&z=15`} target='_blank'>
            <div className="info">
              <div className="icon">
                <SVG.YaMapIcon size={"30"} />
              </div>
              <span>Яндекс Карты</span>
            </div>

            <div className="reverse">
              <SVG.ArrowIcon size="12" />
            </div>
          </a>
          <a href={`https://2gis.ru/moscow?m=${coords?.lng}%2C${coords?.lat}%2F16&point=${coords?.lng}%2C${coords?.lat}`} target='_blank'>
            <div className="info">
              <div className="icon gis">
                <SVG.GisIcon />
              </div>
              <span>2ГИС</span>
            </div>

            <div className="reverse">
              <SVG.ArrowIcon size="12" />
            </div>
          </a>
        </div>

      </div>
    </Modal>
  )
}
