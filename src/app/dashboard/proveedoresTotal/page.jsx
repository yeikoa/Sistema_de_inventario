"use client"
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Provider() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const providers = [
    // ... tus datos de proveedores ...
    {
      id: 1,
      nombre: "Proveedor 1",
      telefono: "123-456-7890",
      email: "proveedor1@example.com",
      direccion: "Calle 123, Ciudad",
    },
    {
      id: 1,
      nombre: "Proveedor 1",
      telefono: "123-456-7890",
      email: "proveedor1@example.com",
      direccion: "Calle 123, Ciudad",
    },
    {
      id: 1,
      nombre: "Proveedor 1",
      telefono: "123-456-7890",
      email: "proveedor1@example.com",
      direccion: "Calle 123, Ciudad",
    },
    {
      id: 1,
      nombre: "Proveedor 1",
      telefono: "123-456-7890",
      email: "proveedor1@example.com",
      direccion: "Calle 123, Ciudad",
    },
    {
      id: 1,
      nombre: "Proveedor 1",
      telefono: "123-456-7890",
      email: "proveedor1@example.com",
      direccion: "Calle 123, Ciudad",
    },
    {
      id: 1,
      nombre: "Coca cola",
      telefono: "88-88-88-88",
      email: "proveedor1@example.com",
      direccion: "Calle 123, Ciudad",
    },
    {
      id: 1,
      nombre: "Proveedor 1",
      telefono: "123-456-7890",
      email: "ejemplo@example.com",
      direccion: "Calle 123, Ciudad",
    },
    {
      id: 1,
      nombre: "Proveedor 1",
      telefono: "123-456-7890",
      email: "proveedor1@example.com",
      direccion: "Catolica 123, Ciudad",
    }
  ];

  const handleEdit = (id) => {
    // Lógica para editar el proveedor
  };

  const handleDelete = (id) => {
    // Lógica para eliminar el proveedor
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-4 mt-8 flex border border-gray-300 rounded-md px-4 py-2">
        <AiOutlineSearch className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Buscar proveedores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 outline-none flex-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {providers
          .filter((provider) => {
            const searchTermLower = searchTerm.toLowerCase();
            return (
              provider.nombre.toLowerCase().includes(searchTermLower) ||
              provider.telefono.toLowerCase().includes(searchTermLower) ||
              provider.email.toLowerCase().includes(searchTermLower) ||
              provider.direccion.toLowerCase().includes(searchTermLower)
            );
          })
          .map((provider) => (
            <div key={provider.id} className="border border-gray-300 p-4 rounded-md shadow-md w-full">
              <h2 className="text-lg font-semibold">{provider.nombre}</h2>
              <p className="text-gray-600 mt-2">Teléfono: {provider.telefono}</p>
              <p className="text-gray-600">Email: {provider.email}</p>
              <p className="text-gray-600">Dirección: {provider.direccion}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => handleEdit(provider.id)}
                >
                  Editar
                </button>
                <button
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(provider.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
