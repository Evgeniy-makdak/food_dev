import React, { useEffect, useState } from "react";
import { Header, StatusOrder } from "../..";
import { Modal, SVG } from "../../../shared/ui";
import Info from "../../booking/info/Info";
import "./BookingConfirmModal.scss";
import { ActiveButton } from "../../../shared/ui/button";
import { useNavigate } from "react-router";
import { formatPhoneNumber } from "../../../shared/lib/formatPhoneNumber";
import InputPhone from "../../input/input-phone/InputPhone";
import { InputName } from "../../input/input-name/InputName";
import { Restaurant } from "../../../shared/types/types";

interface BookingConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant; // Замените 'any' на более конкретный тип, если он у вас определен
  selectedHall: string;
  selectedGuests: number | null; // Изменено с number | null на number | undefined
  selectedDate: string; // Изменено с Date на string
  selectedTime: string | null;
  onUpdate: (field: string, value: string | number) => void;
}

export default function BookingConfirmModal({
  isOpen,
  onClose,
  restaurant,
  selectedHall,
  selectedGuests,
  selectedDate,
  selectedTime,
  // onUpdate
}: BookingConfirmModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Получаем данные из localStorage
    const storedBookingData = localStorage.getItem('bookingData');
    if (storedBookingData) {
      const bookingData = JSON.parse(storedBookingData);
      if (bookingData.phoneNumber) setPhoneNumber(bookingData.phoneNumber);
      if (bookingData.name) setName(bookingData.name);
      if (bookingData.comment) setComment(bookingData.comment);
    }
    const phone = localStorage.getItem('confirmedPhoneNumber');
    if (phone) {
      setPhoneNumber(phone);
    }
  }, []);

  useEffect(() => {
    setIsFormValid(phoneNumber.length > 0 && name.length > 0);
  }, [phoneNumber, name]);

  // const handleUpdate = (field: string, value: string | number) => {
  //   onUpdate(field, value);
  // }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }

  const handleBooking = () => {
    const newBooking = {
      id: Date.now().toString(), // Уникальный идентификатор для каждого заказа
      restaurantId: restaurant.id,
      selectedHall,
      selectedGuests,
      selectedDate,
      selectedTime,
      phoneNumber,
      name,
      comment,
      status: 'current',
      createdAt: new Date().toISOString(),
    };

    // Получаем существующие заказы из localStorage
    let existingBookings = [];
    try {
      const storedData = localStorage.getItem('bookingData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Ensure existingBookings is an array
        existingBookings = Array.isArray(parsedData) ? parsedData : [];
      }
    } catch (error) {
      console.error('Error parsing bookingData from localStorage:', error);
      // If there's an error, use an empty array
      existingBookings = [];
    }

    // Добавляем новый заказ к существующим
    const updatedBookings = [newBooking, ...existingBookings];

    // Сохраняем обновленный массив заказов в localStorage
    localStorage.setItem('bookingData', JSON.stringify(updatedBookings));

    // Сохраняем номер телефона как confirmedPhoneNumber
    localStorage.setItem('confirmedPhoneNumber', phoneNumber);

    const isPhoneConfirmed = localStorage.getItem('phoneConfirmed');

    onClose();

    if (isPhoneConfirmed) {
      // Если номер подтвержден, перенаправляем на страницу бронирования
      navigate('/booking', { replace: true });
    } else {
      // Этот блок теперь не будет выполняться, но оставим его на всякий случай
      navigate('/signin', { replace: true });
    }
  }

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('ru-RU', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   });
  // };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose()} // Изменено здесь
      className="booking-confirm-modal"
    >
      <Header text="Подтвердите бронь" onClose={onClose} />
      <div className="booking-confirm">
        <Info name={restaurant?.name} addres={restaurant?.address} />
        <StatusOrder
          selectedGuests={selectedGuests}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onUpdate={(field) => {
            // Здесь вы можете обновить соответствующее состояние
            // Например:
            if (field === 'selectedGuests') {
              // onUpdate('selectedGuests', value as number);
            } else if (field === 'selectedDate') {
              // onUpdate('selectedDate', value as string);
            } else if (field === 'selectedTime') {
              // onUpdate('selectedTime', value as string);
            }
          }}
        />

        <div className="note">
          <div className="header">
            <h5 className="title">
              Примечания для этого ресторана
            </h5>
            <div className="time">
              <SVG.TimeIcon size="19" color="#071F2B" />
              <p>15-минутный льготный период</p>
            </div>
          </div>
          <div className="info">
            <p>
              Пожалуйста, позвоните в ресторан, если вы опаздываете или изменились планы
            </p>
          </div>
        </div>
        <div className="input-field">
          <form>
            <InputPhone
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
            <InputName
              value={name}
              onChange={handleNameChange}
            />
          </form>
        </div>

        <div className="comment">
          <div className="header">
            <h5>Комментарий ресторану</h5>
          </div>
          <div className="input-comment">
            <form>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                cols={12}
              />
            </form>
          </div>
        </div>

      </div>

      <div className="btn-comfirm--wrapper">
        <p>Выбран столик <b>№ T9</b></p>
        <ActiveButton
          text={"Забронировать"}
          onClick={handleBooking}
          disabled={!isFormValid}
          style={{
            width: '100%',
            color: '#fff',
            background: '#db3702',
            border: 'none',
          }}
        />
      </div>
    </Modal>
  )
}