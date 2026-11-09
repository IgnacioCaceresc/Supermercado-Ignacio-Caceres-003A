import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Stores from '../pages/Stores';
import Form from '../pages/Form';
import Inventory from '../pages/Inventory';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quienes-somos" element={<About />} />
      <Route path="/nuestras-tiendas" element={<Stores />} />

      <Route path="/ingresar" element={<Form />} />
      <Route path="/inventario" element={<Inventory />} />

      <Route path="/producto/:id" element={<ProductDetail />} />
      <Route path="/carrito" element={<Cart />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
