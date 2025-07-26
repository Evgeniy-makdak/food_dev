// Перечисления
export type NavItemId = 'map' | 'booking' | 'baskets' | 'profile';

export enum LunchMenuInfoType {
  Violet = 'violet',
  Rose = 'rose',
  Green = 'green'
}

export type OrderStatus = 'current' | 'submitted' | 'cancelled' | 'completed';


export type RestaurantStatus = "waiting" | "cancelled" | "completed";

export interface Award {
  id: number
  name: string;
  year: number;
  img: string;
}

// Интерфейсы для навигации
export interface BottomNavItem {
  id: NavItemId;
  icon: string;
  label: string;
  isActive: boolean;
}
export interface ReviewAuthor {
  id: number;
  name: string;
  avatar: string | null;
}

export interface Review {
  id: number;
  author: ReviewAuthor;
  rating: number;
  comment: string;
  date: string; // формат даты: YYYY-MM-DD
  avatar: string;
  photos: string[];
}
export interface TopNavItem {
  id: string;
  label: string;
  isActive: boolean;
}

// Интерфейсы для меню
export interface LunchMenuInfoItem {
  text: string;
  type: LunchMenuInfoType;
}

export interface LunchMenuItem {
  title: string;
  subtitle: string;
  info: LunchMenuInfoItem[];
  price: string;
}

// Интерфейсы для корзины
export interface BasketItem {
  title: string;
  subtitle: string;
  price: string;
}

export interface ExtendedBasketItem extends BasketItem {
  id: string;
  quantity: number;
  basePrice: number;
  image: string;
}

export interface CartItem {
  restaurantId: number;
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image: string;
  addedAt: string;
}

// Интерфейсы для компонентов
export interface CurrentButtonProps {
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
}

export interface DishCompoundProps {
  title?: string;
  content?: string;
  isOpenByDefault?: boolean;
}

export type TabType = 'nutrition' | 'allergens';

export interface TabItem {
  id: TabType;
  label: string;
  isActive: boolean;
}

export interface MenuCardProps {
  item: any;
  additionalParams?: string;
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, newQuantity: number) => void;
}

// Интерфейс для заказа
export interface Order {
  id: string;
  items: CartItem[];
  comment?: string;
  booking?: {
    date: string;
    time: string;
    persons: number;
  };
  status: OrderStatus;
  cancelReason?: string | null;
  createdAt: string;
  updatedAt?: string;
}

// Интерфейсы для различных пропсов компонентов
export interface ButtonCloseProps {
  redirectTo?: NavItemId;
  onClick?: () => void;
}

export interface LikeButtonProps {
  initialLiked?: boolean;
  onLikeChange?: (isLiked: boolean) => void;
}

export interface InputProps {
  type: string;
  className: string;
  style: React.CSSProperties;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  text: string;
}

export interface ModalProps {
  isOpen: boolean | undefined;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface StatusProps {
  status?: RestaurantStatus;
}

export interface CustomSwiperProps {
  images: string[];
}

export interface AddToCardProps {
  quantity?: number;
  totalPrice?: number;
  onAddToCart?: () => void;
  dishData?: {
    id: string;
    title: string;
    price: number;
    image: string;
    restaurantId: number;
  };
}

export interface BasketActionHeaderProps {
  items: ExtendedBasketItem[];
  totalItems?: number;
  totalPrice?: number;
  clearCart?: any;
}

export interface BasketButtonActionProps {
  totalPrice?: number;
  totalItems?: number;
}

export interface BasketCardsProps {
  items: ExtendedBasketItem[];
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, newQuantity: number) => void;
}

export interface CancelOrderProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export interface DishCardProps {
  quantity?: number;
  totalPrice?: number;
  onQuantityChange?: (newQuantity: number) => void;
  dishData?:Dish | null;
}

export interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishData?: Dish | null;
  restaurantData?: Restaurant | null;
  nutrition?: Nutrition[];
  allergens?: string[];
}

export interface HeaderProps {
  additionalIcon?: string;
  onClose?: () => void;
  text?: string;
}

export interface MenuCardsProps {
  searchQuery?: string;
  menuItems: Dish[];
  restaurant?: Restaurant;
}

export interface OrderCompositionProps {
  items: CartItem[];
  totalItems: number;
}

export interface OrderItemsListProps {
  items: CartItem[];
}

export interface OrderTotalPayProps {
  totalPrice: number;
}

export interface SearchFieldProps {
  value: string;
  onChange: (query: string) => void;
}

export interface SliderHeaderProps {
  data: TopNavItem[];
  onTabChange?: (tabId: string) => void;
}

export interface StatusRestaurantsProps {
  status?: RestaurantStatus;
  activeTab?: string;
  bookingData?: BookingData; // Здесь лучше определить конкретный тип
}
export interface NavigationTabsProps {
  items: TopNavItem[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}


// Интерфейсы для блюд и ресторанов
export interface Nutrition {
  name: string;
  value: number;
}

export interface Rating {
  value: number;
  count: number;
}

export interface Dish {
  id: number | string;
  title: string;
  position: string;
  price: number;
  rating: Rating;
  compound: string;
  allergens: string[];
  nutrition: Nutrition[];
  time: number;
}

export interface WorkingTime {
  open_time: string;
  close_time: string;
  saturday: boolean;
  sunday: boolean;
}

export interface RestaurantRating {
  total: number;
  ya: number;
  gis: number;
}

export interface MapPosition {
  l: string;
  t: string;
}

export interface Coords {
  lat: number;
  lng: number;
}

export interface Restaurant {
  id: number;
  name: string;
  category: string;
  category_eat: string;
  working_time: WorkingTime;
  rating: RestaurantRating;
  average_price: number;
  map_position: MapPosition;
  title_eats: string[];
  metro_station: string[];
  description: string;
  address: string;
  coords: Coords;
  phone_number: string;
  menu: number[];
  special_offers: number[]; // Исправлена опечатка
  awards: number[];
  reviews: number[];
  images: string[];
  nearby_places: number[];
}

export interface BookingData {
  restaurantId: number;
  selectedHall: string;
  selectedGuests: number;
  selectedDate: string;
  selectedTime: string;
  phoneNumber: string;
  name: string;
  comment?: string;
  status: string;
  id: number; // Missing 'id' property
}