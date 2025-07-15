import { createBrowserRouter } from "react-router";
import { Booking, Layout, Menu, Basket, Order, PayInfo } from "../../pages";
import Map from "../../widgets/map/Map";
import Resaurant from "../../pages/restaurants/id/Resaurant";
import SignIn from "../../pages/signin/SignIn";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {

        path: "booking",
        element: <Booking />,
      },
      {
        index: true,
        element: <Map />,
      },


      {
        path: "profile",
        element: <div>Профиль - страница в разработке</div>,
      },
    ]
  },

  {
    path: "baskets",
    element: <Basket />,
  },
  {
    path: "restaurants/:id",
    element: <Resaurant />
  },
  {
    path: "order",
    element: <Order />,
  },
  {
    path: "foods/:id",
    element: <Menu />,
  },
  {
    path: "pay",
    element: <PayInfo />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
]);

export default router;
