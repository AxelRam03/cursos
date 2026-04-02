import { useState } from 'react';
import { productsApi } from '../../api/products';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';
import Modal from '../ui/Modal';

export default function ProductModal({ product, onClose, onSaved }) {
  const isEdit = !!product;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name:        product?.name        ?? '',
    barcode:     product?.barcode     ?? '',
    price:       product?.price       ?? '',
    cost_price:  product?.cost_price  ?? '',
    stock:       product?.stock       ?? '',
    min_stock:   product?.min_stock   ?? 5,
    unit:        product?.unit        ?? 'pieza',
    description: product?.description ?? '',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price:      parseFloat(form.price),
        cost_price: parseFloat(form.cost_price) || 0,
        stock:      parseInt(form.stock) || 0,
        min_stock:  parseInt(form.min_stock) || 5,
      };
      if (isEdit) {
        await productsApi.update(product.id, payload);
        toast.success('Producto actualizado');
      } else {
        await productsApi.create(payload);
        toast.success('Producto creado');
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: 'Nombre *',         key: 'name',        type: 'text',   required: true },
    { label: 'Código de barras', key: 'barcode',      type: 'text' },
    { label: 'Precio venta *',   key: 'price',        type: 'number', required: true, step: '0.01' },
    { label: 'Precio costo',     key: 'cost_price',   type: 'number', step: '0.01' },
    { label: 'Stock',            key: 'stock',        type: 'number' },
    { label: 'Stock mínimo',     key: 'min_stock',    type: 'number' },
    { label: 'Unidad',           key: 'unit',         type: 'text' },
  ];

  return (
    <Modal title={isEdit ? 'Editar producto' : 'Nuevo producto'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {fields.map(({ label, key, type, required, step }) => (
            <div key={key} className={key === 'name' || key === 'barcode' ? 'col-span-2' : ''}>
              <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
              <input
                type={type}
                step={step}
                required={required}
                value={form[key]}
                onChange={set(key)}
                className="input"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={set('description')}
            className="input resize-none"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancelar</button>
          <button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading && <Spinner size="sm" />}
            {loading ? 'Guardando…' : isEdit ? 'Actualizar' : 'Crear producto'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
