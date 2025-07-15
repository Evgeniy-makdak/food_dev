import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import App from './App.tsx'
import { StoreProvider } from './app/provider/StoreProvider.tsx'
import './features/cartUtils.ts' // Импортируем утилиты корзины для глобального доступа


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
)
