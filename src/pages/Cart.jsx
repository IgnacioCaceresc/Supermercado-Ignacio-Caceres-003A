import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Package
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { cart, metrics, clearCart } = useInventory();
  const [orderCompleted, setOrderCompleted] = useState(false);

  const formatCLP = (val) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val || 0);

  const handleCheckout = () => {
    clearCart(false);
    setOrderCompleted(true);
  };

  if (orderCompleted) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-xl mx-auto space-y-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">¡Compra realizada con éxito!</h1>
        <p className="text-sm text-slate-600">
          Gracias por tu compra en Supermercado Caserita. El stock del inventario ha sido
          actualizado.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/inventario"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
          >
            <Package className="w-4 h-4" />
            <span>Volver al Inventario</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Carrito de Compras</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Modifica las cantidades con los botones (+) y (-).
          </p>
        </div>

        {cart.length > 0 && (
          <button
            type="button"
            onClick={() => clearCart(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-semibold transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Vaciar carrito</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingCart className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Tu carrito está vacío</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Revisa el catálogo de productos para agregar artículos a tu pedido.
          </p>
          <Link
            to="/inventario"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ir al Inventario</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 sticky top-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Resumen del Pedido
            </h2>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Productos distintos</span>
                <span className="font-bold text-slate-900">{cart.length}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Total de unidades</span>
                <span className="font-bold text-slate-900">{metrics.cartTotalItems} un.</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-2xl font-extrabold text-rose-600">
                  {formatCLP(metrics.cartTotalPrice)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors"
            >
              Finalizar Compra
            </button>

            <Link
              to="/inventario"
              className="block text-center text-xs font-semibold text-slate-500 hover:text-rose-600"
            >
              ← Seguir comprando
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
