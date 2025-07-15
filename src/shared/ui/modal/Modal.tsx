import { useEffect } from 'react'
import './modal.scss'
import { ModalProps } from '../../types/types'



export default function Modal({ isOpen, onClose, children, className = '' }: ModalProps) {

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Блокируем скролл body
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
