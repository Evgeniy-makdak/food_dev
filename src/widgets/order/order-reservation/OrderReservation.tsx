import { StatusOrder } from "../..";
import { Restaurant } from "../../../shared/types/types";
import { SVG } from "../../../shared/ui";



export default function OrderReservation({ restaurant }: { restaurant?: Restaurant | null }) {
  return (
    <section>
      <div className="b-page-box b-page-box--shaded b-page--mt32">
        <div className="b-page-box-flex">
          <div className="b-page-title-registration">Ваша бронь</div>
          <div className="b-page-icon b-page-icon--big40">
            <SVG.PencilIcon />
          </div>
        </div>
        <div className="b-page-box-line b-page-box-line--small8"></div>
        <div className="b-page-subtittle">{restaurant?.name}</div>
        <div className="b-page-box-flex b-page--mt8">
          <div className="b-page-box-flex-wrap">
            <SVG.LocationIcon fill='#B56C27' />
            <div className="b-page-box__subtittle b-page-box__subtittle--opacity80 b-page-box--ml6 b-page-box--mr12 b-page-mt-8">
              г. Москва, {restaurant?.address} </div>
          </div>
          <div className="b-page-box__subtittle b-page-box__subtittle--opacity50">4 км</div>
        </div>


        <div className="status-order b-page--mt16">

          <StatusOrder />
        </div>

      </div>
    </section>
  )
}
