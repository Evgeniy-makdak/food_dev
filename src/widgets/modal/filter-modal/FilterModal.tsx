import React from 'react'
import Header from '../../header/Header'
import { Modal } from '../../../shared/ui'
import './FilterModal.scss'
import InputSearch from '../../../shared/ui/input/InputSearch';
import { observer } from 'mobx-react-lite';
// import SliderHeader from '../../slider-header/SliderHeader';
import store from '../../../shared/store';
import SliderHeader from '../../sliders/slider-header/SliderHeader';
import { topNavFilterModalItems } from '../../../app/config/config';
import { ActiveButton } from '../../../shared/ui/button';


const FilterModal = observer(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { restaurantsPeculiaritiesStore } = store;
  const [activeTab, setActiveTab] = React.useState('1')
  const [isOked, setIsOked] = React.useState(false)
  const [searchText, setSearchText] = React.useState('');
  console.log(isOked)


  const filteredPeculiarities = restaurantsPeculiaritiesStore.restaurantsPeculiarities.filter(
    item => item.name.toLowerCase().includes(searchText.toLowerCase())
  );



  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className='filter--modal'>
        <Header text={"Фильтры"} onClose={onClose} />
        <div className="filter--modal--wrapper">
          <InputSearch label={"Поиск"} onChange={setSearchText} value={searchText} />
          <div className="slider-header">

            <SliderHeader data={topNavFilterModalItems} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="filter--modal__items">
            {
              filteredPeculiarities.map((item, index) => (
                <div key={index} className="filter--modal__item">
                  <label htmlFor={String(item.id)}>
                    <p>{item.name}</p>
                    <input type="checkbox" id={String(item.id)} name={String(item.id)} />
                  </label>
                </div>
              ))}
          </div>

        </div>
        <div className="btn-wrapper--filter">
          <ActiveButton
            text={"Применить"}

            onClick={() => {
              setIsOked(true)
              onClose()
            }}
            // onClick={() => handleItemClick('orders')}
            style={{
              width: '100%',
              color: '#fff',
              background: '#db3702',
              border: 'none',
            }} />
          <ActiveButton
            onClick={onClose}
            text={"Отменить"}
            style={{
              width: '100%',
              color: '#db3702',
              background: '#fff',
              border: '1px solid #db3702',

            }} />

        </div>

      </div>
    </Modal>

  )
})
export default FilterModal;
