import React from 'react';
import { Store, MapPin, Clock, Phone, CheckCircle } from 'lucide-react';

export default function Stores() {
  const branches = [
    {
      id: 'suc-1',
      name: 'Sucursal Central Franklin',
      address: 'Av. San Diego 2180, Santiago Centro, Región Metropolitana',
      hours: 'Lunes a Sábado: 08:00 - 20:30 hrs | Domingo: 09:00 - 18:00 hrs',
      phone: '+56 2 2555 8100',
      features: ['Venta Mayorista y Detalle', 'Estacionamiento Clientes', 'Retiro en Bodega'],
      badge: 'Casa Matriz'
    },
    {
      id: 'suc-2',
      name: 'Sucursal Maipú Pajaritos',
      address: 'Av. Los Pajaritos 4520, Maipú, Región Metropolitana',
      hours: 'Lunes a Sábado: 08:30 - 21:00 hrs | Domingo: 09:00 - 19:30 hrs',
      phone: '+56 2 2555 8200',
      features: ['Carnicería y Lácteos', 'Cajas Rápidas', 'Acceso Universal'],
      badge: 'Formato Hiper'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
            <Store className="w-3.5 h-3.5" />
            Sucursales
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Nuestras Tiendas
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Conoce la ubicación, teléfono y horarios de atención de nuestra Casa Matriz y nuestro
            local Formato Hiper en la Región Metropolitana.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-5 hover:border-rose-200 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600">
                  {branch.badge}
                </span>
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Abierto
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900">{branch.name}</h2>

              <div className="space-y-2 text-xs text-slate-600 pt-1">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{branch.hours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{branch.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Servicios disponibles en local
              </p>
              <div className="flex flex-wrap gap-2">
                {branch.features.map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
