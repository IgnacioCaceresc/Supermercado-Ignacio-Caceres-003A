import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InventoryProvider>
      <BrowserRouter basename="/Supermercado-Ignacio-Caceres-003A">
        <App />
      </BrowserRouter>
    </InventoryProvider>
  </React.StrictMode>
);
