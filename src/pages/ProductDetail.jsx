import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  Tag,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ImageOff,
  Plus,
  Minus
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inventory, cart, addToCart, updateCartQuantity } = useInventory();
  const [imgError, setImgError] = useState(false);

  const product = inventory.find((item) => String(item.id) === String(id));
  const cartItem = cart.find((item) => String(item.id) === String(id));

  const formatCLP = (val) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val || 0);

  if (!product) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-lg mx-auto space-y-4">
        <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
        <h1 className="text-xl font-bold text-slate-900">Producto no encontrado</h1>
        <Link
          to="/inventario"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inventario</span>
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-rose-600"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al listado</span>
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Imagen del producto */}
          <div className="h-72 sm:h-80 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
            {product.imagen && !imgError ? (
              <img
                src={product.imagen}
                alt={product.nombre}
                onError={() => setImgError(true)}
                className="w-full h-full object-contain p-4 bg-white"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                <ImageOff className="w-12 h-12 mb-2 stroke-1" />
                <span className="text-xs font-medium">Sin imagen disponible</span>
              </div>
            )}
          </div>

          {/* Detalles del producto */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600">
                <Tag className="w-3.5 h-3.5" />
                {product.categoria}
              </span>

              {isOutOfStock ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Sin Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Stock disponible: {product.stock} un.
                </span>
              )}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {product.marca}
              </p>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                {product.nombre}
              </h1>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {product.descripcion}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-400 block">Precio unitario</span>
              <span className="text-3xl font-extrabold text-slate-900">
                {formatCLP(product.precio)}
              </span>
            </div>

            {/* Acción principal: muta de "Agregar al carrito" a control (- cantidad +) */}
            <div className="space-y-3 pt-2">
              {cartItem ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-rose-600 text-white rounded-xl p-1.5 shadow-sm">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(product.id, -1)}
                      className="w-11 h-11 rounded-lg flex items-center justify-center bg-rose-700/60 hover:bg-rose-800 active:scale-95 transition-all"
                      title="Disminuir cantidad"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <div className="text-center select-none">
                      <span className="text-[11px] uppercase tracking-wider text-rose-100 block font-semibold">
                        En tu carrito
                      </span>
                      <span className="text-base font-extrabold">
                        {cartItem.quantity} {cartItem.quantity === 1 ? 'unidad' : 'unidades'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => updateCartQuantity(product.id, 1)}
                      disabled={isOutOfStock}
                      className={`w-11 h-11 rounded-lg flex items-center justify-center bg-rose-700/60 transition-all ${
                        isOutOfStock
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:bg-rose-800 active:scale-95'
                      }`}
                      title={isOutOfStock ? 'No queda más stock' : 'Aumentar cantidad'}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <Link
                    to="/carrito"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Ir al Carrito de Compras</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => addToCart(product.id, 1)}
                  disabled={isOutOfStock}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                    isOutOfStock
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Agotado' : 'Agregar al carrito'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
