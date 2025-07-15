import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import './order-food.scss'
import { observer } from 'mobx-react-lite'
import { LinkAction } from '../../../shared/ui'
import { ActiveButton } from '../../../shared/ui/button'
import CancelOrder from '../../cancel-order/CancelOrder'
import MapRestaurnatInfo from '../../map/map-restaurant-info/MapRestaurnatInfo'
import { Restaurant } from '../../../shared/types/types'


const OrderFood = observer(({ isOrderSubmitted, activeTab, setActiveTab, restaurant }: { isOrderSubmitted: boolean, activeTab: string, setActiveTab: React.Dispatch<React.SetStateAction<string>>, restaurant: Restaurant | null }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [wishes, setWishes] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const navigate = useNavigate();

  useEffect(() => {
    const savedWishes = localStorage.getItem('wishes')
    if (savedWishes) {
      setWishes(savedWishes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishes', wishes)
  }, [wishes])

  useEffect(() => {
    const loadBookingData = () => {
      const storedBookingData = localStorage.getItem('bookingData')
      if (storedBookingData) {
        const bookingData = JSON.parse(storedBookingData)
        setComment(bookingData.comment || '')
      }
    }

    loadBookingData()
    // Добавляем слушатель для отслеживания изменений в localStorage
    window.addEventListener('storage', loadBookingData)

    return () => {
      window.removeEventListener('storage', loadBookingData)
    }
  }, [])

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value
    setComment(newComment)

    // Обновляем comment в bookingData в localStorage
    const storedBookingData = localStorage.getItem('bookingData')
    if (storedBookingData) {
      const bookingData = JSON.parse(storedBookingData)
      bookingData.comment = newComment
      localStorage.setItem('bookingData', JSON.stringify(bookingData))
    }
  }
  // const handleRedirectToMenu = () => {
  //   navBarStore.setActive('menu');
  //   navigate('/menu');
  // };



  const handleCancelConfirm = () => {
    // После отмены заказа перенаправляем на главную страницу
    navigate('/')
  }
  return (
    <section>
      <div className="">

        <div className="b-page-box b-page-box--big">
          <div className="b-page-box__title"><b>Пожелания</b></div>
          <div className="b-page-box-line"></div>
          <textarea
            className="b-page-box__subtittle b-page-box__subtittle--opacity70"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Введите ваши пожелания"
            rows={3}
            disabled={isOrderSubmitted}
            style={{ width: '100%', border: 'none', resize: 'none', background: 'transparent' }}
          />
        </div>

        <div className="mt-32">

          <MapRestaurnatInfo restaurant={restaurant} />
        </div>


        <div className="links--action b-page--mt48">

          {(activeTab !== 'cancelled') &&
            <ActiveButton
              text='Отмена'
              style={{
                color: '#fff',
                background: '#6C452B',
                border: 'none',
                width: '100%',
              }}
              onClick={() => {

                setIsCancelModalOpen(!isCancelModalOpen)
              }}
            />
          }

          {
            activeTab === 'cancelled' && (
              <ActiveButton
                text='Забронировать снова'
                style={{
                  color: '#fff',
                  background: '#6C452B',
                  border: 'none',
                  width: '100%',
                }}
                onClick={() => {
                  window.scrollTo(0, 0);
                  setActiveTab('current')

                }}
              />
            )
          }



          <LinkAction
            text='Позвонить в ресторан'
            to='tel:+9876373737'
            style={
              {
                color: '#6C452B',
                background: '#fff',
                border: '1px solid #6C452B',
              }} />
        </div>

        {/* Модальное окно отмены */}
        <CancelOrder
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleCancelConfirm}
        />


      </div>
    </section>

  )
})
export default OrderFood
