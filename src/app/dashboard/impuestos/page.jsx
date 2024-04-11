'use client'
import React, { useState, useEffect } from 'react';
import { FaSave, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tax() {
  const [tasas, setTasas] = useState([]);
  const [taxTasa, setTaxTasa] = useState('');
  const [utilidadTasa, setUtilidadTasa] = useState('');
  const [activeTab, setActiveTab] = useState('iva');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/${activeTab}`);
        setTasas(response.data.map(item => ({ id: item.id, value: item.tasa })));
      } catch (error) {
        toast.error('Error al cargar las tasas de impuestos');
      }
    }
    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const showSaveConfirmation = () => {
    const tasa = activeTab === 'iva' ? taxTasa : utilidadTasa;

    if (!tasa) {
      toast.warn(`El campo de tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'} es obligatorio`);
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres guardar esta tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      background: '#1F4C4A',
      color: "#E8EAE0",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSaveTasa();
      }
    });
  };

  const handleSaveTasa = async () => {
    const tasa = activeTab === 'iva' ? taxTasa : utilidadTasa;

    try {
      const response = await axios.post(`/api/${activeTab}`, { tasa });
      const nuevoId = response.data.id;
      toast.success(`Tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'} registrada con éxito`);
      setTasas([...tasas, { id: nuevoId, value: tasa }]);

      if (activeTab === 'iva') {
        setTaxTasa('');
      } else {
        setUtilidadTasa('');
      }
    } catch (error) {
      toast.error(`Error al guardar la tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'}`);
    }
  };

  const showDeleteConfirmation = (tasaId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      background: '#1F4C4A',
      color: "#E8EAE0",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteTasa(tasaId);
      }
    });
  };

  const handleDeleteTasa = async (tasaId) => {
    try {
      await axios.delete(`/api/${activeTab}/${tasaId}`);
      toast.success(`Tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'} eliminada con éxito`);
      setTasas(tasas.filter(tasa => tasa.id !== tasaId));
    } catch (error) {
      toast.error(`Error al eliminar la tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-4xl w-full p-5 bg-cyan-950 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-200 mb-8">Administrador de Impuestos</h1>

        <div className="flex mb-6">
          <button
            onClick={() => handleTabChange('iva')}
            className={`mr-2 mb-2 px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${activeTab === 'iva' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            IVA
          </button>
          <button
            onClick={() => handleTabChange('utilidad')}
            className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${activeTab === 'utilidad' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Utilidad
          </button>
        </div>

        <form onSubmit={(e) => {e.preventDefault(); showSaveConfirmation();}} className="mb-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                {`Tasa de ${activeTab === 'iva' ? 'IVA' : 'Utilidad'}`}
              </label>
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="number"
                  placeholder="Ingrese la tasa"
                  value={activeTab === 'iva' ? taxTasa : utilidadTasa}
                  onChange={(e) => (activeTab === 'iva' ? setTaxTasa(e.target.value) : setUtilidadTasa(e.target.value))}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <FaSave className="inline mr-2" />
                Guardar Cambios
              </button>
            </div>
          </div>
        </form>

        <div className="bg-gray-500 p-4 rounded-md">
          <ul>
            {tasas.map((tasa) => (
              <li key={tasa.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-white">{tasa.value}%</span>
                <div>
                  <button
                    onClick={() => showDeleteConfirmation(tasa.id)}
                    className="text-red-700 hover:text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Tax;
