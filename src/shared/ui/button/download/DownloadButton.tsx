
import { SVG } from '../../svg/SVG'


export default function ButtonDownload() {

  return (
    <div className="header__icon bg__icon">
      <button className="btn--default btn-close">
        <SVG.DownloadIcon size={18}/>
      </button>
    </div>
  )
}
