'use client'
import { useState } from "react";
import { FaSave, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function RegisterProvider() {
  const [providerName, setProviderName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agregar lógica para guardar el proveedor en el sistema
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="mx-auto p-6 bg-gray-200 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Registrar Nuevo Proveedor</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="providerName" className="text-sm font-medium mb-2 flex items-center">
              <FaUser className="text-gray-600 mr-2" />
              Nombre del Proveedor
            </label>
            <input
              type="text"
              id="providerName"
              className="w-full md:w-2/3 border rounded p-2"
              placeholder="Ingrese el nombre del proveedor"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="contactName" className="text-sm font-medium mb-2 flex items-center">
              <FaUser className="text-gray-600 mr-2" />
              Nombre del Contacto
            </label>
            <input
              type="text"
              id="contactName"
              className="w-full md:w-2/3 border rounded p-2"
              placeholder="Ingrese el nombre del contacto"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="text-sm font-medium mb-2 flex items-center">
              <FaPhone className="text-gray-600 mr-2" />
              Número de Teléfono
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="w-full md:w-2/3 border rounded p-2"
              placeholder="Ingrese el número de teléfono"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium mb-2 flex items-center">
              <FaEnvelope className="text-gray-600 mr-2" />
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full md:w-2/3 border rounded p-2"
              placeholder="Ingrese el email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-medium mb-2 flex items-center">
              <FaMapMarkerAlt className="text-gray-600 mr-2" />
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className="w-full md:w-2/3 border rounded p-2"
              placeholder="Ingrese la dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
          >
            <FaSave className="mr-2" />
            Registrar Proveedor
          </button>
        </form>
      </div>
    </div>
  );
}
