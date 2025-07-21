import { useState, useEffect } from 'react';
import './status-order.scss'
import { Modal, SVG } from '../../../shared/ui';
import { BookingUpdateProvider, useBookingUpdate } from '../../../components/BookingUpdateProvider';

interface StatusOrderProps {
  selectedGuests?: number | null;
  selectedDate?: string;
  selectedTime?: string | null;
  onUpdate?: (field: string, value: string | number) => void;
}

const StatusOrderContent: React.FC<StatusOrderProps> = ({
  selectedGuests: propSelectedGuests,
  selectedDate: propSelectedDate,
  selectedTime: propSelectedTime,
  onUpdate
}) => {
  const { onUpdate: contextUpdate } = useBookingUpdate();
  const [selectedGuests, setSelectedGuests] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const bookingDataStorage = JSON.parse(localStorage.getItem('bookingData') || '{}');
    const bookingData = bookingDataStorage[0];
    setSelectedGuests(propSelectedGuests ?? bookingData.selectedGuests ?? null);
    setSelectedDate(propSelectedDate ?? bookingData.selectedDate ?? '');
    setSelectedTime(propSelectedTime ?? bookingData.selectedTime ?? null);
  }, [propSelectedGuests, propSelectedDate, propSelectedTime]);

  // Используем контекстный onUpdate, если он доступен, иначе используем пропс onUpdate
  const handleUpdate = (field: string, value: string | number) => {
    if (contextUpdate) {
      contextUpdate(field, value);
    }
    if (onUpdate) {

      onUpdate(field, value);
    }

    // Обновляем локальное состояние и localStorage
    const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
    switch (field) {
      case 'selectedGuests':
        setSelectedGuests(value as number);
        bookingData.selectedGuests = value;
        break;
      case 'selectedDate':
        setSelectedDate(value as string);
        bookingData.selectedDate = value;
        break;
      case 'selectedTime':
        setSelectedTime(value as string);
        bookingData.selectedTime = value;
        break;
    }
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
  };

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

  const formatTime = (time: string | null) => {
    if (!time) return 'Выберите время'
    const hour = parseInt(time.split(':')[0])
    if (hour === 0) return `${time} (полночь)`
    return time
  }

  const formatPersons = (count: number | null) => {
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
            onChange={(e) => handleUpdate('selectedDate', e.target.value)}
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
            <button
              style={{
                padding: '10px 20px',
                border: '1px solid #6C452B',
                background: '#fff',
                color: '#6C452B',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              onClick={() => setIsCalendarOpen(false)}>Отмена</button>
            <button
              style={{
                padding: '10px 20px',
                border: 'none',
                background: '#6C452B',
                color: '#fff',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              onClick={() => setIsCalendarOpen(false)}>Выбрать</button>
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
                  <h4 className="category-title">{timeCategories.morning.title}</h4>
                <div className="category-times">
                  {category.times.map((time) => (
                    <div
                      key={time}
                      onClick={() => {
                        handleUpdate('selectedTime', time)
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
            <button
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #6C452B',
                background: '#fff',
                color: '#6C452B',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => handleUpdate('selectedGuests', Math.max(1, (selectedGuests ?? 1) - 1))}>-</button>
            <span>{selectedGuests ?? 1}</span>
            <button
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid #6C452B',
                background: '#6C452B',
                color: '#fff',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => handleUpdate('selectedGuests', Math.min(20, (selectedGuests ?? 1) + 1))}>+</button>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              style={{
                padding: '10px 20px',
                border: '1px solid #6C452B',
                background: '#fff',
                color: '#6C452B',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              onClick={() => setIsPersonsOpen(false)}>Отмена</button>
            <button
              style={{
                padding: '10px 20px',
                border: 'none',
                background: '#6C452B',
                color: '#fff',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              onClick={() => setIsPersonsOpen(false)}>Выбрать</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const StatusOrder: React.FC<StatusOrderProps> = (props) => {
  return (
    <BookingUpdateProvider>
      <StatusOrderContent {...props} />
    </BookingUpdateProvider>
  );
};

export default StatusOrder;