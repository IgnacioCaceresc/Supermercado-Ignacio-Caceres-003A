import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  Package,
  PlusCircle,
  ShoppingCart,
  Users,
  Store
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export default function Navbar() {
  const { metrics } = useInventory();

  const navItems = [
    {
      to: '/',
      label: 'Inicio',
      icon: Home,
      exact: true
    },
    {
      to: '/inventario',
      label: 'Inventario',
      icon: Package,
      badge: metrics.totalArticles
    },
    {
      to: '/ingresar',
      label: 'Ingresar Producto',
      icon: PlusCircle
    },
    {
      to: '/carrito',
      label: 'Carrito',
      icon: ShoppingCart,
      badge: metrics.cartTotalItems,
      highlightBadge: true
    },
    {
      to: '/quienes-somos',
      label: 'Quiénes Somos',
      icon: Users
    },
    {
      to: '/nuestras-tiendas',
      label: 'Nuestras Tiendas',
      icon: Store
    }
  ];

  return (
    <>
      {/* Menú Lateral en Escritorio */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-slate-900 text-white shadow-lg z-40">
        <div className="p-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block">
                Supermercado
              </span>
              <h1 className="text-lg font-bold text-white">Caserita</h1>
            </div>
          </Link>
        </div>

        <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block">Stock Total</span>
            <span className="text-base font-bold text-emerald-400">
              {metrics.totalStockUnits} un.
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block">En Carrito</span>
            <span className="text-base font-bold text-amber-400">
              {metrics.cartTotalItems} un.
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Menú Principal
          </p>
          {navItems.slice(0, 4).map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      item.highlightBadge
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="pt-6">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Conócenos
            </p>
            {navItems.slice(4).map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <IconComponent className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-400 text-center">
          Supermercado Caserita © {new Date().getFullYear()}
        </div>
      </aside>

      {/* Cabecera Superior en Móvil */}
      <header className="md:hidden sticky top-0 z-30 bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-base">
            Supermercado <span className="text-amber-400">Caserita</span>
          </span>
        </Link>
        <div className="flex items-center gap-3 text-xs">
          <Link to="/quienes-somos" className="text-slate-300 hover:text-white">
            Nosotros
          </Link>
          <Link to="/nuestras-tiendas" className="text-slate-300 hover:text-white">
            Tiendas
          </Link>
        </div>
      </header>

      {/* Barra Inferior en Móvil */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-slate-900 border-t border-slate-800 text-white z-40 flex items-center justify-around py-2 px-1">
        {navItems.slice(0, 4).map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[11px] font-medium ${
                  isActive ? 'text-amber-400' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              <div className="relative">
                <IconComponent className="w-5 h-5 mb-0.5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-rose-600 text-white text-[10px] font-bold px-1.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span>{item.label.split(' ')[0]}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
