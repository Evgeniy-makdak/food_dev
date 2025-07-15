import { useState, useEffect } from "react";
import { Modal } from "../../../shared/ui";
import { useNavigate } from "react-router-dom";
import "./WelcomeModal.scss"

export default function WelcomeModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void}) {
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Получаем имя пользователя из localStorage
      const storedUserData = localStorage.getItem('bookingData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setUserName(userData.name || "");
      }

      // Устанавливаем таймер на 2 секунды только когда модальное окно открыто
      const timer = setTimeout(() => {
        onClose(); // Закрываем модальное окно
        navigate('/booking'); // Выполняем редирект на страницу бронирования
      }, 2000);

      // Очищаем таймер при закрытии модального окна или размонтировании компонента
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, navigate]);

  return (
    <Modal isOpen={isOpen} className="welcome-content" onClose={onClose} >
      <div className="welcome">
        <div className="info">
          <div className="icon"></div>
          <p>
            {userName
              ? `Добро пожаловать, ${userName}!`
              : "Добро пожаловать!"
            }
          </p>
        </div>
      </div>
    </Modal>
  )
}