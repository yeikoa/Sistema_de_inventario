"use client"
import { useState } from "react";
import { FaSave, FaBarcode, FaDollarSign, FaPercent, FaCubes, FaTruck, FaTags } from "react-icons/fa";

export default function RegisterProduct() {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productProfit, setProductProfit] = useState("");
  const [productStock, setProductStock] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const providers = ["Proveedor 1", "Proveedor 2", "Proveedor 3"];
  const categories = ["Categoría 1", "Categoría 2", "Categoría 3"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!productCode || !productName || !productDescription || !productPrice || !productProfit || !productStock || !selectedProvider || !selectedCategory) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (productPrice <= 0 || productProfit <= 0 || productStock < 0) {
      setError("El precio, la utilidad y el stock deben ser números positivos");
      return;
    }

    // Agregar lógica para guardar el producto en el sistema de inventario

    setSuccess("Producto registrado con éxito");
  };

  return (
    <div className="bg-neutral-950 min-h-screen p-8">
      <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Registrar Nuevo Producto</h1>
  
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
  
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="productCode" className="text-sm font-medium mb-2 flex items-center">
              <FaBarcode className="text-gray-600 mr-2" />
              Código del Producto
            </label>
            <input
              type="text"
              id="productCode"
              className="w-full md:w-2/3 border rounded p-2"
              placeholder="Ingrese el código del producto"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            />
          </div>
  
          <div>
            <label htmlFor="productName" className="text-sm font-medium mb-2 flex items-center">
              <FaTags className="text-gray-600 mr-2" />
              Nombre del Producto
            </label>
            <input
              type="text"
              id="productName"
              className="w-full md:w-2/3 border rounded p-2"
              placeholder="Ingrese el nombre del producto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
  
          <div>
            <div className="flex flex-col">
              <label htmlFor="productDescription" className="text-sm font-medium mb-2">
                Descripción del Producto
              </label>
              <textarea
                id="productDescription"
                className="w-full md:w-2/3 border rounded p-2 h-32 resize-none"
                placeholder="Ingrese la descripción del producto"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="productPrice" className="text-sm font-medium mb-2 flex items-center">
                <FaDollarSign className="text-green-600 mr-2" />
                Precio del Producto
              </label>
              <input
                type="number"
                id="productPrice"
                className="w-full md:w-2/3 border rounded p-2"
                placeholder="Ingrese el precio del producto"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="productProfit" className="text-sm font-medium mb-2 flex items-center">
                <FaPercent className="text-green-600 mr-2" />
                Utilidad del Producto
              </label>
              <input
                type="number"
                id="productProfit"
                className="w-full md:w-2/3 border rounded p-2"
                placeholder="Ingrese la utilidad del producto"
                value={productProfit}
                onChange={(e) => setProductProfit(e.target.value)}
              />
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="selectedProvider" className="text-sm font-medium mb-2 flex items-center">
                <FaTruck className="text-teal-600 mr-2" />
                Seleccionar Proveedor
              </label>
              <select
                id="selectedProvider"
                className="w-full md:w-2/3 border rounded p-2"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                <option value="">Seleccionar proveedor</option>
                {providers.map((provider, index) => (
                  <option key={index} value={provider}>{provider}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="selectedCategory" className="text-sm font-medium mb-2 flex items-center">
                <FaTags className="text-blue-600 mr-2" />
                Seleccionar Categoría
              </label>
              <select
                id="selectedCategory"
                className="w-full md:w-2/3 border rounded p-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
          >
            <FaSave className="mr-2" />
            Registrar Producto
          </button>
        </form>
      </div>
    </div>
  );
  
  
  
  
  
}
