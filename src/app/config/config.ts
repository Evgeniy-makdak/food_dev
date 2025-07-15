import { BottomNavItem, TopNavItem } from "../../shared/types/types";
import intro_slide_1 from '../../../public/img/stories/1.png';
import intro_slide_2 from '../../../public/img/stories/2.png';
import intro_slide_3 from '../../../public/img/stories/3.png';
import intro_slide_4 from '../../../public/img/stories/4.png';
import intro_slide_5 from '../../../public/img/stories/5.png';
import intro_slide_6 from '../../../public/img/stories/6.png';
import intro_slide_7 from '../../../public/img/stories/7.png';

import slide_1 from "../../../public/img/stories-img/1.png"
import slide_2 from "../../../public/img/stories-img/2.png"
import slide_3 from "../../../public/img/stories-img/3.png"
export const bottomNavItems: BottomNavItem[] = [
  { id: 'map', icon: 'map', label: 'Рестораны', isActive: true },
  { id: 'booking', icon: 'booking', label: 'Заказы', isActive: false },
  { id: 'baskets', icon: 'baskets', label: 'Корзина', isActive: false },
  { id: 'profile', icon: 'profile', label: 'Профиль', isActive: false }
];

export const topNavItems: TopNavItem[] = [
  { id: 'current', label: 'Текущие', isActive: true },
  { id: 'cancelled', label: 'Отмененные', isActive: false },
  { id: 'completed', label: 'Завершенные', isActive: false },
]

export const topNavMeuItems: TopNavItem[] = [
  { id: 'current', label: 'Обеденное меню', isActive: true },
  { id: 'cancelled', label: 'Холодные закуски', isActive: false },

]

export const topNavMainModalItems: TopNavItem[] = [
  { id: 'discounts', label: 'Скидки в ресторанах', isActive: true },
  { id: 'visit', label: 'Вы посещали', isActive: false },
  { id: 'nearby', label: 'Заведения рядом со мной', isActive: false },
]

export const topNavFilterModalItems: TopNavItem[] = [
  { id: '1', label: 'Особенности', isActive: true },
  { id: '2', label: 'Сеть ресторанов', isActive: false },
  { id: '3', label: 'Ресторанные бренды', isActive: false },
  { id: '4', label: 'Рестораны с наградами', isActive: false },
  { id: '5', label: 'Тип', isActive: false },
  { id: '6', label: 'Счет', isActive: false },
  { id: '7', label: 'Кухня', isActive: false },
  { id: '8', label: 'Метро', isActive: false },
  { id: '9', label: 'Район', isActive: false },
  { id: '10', label: 'Улица', isActive: false },
  { id: '11', label: 'Режим работы', isActive: false },
  { id: '12', label: 'Рейтинг', isActive: false },

]


export const topNavResaurantItems: TopNavItem[] = [
  { id: 'about', label: 'О ресторане', isActive: true },
  { id: 'reviews', label: 'Обзор заведения', isActive: false },
  { id: 'adress', label: 'Адрес', isActive: false },
  { id: 'awards', label: 'Награды', isActive: false },
  { id: 'reviews_users', label: 'Отзывы', isActive: false },
  { id: 'additional_info', label: 'Дополнительная информация', isActive: false },
  { id: 'near', label: 'Заведения рядом', isActive: false },
]

export const descriptionInPhoto: TopNavItem[] = [
  { id: 'interior', label: 'Интерьер ресторана', isActive: true },
  { id: 'window', label: 'Вид из окна', isActive: false },
  { id: 'dishes', label: 'Подача блюд', isActive: false },
  { id: 'guests', label: 'Наши гости', isActive: false },

]


export const stationToColorMap = {
  "Арбат": '#6C277C',
  "Бауманская": '#6C277C',
  "Парк Победы": '#00B894',
  "Тверская": '#F2A900',
  "Чеховская": '#ED1C24',
  "Курская": '#008C5E',
  "Чкаловская": '#008C5E',
  "Китай-город": '#ED1C24',
  "Лубянка": '#ED1C24',
  "Таганская": '#00A8E0',
  "Марксистская": '#00A8E0',
  "Новогиреево": '#FF6600',
  "Белорусская": '#6C277C',
  "Маяковская": '#6C277C',
  "Кузнецкий мост": '#ED1C24',
  "Смоленская": '#6C277C',
  "Кропоткинская": '#008C5E',
  "Чистые пруды": '#ED1C24',
  "Тургеневская": '#ED1C24',
  "Проспект Мира": '#6C277C',
};


export const storiesData = [
  {
    id: 1,
    img: intro_slide_1,
    text: "Рекомендации блогеров",
    slides: [
      { id: '1-1', imageUrl: slide_1, text: 'Story 1 Slide 1' },
      { id: '1-2', imageUrl: slide_2, text: 'Story 1 Slide 2' },
    ]
  },
  {
    id: 2,
    img: intro_slide_2,
    text: "Известные рестораны",

    slides: [
      { id: '2-1', imageUrl: slide_1, text: 'Story 2 Slide 1' },
      { id: '2-2', imageUrl: slide_2, text: 'Story 2 Slide 2' },
      { id: '2-3', imageUrl: slide_3, text: 'Story 2 Slide 3' },
    ]
  },
  {
    id: 3,
    img: intro_slide_3,
    text: "Лучшие по рейтингу",
    slides: [
      { id: '2-1', imageUrl: slide_1, text: 'Story 2 Slide 1' },
      { id: '2-2', imageUrl: slide_2, text: 'Story 2 Slide 2' },
      { id: '2-3', imageUrl: slide_3, text: 'Story 2 Slide 3' },
    ]
  },
  {
    id: 4,
    img: intro_slide_4,
    text: "Топ-5 по отзывам",
    slides: [
      { id: '2-1', imageUrl: slide_1, text: 'Story 2 Slide 1' },
      { id: '2-2', imageUrl: slide_2, text: 'Story 2 Slide 2' },
      { id: '2-3', imageUrl: slide_3, text: 'Story 2 Slide 3' },
      { id: '2-3', imageUrl: slide_3, text: 'Story 2 Slide 3' },
      { id: '2-3', imageUrl: slide_3, text: 'Story 2 Slide 3' },
    ]
  },
  {
    id: 5,
    img: intro_slide_5,
    text: "Обзор заведений",
    slides: [
      { id: '2-1', imageUrl: slide_1, text: 'Story 2 Slide 1' },
      { id: '2-2', imageUrl: slide_2, text: 'Story 2 Slide 2' },
      { id: '2-3', imageUrl: slide_3, text: 'Story 2 Slide 3' },
    ]
  },
  {
    id: 6,
    img: intro_slide_6,
    text: "Обзор подачи блюд",
    slides: [
      { id: '2-1', imageUrl: slide_1, text: 'Story 2 Slide 1' },
      { id: '2-2', imageUrl: slide_2, text: 'Story 2 Slide 2' },
      { id: '2-3', imageUrl: slide_3, text: 'Story 2 Slide 3' },
    ]
  },
  {
    id: 7,
    img: intro_slide_7,
    text: "Панарамные виды",
    slides: [
      { id: '2-1', imageUrl: slide_1, text: 'Story 2 Slide 1' },
      { id: '2-2', imageUrl: slide_2, text: 'Story 2 Slide 2' },
      { id: '2-3', imageUrl: slide_3, text: 'Story 2 Slide 3' },
      { id: '2-3', imageUrl: slide_3, text: 'Story 2 Slide 3' },
      { id: '2-3', imageUrl: slide_3, text: 'Story 2 Slide 3' },
    ]
  },
]

