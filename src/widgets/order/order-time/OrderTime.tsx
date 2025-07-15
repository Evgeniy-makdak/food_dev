
import { TIMES_DATA } from '../../../shared/constants/constants';
import { SVG } from '../../../shared/ui';
import './order-time.scss'
import { useState } from 'react'

export default function OrderTime() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);


  return (
    <section>
      <div className="b-page-box b-page-box--specific b-page--mt32">
        <div className="b-page-box-flex">
          <div className="b-page__commment-tittle">На какое время подать еду?</div>
          <div className="b-page-icon b-page-icon--big40 b-page--mr12">
            <SVG.PlusIcon />
          </div>
        </div>
        <div className="b-page-box-line b-page-box-line--small8 b-page--mr12"></div>
        <div className="b-page-slider b-page--mt16 b-page-slider--bias">
          {TIMES_DATA.map(time => (
            <div
              key={time}
              className="b-page-slider__time"
              style={{
                backgroundColor: selectedTime === time ? 'rgb(108, 69, 43)' : '',
                color: selectedTime === time ? 'white' : ''
              }}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
