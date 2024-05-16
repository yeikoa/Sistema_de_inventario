"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";

export default function Sales() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [ventas, setVentas] = useState([]);
  const [cantidadError, setCantidadError] = useState("");

  useEffect(() => {
    const ventasGuardadas = localStorage.getItem("ventas");
    if (ventasGuardadas) {
      setVentas(JSON.parse(ventasGuardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ventas", JSON.stringify(ventas));
  }, [ventas]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await axios.get("/api/salidas");
        const productosOptions = response.data.map((producto) => ({
          value: producto.producto_id,
          label: producto.nombre,
          stock: producto.stock,
          precio:producto.precioVenta
        }));
        setProductos(productosOptions);
      } catch (error) {
        toast.error("Error al cargar los productos");
        console.error("Error al cargar los productos:", error);
      }
    };

    cargarProductos();
  }, []);

  const handleProductoChange = (option) => {
    setProductoSeleccionado(option);
    setCantidadError("");
  };

  const handleCantidadChange = (e) => {
    const cantidad = e.target.value;
    if (productoSeleccionado) {
      const productoEncontrado = productos.find(
        (p) => p.value === productoSeleccionado.value
      );
      if (productoEncontrado && cantidad > productoEncontrado.stock) {
        toast.error("La cantidad ingresada supera la cantidad disponible.");
        setCantidadError(
          "La cantidad ingresada supera la cantidad disponible."
        );
      } else {
        setCantidadError("");
        setProductoSeleccionado((prev) => ({ ...prev, cantidad: cantidad }));
      }
    }
  };

  const agregarVenta = (e) => {
    e.preventDefault();
    if (cantidadError) {
      toast.error("Corrija los errores antes de agregar a la lista.");
      return;
    }
    if (productoSeleccionado && productoSeleccionado.cantidad > 0) {
      const updatedProductos = productos.map((p) => {
        if (p.value === productoSeleccionado.value) {
          return { ...p, stock: p.stock - productoSeleccionado.cantidad };
        }
        return p;
      });
      setProductos(updatedProductos);

      // Add product to ventas state
      setVentas([...ventas, productoSeleccionado]);
      setProductoSeleccionado(null);
    }
  };

  const validarVentas = async () => {
    try {
      const ventasParaEnviar = ventas.map((v) => ({
        productoId: v.value,
        cantidad: v.cantidad,
      }));
      const productResponse = await axios.put("/api/salidas", ventasParaEnviar);
      if (ventasParaEnviar.length === 0) {
        toast.error("No hay productos para enviar");
        return;
      }
      if (productResponse.status === 200) {
        toast.success("Datos enviados correctamente");
        setVentas([]);
        for (const venta of ventas) {
          const salesMomement = {
            productoR_id: venta.value,
            fecha: new Date().toISOString(),
            tipo_operacion: "disminuido",
            cantidad: venta.cantidad,
            nombre: venta.label,
          };
          const response = await axios.post(
            "/api/movimientos/productos",
            salesMomement
          );
        }
      } else {
        toast.error("Error al enviar los datos");
      }
    } catch (error) {
      toast.error("Error en la validación");
      console.error("Error en la validación:", error);
    }
  };

  const customStyles = {
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
  };

  const quitarProducto = (index) => {
    // Remove product from ventas state
    const nuevasVentas = ventas.filter((_, ventaIndex) => ventaIndex !== index);
    setVentas(nuevasVentas);
    const productoDevuelto = ventas[index];
    const productosActualizados = productos.map((p) => {
      if (p.value === productoDevuelto.value) {
        return {
          ...p,
          stock: parseInt(p.stock, 10) + parseInt(productoDevuelto.cantidad),
        };
      }
      return p;
    });
    setProductos(productosActualizados);
  };

  return (
    <div className="container mx-auto p-4 flex flex-wrap gap-4 ">
      <ToastContainer />
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-800 mb-4 mt-10">
          Registrar venta
        </h1>
        <form onSubmit={agregarVenta} className="space-y-3">
          <div>
            <label
              htmlFor="producto"
              className="block text-sm font-medium text-gray-700"
            >
              Producto
            </label>
            <Select
              id="producto"
              value={productoSeleccionado}
              onChange={handleProductoChange}
              options={productos}
              className="text-sm"
              placeholder="Seleccione un producto"
              styles={customStyles}
            />
            {productoSeleccionado && (
              <p className="mt-2 text-sm text-gray-500">
                Stock disponible: {productoSeleccionado.stock}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="cantidad"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad
            </label>
            <input
              type="number"
              id="cantidad"
              className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={productoSeleccionado?.cantidad || ""}
              onChange={handleCantidadChange}
            />
            {cantidadError && (
              <p className="text-red-500 text-xs mt-1">{cantidadError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-700 text-white px-3 py-1 rounded-md hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 text-sm"
          >
            Agregar a la lista
          </button>
        </form>
      </div>

      <div className="flex-1 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-10">
          Productos seleccionados
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm  border border-cyan-900">
            <thead className="bg-cyan-900">
              <tr>
                <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-200 divide-y divide-gray-200">
              {ventas.map((venta, index) => (
                <tr key={index}>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-black border-b border-cyan-900">
                    {venta.label}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-black border-b border-cyan-900">
                    {venta.cantidad}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-black border-b border-cyan-900">
                    {/* Precio unitario */}
                    ₡ {venta.precio}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-black border-b border-cyan-900">
                    {/* Precio total por producto */}
                    ₡ {(venta.precio * venta.cantidad).toFixed(2)}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-black border-b border-cyan-900">
                    <button
                      onClick={() => quitarProducto(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {/* Fila para mostrar el total de salidas */}
              <tr>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-black border-b border-cyan-900">
                  Total:
                </td>
                <td colSpan="3" className="px-6 py-2 whitespace-nowrap text-right text-sm text-black border-b border-cyan-900">
                  {/* Suma total de los precios de los productos seleccionados */}
                  ₡ {ventas.reduce((total, venta) => total + venta.precio * venta.cantidad, 0).toFixed(2)}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-black border-b border-cyan-900"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-14 flex justify-center">
          <button
            onClick={validarVentas}
            className="bg-cyan-700 text-white px-3 py-1 rounded-md hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 text-sm"
          >
            Validar Ventas
          </button>
        </div>
      </div>
    </div>
  );
}
