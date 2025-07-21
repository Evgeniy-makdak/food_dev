import React, { useEffect, useState } from 'react'
import "./SignIn.scss"
import InputPhone from '../../widgets/input/input-phone/InputPhone'
import { formatPhoneNumber } from '../../shared/lib/formatPhoneNumber';
import { ActiveButton } from '../../shared/ui/button';
import { Header } from '../../widgets';
import ConfirmNumberModal from '../../widgets/modal/confirm-number-modal/ConfirmNumberModal';
import { SVG } from '../../shared/ui';

export default function Auth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isOpenConfirmNumberModal, setIsOpenConfirmNumberModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    // Получаем номер телефона из localStorage
    const storedPhoneNumber = localStorage.getItem('confirmedPhoneNumber');
    if (storedPhoneNumber) {
      // No need to parse JSON, just use the string directly
      setPhoneNumber(formatPhoneNumber(storedPhoneNumber));
    }
  }, []);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
  }

  useEffect(() => {
    setIsFormValid(phoneNumber.length > 0);
  }, [phoneNumber]);

  return (
    <>
      <div className='auth'>
        <div className="header">
          <Header text='' />
        </div>
        <div className="auth--wrapper">
          <div className="icon--wrapper">
            <div className="icon-logo">
              {/* <SVG.ProfileIcon size={60} /> */}
            </div>
          </div>

          <div className="title">
            <h5>Войдите или зарегистрируйтесь</h5>
            <p>После входа или регистрации вы получите доступ к своим броням и заказам</p>
          </div>
          <form action="">
            <div className="input--number">
              <InputPhone
                value={phoneNumber}
                onChange={handlePhoneChange}
              />
            </div>

            <div className="confirmation">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span>Выбирая способ авторизации, я принимаю условия <a href="">Пользовательского соглашения</a> и <a href="">Политики конфедициальности</a></span>
              </label>
            </div>
            <div className="btn-wrapper--signin">
              <ActiveButton
                text={"Войти"}
                onClick={() => {
                  setIsOpenConfirmNumberModal(true)
                }}
                style={{
                  width: '100%',
                  color: '#fff',
                  background: '#db3702',
                  border: 'none',
                }}
                disabled={!isFormValid || !isChecked}
              />
            </div>
          </form>
          <span className='or'>или</span>
          <div className="alternative--list">
            <button className='alternative--btn btn--default'>
              <div className="icon"><SVG.VKIcon /></div>
              <span>В контакте</span>
            </button>
            <button className='alternative--btn btn--default'>
              <div className="icon"><SVG.YAIcon /></div>
              <span>Яндекс ID</span>
            </button>
            <button className='alternative--btn btn--default'>
              <div className="icon"><img src="./services.png" alt="img" /></div>
              <span>Госуслуги</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmNumberModal isOpen={isOpenConfirmNumberModal} onClose={() => setIsOpenConfirmNumberModal(false)} phoneNumber={phoneNumber} />
    </>
  )
}