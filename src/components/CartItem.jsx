import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, PackageCheck, AlertCircle, ImageOff } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export default function CartItem({ item }) {
  const { inventory, updateCartQuantity, removeFromCart } = useInventory();
  const [imgError, setImgError] = useState(false);

  const inventoryProduct = inventory.find((prod) => prod.id === item.id);
  const availableStockInInventory = inventoryProduct ? inventoryProduct.stock : 0;

  const formatCLP = (val) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val || 0);

  const subtotal = (item.precio || 0) * item.quantity;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Miniatura de imagen */}
        <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
          {item.imagen && !imgError ? (
            <img
              src={item.imagen}
              alt={item.nombre}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-1 bg-white"
            />
          ) : (
            <ImageOff className="w-5 h-5 text-slate-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              {item.categoria}
            </span>
            <span className="text-xs text-slate-500">{item.marca}</span>
          </div>

          <Link
            to={`/producto/${item.id}`}
            className="text-base font-bold text-slate-900 hover:text-rose-600 transition-colors block truncate"
          >
            {item.nombre}
          </Link>

          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs">
            <span className="text-slate-600">
              Unitario: <strong>{formatCLP(item.precio)}</strong>
            </span>

            {availableStockInInventory > 0 ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                <PackageCheck className="w-3.5 h-3.5" />
                Disponible en bodega: {availableStockInInventory} un.
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                Sin más unidades en bodega
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Controles (+) y (-) */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
          <button
            type="button"
            onClick={() => updateCartQuantity(item.id, -1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600 shadow-sm transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="w-10 text-center font-bold text-sm text-slate-900">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => updateCartQuantity(item.id, 1)}
            disabled={availableStockInInventory <= 0}
            className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm transition-colors ${
              availableStockInInventory <= 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="text-right min-w-[85px]">
          <span className="text-[11px] text-slate-400 block">Subtotal</span>
          <span className="text-base font-extrabold text-slate-900">
            {formatCLP(subtotal)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => removeFromCart(item.id)}
          title="Eliminar del carrito"
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
