'use client'
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

function ProductTable() {
  const [data, setData] = useState([
    {
      codigo: '123',
      nombre: 'Producto 1',
      descripcion: 'Descripción 1',
      cantidad: 10,
      precioVenta: 100,
      proveedor: 'Proveedor 1',
      categoria: 'Categoría 1',
    },
    {
      codigo: '456',
      nombre: 'Producto 2',
      descripcion: 'Descripción 2',
      cantidad: 20,
      precioVenta: 200,
      proveedor: 'Proveedor 2',
      categoria: 'Categoría 2',
    },
    {
      codigo: '456',
      nombre: 'Producto 2',
      descripcion: 'Descripción 2',
      cantidad: 20,
      precioVenta: 200,
      proveedor: 'Proveedor 2',
      categoria: 'Categoría 2',
    },
    {
      codigo: '456',
      nombre: 'Producto 2',
      descripcion: 'Descripción 2',
      cantidad: 20,
      precioVenta: 200,
      proveedor: 'Proveedor 2',
      categoria: 'Categoría 2',
    },
    {
      codigo: '456',
      nombre: 'Producto 2',
      descripcion: 'Descripción 2',
      cantidad: 20,
      precioVenta: 200,
      proveedor: 'Proveedor 2',
      categoria: 'Categoría 2',
    },
    {
      codigo: '456',
      nombre: 'Producto 2',
      descripcion: 'Descripción 2',
      cantidad: 20,
      precioVenta: 200,
      proveedor: 'Proveedor 2',
      categoria: 'Categoría 2',
    },
    {
      codigo: '456',
      nombre: 'Producto 2',
      descripcion: 'Descripción 2',
      cantidad: 20,
      precioVenta: 200,
      proveedor: 'Proveedor 2',
      categoria: 'Categoría 2',
    },
    // ... otros datos
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('nombre');
  const [editingRow, setEditingRow] = useState(null);

  const handleDelete = (index) => {
    confirmAlert({
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            const newData = data.slice();
            newData.splice(index, 1);
            setData(newData);
          }
        },
        {
          label: 'No',
        }
      ]
    });
  };

  const handleEdit = (index) => {
    setEditingRow({ index, data: data[index] });
  };

  const handleSave = (index) => {
    confirmAlert({
      title: 'Confirmar cambios',
      message: '¿Deseas aplicar los cambios?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            const newData = data.slice();
            newData[index] = editingRow.data;
            setData(newData);
            setEditingRow(null);
          }
        },
        {
          label: 'No',
          onClick: () => {
            setEditingRow(null);
          }
        }
      ]
    });
  };

  const filteredData = data.filter(row => {
    return row[filterBy].toString().toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='min-h-screen bg-white'>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-cyan-900">Inventario</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="py-2 px-4 border rounded"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="py-2 px-4 border rounded"
          value={filterBy}
          onChange={e => setFilterBy(e.target.value)}
        >
          <option value="codigo">Código</option>
          <option value="nombre">Nombre</option>
          <option value="descripcion">Descripción</option>
          <option value="cantidad">Cantidad</option>
          <option value="precioVenta">Precio Venta</option>
          <option value="proveedor">Proveedor</option>
          <option value="categoria">Categoría</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-cyan-900 text-white">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Código</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Nombre</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Descripción</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Cantidad</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Precio Venta</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Proveedor</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Categoría</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => {
              const isEditing = editingRow && editingRow.index === index;
              return (
                <tr key={index} className={isEditing ? 'bg-cyan-100' : 'bg-white'}>
                  {Object.keys(row).map((key) => (
                    <td key={key} className="py-2 px-4 border-b border-gray-300 text-sm">
                      <input
                        type="text"
                        value={isEditing ? editingRow.data[key] : row[key]}
                        onChange={e => isEditing && setEditingRow({ ...editingRow, data: { ...editingRow.data, [key]: e.target.value } })}
                        className={`w-full py-2 px-3 border rounded ${isEditing ? '' : 'bg-gray-100'} ${isEditing ? 'text-black' : 'text-gray-500'}`}
                        readOnly={!isEditing || key === 'acciones'}
                      />
                    </td>
                  ))}
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    <div className="flex space-x-2">
                      {isEditing ? (
                        <button className="text-green-500 p-2 rounded-full hover:bg-green-100" onClick={() => handleSave(index)}><FaSave /></button>
                      ) : (
                        <button className="text-blue-500 p-2 rounded-full hover:bg-blue-100" onClick={() => handleEdit(index)}><FaEdit /></button>
                      )}
                      <button className="text-red-500 p-2 rounded-full hover:bg-red-100" onClick={() => handleDelete(index)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default ProductTable;