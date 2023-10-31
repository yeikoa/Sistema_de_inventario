'use client'
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';

export default function ProviderMovements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [providerMovements, setProviderMovements] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a tu API para obtener los movimientos de proveedores
    axios.get("/api/movimientos/proveedores")
      .then((response) => {
        setProviderMovements(response.data); 
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
      case 'Agregado':
        return 'bg-green-300 border border-4 border-green-300 rounded';
      case 'Editado':
        return 'bg-blue-300 border-4 border-blue-300 rounded';
      case 'Inactivo':
        return 'bg-red-300 border-4 border-red-300 rounded';
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
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Proveedor</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Vendedor</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Telefono</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Correo</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Direccion</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm uppercase font-semibold text-gray-600">Tipo de Operación</th>
            </tr>
          </thead>
          <tbody>
            {providerMovements
              .filter((movement) => {
                const searchTermLower = searchTerm.toLowerCase();
                return (
                  movement.nombre.toLowerCase().includes(searchTermLower) ||
                  movement.vendedor.toLowerCase().includes(searchTermLower) ||
                  movement.telefono.toLowerCase().includes(searchTermLower) ||
                  movement.email.toString().includes(searchTermLower) ||
                  movement.direccion.toLowerCase().includes(searchTermLower) ||
                  movement.estado.toLowerCase().includes(searchTermLower) ||
                  movement.fecha_cambio.toLowerCase().includes(searchTermLower)
                );
              })
              .map((movement, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {formatDateTime(movement.fecha_cambio)}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.nombre}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.vendedor}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.telefono}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.email}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm">
                    {movement.direccion}
                  </td>
                  <td className={`py-2 px-4 border-b border-gray-300 text-sm`}>
                    <span className={getOperationBackgroundClass(movement.estado)}>
                      {movement.estado}
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
