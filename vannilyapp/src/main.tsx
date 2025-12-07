import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'remixicon/fonts/remixicon.css';
import './index.css';
import { router } from './App.tsx';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
