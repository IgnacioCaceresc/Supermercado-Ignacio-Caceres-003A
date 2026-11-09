# Supermercado Caserita - Gestión de Inventario

Aplicación web desarrollada con React, React Router DOM, Context API y Tailwind CSS para la gestión de inventario y carrito de compras de un supermercado.

## Estructura del Proyecto

- `public/img/`: Imágenes de los productos del catálogo.
- `src/components/`: Componentes reutilizables (`Navbar`, `Footer`, `ProductCard`, `CartItem`).
- `src/context/`: Estado global con Context API y `useReducer` (`InventoryContext`, `inventoryReducer`).
- `src/data/`: Datos iniciales del inventario (`mockInventory.js`).
- `src/pages/`: Vistas de la aplicación (`Home`, `About`, `Stores`, `Form`, `Inventory`, `ProductDetail`, `Cart`).
- `src/routes/`: Rutas centralizadas (`AppRoutes.jsx`).

## Instalación y Ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/IgnacioCaceresc/Supermercado-Ignacio-Caceres-003A.git
   ```

2. Entrar al directorio del proyecto:
   ```bash
   cd Supermercado-Ignacio-Caceres-003A
   ```

3. Instalar dependencias:
   ```bash
   npm install
   ```

4. Iniciar el servidor local de desarrollo:
   ```bash
   npm run dev
   ```
