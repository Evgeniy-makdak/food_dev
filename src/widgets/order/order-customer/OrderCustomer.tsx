import { SVG } from "../../../shared/ui";

export default function OrderCustomer() {
  return (
    <section>
      <div className="b-page-box b-page-box--middle b-page--mt32">
        <div className="b-page-box-flex">
          <div className="b-page__commment-tittle b-page__commment-tittle--black">Информация о заказчике</div>
        </div>
        <div className="b-page-box-line b-page-box-line--small8"></div>
        <div className="b-page-box-flex-wrap b-page--mt20">
          <SVG.PersonsIcon />
          <p className="b-page-text b-page--ml8">Валерия Петрова</p>
        </div>
        <div className="b-page-box-flex-wrap b-page--mt16">
          <SVG.PhoneIcon />
          <a href="tel:89265567230" className="b-page-text b-page--ml8">+7 926 556 72 30</a>
        </div>
      </div>
    </section>
  )
}
