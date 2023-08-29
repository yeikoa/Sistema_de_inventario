'use client'
import React, { useState } from 'react';
import { FaSave, FaBarcode, FaUser, FaCalendar, FaBoxes, FaComment } from 'react-icons/fa';

function Devolutions() {
  const [productId, setProductId] = useState('');
  const [userId, setUserId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnedQuantity, setReturnedQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!productId || !userId || !returnDate || !returnedQuantity || !reason) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (returnedQuantity <= 0) {
      setError('La cantidad devuelta debe ser un número positivo');
      return;
    }

    // Agregar lógica para guardar la devolución en el sistema

    setSuccess('Devolución registrada con éxito');
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="mx-auto p-6 bg-cyan-950 text-white rounded-lg shadow-md w-full md:w-2/3">
        <h1 className="text-2xl font-semibold mb-4 text-center">Devolución</h1>

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
            <label htmlFor="productId" className="text-sm font-medium mb-2 flex items-center">
              <FaBarcode className="mr-2" />
              Producto ID
            </label>
            <input
              type="number"
              id="productId"
              className="w-full border rounded p-2 text-black"
              placeholder="Ingrese el ID del producto"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="userId" className="text-sm font-medium mb-2 flex items-center">
              <FaUser className="mr-2" />
              Usuario ID
            </label>
            <input
              type="number"
              id="userId"
              className="w-full border rounded p-2 text-black"
              placeholder="Ingrese el ID del usuario"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="returnDate" className="text-sm font-medium mb-2 flex items-center">
              <FaCalendar className="mr-2" />
              Fecha de Devolución
            </label>
            <input
              type="date"
              id="returnDate"
              className="w-full border rounded p-2 text-black"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="returnedQuantity" className="text-sm font-medium mb-2 flex items-center">
              <FaBoxes className="mr-2" />
              Cantidad Devuelta
            </label>
            <input
              type="number"
              id="returnedQuantity"
              className="w-full border rounded p-2 text-black"
              placeholder="Ingrese la cantidad devuelta"
              value={returnedQuantity}
              onChange={(e) => setReturnedQuantity(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="reason" className="text-sm font-medium mb-2 flex items-center">
              <FaComment className="mr-2" />
              Motivo
            </label>
            <input
              type="text"
              id="reason"
              className="w-full border rounded p-2 text-black"
              placeholder="Ingrese el motivo de la devolución"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
          >
            <FaSave className="mr-2" />
            Registrar Devolución
          </button>
        </form>
      </div>
    </div>
  );
}

export default Devolutions;
