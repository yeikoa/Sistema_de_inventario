'use client'
import { useState } from "react";
import { FaSave, FaBarcode, FaDollarSign, FaPercent, FaCubes, FaTruck, FaTags } from "react-icons/fa";
import Navbar from "@/app/components/navbar";

export default function RegisterProduct() {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productProfit, setProductProfit] = useState("");
  const [productStock, setProductStock] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agregar lógica para guardar el producto en el sistema de inventario
  };

  return (
    <div className="bg-gray-900 min-h-full">
      <Navbar />

      <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-md mt-8">
        <h1 className="text-2xl font-semibold mb-4">Registrar Nuevo Producto</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <FaBarcode className="text-gray-600 mr-2" />
            <input
              type="text"
              id="productCode"
              className="w-full border rounded p-2"
              placeholder="Código del producto"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <FaTags className="text-gray-600 mr-2" />
            <input
              type="text"
              id="productName"
              className="w-full border rounded p-2"
              placeholder="Nombre del producto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium">
              Descripción del Producto
            </label>
            <textarea
              id="productDescription"
              className="w-full border rounded p-2 h-20 resize-none"
              placeholder="Descripción del producto"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <FaDollarSign className="text-green-600 mr-2" />
              <input
                type="number"
                id="productPrice"
                className="w-full border rounded p-2"
                placeholder="Precio del producto"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <FaPercent className="text-green-600 mr-2" />
              <input
                type="number"
                id="productProfit"
                className="w-full border rounded p-2"
                placeholder="Utilidad del producto"
                value={productProfit}
                onChange={(e) => setProductProfit(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <FaCubes className="text-teal-600 mr-2" />
              <input
                type="number"
                id="productStock"
                className="w-full border rounded p-2"
                placeholder="Stock del producto"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <FaTruck className="text-teal-600 mr-2" />
              <select
                id="selectedProvider"
                className="w-full border rounded p-2"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                <option value="">Seleccionar proveedor</option>
                {/* Opciones de proveedores aquí */}
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <FaTags className="text-blue-600 mr-2" />
            <select
              id="selectedCategory"
              className="w-full border rounded p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Seleccionar categoría</option>
              {/* Opciones de categorías aquí */}
            </select>
          </div>

          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          >
            <FaSave className="mr-2" />
            Registrar Producto
          </button>
        </form>
      </div>
    </div>
  );
}
