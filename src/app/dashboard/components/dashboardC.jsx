'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBox, FaTruck, FaRegListAlt, FaWarehouse, FaChartBar } from 'react-icons/fa';

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalProviders, setTotalProviders] = useState(null);

  useEffect(() => {
    // Fetch the total number of products from your API
    axios.get("/api/Inicio/productos")
    .then((response) => {
      const data = response.data; // Acceder a la propiedad 'data' de la respuesta
      setTotalProducts(data.totalProducts);
      console.log(data.totalProducts);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

    axios.get("/api/Inicio/proveedores")
    .then((response) => {
      const data = response.data; // Acceder a la propiedad 'data' de la respuesta
      setTotalProviders(data.totalProviders);
      console.log(data.totalProviders);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  

  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaBox className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">Total de Productos</h3>
              {totalProducts !== null ? (
                <p className="text-gray-600">{totalProducts} Productos</p>
              ) : (
                <p className="text-gray-600">Cargando...</p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaBox className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">Proveedores activos</h3>
              {totalProducts !== null ? (
                <p className="text-gray-600">{totalProviders} Proveedores</p>
              ) : (
                <p className="text-gray-600">Cargando...</p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaRegListAlt className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">Reportes de Inventario</h3>
              <p className="text-gray-600">Ver Reportes</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaWarehouse className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">Bajos en Stock</h3>
              <p className="text-gray-600">20 Productos</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaChartBar className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">Productos con Mayor Cantidad</h3>
              <p className="text-gray-600">Ver Lista</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaChartBar className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">Reportes de Proveedores</h3>
              <p className="text-gray-600">Ver Lista</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaChartBar className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">Historial Facturas</h3>
              <p className="text-gray-600">Ver Lista</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <FaChartBar className="text-blue-600 text-3xl" />
            <div>
              <h3 className="text-xl font-bold">Usuarios Registrados</h3>
              <p className="text-gray-600">Ver Lista</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
