'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

function ProductTable() {
  const router = useRouter();
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('nombre');
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    axios.get('/api/table')
      .then(response => {
        setData(response.data);
        
      })
      .catch(error => {
        console.error('Error al obtener datos de productos', error);
      });
  }, []);

  async function DELETE(producto_id) {
    try {
      // Envía una solicitud DELETE al servidor para eliminar el producto por su ID
      await axios.delete(`/api/table/${producto_id}`);
      
    } catch (error) {
      console.error('Error al eliminar el producto', error);
      
    }
  }

  const handleDelete = async (producto_id) => {
    confirmAlert({
      title: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            try {
              // Llama a la función DELETE de tu API para eliminar el producto por su ID
              await DELETE(producto_id);
              
              // Después de eliminar el producto, obtén nuevamente los datos actualizados desde el servidor
              const response = await axios.get('/api/table');
              if(response.status === 204){
                router.push('/dashboard/repuestosAlmacen');
                router.refresh();
              }
              setData(response.data);
            } catch (error) {
              console.error('Error al eliminar el producto', error);
            }
          },
        },
        {
          label: 'No',
        },
      ],
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
          <option value="precioVenta">Precio Venta</option>
          <option value="cantidad">Cantidad</option>
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
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Precio Venta</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Cantidad</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Proveedor</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Categoría</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => {
              const isEditing = editingRow && editingRow.index === index;
              const { producto_id, ...rowWithoutProductId } = row;
              return (
                <tr key={index} className={isEditing ? 'bg-cyan-100' : 'bg-white'}>
                  {Object.keys(rowWithoutProductId).map((key) => (
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
                      <button className="text-red-500 p-2 rounded-full hover:bg-red-100" onClick={() => handleDelete(row.producto_id)}><FaTrash /></button>
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