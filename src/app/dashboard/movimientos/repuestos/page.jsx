'use client'
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';

export default function ProductsMovements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productMovements, setProductMovements] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a tu API para obtener los movimientos de productos
    axios.get("/api/movimientos/productos")
      .then((response) => {
        setProductMovements(response.data); // Asigna los datos de la respuesta a productMovements
      })
      .catch((error) => {
        console.error("Error al cargar los movimientos de productos:", error);
      });
  }, []);

  // Función para formatear la fecha y hora en un formato más legible
  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Habilita el formato 12 horas (AM/PM)
    };
    return dateTime.toLocaleString(undefined, options);
  };

  // Función para asignar una clase CSS de fondo en función del tipo de operación
  const getOperationBackgroundClass = (tipoOperacion) => {
    switch (tipoOperacion) {
      case 'entrada':
        return 'bg-green-100 border border-4 border-green-100';
      case 'agregado':
        return 'bg-blue-100 border-4 border-blue-100';
      case 'eliminado':
        return 'bg-red-100 border-4 border-red-100';
      case 'disminuido':
        return 'bg-orange-100 border-4 border-orange-100';
      default:
        return '';
    }
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
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Fecha y Hora</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Nombre</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Cantidad</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Tipo de Operación</th>
            </tr>
          </thead>
          <tbody>
            {productMovements
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
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {formatDateTime(movement.fecha)}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.nombre}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.cantidad}
                  </td>
                  <td className={`py-2 px-4 border-b border-gray-300 text-sm`}>
                    <span className={getOperationBackgroundClass(movement.tipo_operacion)}>
                      {movement.tipo_operacion}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
