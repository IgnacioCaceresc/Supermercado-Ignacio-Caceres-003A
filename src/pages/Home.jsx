import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  PlusCircle,
  AlertTriangle,
  ArrowRight,
  Layers,
  CheckCircle2,
  Store
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { inventory, metrics } = useInventory();

  const featuredProducts = inventory.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Banner Principal */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-rose-900 text-white p-8 sm:p-10 shadow-lg">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
            <Store className="w-4 h-4" />
            <span>Mayorista y Detalle</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Supermercado <span className="text-amber-400">Caserita</span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Revisa nuestro catálogo de productos disponibles en tienda, consulta el stock por
            categoría y arma tu pedido en línea.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/inventario"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>Ver Catálogo</span>
            </Link>

            <Link
              to="/ingresar"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Ingresar Producto</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Resumen de Inventario */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Productos</p>
            <p className="text-2xl font-extrabold text-slate-900">{metrics.totalArticles}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Stock Total</p>
            <p className="text-2xl font-extrabold text-slate-900">{metrics.totalStockUnits}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">En Carrito</p>
            <p className="text-2xl font-extrabold text-slate-900">{metrics.cartTotalItems}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Agotados</p>
            <p className="text-2xl font-extrabold text-slate-900">{metrics.outOfStockCount}</p>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Productos Destacados</h2>
            <p className="text-xs text-slate-500">
              Artículos disponibles actualmente en inventario.
            </p>
          </div>
          <Link
            to="/inventario"
            className="inline-flex items-center gap-1 text-sm font-semibold text-rose-600 hover:text-rose-700"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Enlaces a páginas informativas */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        <Link
          to="/quienes-somos"
          className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-rose-300 shadow-sm transition-all"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
            Conócenos
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-rose-600 transition-colors">
            Quiénes Somos
          </h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Nuestra historia abasteciendo a las familias chilenas y comerciantes desde 1982.
          </p>
        </Link>

        <Link
          to="/nuestras-tiendas"
          className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-rose-300 shadow-sm transition-all"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Ubicaciones
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-rose-600 transition-colors">
            Nuestras Tiendas
          </h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Revisa las direcciones, teléfonos y horarios de atención de nuestras sucursales.
          </p>
        </Link>
      </section>
    </div>
  );
}
