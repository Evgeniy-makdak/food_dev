import React, { useState } from "react";
import { Input } from "../../../shared/ui";

export default function BasketComment() {
  const [comment, setComment] = useState(() => {
    const bookingData = localStorage.getItem('bookingData')
    if (bookingData) {
      const parsedData = JSON.parse(bookingData)
      return parsedData[0].comment || ''
    }
    return ''
  })
  

  // Сохраняем комментарий в localStorage с дебаунсингом
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     localStorage.setItem('orderComment', comment)
  //   }, 500) // 500мс задержка для комментария

  //   return () => clearTimeout(timer)
  // }, [comment])

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleClearComment = () => {
    setComment("")
  }

  return (
    <section>
      <div className="b-page-box b-page--mt32 b-page-box--middle">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className="b-page__commment-tittle"> <b>Комментарий ресторану</b></p>
          {comment && (
            <button
              onClick={handleClearComment}
              style={{
                background: 'none',
                border: 'none',
                color: '#666',
                fontSize: '12px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Очистить
            </button>
          )}
        </div>
        <div className="b-page-box-line b-page-box-line--small8"></div>
        <div className="b-page-input-comment" style={{ position: 'relative' }}>
          <Input
            type="text"
            className="b-page-search__input"
            style={{
              border: "none",
              borderRadius: "12px",
              height: "48px",
              padding: "0 16px",
              background: "#F4F4F4",
              width: "100%"
            }}
            value={comment}
            onChange={handleCommentChange}
            disabled={false}
            text="Напишите комментарий для ресторана..."
          />
        </div>
      </div>
    </section>
  )
}

