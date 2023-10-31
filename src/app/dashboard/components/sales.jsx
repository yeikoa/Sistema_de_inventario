"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Sales() {
  const [productos, setProductos] = useState([]);
  const [seleccion, setSeleccion] = useState({ productoId: '', cantidad: '' });
  const [ventas, setVentas] = useState([]);

  // Carga los productos desde la API
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await axios.get('/api/salidas');
        setProductos(response.data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    cargarProductos();
  }, []);

  // Maneja el cambio en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeleccion({ ...seleccion, [name]: value });
  };

  // Agrega la selección actual a la lista de ventas
  const agregarVenta = (e) => {
    e.preventDefault();
    setVentas([...ventas, { ...seleccion, producto: productos.find(p => p.producto_id.toString() === seleccion.productoId)?.nombre }]);

    setSeleccion({ productoId: '', cantidad: '' });
  };

  // Manejar la validación final
  const  validarVentas = async() => {
    console.log("Validando ventas:", ventas);
    try {
     
      const productResponse = await axios.post("/api/salidas", ventas);

      if(productResponse.status === 200){
        alert("Datos enviados correctamente")
      }else{
        alert("Error al enviar los datos")
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-lg font-bold mb-4">Registrar Venta</h1>
      <form onSubmit={agregarVenta}>
        <div className="mb-3">
          <label htmlFor="producto" className="block mb-2 text-sm font-medium">Producto</label>
          <select
            name="productoId"
            id="producto"
            className="border border-gray-300 p-2 rounded"
            value={seleccion.productoId}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.producto_id} value={producto.producto_id}>
                {producto.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="cantidad" className="block mb-2 text-sm font-medium">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            className="border border-gray-300 p-2 rounded w-full"
            value={seleccion.cantidad}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Agregar a la lista
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-3">Productos seleccionados</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Producto</th>
              <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{venta.producto}</td>
                <td className="border border-gray-300 px-4 py-2">{venta.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button onClick={validarVentas} className="bg-green-500 text-white px-4 py-2 rounded">
          Validar Ventas
        </button>
      </div>
    </div>
  );
}
