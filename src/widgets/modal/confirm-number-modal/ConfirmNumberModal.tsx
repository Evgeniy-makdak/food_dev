import { useState, useEffect } from "react"
import { Header } from "../.."
import { Modal, SVG } from "../../../shared/ui"
import { ActiveButton } from "../../../shared/ui/button"
import "./ConfirmNumberModal.scss"
import WelcomeModal from "../welcome-modal/WelcomeModal"

export default function ConfirmNumberModal({ isOpen, onClose, phoneNumber }: { isOpen: boolean, onClose: () => void, phoneNumber: string }) {
  const [choosedMethod, setChosenMethod] = useState<string | null>(null)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [code, setCode] = useState(['', '', '', ''])
  const [timer, setTimer] = useState(60) // 60 секунд для обратного отсчета
  const [isOpenWelcomeModal, setIsOpenWelcomeModal] = useState(false)
  useEffect(() => {
    if (isCodeSent) {
      const codeTimer = setTimeout(() => {
        setCode(['1', '2', '3', '4']) // Пример автозаполнения кода
      }, 2000)

      const countdownTimer = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdownTimer)
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)

      return () => {
        clearTimeout(codeTimer)
        clearInterval(countdownTimer)
      }
    }
  }, [isCodeSent])

  const handleMethodChoice = (method: string) => {
    setChosenMethod(method)
  }

  const handleSendCode = () => {
    if (choosedMethod) {
      setIsCodeSent(true)
      setTimer(60) // Сбрасываем таймер при отправке кода
    }

    if (isCodeSent) {
      // Проверяем, что все цифры кода введены
      if (code.every(digit => digit !== '')) {
        // Сохраняем информацию о подтверждении номера в localStorage
        localStorage.setItem('phoneConfirmed', 'true');
        localStorage.setItem('confirmedPhoneNumber', phoneNumber);

        setIsOpenWelcomeModal(true);
        onClose();
      }
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  const renderChooseMethod = () => (
    <>
      <div className="navigation--list">
        <div className="navigation--item active">1</div>
        <div className="navigation--liener"></div>
        <div className="navigation--item">2</div>
      </div>

      <div className="info">
        <h5>Выберите способ подтверждения номера телефона: {phoneNumber}</h5>
        <p>После входа или регистрации вы получите доступ к своим броням и заказам</p>
      </div>

      <div className="choose--list">
        <div
          className={`choose--item ${choosedMethod === 'sms' ? 'active' : ''}`}
          onClick={() => handleMethodChoice('sms')}
        >
          <div className="name">
            <div className="icon">
              <SVG.MessageIcon />
            </div>
            <span>Код из СМС</span>
          </div>
          <div className="reverse">
            <SVG.ArrowIcon size={"18"} />
          </div>
        </div>

        <div
          className={`choose--item ${choosedMethod === 'call' ? 'active' : ''}`}
          onClick={() => handleMethodChoice('call')}
        >
          <div className="name">
            <div className="icon">
              <SVG.PhoneIcon size={"22"} fill="#DB3702" />
            </div>
            <span>Код в звонке</span>
          </div>
          <div className="reverse">
            <SVG.ArrowIcon size={"18"} />
          </div>
        </div>
      </div>
    </>
  )

  const renderCodeInput = () => (
    <>
      <div className="navigation--list">
        <div className="navigation--item"><SVG.isOkIcon /></div>
        <div className="navigation--liener"></div>
        <div className="navigation--item active">2</div>
      </div>

      <div className="info">
        <h5>Мы отправили код номера телефона: {phoneNumber}</h5>

      </div>

      <div className="code-input">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            readOnly
            style={{ background: digit === '' ? '' : 'rgba(219, 55, 2, 0.2)' }}
            className="code-digit"
          />
        ))}
      </div>

      <div className="duble-send">
        {timer > 0 ? (
          <>
            <span>Отправить повторно через</span>
            <b>{formatTime(timer)}</b>
          </>
        ) : (
          <button onClick={handleSendCode} className="resend-button">Отправить код повторно</button>
        )}
      </div>


      <div className="write-mail">
        <div className="header">
          <h5>Если у вас возникли сложности с авторизацией, напишите нам:</h5>
        </div>
        <div className="info">
          <div className="name">
            <div className="icon">
              <SVG.MailIcon />
            </div>
            <span>Электроная почта</span>
          </div>
          <div className="reverse">
            <SVG.ArrowIcon size={"18"} />
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="confirm-number-modal">
        <Header text="" onClose={onClose} />
        <div className="confirm-number">
          <div className="confirm-number--wrapper">
            {isCodeSent ? renderCodeInput() : renderChooseMethod()}
          </div>

          <div className="btn-wrapper--confirm">
            <ActiveButton
              text={isCodeSent ? "Подтвердить" : "Далее"}
              onClick={handleSendCode}
              disabled={!choosedMethod && !isCodeSent}
              style={{
                width: '100%',
                color: '#fff',
                background: choosedMethod ? '#db3702' : '#ccc',
                border: 'none',
              }}
            />
          </div>
        </div>
      </Modal>
      <WelcomeModal isOpen={isOpenWelcomeModal} onClose={onClose} />
    </>

  )
}