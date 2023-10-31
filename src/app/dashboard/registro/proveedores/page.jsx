'use client'
import axios from "axios";
import { useState } from "react";
import {FaSave, FaUser, FaBuilding, FaPhone, FaEnvelope, FaMapMarkedAlt} from "react-icons/fa";

export default function FormularioProveedor() {
  const [proveedor, setProveedor] = useState({
    nombre: "",
    vendedor: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleCambios = (e) => {
    setProveedor({
      ...proveedor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    // Validación de los campos requeridos
    if (!proveedor.nombre || !proveedor.vendedor || !proveedor.telefono || !proveedor.email || !proveedor.direccion) {
      setError("Todos los campos son obligatorios. Por favor, complete todos los campos.");
      return;
    }

    // Validación del formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(proveedor.email)) {
      setError("El formato del correo electrónico es inválido. Por favor, ingrese un correo electrónico válido.");
      return;
    }

    // Aquí se pueden añadir más validaciones personalizadas si es necesario

    try {
      // Enviar datos al servidor para registrar el proveedor
      const respuesta = await axios.post("/api/proveedores", proveedor);

      if (respuesta.data.exito) {
        //Se guardan los datos correctamente, pero no se ejecuta
        //el if por eso la logica se implementa en el else
        //dado que se esta haciendo el registro de manera correcta
        setExito("Proveedor registrado con éxito");
      } else {
        const providerId = respuesta.data.id;
        const registroProveedorData = {
          proveedor_id: providerId,
          nombre: proveedor.nombre,
          vendedor: proveedor.vendedor,
          telefono: proveedor.telefono,
          email: proveedor.email,
          direccion: proveedor.direccion,
          estado: "Agregado",
          fecha_cambio: new Date().toISOString(),
        };
        const registroResponse = await axios.post("/api/movimientos/proveedores", registroProveedorData);
        if (registroResponse.data.exito) {
          setProveedor({
            nombre: "",
            vendedor: "",
            telefono: "",
            email: "",
            direccion: "",
          });
        }
        setExito("El Proveedor se a registrado con éxito");
      }
    } catch (error) {
      console.error(error);
      setError("Error al registrar el proveedor. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="mx-auto p-6 bg-cyan-950 text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Registrar Nuevo Proveedor</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {exito && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {exito}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre" className="text-sm font-medium mb-2 flex items-center">
              <FaBuilding className="mr-2" />Nombre del proveedor
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full md:w-2/3 border rounded p-2 text-black"
              placeholder="Ingrese el nombre de la empresa"
              value={proveedor.nombre}
              onChange={handleCambios}
            />
          </div>

          <div>
            <label htmlFor="vendedor" className="text-sm font-medium mb-2 flex items-center">
              <FaUser className="mr-2" />Nombre del vendedor
            </label>
            <input
              type="text"
              id="vendedor"
              name="vendedor"
              className="w-full md:w-2/3 border rounded p-2 text-black"
              placeholder="Ingrese el nombre del vendedor"
              value={proveedor.vendedor}
              onChange={handleCambios}
            />
          </div>

          <div>
            <label htmlFor="telefono" className="text-sm font-medium mb-2 flex items-center">
              <FaPhone className="mr-2" />Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              className="w-full md:w-2/3 border rounded p-2 text-black"
              placeholder="Ingrese el teléfono de contacto"
              value={proveedor.telefono}
              onChange={handleCambios}
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium mb-2 flex items-center">
              <FaEnvelope className="mr-2" />Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full md:w-2/3 border rounded p-2 text-black"
              placeholder="Ingrese el correo electrónico"
              value={proveedor.email}
              onChange={handleCambios}
            />
          </div>

          <div>
            <label htmlFor="direccion" className="text-sm font-medium mb-2 flex items-center">
              <FaMapMarkedAlt className="mr-2" />Dirección
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              className="w-full md:w-2/3 border rounded p-2 text-black"
              placeholder="Ingrese la dirección de la empresa"
              value={proveedor.direccion}
              onChange={handleCambios}
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
