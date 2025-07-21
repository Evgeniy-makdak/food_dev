import { SVG } from "../../../shared/ui";

export default function OrderCustomer({bookingData}: {bookingData?: any[] | null}) {
  // Проверяем, существует ли bookingData и его первый элемент
  const customerData = bookingData && bookingData.length > 0 ? bookingData[0] : null;
  
  console.log('customerData:', customerData);

  return (
    <section>
      <div className="b-page-box b-page-box--middle b-page--mt32">
        <div className="b-page-box-flex">
          <div className="b-page__commment-tittle b-page__commment-tittle--black">Информация о заказчике</div>
        </div>
        <div className="b-page-box-line b-page-box-line--small8"></div>
        <div className="b-page-box-flex-wrap b-page--mt20">
          <SVG.PersonsIcon />
          <p className="b-page-text b-page--ml8">{customerData?.name || 'Имя не указано'}</p>
        </div>
        <div className="b-page-box-flex-wrap b-page--mt16">
          <SVG.PhoneIcon />
          <a href={`tel:${customerData?.phoneNumber}`} className="b-page-text b-page--ml8">
            {customerData?.phoneNumber || 'Номер телефона не указан'}
          </a>
        </div>
      </div>
    </section>
  )
}