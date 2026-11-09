import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Eye,
  Tag,
  CheckCircle2,
  AlertTriangle,
  ImageOff,
  Plus,
  Minus
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export default function ProductCard({ product }) {
  const { addToCart, updateCartQuantity, cart } = useInventory();
  const [imgError, setImgError] = useState(false);

  const itemInCart = cart.find((item) => item.id === product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const formatCLP = (val) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val || 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Imagen del Producto */}
      <Link
        to={`/producto/${product.id}`}
        className="relative h-44 bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100"
      >
        {product.imagen && !imgError ? (
          <img
            src={product.imagen}
            alt={product.nombre}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300 bg-white"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
            <ImageOff className="w-8 h-8 mb-1 stroke-1" />
            <span className="text-[11px] font-medium">Sin imagen</span>
          </div>
        )}

        {/* Etiqueta de categoría flotante */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-slate-700 shadow-sm">
          <Tag className="w-3 h-3 text-rose-600" />
          {product.categoria}
        </span>

        {/* Etiqueta de Stock flotante */}
        <div className="absolute top-3 right-3">
          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-sm">
              <AlertTriangle className="w-3 h-3" />
              Agotado
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm">
              Quedan {product.stock}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
              <CheckCircle2 className="w-3 h-3" />
              Stock: {product.stock}
            </span>
          )}
        </div>
      </Link>

      {/* Información del producto */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            {product.marca}
          </span>

          <Link
            to={`/producto/${product.id}`}
            className="block text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2"
          >
            {product.nombre}
          </Link>

          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
            {product.descripcion}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Precio</span>
            <span className="text-lg font-extrabold text-slate-900">
              {formatCLP(product.precio)}
            </span>
          </div>

          {itemInCart && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              En carrito: {itemInCart.quantity}
            </span>
          )}
        </div>
      </div>

      {/* Botones: Ver Detalle + Botón inteligente que muta a selector (- / +) */}
      <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-2">
        <Link
          to={`/producto/${product.id}`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>Detalle</span>
        </Link>

        {itemInCart ? (
          <div className="flex items-center justify-between bg-rose-600 text-white rounded-xl p-1 shadow-sm">
            <button
              type="button"
              onClick={() => updateCartQuantity(product.id, -1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-rose-700 active:scale-95 transition-all"
              title="Disminuir cantidad"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="text-xs font-extrabold px-1 select-none">
              {itemInCart.quantity}
            </span>

            <button
              type="button"
              onClick={() => updateCartQuantity(product.id, 1)}
              disabled={isOutOfStock}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                isOutOfStock
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-rose-700 active:scale-95'
              }`}
              title={isOutOfStock ? 'Sin más stock disponible' : 'Aumentar cantidad'}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => addToCart(product.id, 1)}
            disabled={isOutOfStock}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-rose-600 text-white hover:bg-rose-700'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{isOutOfStock ? 'Sin Stock' : 'Agregar'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
