'use client'
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';

export default function Provider() {
  const [searchTerm, setSearchTerm] = useState("");
  const [providers, setProviders] = useState([]);
  const [editedProviders, setEditedProviders] = useState({});

  useEffect(() => {
    axios.get("/api/proveedores")
      .then((response) => {
        setProviders(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los proveedores:", error);
      });
  }, []);

  const formatDateTime = (dateTimeStr) => {
    return new Date(dateTimeStr).toISOString();
};


  const handleEdit = (provider) => {
    const editedProvidersCopy = { ...editedProviders };

    if (editedProvidersCopy[provider.proveedor_id]) {
      const { nombre, vendedor, email, telefono, direccion } = editedProvidersCopy[provider.proveedor_id];
      const updatedProvider = {
        nombre: nombre !== undefined ? nombre : provider.nombre,
        vendedor: vendedor !== undefined ? vendedor : provider.vendedor,
        email: email !== undefined ? email : provider.email,
        telefono: telefono !== undefined ? telefono : provider.telefono,
        direccion: direccion !== undefined ? direccion : provider.direccion,
      };
  
      console.log('updatedProvider:', updatedProvider);
      console.log("ID del proveedor:", provider.proveedor_id);
      axios.put(`/api/proveedores/${provider.proveedor_id}`, updatedProvider)
        .then((response) => {
          console.log("Respuesta de actualización:", response.data);
          // Actualizar el estado de providers si es necesario
          const updatedProviders = providers.map((p) =>
            p.proveedor_id === provider.proveedor_id ? { ...p, ...updatedProvider } : p
          );
          setProviders(updatedProviders);

          //Esta parte solo se debe ejecutar después de editar con éxito
        const providerData = {
          proveedor_id: provider.proveedor_id,
          nombre: provider.nombre,
          vendedor: provider.vendedor,
          telefono: provider.telefono,
          email: provider.email,
          direccion: provider.direccion,
          estado: 'Editado',
          fecha_cambio: formatDateTime(new Date())
        };

        // Cambio en la solicitud delete
        axios.post(`/api/movimientos/proveedores`, providerData)
          .then((response) => {
            console.log("Registro de edicion completado:", response.data);
          })
          .catch((error) => {
            console.error(`Error al registrar la edicion del proveedor`, error);
          });

        })
        .catch((error) => {
          console.error(`Error al actualizar el proveedor con ID ${provider.proveedor_id}:`, error);
        });
      delete editedProvidersCopy[provider.proveedor_id];

      
    } else {
      editedProvidersCopy[provider.proveedor_id] = { ...provider };
    }
  
    setEditedProviders(editedProvidersCopy);

    
    
  };

  const handleInputChange = (e, field, provider) => {
    const value = e.target.value;
    setEditedProviders((prevEditedProviders) => ({
      ...prevEditedProviders,
      [provider.proveedor_id]: {
        ...prevEditedProviders[provider.proveedor_id],
        [field]: value,
      },
    }));
  };

  const handleDelete = (proveedor_id, provider) => { // Asegúrese de que provider se pasa aquí

    console.log("ID a eliminar:", proveedor_id);
    axios.delete(`/api/proveedores/${proveedor_id}`)
      .then((response) => {
        console.log("Respuesta de eliminación:", response.data);
        const editedProvidersCopy = { ...editedProviders };
        delete editedProvidersCopy[proveedor_id];
        setEditedProviders(editedProvidersCopy);

        // Si esta parte solo se debe ejecutar después de eliminar con éxito, debe ir aquí dentro
        const providerData = {
          proveedor_id: provider.proveedor_id,
          nombre: provider.nombre,
          vendedor: provider.vendedor,
          telefono: provider.telefono,
          email: provider.email,
          direccion: provider.direccion,
          estado: 'Inactivo',
          fecha_cambio: formatDateTime(new Date())
        };

        // Cambio en la solicitud delete
        axios.post(`/api/movimientos/proveedores`, providerData)
          .then((response) => {
            console.log("Registro de eliminación completado:", response.data);
          })
          .catch((error) => {
            console.error(`Error al registrar la eliminación del proveedor`, error);
          });
        
      })
      .catch((error) => {
        console.error(`Error al eliminar el proveedor con ID ${proveedor_id}:`, error);
      });
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
          .map((row) => (
            <div key={row.proveedor_id} className="border border-gray-300 p-4 rounded-md shadow-md w-full">
              <div>
                {editedProviders[row.proveedor_id] ? (
                  <div>
                    <input
                      type="text"
                      value={editedProviders[row.proveedor_id].nombre || ""}
                      onChange={(e) => handleInputChange(e, "nombre", row)}
                    />
                    <input
                      type="text"
                      value={editedProviders[row.proveedor_id].vendedor || ""}
                      onChange={(e) => handleInputChange(e, "vendedor", row)}
                    />
                    <input
                      type="text"
                      value={editedProviders[row.proveedor_id].email || ""}
                      onChange={(e) => handleInputChange(e, "email", row)}
                    />
                    <input
                      type="text"
                      value={editedProviders[row.proveedor_id].telefono || ""}
                      onChange={(e) => handleInputChange(e, "telefono", row)}
                    />
                    <input
                      type="text"
                      value={editedProviders[row.proveedor_id].direccion || ""}
                      onChange={(e) => handleInputChange(e, "direccion", row)}
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-lg font-semibold">{row.nombre}</h2>
                    <p className="text-gray-600">Vendedor: {row.vendedor}</p>
                    <p className="text-gray-600 mt-2">Teléfono: {row.telefono}</p>
                    <p className="text-gray-600">Email: {row.email}</p>
                    <p className="text-gray-600">Dirección: {row.direccion}</p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  className={`px-3 py-1 text-sm ${editedProviders[row.proveedor_id] ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-md hover:bg-blue-600`}
                  onClick={() => handleEdit(row)}
                >
                  {editedProviders[row.proveedor_id] ? 'Guardar' : 'Editar'}
                </button>
                <button
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover-bg-red-600"
                  onClick={() => {
                    console.log('Se hizo clic en el botón de eliminar');
                    handleDelete(row.proveedor_id, row); // Pasa row como segundo argumento
                  }}                  
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
