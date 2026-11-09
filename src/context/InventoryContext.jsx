import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { initialInventory } from '../data/mockInventory';
import { inventoryReducer, ACTIONS } from './inventoryReducer';

const InventoryContext = createContext(null);

const initialState = {
  inventory: initialInventory,
  cart: []
};

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const addProduct = (productData) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      nombre: productData.nombre.trim(),
      marca: productData.marca.trim(),
      categoria: productData.categoria,
      stock: Number(productData.stock),
      precio: Number(productData.precio) || 1990,
      sku: productData.sku?.trim() || `CAS-${Math.floor(100 + Math.random() * 900)}`,
      imagen: productData.imagen || '',
      descripcion:
        productData.descripcion?.trim() ||
        `Producto ${productData.nombre} marca ${productData.marca}, categoría ${productData.categoria}.`
    };

    dispatch({
      type: ACTIONS.ADD_PRODUCT,
      payload: newProduct
    });

    return newProduct;
  };

  const addToCart = (productId, amount = 1) => {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: { productId, amount: Number(amount) }
    });
  };

  const updateCartQuantity = (productId, delta) => {
    dispatch({
      type: ACTIONS.UPDATE_QUANTITY,
      payload: { productId, delta: Number(delta) }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: { productId }
    });
  };

  const clearCart = (restoreStock = false) => {
    dispatch({
      type: ACTIONS.CLEAR_CART,
      payload: { restoreStock }
    });
  };

  const metrics = useMemo(() => {
    const totalArticles = state.inventory.length;
    const totalStockUnits = state.inventory.reduce((acc, item) => acc + item.stock, 0);
    const outOfStockCount = state.inventory.filter((item) => item.stock === 0).length;
    const cartTotalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotalPrice = state.cart.reduce(
      (acc, item) => acc + item.quantity * (item.precio || 0),
      0
    );

    return {
      totalArticles,
      totalStockUnits,
      outOfStockCount,
      cartTotalItems,
      cartTotalPrice
    };
  }, [state.inventory, state.cart]);

  const value = {
    inventory: state.inventory,
    cart: state.cart,
    metrics,
    dispatch,
    addProduct,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory debe utilizarse dentro de un InventoryProvider');
  }
  return context;
}
