'use client'
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function ProductsMovements() {
  const [searchTerm, setSearchTerm] = useState("");

  const productMovements = [
    // ... tus datos de movimientos de productos ...
    {
      fecha: '2023-08-27',
      hora: '09:30 AM',
      codigo: 'P123',
      nombre: 'Producto A',
      cantidad: 10,
      tipoMovimiento: 'Entrada',
    },
    {
      fecha: '2023-08-27',
      hora: '02:15 PM',
      codigo: 'P124',
      nombre: 'Producto B',
      cantidad: 5,
      tipoMovimiento: 'Salida',
    },
    // Agregar más movimientos de productos aquí
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 mt-8 flex border border-gray-300 rounded-md px-4 py-2">
        <AiOutlineSearch className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Buscar movimientos de repuestos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 outline-none flex-1"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
          <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Fecha</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Hora</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Código</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Nombre</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Cantidad</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Entrada/Salida</th>
            </tr>
          </thead>
          <tbody>
            {productMovements
              .filter((movement) => {
                const searchTermLower = searchTerm.toLowerCase();
                return (
                  movement.fecha.toLowerCase().includes(searchTermLower) ||
                  movement.hora.toLowerCase().includes(searchTermLower) ||
                  movement.codigo.toLowerCase().includes(searchTermLower) ||
                  movement.nombre.toLowerCase().includes(searchTermLower) ||
                  movement.cantidad.toString().includes(searchTermLower) ||
                  movement.tipoMovimiento.toLowerCase().includes(searchTermLower)
                );
              })
              .map((movement, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.fecha}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.hora}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm ">
                    {movement.codigo}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.nombre}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.cantidad}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.tipoMovimiento === 'Entrada' ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {movement.tipoMovimiento}
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        {movement.tipoMovimiento}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
