'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';
import { FaFileInvoice } from 'react-icons/fa';

export default function BillsMovements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [data, setData] = useState([]);
  const[data2, setData2] = useState([]); 
  const [billDetails, setBillDetails] = useState(null);

  useEffect(() => {
    axios.get("/api/movimientos/facturas")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de productos", error);
      });
  }, []);

  const openBillDetails = (bill) => {
    setSelectedBill(bill);
    axios.get(`/api/movimientos/detalle/${bill.factura_id}`)
      .then((response) => {
        setBillDetails(response.data); 
      })
      .catch((error) => {
        console.error("Error al obtener detalles de la factura", error);
      });
  };

  const closeBillDetails = () => {
    setSelectedBill(null);
    setBillDetails(null);
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
        {data.filter((movement) => {
          const searchTermLower = searchTerm.toLowerCase();
          return (
            movement.codigoFactura?.toLowerCase().includes(searchTermLower) ||
            movement.proveedor_nombre?.toLowerCase().includes(searchTermLower) ||
            movement.total?.toString().toLowerCase().includes(searchTermLower) ||
            movement.fecha?.toLowerCase().includes(searchTermLower) ||
            movement.hora?.toString().toLowerCase().includes(searchTermLower)
          );
        }).map((movement, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-md shadow-md w-full relative">
            <h2 className="text-lg font-semibold">{movement.codigoFactura}</h2>
            <p className="text-gray-600 mt-2">Proveedor: {movement.proveedor_nombre}</p>
            <p className="text-gray-600">Precio: {movement.total} ₡</p>
            <p className="text-gray-600">Fecha: {movement.fecha}</p>

            <button
              className="absolute top-16 right-12 w-10 h-10"
              onClick={() => openBillDetails(movement)}
            >
              <FaFileInvoice className="text-cyan-950 text-5xl inline-block mr-2" />
            </button>
          </div>
        ))}
      </div>

      {selectedBill && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
    <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 overflow-y-auto rounded-lg shadow-lg border-2 border-cyan-950 relative" style={{ maxHeight: "80vh" }}>
      <button
        onClick={closeBillDetails}
        className="absolute top-2 right-2 text-red-900 hover:text-red-700 transition duration-300 ease-in-out"
      >
        <AiFillCloseCircle className="text-3xl" />
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-cyan-950">Detalles de la factura</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Aquí puedes poner más detalles del encabezado de la factura si lo necesitas */}
      </div>
      <div className="mt-4">
        {billDetails && billDetails.map((detail, index) => (
          <div key={index} className="border-t border-gray-300 pt-4">
            <p className="text-gray-700 font-semibold">Detalle {index + 1}</p>
            <p>Producto: {detail.nombreProducto}</p>
            <p>Cantidad: {detail.cantidad}</p>
            <p>Precio Unitario: {detail.precio_compra}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
    </div>
  );
}
