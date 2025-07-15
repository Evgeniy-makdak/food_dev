import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cube';
import './StoryModal.scss';
import { Modal, SVG } from '../../../shared/ui';
import { storiesData } from '../../../app/config/config';

interface Slide {
  id: string;
  imageUrl: string;
  text: string;
}

interface Story {
  id: number;
  img: string;
  text: string;
  slides: Slide[];
}

export default function StoriesModal({ isOpen, onClose, id }: { isOpen: boolean, onClose: () => void, id: number | null }) {
  const [story, setStory] = useState<Story | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const storySwiperRef = useRef<SwiperType | null>(null);
  const progressIntervalRef = useRef<any>(null);
  const SLIDE_DURATION = 5000;
  useEffect(() => {
    if (isOpen && id !== null) {
      const selectedStory = storiesData.find(s => s.id === id);
      if (selectedStory) {
        setStory(selectedStory);
        setActiveSlideIndex(0);
        setTimeout(() => {
          storySwiperRef.current?.slideTo(0);
          startProgressAnimation();
        }, 100);
      }
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setStory(null);
      setActiveSlideIndex(0);
    }
  }, [isOpen, id]);

  const handleSlideChange = (swiper: SwiperType) => {
    if (isOpen) {
      setActiveSlideIndex(swiper.realIndex);
      startProgressAnimation();
    }
  };

  const handleSlideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isOpen || !story) return;

    const clickX = event.nativeEvent.offsetX;
    const elementWidth = (event.target as HTMLDivElement).offsetWidth;

    if (clickX < elementWidth / 2) {
      storySwiperRef.current?.slidePrev();
    } else {
      if (storySwiperRef.current?.isEnd) {
        onClose();
      } else {
        storySwiperRef.current?.slideNext();
      }
    }
  };

  const startProgressAnimation = () => {
    if (!isOpen || !story) return;

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
      if (index < activeSlideIndex) {
        (bar as HTMLElement).style.width = '100%';
      } else if (index === activeSlideIndex) {
        (bar as HTMLElement).style.width = '0%';
      } else {
        (bar as HTMLElement).style.width = '0%';
      }
    });

    let progress = 0;
    progressIntervalRef.current = setInterval(() => {
      if (!isOpen) {
        clearInterval(progressIntervalRef.current!);
        return;
      }
      progress += 1;
      if (progress > 100) {
        clearInterval(progressIntervalRef.current!);
        handleSlideClick({ nativeEvent: { offsetX: Number.MAX_SAFE_INTEGER } } as React.MouseEvent<HTMLDivElement>);
      } else {
        (progressBars[activeSlideIndex] as HTMLElement).style.width = `${progress}%`;
      }
    }, 50);
  };

  useEffect(() => {
    if (isOpen && story) {
      startProgressAnimation();
    }
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isOpen, activeSlideIndex, story]);

  if (!story) return null;

  return (
    <Modal onClose={onClose} isOpen={isOpen} className='story-modal'>
      <div className="stories-container">
        <Swiper
          modules={[EffectCube, Autoplay]}
          effect={'slide'}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            storySwiperRef.current = swiper;
          }}
          autoplay={{
            delay: SLIDE_DURATION,
            disableOnInteraction: false,
          }}
        >
          {story.slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="story-slide"
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
                onClick={handleSlideClick}
              >
                <div className="header">
                  <div className="info">
                    <div
                      className="icon-intro-logo"
                      style={{ backgroundImage: `url(${story.img})` }}
                    ></div>
                    <h5>{story.text}</h5>
                  </div>
                  <button className='btn--default' onClick={onClose}>
                    <SVG.CloseIcon fill="#071F2B" />
                  </button>
                </div>
                {/* <div className="story-text">{slide.text}</div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="story-progress">
          {story.slides.map((_, index) => (
            <div key={index} className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}