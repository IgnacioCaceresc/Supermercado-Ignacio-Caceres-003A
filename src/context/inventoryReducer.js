export const ACTIONS = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
};

/**
 * Reducer para gestionar de forma sincrónica e inmutable:
 * 1. El inventario general de artículos (`inventory`)
 * 2. El carrito de compras (`cart`)
 *
 * Garantiza sincronización bidireccional:
 * - Al agregar al carrito o incrementar cantidad (+), se descuenta del stock en `inventory`.
 * - Al disminuir cantidad (-) o eliminar del carrito, se restituye el stock en `inventory`.
 */
export function inventoryReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_PRODUCT: {
      const newProduct = action.payload;
      return {
        ...state,
        inventory: [newProduct, ...state.inventory]
      };
    }

    case ACTIONS.ADD_TO_CART: {
      const { productId, amount = 1 } = action.payload;
      const productInInventory = state.inventory.find((item) => item.id === productId);

      // Validación de seguridad: verificar que exista y tenga stock suficiente
      if (!productInInventory || productInInventory.stock < amount || amount <= 0) {
        return state;
      }

      // 1. Descontar stock en el inventario general
      const updatedInventory = state.inventory.map((item) =>
        item.id === productId
          ? { ...item, stock: item.stock - amount }
          : item
      );

      // 2. Agregar o actualizar cantidad en el carrito
      const existingCartItem = state.cart.find((item) => item.id === productId);
      let updatedCart;

      if (existingCartItem) {
        updatedCart = state.cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      } else {
        const { stock, ...productSnapshot } = productInInventory;
        updatedCart = [
          ...state.cart,
          { ...productSnapshot, quantity: amount }
        ];
      }

      return {
        ...state,
        inventory: updatedInventory,
        cart: updatedCart
      };
    }

    case ACTIONS.UPDATE_QUANTITY: {
      // delta puede ser positivo (+1) para aumentar en el carrito o negativo (-1) para disminuir
      const { productId, delta } = action.payload;
      if (!delta || delta === 0) return state;

      const existingCartItem = state.cart.find((item) => item.id === productId);
      const productInInventory = state.inventory.find((item) => item.id === productId);

      if (!existingCartItem || !productInInventory) {
        return state;
      }

      // Si se intenta aumentar en el carrito, verificar que haya stock disponible en inventario
      if (delta > 0 && productInInventory.stock < delta) {
        return state;
      }

      const newCartQuantity = existingCartItem.quantity + delta;

      // Si la nueva cantidad llega a 0 o menos, eliminamos el artículo del carrito y restituimos su cantidad al stock
      if (newCartQuantity <= 0) {
        const restoredStock = existingCartItem.quantity;
        return {
          ...state,
          inventory: state.inventory.map((item) =>
            item.id === productId
              ? { ...item, stock: item.stock + restoredStock }
              : item
          ),
          cart: state.cart.filter((item) => item.id !== productId)
        };
      }

      // Sincronización matemática:
      // Si delta es +1 (más en carrito) -> stock en inventario disminuye en 1 (stock - delta)
      // Si delta es -1 (menos en carrito) -> stock en inventario aumenta en 1 (stock - (-1) = stock + 1)
      return {
        ...state,
        inventory: state.inventory.map((item) =>
          item.id === productId
            ? { ...item, stock: item.stock - delta }
            : item
        ),
        cart: state.cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: newCartQuantity }
            : item
        )
      };
    }

    case ACTIONS.REMOVE_FROM_CART: {
      const { productId } = action.payload;
      const existingCartItem = state.cart.find((item) => item.id === productId);

      if (!existingCartItem) return state;

      // Restituir íntegramente la cantidad que estaba en el carrito al stock del inventario
      return {
        ...state,
        inventory: state.inventory.map((item) =>
          item.id === productId
            ? { ...item, stock: item.stock + existingCartItem.quantity }
            : item
        ),
        cart: state.cart.filter((item) => item.id !== productId)
      };
    }

    case ACTIONS.CLEAR_CART: {
      const { restoreStock = false } = action.payload || {};

      if (!restoreStock) {
        // Compra confirmada: el stock ya fue descontado sincrónicamente, solo vaciamos el carrito
        return {
          ...state,
          cart: []
        };
      }

      // Vaciar carrito restituyendo todo el stock al inventario
      const updatedInventory = state.inventory.map((invItem) => {
        const cartItem = state.cart.find((c) => c.id === invItem.id);
        if (!cartItem) return invItem;
        return {
          ...invItem,
          stock: invItem.stock + cartItem.quantity
        };
      });

      return {
        ...state,
        inventory: updatedInventory,
        cart: []
      };
    }

    default:
      return state;
  }
}

