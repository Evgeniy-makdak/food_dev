import { useState } from 'react'
import Modal from '../../shared/ui/modal/Modal'
import { cartUtils } from '../../features/cartUtils'
import { useCart } from '../../features'
import { CancelOrderProps } from '../../shared/types/types'


export default function CancelOrder({ isOpen, onClose, onConfirm }: CancelOrderProps) {
  const { clearCart } = useCart()
  const [selectedReason, setSelectedReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const reasons = [
    'Поменялись планы',
    'Выбрал другой ресторан',
    'Не дождался подтверждения',
    'Другое'
  ]

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason)
  }

  const handleCancel = async () => {
    if (!selectedReason) {
      alert('Пожалуйста, выберите причину отмены')
      return
    }

    setIsSubmitting(true)

    try {
      // Отменяем заказ (сохраняем в историю и обновляем статус)
      cartUtils.cancelCurrentOrder(selectedReason)

      // Обновляем статус бронирования на "cancelled"
      const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}')
      bookingData[0].status = 'cancelled'
      localStorage.setItem('bookingData', JSON.stringify(bookingData))

      clearCart()
      
      // Показываем уведомление
      alert('Бронирование отменено и перемещено в раздел "Отмененные"')

      // Вызываем callback если передан
      if (onConfirm) {
        onConfirm()
      }

      // Закрываем модальное окно
      onClose()

      // Сбрасываем выбранную причину
      setSelectedReason('')

    } catch (error) {
      console.error('Ошибка при отмене заказа:', error)
      alert('Произошла ошибка при отмене бронирования')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setSelectedReason('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="cancel-order-modal">
      <div className="cause" style={{ padding: '20px' }}>
        <div className="cause__tittle" style={{
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#333'
        }}>
          Причина отмены
        </div>

        <div className="b-page-box b-page-box--middle">
          {reasons.map((reason, index) => (
            <div key={reason}>
              <div className="b-page-box-flex" style={{
                padding: '16px 0',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div className="b-page-box-flex-wrap">
                  <p className="b-page-box__cause-text" style={{
                    margin: 0,
                    fontSize: '16px',
                    color: '#333'
                  }}>
                    {reason}
                  </p>
                </div>
                <div className="b-page-radio">
                  <input
                    type="radio"
                    id={`cause${index + 1}`}
                    name="cause"
                    checked={selectedReason === reason}
                    onChange={() => handleReasonChange(reason)}
                    style={{
                      width: '20px',
                      height: '20px',
                      accentColor: '#6C452B'
                    }}
                  />
                  <label htmlFor={`cause${index + 1}`} style={{ marginLeft: '8px' }}></label>
                </div>
              </div>
              {index < reasons.length - 1 && (
                <div className="b-page-box-line" style={{
                  height: '1px',
                  backgroundColor: '#e0e0e0',
                  margin: '0'
                }}></div>
              )}
            </div>
          ))}
        </div>

        <div className="cause-bottom" style={{
          marginTop: '32px',
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            style={{
              padding: '12px 24px',
              border: '1px solid #6C452B',
              background: '#fff',
              color: '#6C452B',
              borderRadius: '8px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              opacity: isSubmitting ? 0.6 : 1
            }}
          >
            Назад
          </button>

          <button
            onClick={handleCancel}
            disabled={!selectedReason || isSubmitting}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: !selectedReason || isSubmitting ? '#ccc' : '#d32f2f',
              color: '#fff',
              borderRadius: '8px',
              cursor: !selectedReason || isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {isSubmitting ? 'Отменяем...' : 'Отменить бронирование'}
          </button>
        </div>
      </div>
    </Modal>
  )
}