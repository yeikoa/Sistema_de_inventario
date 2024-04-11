'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';
import { FcFinePrint } from "react-icons/fc";

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
    <div className="max-w-7xl mx-auto px-4 bg-white">
      <div className="mb-4 mt-8 flex border border-gray-300 bg-white rounded-md px-4 py-2">
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
          <div key={index} className="border border-white bg-cyan-950  hover:bg-cyan-800 p-4 rounded-md shadow-md w-full">
            <h2 className="text-lg font-semibold text-white">{movement.codigoFactura}</h2>
            <p className="text-gray-200 mt-2">Proveedor: {movement.proveedor_nombre}</p>
            <p className="text-gray-200">Precio: {movement.total} </p>
            <p className="text-gray-200">Fecha: {movement.fecha}</p>

            <button
            id='btnDetalleFactura'
              className="ml-auto w-16 h-16 flex items-center justify-center"
              onClick={() => openBillDetails(movement)}
            >
              <FcFinePrint  className=" text-5xl inline-block mt--4 mr-2" />
            </button>
          </div>
        ))}
      </div>

      {selectedBill && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 transition duration-300 ease-in-out">
    <div className="bg-gray-200 w-full max-w-lg p-6 rounded-lg shadow-xl border-2 border-white relative overflow-y-auto" style={{ maxHeight: "80vh" }}>
      <button
      id='btnCerrarDetalleFactura'
        onClick={closeBillDetails}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
      >
        <AiFillCloseCircle className="text-2xl" />
      </button>
      <h2 className="text-xl font-semibold text-cyan-950 mb-4">Detalles de Factura - {selectedBill.codigoFactura}</h2>
      <div className="mb-4">
        {/*  más detalles del encabezado de la factura  */}
      </div>
      <div>
        {billDetails && billDetails.map((detail, index) => (
          <div key={index} className="border-b border-black py-2">
            <p className="text-gray-500 font-medium">Detalle {index + 1}</p>
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
