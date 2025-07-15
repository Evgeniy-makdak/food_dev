import { useRef, useEffect } from 'react';
import "./SliderRestaurantPhoto.scss"

const images = [
  {
    name: "window",
    path: [
      "/img/restaurants/window/1.png",
      "/img/restaurants/window/2.png",
      "/img/restaurants/window/3.png",
      "/img/restaurants/window/4.png"
    ]
  },
  {
    name: "dishes",
    path: [
      "/img/restaurants/dishes/1.png",
      "/img/restaurants/dishes/2.png",
      "/img/restaurants/dishes/3.png",
      "/img/restaurants/dishes/4.png"
    ]
  },
  {
    name: "guests",
    path: [
      "/img/restaurants/guests/1.png",
      "/img/restaurants/guests/2.png",
      "/img/restaurants/guests/3.png",
      "/img/restaurants/guests/4.png"
    ]
  },
  {
    name: "interior",
    path: [
      "/img/restaurants/interior/1.png",
      "/img/restaurants/interior/2.png",
      "/img/restaurants/interior/3.png",
      "/img/restaurants/interior/4.png"
    ]
  },
]

export default function SliderRestaurantPhoto({ category }: { category: string }) {
  const selectedImages = images.find(img => img.name === category)?.path || [];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollRef.current) {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="slider-restaurant-photo" ref={scrollRef}>
      {selectedImages.map((image, index) => (
        <img 
          key={index} 
          src={image} 
          alt={`${category} ${index + 1}`} 
          className="slider-restaurant-photo__image"
        />
      ))}
    </div>
  )
}