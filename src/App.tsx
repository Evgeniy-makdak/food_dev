
import { RouterProvider } from 'react-router'
import './App.css'
import router from './app/router/router'
import { CartProvider } from './features/CartContext'

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}

export default App
