'use client'
import React, { useState, useEffect } from 'react';
import { FaSave, FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

function Tax() {
  const [tasas, setTasas] = useState([]); // Un solo estado para almacenar tasas con id y valor
  const [taxTasa, setTaxTasa] = useState('');
  const [utilidadTasa, setUtilidadTasa] = useState('');
  const [editTasaId, setEditTasaId] = useState(null); // Id de la tasa en modo edición
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('iva'); // Controla la pestaña activa

  useEffect(() => {
    async function fetchData() {
      try {
        const responseIva = await axios.get('/api/iva');
        const ivas = responseIva.data;

        const responseUtilidad = await axios.get('/api/utilidad');
        const utilidades = responseUtilidad.data;

        setTasas(activeTab === 'iva' ? ivas.map(iva => ({ id: iva.id, value: iva.tasa })) : utilidades.map(utilidad => ({ id: utilidad.id, value: utilidad.tasa })));
      } catch (error) {
        setError('Error al cargar las tasas de impuestos');
      }
    }

    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTasaSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const tasa = activeTab === 'iva' ? taxTasa : utilidadTasa;

    if (!tasa) {
      setError(`El campo de tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'} es obligatorio`);
      return;
    }

    try {
      if (editTasaId) {
        // Si editTasaId tiene un valor, significa que estamos en modo edición
        await axios.put(`/api/${activeTab}/${editTasaId}`, { tasa });
        setSuccess(`Tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'} editada con éxito`);
        setEditTasaId(null); // Salir del modo edición
      } else {
        // Agregar lógica para guardar la nueva tasa en el sistema
        const response = await axios.post(`/api/${activeTab}`, { tasa });
        const nuevoId = response.data.id;
        setSuccess(`Tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'} registrada con éxito`);
        setTasas([...tasas, { id: nuevoId, value: tasa }]);
      }

      if (activeTab === 'iva') {
        setTaxTasa('');
      } else {
        setUtilidadTasa('');
      }
    } catch (error) {
      setError(`Error al guardar la tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'}`);
    }
  };

  const handleEditTasa = (tasaId, tasa) => {
    setEditTasaId(tasaId);
    if (activeTab === 'iva') {
      setTaxTasa(tasa);
    } else {
      setUtilidadTasa(tasa);
    }
  };

  const handleCancelEdit = () => {
    setEditTasaId(null);
    if (activeTab === 'iva') {
      setTaxTasa('');
    } else {
      setUtilidadTasa('');
    }
  };

  const handleDeleteTasa = async (tasaId) => {
    try {
      const apiUrl = `/api/${activeTab}`;
      console.log('URL de la solicitud DELETE:', apiUrl);
      
      // Imprime el ID que se envía al servidor correctamente
      console.log('ID que se está enviando al servidor:', tasaId);

      await axios.delete(apiUrl, {
        data: { id: tasaId } // Envía el ID como un parámetro en el cuerpo de la solicitud
      });

      setSuccess(`Tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'} eliminada con éxito`);

      // Actualizar el estado de tasas después de la eliminación
      setTasas((prevTasas) => prevTasas.filter((tasa) => tasa.id !== tasaId));
    } catch (error) {
      setError(`Error al eliminar la tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'}`);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="mx-auto p-6 bg-cyan-950 text-white rounded-lg shadow-md w-full md:w-2/3">
        <h1 className="text-2xl font-semibold mb-4 text-center">Impuestos</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <button
              className={`px-4 py-2 rounded ${activeTab === 'iva' ? 'bg-gray-800 text-white' : 'bg-gray-400 text-gray-800'}`}
              onClick={() => handleTabChange('iva')}
            >
              Tasa de IVA
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'utilidad' ? 'bg-gray-800 text-white' : 'bg-gray-400 text-gray-800'}`}
              onClick={() => handleTabChange('utilidad')}
            >
              Tasa de Utilidad
            </button>
          </div>
          <form className="space-y-6" onSubmit={handleTasaSubmit}>
            <div className="flex flex-col">
              <label htmlFor="tasa" className="text-sm font-medium mb-2 flex items-center">
                <FaUser className="mr-2" />
                Tasa de {activeTab === 'iva' ? 'IVA' : 'Utilidad'}
              </label>
              <input
                type="number"
                id="tasa"
                className="w-full border rounded p-2 text-black"
                value={activeTab === 'iva' ? taxTasa : utilidadTasa}
                onChange={(e) => (activeTab === 'iva' ? setTaxTasa(e.target.value) : setUtilidadTasa(e.target.value))}
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
              >
                <FaSave className="mr-2" />
                {editTasaId ? 'Editar' : 'Guardar'} Cambios
              </button>
              {editTasaId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center"
                >
                  Cancelar Edición
                </button>
              )}
            </div>
          </form>
          <ul>
            {tasas.map((tasa) => (
              <li key={tasa.id} className="flex justify-between items-center my-2">
                <span>{tasa.value}%</span>
                <div>
                  <button
                    onClick={() => handleEditTasa(tasa.id, tasa.value)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTasa(tasa.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tax;
