import './slider-header.scss'
import {  TopNavItem } from '../../../shared/types/types'




export default function SliderHeader({data, activeTab, setActiveTab }: {data: TopNavItem[], activeTab: string, setActiveTab: React.Dispatch<React.SetStateAction<string>> }) {

  return (
    <div className="b-page-slider">
      {data.map((item: TopNavItem) => (
        <div
          key={item.id}
          className={`b-page-slider__item ${activeTab === item.id ? 'b-page-slider__item--active' : ''}`}
          onClick={() => setActiveTab(item.id)}
          style={{ cursor: 'pointer' }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
