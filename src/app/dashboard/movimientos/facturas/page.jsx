'use client'
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function BillsMovements() {
  const [searchTerm, setSearchTerm] = useState("");

  const billMovements = [
    // ... tus datos de movimientos de productos ...
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
    // Agregar más movimientos de productos aquí
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 mt-8 flex border border-gray-300 rounded-md px-4 py-2">
        <AiOutlineSearch className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Buscar movimiento de facturas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 outline-none flex-1"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
          <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Numero de factura</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Proveedor</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Precio total</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Fecha</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Hora</th>
            </tr>
          </thead>
          <tbody>
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
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.nfactura}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.proveedor}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm ">
                    {movement.precio}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.fecha}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.hora}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
