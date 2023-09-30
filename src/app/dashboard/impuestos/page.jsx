'use client'
import React, { useState } from 'react';
import { FaSave, FaBarcode, FaUser, FaCalendar, FaBoxes, FaComment } from 'react-icons/fa';

function Tax() {
  const [TaxID, setTaxID] = useState('');
  const [TaxName, setTaxName] = useState('');
  const [TaxTasa, setTaxTasa] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!TaxName || !TaxTasa) {
      setError('Todos los campos son obligatorios');
      return;
    }
    // Agregar lógica para guardar la nueva tasa de impuestos en el sistema

    setSuccess('Devolución registrada con éxito');
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

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="TaxName" className="text-sm font-medium mb-2 flex items-center">
              <FaBarcode className="mr-2" />
              Impuesto
            </label>
            <input
              type="number"
              id="TaxName"
              className="w-full border rounded p-2 text-black"
              placeholder="Nombre del impuesto"
              value={TaxName}
              onChange={(e) => setTaxName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="TaxTasa" className="text-sm font-medium mb-2 flex items-center">
              <FaUser className="mr-2" />
              Tasa
            </label>
            <input
              type="number"
              id="TaxTasa"
              className="w-full border rounded p-2 text-black"
              placeholder="Ingrese la tasa del producto"
              value={TaxTasa}
              onChange={(e) => setTaxTasa(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
          >
            <FaSave className="mr-2" />
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default Tax;
