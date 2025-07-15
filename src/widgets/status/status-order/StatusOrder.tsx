import { useState } from 'react';
import './status-order.scss'
import { Modal, SVG } from '../../../shared/ui';
import { BookingUpdateProvider, useBookingUpdate } from '../../../components/BookingUpdateProvider';

const StatusOrderContent = () => {
  const {
    selectedGuests,
    selectedDate,
    selectedTime,
    onUpdate
  } = useBookingUpdate();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isPersonsOpen, setIsPersonsOpen] = useState(false);

  const generateTimeCategories = () => {
    return {
      morning: { title: 'Утро', times: ['08:00', '09:00', '10:00', '11:00'] },
      afternoon: { title: 'День', times: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'] },
      evening: { title: 'Вечер', times: ['18:00', '19:00', '20:00', '21:00', '22:00'] }
    }
  }

  const timeCategories = generateTimeCategories()

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Выберите дату'
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'long'
    }
    return date.toLocaleDateString('ru-RU', options)
  }

  const formatTime = (time: string) => {
    if (!time) return 'Выберите время'
    const hour = parseInt(time.split(':')[0])
    if (hour === 0) return `${time} (полночь)`
    return time
  }

  const formatPersons = (count: number) => {
    if (!count || count < 1) return 'Выберите количество гостей'
    if (count === 1) return '1 персона'
    if (count < 5) return `${count} персоны`
    return `${count} персон`
  }

  return (
    <div>
      <div className="b-page-order-status">
        <div
          className="b-page-order-status-item"
          onClick={() => setIsCalendarOpen(true)}
          style={{ cursor: 'pointer' }}
          title="Выбрать дату"
        >
          <SVG.CalendarIcon color='#6C452B' />
          <p className="b-page--mt4">{formatDate(selectedDate)}</p>
        </div>

        <div
          className="b-page-order-status-item"
          onClick={() => setIsTimeOpen(true)}
          style={{ cursor: 'pointer' }}
          title="Выбрать время"
        >
          <div className="reverse">
            <SVG.TimeIcon color='#6C452B' />
          </div>
          <p className="b-page--mt4">{formatTime(selectedTime)}</p>
        </div>

        <div
          className="b-page-order-status-item"
          onClick={() => setIsPersonsOpen(true)}
          style={{ cursor: 'pointer' }}
          title="Выбрать количество людей"
        >
          <SVG.PersonsIcon color='#6C452B' />
          <p className="b-page--mt4">{formatPersons(selectedGuests)}</p>
        </div>
      </div>

      {/* Модальное окно календаря */}
      <Modal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} className="date-modal">
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Выберите дату</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onUpdate('selectedDate', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button onClick={() => setIsCalendarOpen(false)}>Отмена</button>
            <button onClick={() => setIsCalendarOpen(false)}>Выбрать</button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно времени */}
      <Modal isOpen={isTimeOpen} onClose={() => setIsTimeOpen(false)} className="time-modal">
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Выберите время</h3>
          <div className="time-categories">
            {Object.entries(timeCategories).map(([key, category]) => (
              <div key={key} className="time-category">
                <h4>{category.title}</h4>
                <div className="category-times">
                  {category.times.map((time) => (
                    <div
                      key={time}
                      onClick={() => {
                        onUpdate('selectedTime', time)
                        setIsTimeOpen(false)
                      }}
                      className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Модальное окно количества людей */}
      <Modal isOpen={isPersonsOpen} onClose={() => setIsPersonsOpen(false)} className="persons-modal">
        <div style={{ padding: '20px' }}>
          <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Количество людей</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
            <button onClick={() => onUpdate('selectedGuests', Math.max(1, selectedGuests - 1))}>-</button>
            <span>{selectedGuests}</span>
            <button onClick={() => onUpdate('selectedGuests', Math.min(20, selectedGuests + 1))}>+</button>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button onClick={() => setIsPersonsOpen(false)}>Отмена</button>
            <button onClick={() => setIsPersonsOpen(false)}>Выбрать</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default function StatusOrder() {
  return (
    <BookingUpdateProvider>
      <StatusOrderContent />
    </BookingUpdateProvider>
  );
}