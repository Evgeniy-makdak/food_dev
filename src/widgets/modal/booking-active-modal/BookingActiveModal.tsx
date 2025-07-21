import { useState } from 'react';
import { Modal, SVG } from '../../../shared/ui';
import "./BookingActiveModal.scss";
import Header from '../../header/Header';
import { ActiveButton } from '../../../shared/ui/button';
import BookingConfirmModal from '../booking-confirm-modal/BookingConfirmModal';
import Info from '../../booking/info/Info';
import { Restaurant } from '../../../shared/types/types';

export default function BookingActiveModal({ isOpen, onClose, restaurant }: { isOpen: boolean, onClose: () => void, restaurant: Restaurant }) {
  const [selectedHall, setSelectedHall] = useState('Зал 1')
  const [selectedGuests, setSelectedGuests] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isGuestSelected, setIsGuestSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);


console.log(restaurant, "restaurant data")

  const onUpdate = (field: string, value: string | number | Date) => {
    switch (field) {
      case 'selectedHall':
        setSelectedHall(value as string);
        break;
      case 'selectedGuests':
        setSelectedGuests(value as number);
        setIsGuestSelected(value !== null);
        break;
      case 'selectedDate':
        setSelectedDate(value as string);
        break;
      case 'selectedTime':
        setSelectedTime(value as string);
        setIsTimeSelected(value !== null);
        break;
    }
  };

  const generateDates = () => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const generateTimeSlots = () => {
    if (!restaurant?.working_time?.open_time || !restaurant?.working_time?.close_time) return []

    const [openHour, openMinute] = restaurant.working_time.open_time.split(':').map(Number)
    const [closeHour, closeMinute] = restaurant.working_time.close_time.split(':').map(Number)

    const slots = []
    const currentTime = new Date()
    currentTime.setHours(openHour, openMinute, 0)

    const closeTime = new Date()
    closeTime.setHours(closeHour, closeMinute, 0)

    while (currentTime < closeTime) {
      slots.push(currentTime.toTimeString().slice(0, 5))
      currentTime.setMinutes(currentTime.getMinutes() + 30)
    }

    return slots
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }
    return date.toLocaleDateString('ru-RU', options)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="booking-active-modal">
        <Header text="Бронирование" onClose={onClose} />
        <div className="booking--active">
          <div className="hall">
            {['Зал 1', 'Зал 2', 'Терраса'].map(hall => (
              <div
                key={hall}
                className={`hall-item ${selectedHall === hall ? 'active' : ''}`}
                onClick={() => onUpdate('selectedHall', hall)}
              >
                <span>{hall}</span>
              </div>
            ))}
          </div>

          <Info name={restaurant?.name} addres={restaurant?.address} />
          <div className="addres">
            <span className='addres--test'>{restaurant?.address}</span>
            <span className='size--text'>4 км</span>
          </div>

          <div className="guests">
            <div className="header">
              <p>Количество гостей</p>
            </div>
            <div className="guest-number-list">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <div
                  key={num}
                  className={`guest-number ${selectedGuests === num ? 'active' : ''}`}
                  onClick={() => onUpdate('selectedGuests', num)}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div className="date--container">
            <div className="header">
              <p>{new Date(selectedDate).toLocaleString('ru-RU', { month: 'long', year: 'numeric' }).replace(/^./, str => str.toUpperCase())}</p>
              <div className="reverse">
                <SVG.ArrowIcon size="16" />
              </div>
            </div>
            <div className="date--list">
              {generateDates().map((date, index) => (
                <div
                  key={index}
                  className={`date--item ${selectedDate === date ? 'active' : ''}`}
                  onClick={() => onUpdate('selectedDate', date)}
                >
                  <p className={`${index === 0 ? "now" : ''}`}>{index === 0 ? 'Сегодня' : formatDate(date).split(',')[0]}</p>
                  <p>{formatDate(date).split(',')[1]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="time--container">
            <div className="header">
              <p>Выберите время</p>
            </div>
            <div className="time--list">
              {generateTimeSlots().map(time => (
                <div
                  key={time}
                  className={`time--item ${selectedTime === time ? 'active' : ''}`}
                  onClick={() => onUpdate('selectedTime', time)}
                >
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isGuestSelected && isTimeSelected && (
          <div className="btn-wrapper--booking">
            <ActiveButton
              text={"Забронировать"}
              onClick={() => {
                // onClose()  

                setIsOpenConfirm(true)
              }}
              style={{
                width: '100%',
                color: '#fff',
                background: '#db3702',
                border: 'none',
              }}
            />
            <ActiveButton
              text={"Отмена"}
              onClick={() => onClose()}
              style={{
                width: '100%',
                color: '#db3702',
                background: '#fff',
                border: '1px solid #db3702',
              }}
            />
          </div>
        )}
      </Modal>
      <BookingConfirmModal
        isOpen={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        restaurant={restaurant}
        selectedHall={selectedHall}
        selectedGuests={selectedGuests}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onUpdate={onUpdate}
      />
    </>
  );
}