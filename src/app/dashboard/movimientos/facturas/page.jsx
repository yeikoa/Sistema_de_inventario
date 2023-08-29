'use client'
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function BillsMovements() {
  const [searchTerm, setSearchTerm] = useState("");

  const billMovements = [
    // ... your bill movements data ...
    {
      nfactura: '453254524',
      proveedor: 'Coca cola',
      precio: '100000',
      fecha: '2023-08-27',
      hora: '09:30 AM',
    },
    {
      nfactura: '8878355920',
      proveedor: 'Farvasia',
      precio: '150000',
      fecha: '2023-09-29',
      hora: '09:30 AM',
    },
    {
      nfactura: '8878355920',
      proveedor: 'Farvasia',
      precio: '150000',
      fecha: '2023-09-29',
      hora: '09:30 AM',
    },
    {
      nfactura: '8878355920',
      proveedor: 'Farvasia',
      precio: '150000',
      fecha: '2023-09-29',
      hora: '09:30 AM',
    },
    {
      nfactura: '8878355920',
      proveedor: 'Farvasia',
      precio: '150000',
      fecha: '2023-09-29',
      hora: '09:30 AM',
    },
    {
      nfactura: '8878355920',
      proveedor: 'Farvasia',
      precio: '150000',
      fecha: '2023-09-29',
      hora: '09:30 AM',
    },
    {
      nfactura: '8878355920',
      proveedor: 'Farvasia',
      precio: '150000',
      fecha: '2023-09-29',
      hora: '09:30 AM',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-4 mt-8 flex border border-gray-300 rounded-md px-4 py-2">
        <AiOutlineSearch className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Buscar facturas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 outline-none flex-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {billMovements
          .filter((movement) => {
            const searchTermLower = searchTerm.toLowerCase();
            return (
              movement.nfactura.toLowerCase().includes(searchTermLower) ||
              movement.proveedor.toLowerCase().includes(searchTermLower) ||
              movement.precio.toLowerCase().includes(searchTermLower) ||
              movement.fecha.toLowerCase().includes(searchTermLower) ||
              movement.hora.toString().includes(searchTermLower)
            );
          })
          .map((movement, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-md shadow-md w-full"
            >
              <h2 className="text-lg font-semibold">{movement.nfactura}</h2>
              <p className="text-gray-600 mt-2">Proveedor: {movement.proveedor}</p>
              <p className="text-gray-600">Precio: {movement.precio}</p>
              <p className="text-gray-600">Fecha: {movement.fecha}</p>
              <p className="text-gray-600">Hora: {movement.hora}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
