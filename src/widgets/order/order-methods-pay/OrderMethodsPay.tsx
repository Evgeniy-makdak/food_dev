import { SVG } from '../../../shared/ui';
import './order-methods-pay.scss'

export default function OrderMethodsPay({
  selectedPayment, 
  setSelectedPayment
}: {
  selectedPayment?: string | null, 
  setSelectedPayment?: (payment: string) => void
}) {

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setSelectedPayment) {
      setSelectedPayment(event.target.id);
    }
  };

  return (
    <section>
      <div className="b-page-box b-page-box--shaded b-page--mt32">
        <label className="b-page-box-flex">
          <div className="b-page-box-flex-wrap">
            <SVG.MIR_PayIcon />
            <p className="b-page-box__subtittle b-page-box__subtittle--black b-page--ml8">22 02 **** **** 7366</p>
          </div>
          <div className="b-page-radio">
            <input
              type="radio"
              id="mir1"
              name="paymentMethod"
              style={{ width: '24px', height: '24px' }}
              checked={selectedPayment === 'mir1'}
              onChange={handlePaymentChange}
            />
          </div>
        </label>
        <div className="b-page-box-line b-page-box-line--small8"></div>
        <label className="b-page-box-flex">
          <div className="b-page-box-flex-wrap">
            <SVG.MIR_PayIcon />
            <p className="b-page-box__subtittle b-page-box__subtittle--black b-page--ml8">22 02 **** **** 7366</p>
          </div>
          <div className="b-page-radio">
            <input
              type="radio"
              id="mir2"
              name="paymentMethod"
              style={{ width: '24px', height: '24px' }}
              checked={selectedPayment === 'mir2'}
              onChange={handlePaymentChange}
            />
          </div>
        </label>
      </div>
    </section>
  )
}