import { useNavigate } from 'react-router';
import store from '../shared/store';
import { NavItemId } from '../shared/types/types';

const useNavigationHandler = () => {
  const { navBarStore } = store;
  const navigate = useNavigate();

  const getRouteByItemId = (id: NavItemId): string => {
    switch (id) {
      case 'map':
        return '/';
      case 'booking':
        return '/booking';
      case 'baskets':
        return '/baskets'; // Добавим позже
      case 'profile':
        return '/profile'; // Добавим позже
      default:
        return '/';
    }
  };

  const handleItemClick = (id: NavItemId) => {
    navBarStore.setActive(id);
    const route = getRouteByItemId(id);
    navigate(route);
  };

  return {
    handleItemClick,
  };
};

export default useNavigationHandler;