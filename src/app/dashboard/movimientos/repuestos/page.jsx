'use client'
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch, AiFillPlusCircle, AiFillMinusCircle, AiFillDelete,AiFillEdit } from 'react-icons/ai';
import axios from 'axios';

export default function ProductsMovements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productMovements, setProductMovements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25; // Cantidad de elementos por página

  useEffect(() => {
    axios.get("/api/movimientos/productos")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setProductMovements(sortedData);
      })
      .catch((error) => {
        console.error("Error al cargar los movimientos de productos:", error);
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
      case 'entrada':
        return <AiFillPlusCircle className="text-green-700 mr-2" />;
      case 'eliminado':
        return <AiFillDelete className="text-red-500 mr-2" />;
      case 'disminuido':
        return <AiFillMinusCircle className="text-orange-500 mr-2" />;
      case 'editado':
        return <AiFillEdit className="text-yellow-500 mr-2" />;
      default:
        return null; // No icon for other types
    }
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productMovements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productMovements.length / itemsPerPage);

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
          placeholder="Buscar movimientos de productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 outline-none flex-1"
        />
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left bg-slate-200 rounded-lg">
          <thead className="text-xs font-semibold uppercase text-white bg-cyan-950">
            <tr>
              <th className="px-6 py-3">Fecha y Hora</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Cantidad</th>
              <th className="px-6 py-3">Tipo de Operación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black">
            {currentItems
              .filter((movement) => {
                const searchTermLower = searchTerm.toLowerCase();
                return (
                  movement.fecha.toLowerCase().includes(searchTermLower) ||
                  movement.tipo_operacion.toLowerCase().includes(searchTermLower) ||
                  movement.nombre.toLowerCase().includes(searchTermLower) ||
                  movement.cantidad.toString().includes(searchTermLower)
                );
              })
              .map((movement, index) => (
                <tr key={index} className="hover:bg-gray-500">
                  <td className="px-6 py-4 text-black">{formatDateTime(movement.fecha)}</td>
                  <td className="px-6 py-4 text-black">{movement.nombre}</td>
                  <td className="px-6 py-4 text-black">{movement.cantidad}</td>
                  <td className="px-6 py-4 flex items-center">
                    {getOperationIcon(movement.tipo_operacion)}
                    <span className="font-medium text-sm text-black">{movement.tipo_operacion}</span>
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
