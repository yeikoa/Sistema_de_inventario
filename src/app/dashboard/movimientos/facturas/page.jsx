'use client'
import React, { useState } from 'react';
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';
import { FaFileInvoice } from 'react-icons/fa';

export default function BillsMovements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);

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

  const openBillDetails = (bill) => {
    setSelectedBill(bill);
  };

  const closeBillDetails = () => {
    setSelectedBill(null);
  };

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
              className="border border-gray-300 p-4 rounded-md shadow-md w-full relative"
            >
              <h2 className="text-lg font-semibold">{movement.nfactura}</h2>
              <p className="text-gray-600 mt-2">Proveedor: {movement.proveedor}</p>
              <p className="text-gray-600">Precio: {movement.precio}</p>
              <p className="text-gray-600">Fecha: {movement.fecha}</p>
              <p className="text-gray-600">Hora: {movement.hora}</p>

              <button
                className="absolute top-16 right-12 w-10 h-10"
                onClick={() => openBillDetails(movement)}
              >
                <FaFileInvoice className="text-cyan-950 text-5xl inline-block mr-2" />
              </button>
            </div>
          ))}
      </div>

      {/* Ventana emergente para mostrar detalles de la factura */}
      {selectedBill && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white w-1/2 p-8 rounded-lg shadow-lg border-2 border-cyan-950 relative">
            <button
              onClick={closeBillDetails}
              className="absolute top-2 right-2 text-red-900 hover:text-red-700 transition duration-300 ease-in-out"
            >
              <AiFillCloseCircle className="text-3xl" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-cyan-950">Detalles de la factura</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 font-semibold">Factura ID:</p>
                <p className="text-gray-900">{selectedBill.nfactura}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Proveedor:</p>
                <p className="text-gray-900">{selectedBill.proveedor}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Precio:</p>
                <p className="text-gray-900">{selectedBill.precio}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Fecha:</p>
                <p className="text-gray-900">{selectedBill.fecha}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Hora:</p>
                <p className="text-gray-900">{selectedBill.hora}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}