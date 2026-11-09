import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Package,
  ArrowRight,
  Upload,
  Trash2
} from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { CATEGORIAS } from '../data/mockInventory';

const NUEVA_CATEGORIA_VALUE = '__NUEVA_CATEGORIA__';

export default function Form() {
  const { addProduct, inventory } = useInventory();
  const navigate = useNavigate();

  // Incluye tanto las categorías base como cualquier nueva categoría que ya se haya creado en el inventario
  const selectableCategories = useMemo(() => {
    const baseCats = CATEGORIAS.filter((cat) => cat !== 'Todas');
    const customCats = inventory.map((item) => item.categoria).filter(Boolean);
    return Array.from(new Set([...baseCats, ...customCats]));
  }, [inventory]);

  const [formData, setFormData] = useState({
    nombre: '',
    marca: '',
    categoria: selectableCategories[0],
    nuevaCategoria: '',
    stock: '',
    precio: '',
    sku: '',
    imagen: '',
    descripcion: ''
  });

  const [error, setError] = useState('');
  const [createdProduct, setCreatedProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('El archivo seleccionado debe ser una imagen (.jpg, .png, .webp).');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        imagen: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre.trim() || !formData.marca.trim()) {
      setError('Por favor ingresa el nombre y la marca del producto.');
      return;
    }

    const finalCategory =
      formData.categoria === NUEVA_CATEGORIA_VALUE
        ? formData.nuevaCategoria.trim()
        : formData.categoria;

    if (!finalCategory) {
      setError('Por favor escribe el nombre de la nueva categoría.');
      return;
    }

    const stockNum = Number(formData.stock);
    if (formData.stock === '' || isNaN(stockNum) || stockNum < 0) {
      setError('El stock inicial debe ser un número mayor o igual a 0.');
      return;
    }

    const precioNum = formData.precio === '' ? 1990 : Number(formData.precio);
    if (isNaN(precioNum) || precioNum <= 0) {
      setError('El precio debe ser mayor a 0.');
      return;
    }

    const added = addProduct({
      ...formData,
      categoria: finalCategory,
      stock: Math.floor(stockNum),
      precio: Math.floor(precioNum)
    });

    setCreatedProduct(added);
    setFormData({
      nombre: '',
      marca: '',
      categoria: finalCategory,
      nuevaCategoria: '',
      stock: '',
      precio: '',
      sku: '',
      imagen: '',
      descripcion: ''
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Ingresar Nuevo Producto
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Completa los datos para registrar un artículo en el inventario.
          </p>
        </div>

        <Link
          to="/inventario"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold shrink-0 transition-colors"
        >
          <Package className="w-4 h-4" />
          <span>Ver Inventario ({inventory.length})</span>
        </Link>
      </div>

      {createdProduct && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-emerald-900">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold">Producto guardado correctamente</h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                {createdProduct.nombre} ({createdProduct.marca}) — Categoría: {createdProduct.categoria} | Stock: {createdProduct.stock} un.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigate(`/producto/${createdProduct.id}`)}
              className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100"
            >
              Ver Detalle
            </button>
            <button
              type="button"
              onClick={() => navigate('/inventario')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
            >
              <span>Ir al Inventario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 text-rose-800 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label htmlFor="nombre" className="block text-xs font-bold text-slate-700 mb-1.5">
              Nombre del Producto *
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Tallarines N° 77 400g"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label htmlFor="marca" className="block text-xs font-bold text-slate-700 mb-1.5">
              Marca *
            </label>
            <input
              id="marca"
              name="marca"
              type="text"
              required
              value={formData.marca}
              onChange={handleChange}
              placeholder="Ej: Carozzi"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label htmlFor="categoria" className="block text-xs font-bold text-slate-700 mb-1.5">
              Categoría *
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {selectableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value={NUEVA_CATEGORIA_VALUE} className="font-bold text-rose-600">
                + Crear nueva categoría...
              </option>
            </select>

            {formData.categoria === NUEVA_CATEGORIA_VALUE && (
              <div className="mt-2.5">
                <input
                  type="text"
                  name="nuevaCategoria"
                  required
                  value={formData.nuevaCategoria}
                  onChange={handleChange}
                  placeholder="Escribe el nombre de la nueva categoría (ej: Mascotas)"
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-300 bg-rose-50/30 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="stock" className="block text-xs font-bold text-slate-700 mb-1.5">
              Stock Inicial (Unidades) *
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              required
              value={formData.stock}
              onChange={handleChange}
              placeholder="Ej: 20"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label htmlFor="precio" className="block text-xs font-bold text-slate-700 mb-1.5">
              Precio Unitario ($)
            </label>
            <input
              id="precio"
              name="precio"
              type="number"
              min="1"
              value={formData.precio}
              onChange={handleChange}
              placeholder="Ej: 1290"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Imagen del producto: Subir archivo desde PC o escribir ruta */}
          <div className="sm:col-span-2 space-y-3 pt-1">
            <label className="block text-xs font-bold text-slate-700">
              Imagen del Producto (Opcional)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-rose-500 bg-slate-50 hover:bg-rose-50/40 cursor-pointer text-xs font-semibold text-slate-700 transition-colors">
                <Upload className="w-4 h-4 text-rose-600" />
                <span>Seleccionar imagen desde mi PC</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <input
                type="text"
                name="imagen"
                value={formData.imagen.startsWith('data:') ? '' : formData.imagen}
                onChange={handleChange}
                placeholder="O escribe ruta ej: /img/tallarines.jpg"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {formData.imagen && (
              <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <img
                  src={formData.imagen}
                  alt="Vista previa"
                  className="w-16 h-16 object-contain rounded-lg bg-white border border-slate-200 p-1"
                />
                <div className="flex-1 text-xs text-slate-600">
                  <p className="font-bold text-slate-800">Vista previa cargada</p>
                  <p className="truncate max-w-xs">
                    {formData.imagen.startsWith('data:')
                      ? 'Imagen cargada desde tu computador'
                      : formData.imagen}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, imagen: '' }))}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                  title="Quitar imagen"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="descripcion" className="block text-xs font-bold text-slate-700 mb-1.5">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows={3}
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Características o formato del producto..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Guardar Producto</span>
          </button>
        </div>
      </form>
    </div>
  );
}
