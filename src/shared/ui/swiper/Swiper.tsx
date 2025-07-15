import { memo, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.scss'
import { CustomSwiperProps } from '../../types/types';



const CustomSwiper = memo(({ images }: CustomSwiperProps) => {
  // Мемоизируем слайды
  const slides = useMemo(() =>
    images.map((image, index) => (
      <SwiperSlide key={`${image}-${index}`}>
        <img
          className='slide'
          src={image}
          alt={`slide-${index}`}
          loading="lazy"
        />
      </SwiperSlide>
    )), [images]
  )

  // Мемоизируем конфигурацию
  const swiperConfig = useMemo(() => ({
    pagination: {
      dynamicBullets: true,
    },
    modules: [Pagination],
    spaceBetween: 0,
    slidesPerView: 1,
    lazy: "true",
  }), [])

  return (
    <Swiper {...swiperConfig}>
      {slides}
    </Swiper>
  )
})

CustomSwiper.displayName = 'CustomSwiper'

export default CustomSwiper
