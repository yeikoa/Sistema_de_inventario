"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import { FaSave, FaUser, FaBuilding, FaPhone, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormularioProveedor() {
  const [proveedor, setProveedor] = useState({
    nombre: "",
    vendedor: "",
    telefono: "",
    email: "",
    direccion: "",
  });
  const [proveedoresExistentes, setProveedoresExistentes] = useState([]);

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    try {
      const response = await axios.get("/api/proveedores");
      setProveedoresExistentes(response.data);
    } catch (error) {
      console.error("Error al cargar los proveedores:", error);
    }
  };

  const handleCambios = (e) => {
    setProveedor({
      ...proveedor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!proveedor.nombre || !proveedor.vendedor || !proveedor.telefono || !proveedor.email || !proveedor.direccion) {
      toast.error("Todos los campos son obligatorios. Por favor, complete todos los campos.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(proveedor.email)) {
      toast.error("El formato del correo electrónico es inválido. Por favor, ingrese un correo electrónico válido.");
      return;
    }

    // Verificar si ya existe un proveedor con el mismo nombre de vendedor
    const proveedorExistente = proveedoresExistentes.find((prov) => prov.vendedor === proveedor.vendedor);
    if (proveedorExistente) {
      toast.error("Ya existe un proveedor con el mismo nombre de vendedor.");
      return;
    }

    try {
      const respuesta = await axios.post("/api/proveedores", proveedor);

      if (respuesta.data.success) {
        toast.success("Proveedor registrado con éxito");
        setProveedor({
          nombre: "",
          vendedor: "",
          telefono: "",
          email: "",
          direccion: "",
        });
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
        if (registroResponse.data.success) {
          toast.success("El Proveedor se a registrado con éxito");
          setProveedor({
            nombre: "",
            vendedor: "",
            telefono: "",
            email: "",
            direccion: "",
          });
        }
      }
    } catch (error) {
      toast.error("Error al registrar el proveedor. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <ToastContainer />
      <div className="mx-auto p-6 bg-cyan-950 text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Registrar Nuevo Proveedor</h1>

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
