import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Filter,
  Search,
  LayoutGrid,
  Table as TableIcon,
  Eye,
  ShoppingCart,
  PlusCircle,
  RotateCcw,
  Package,
  Plus,
  Minus
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { CATEGORIAS } from '../data/mockInventory';
import ProductCard from '../components/ProductCard';

export default function Inventory() {
  const { inventory, cart, addToCart, updateCartQuantity } = useInventory();

  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const availableCategories = useMemo(() => {
    const customCats = inventory.map((item) => item.categoria);
    return Array.from(new Set([...CATEGORIAS, ...customCats]));
  }, [inventory]);

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Todas' || item.categoria === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.nombre.toLowerCase().includes(query) ||
        item.marca.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [inventory, selectedCategory, searchQuery]);

  const formatCLP = (val) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val || 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Inventario de Productos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Mostrando {filteredInventory.length} de {inventory.length} productos registrados.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Tarjetas</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span>Tabla</span>
            </button>
          </div>

          <Link
            to="/ingresar"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nuevo Producto</span>
          </Link>
        </div>
      </div>

      {/* Filtro por categoría y buscador */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre o marca..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {(selectedCategory !== 'Todas' || searchQuery.trim() !== '') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtro</span>
            </button>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            <Filter className="w-3.5 h-3.5 text-rose-600" />
            <span>Categorías:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === 'Todas'
                  ? inventory.length
                  : inventory.filter((item) => item.categoria === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`px-1.5 rounded-full text-[11px] ${
                      isActive ? 'bg-rose-800 text-white' : 'bg-white text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filteredInventory.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Package className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            No hay productos en esta categoría
          </h3>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('Todas');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
          >
            Ver todos los productos
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredInventory.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500">
                  <th className="py-3 px-4">Producto</th>
                  <th className="py-3 px-4">Marca</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Precio</th>
                  <th className="py-3 px-4 text-center">Stock</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredInventory.map((product) => {
                  const isOutOfStock = product.stock <= 0;
                  const itemInCart = cart.find((c) => c.id === product.id);

                  return (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <Link
                          to={`/producto/${product.id}`}
                          className="hover:text-rose-600 transition-colors"
                        >
                          {product.nombre}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{product.marca}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          {product.categoria}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {formatCLP(product.precio)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            isOutOfStock
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {product.stock} un.
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center justify-end gap-2">
                          <Link
                            to={`/producto/${product.id}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver</span>
                          </Link>

                          {itemInCart ? (
                            <div className="inline-flex items-center bg-rose-600 text-white rounded-lg p-0.5">
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(product.id, -1)}
                                className="w-6 h-6 rounded flex items-center justify-center hover:bg-rose-700"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold px-2 select-none">
                                {itemInCart.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(product.id, 1)}
                                disabled={isOutOfStock}
                                className={`w-6 h-6 rounded flex items-center justify-center ${
                                  isOutOfStock ? 'opacity-40 cursor-not-allowed' : 'hover:bg-rose-700'
                                }`}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addToCart(product.id, 1)}
                              disabled={isOutOfStock}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                                isOutOfStock
                                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                  : 'bg-rose-600 hover:bg-rose-700 text-white'
                              }`}
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Agregar</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
