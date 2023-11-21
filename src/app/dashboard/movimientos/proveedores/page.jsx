'use client'
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiFillPlusCircle, AiFillMinusCircle, AiFillDelete } from 'react-icons/ai';
import axios from 'axios';

export default function ProviderMovements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [providerMovements, setProviderMovements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    axios.get("/api/movimientos/proveedores")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => new Date(b.fecha_cambio) - new Date(a.fecha_cambio));
        setProviderMovements(sortedData); 
      })
      .catch((error) => {
        console.error("Error al cargar los movimientos de proveedores:", error);
      });
  }, []);

  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const options = {
      year: 'numeric', month: 'long', day: 'numeric', 
      hour: 'numeric', minute: 'numeric', hour12: true,
    };
    return dateTime.toLocaleString(undefined, options);
  };

  const getOperationIcon = (tipoOperacion) => {
    switch (tipoOperacion) {
      case 'Agregado':
        return <AiFillPlusCircle className="text-green-700 mr-2" />;
      case 'Inactivo':
        return <AiFillDelete className="text-red-500 mr-2" />;
      case 'Editado':
        return <AiFillMinusCircle className="text-blue-500 mr-2" />;
      default:
        return null;
    }
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = providerMovements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(providerMovements.length / itemsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 mt-8 flex border border-gray-300 rounded-md px-4 py-2">
        <AiOutlineSearch className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Buscar movimientos de los proveedores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 outline-none flex-1"
        />
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left bg-slate-200 rounded-lg">
          <thead className="text-xs font-semibold uppercase text-white bg-cyan-950">
            <tr>
              <th className="px-2 py-3">Fecha y Hora</th>
              <th className="px-2 py-3">Proveedor</th>
              <th className="px-2 py-3">Vendedor</th>
              <th className="px-2 py-3">Teléfono</th>
              <th className="px-2 py-3">Correo</th>
              <th className="px-2 py-3">Dirección</th>
              <th className="px-2 py-3 text-center">Tipo de Operación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black">
            {currentItems
              .filter((movement) => {
                const searchTermLower = searchTerm.toLowerCase();
                return (
                  movement.nombre.toLowerCase().includes(searchTermLower) ||
                  movement.vendedor.toLowerCase().includes(searchTermLower) ||
                  movement.telefono.toLowerCase().includes(searchTermLower) ||
                  movement.email.toLowerCase().includes(searchTermLower) ||
                  movement.direccion.toLowerCase().includes(searchTermLower) ||
                  movement.estado.toLowerCase().includes(searchTermLower) ||
                  movement.fecha_cambio.toLowerCase().includes(searchTermLower)
                );
              })
              .map((movement, index) => (
                <tr key={index} className="hover:bg-gray-500">
                  <td className="px-2 py-2 text-black">{formatDateTime(movement.fecha_cambio)}</td>
                  <td className="px-2 py-2 text-black">{movement.nombre}</td>
                  <td className="px-2 py-2 text-black">{movement.vendedor}</td>
                  <td className="px-2 py-2 text-black">{movement.telefono}</td>
                  <td className="px-2 py-2 text-black">{movement.email}</td>
                  <td className="px-2 py-2 text-black">{movement.direccion}</td>
                  <td className="px-2 py-2 flex justify-center items-center">
                    {getOperationIcon(movement.estado)}
                    <span className="font-medium text-sm text-black">{movement.estado}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {[...Array(totalPages).keys()].map(number => (
          <button 
            key={number} 
            onClick={() => changePage(number + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-cyan-950 text-white' : 'bg-slate-200'}`}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}