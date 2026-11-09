# Supermercado Caserita - Gestión de Inventario

Aplicación web desarrollada con React, React Router DOM, Context API y Tailwind CSS para la gestión de inventario y carrito de compras de un supermercado.

## Estructura del Proyecto

- `public/img/`: Carpeta donde se almacenan las imágenes de los productos.
- `src/components/`: Componentes reutilizables (`Navbar`, `Footer`, `ProductCard`, `CartItem`).
- `src/context/`: Estado global con Context API y `useReducer` (`InventoryContext`, `inventoryReducer`).
- `src/data/`: Datos iniciales del inventario (`mockInventory.js`).
- `src/pages/`: Vistas de la aplicación (`Home`, `About`, `Stores`, `Form`, `Inventory`, `ProductDetail`, `Cart`).
- `src/routes/`: Rutas de la aplicación (`AppRoutes.jsx`).

## Ejecución Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```
