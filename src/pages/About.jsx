import React from 'react';
import { Award, HeartHandshake, ShieldCheck, Users } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: HeartHandshake,
      title: 'Ahorro para la Familia y el Comerciante',
      description:
        'Trabajamos directo con proveedores nacionales para ofrecer precios bajos tanto al detalle como al por mayor.'
    },
    {
      icon: ShieldCheck,
      title: 'Calidad y Frescura',
      description:
        'Cuidamos cada etapa de almacenamiento en lácteos, abarrotes, frutas y verduras.'
    },
    {
      icon: Award,
      title: 'Atención Cercana',
      description:
        'Más de cuatro décadas acompañando a los hogares y almacenes de barrio en Chile.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600">
            <Users className="w-3.5 h-3.5" />
            Nuestra Historia
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Quiénes Somos
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Fundado en 1982 con el propósito de abastecer tanto a las familias como a los pequeños
            comerciantes y almaceneros, <strong>Supermercado Caserita</strong> se ha consolidado
            como un supermercado cercano, conveniente y con amplio surtido.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h2 className="text-lg font-bold text-slate-900">Nuestra Misión</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Facilitar el acceso a productos de alimentación, limpieza y hogar a precios justos,
            apoyando el presupuesto familiar y el abastecimiento de negocios locales.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h2 className="text-lg font-bold text-slate-900">Nuestra Visión</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Ser el supermercado mayorista y minorista preferido por nuestros clientes gracias a
            nuestro surtido constante, rapidez en la atención y precios bajos todos los días.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-slate-900">Nuestros Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2"
              >
                <div className="w-9 h-9 rounded-lg bg-white text-rose-600 shadow-sm flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
