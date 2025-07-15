import React, { useEffect, useState, useRef } from 'react';
import { SVG } from '../../../shared/ui';
import './MainRestaurantModal.scss';
import StoriesPanel from '../../stories-panel/StoriesPanel';
import SliderHeader from '../../sliders/slider-header/SliderHeader';
import { topNavMainModalItems } from '../../../app/config/config';
import InputSearch from '../../../shared/ui/input/InputSearch';
import { observer } from 'mobx-react-lite';
import { RestaurantCard } from '../..';
import SearchModal from '../search-modal/SearchModal';
import StoriesModal from '../story-modal/StoryModal';

const MainRestaurantModal = observer(({ stories, restaurants }: { stories: any[], restaurants: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullOpen, setIsFullOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const [activeTab, setActiveTab] = useState('discounts');
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const startModalPosition = useRef(0);
  const [isOpenStoryPanel, setIsOpenStoryPanel] = useState(false);
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const isCloseModal = () => {
    setIsOpenSearch(false);
  }

  const handleOpenStory = (storyId: number) => {
    console.log('Opening story with ID:', storyId);
    setSelectedStory(storyId);
    setIsOpenStoryPanel(true);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    startModalPosition.current = 0;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (diff > 50) {
      if (!isOpen) {
        setIsOpen(true);
      } else if (!isFullOpen) {
        setIsFullOpen(true);
      }
    } else if (diff < -50) {
      if (isFullOpen) {
        setIsFullOpen(false);
      } else if (isOpen) {
        setIsOpen(false);
      }
    }

    touchStartY.current = null;
  };



  return (
    <>
      <SearchModal onClose={isCloseModal} isOpen={isOpenSearch} />

      <div
        className={`modal ${isOpen ? 'open' : ''} ${isFullOpen ? 'full-height' : ''}`}
        ref={modalRef}

      >
        <div
          className="header-line--wrapper"
          onClick={toggleOpen}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="header-line"

          ></div>
        </div>

        <div
          className="modal--wrapper"
          ref={contentRef}
          style={{ overflowY: isOpen ? 'auto' : 'hidden' }}
        >
          <div className="header-panel">
            <div className="city">
              <p className="city__name">Москва</p>
              <div className="rotete-270">
                <SVG.ArrowIcon />
              </div>
            </div>
            <div className="notification">
              <SVG.NotificationIcon />
            </div>
          </div>

          <div className="stories-panel">
            <StoriesPanel
              stories={stories}
              setIsOpenStoryPanel={setIsOpenStoryPanel}
              setSelectedStory={handleOpenStory}
            />
          </div>

          <div className="search-panel" onClick={() => setIsOpenSearch(true)}>
     
              <InputSearch
                // setIsOpen={()=> setIsOpenSearch(true)}
                // onChange={() => setIsOpenSearch(true)}
                disabled={true}
                label='Название, метро, район, кухня, блюдо'
              />
        



          </div>

          <div className="category-panel">
            <SliderHeader data={topNavMainModalItems} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          {/* Ваш контент здесь */}

          <div className="restaurant-cards">
            {restaurants && restaurants.map((restaurant) => (
              <a href={`/restaurants/${restaurant.id}`}>
                <RestaurantCard item={restaurant} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <StoriesModal
        isOpen={isOpenStoryPanel}
        onClose={() => {
          console.log('Closing StoriesModal');
          setIsOpenStoryPanel(false);
          setSelectedStory(null);
        }}
        id={selectedStory}
      />
    </>
  );
})

export default MainRestaurantModal;


