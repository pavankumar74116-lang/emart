import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './singles/context/CartContext.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
  </BrowserRouter>
)
