import { useState, useRef, useEffect } from 'react'
import './dish-compound.scss'
import { DishCompoundProps } from '../../../types/types'
import { SVG } from '../../svg/SVG'



export default function DishCompound({
  title = "Состав",
  content = "Мясо говяжье, капуста белокачанная бланшированная, укроп, петрушка, крупа рисовая отварная, лук репчатый пассерованный (лук репчатый свежий, масло подсолнечное рафинированное дезодорированное), морковь сухая, соль пищевая, перец черный молотый, перец белый молотый, мята",
  isOpenByDefault = false
}: DishCompoundProps) {
  const [isOpen, setIsOpen] = useState(isOpenByDefault)
  const [maxHeight, setMaxHeight] = useState<string>('0px')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`)
      } else {
        setMaxHeight('0px')
      }
    }
  }, [isOpen])

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section className={`b-page-accordion b-page--mt40 ${isOpen ? 'open' : ''}`}>
      <div className="b-page-accordion-head" onClick={toggleAccordion}>
        <div className="b-page-accordion-head__text">{title}</div>
        <div className="icon--arrow" style={{rotate: '90deg'}}>
          <SVG.ArrowIcon />
        </div>
      </div>
      <div
        ref={contentRef}
        className="b-page-accordion-head-body"
        style={{ maxHeight }}
      >
        <p className="b-page-accordion-head-body__text">
          {content}
        </p>
      </div>
    </section>
  )
}
