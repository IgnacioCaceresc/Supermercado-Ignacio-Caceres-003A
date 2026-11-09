import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Truck, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Mayorista y Detalle</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Precios convenientes todos los días para tu hogar o almacén.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Sucursales</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Locales en Santiago y regiones con amplio surtido.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Horario de Atención</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Lunes a Sábado de 08:30 a 21:00 hrs. Domingos hasta las 19:30 hrs.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Supermercado Caserita. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link to="/quienes-somos" className="hover:text-rose-600 font-medium">
              Quiénes somos
            </Link>
            <Link to="/nuestras-tiendas" className="hover:text-rose-600 font-medium">
              Nuestras tiendas
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
