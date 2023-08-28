'use client'
import { useState, useEffect } from "react";
import { FaSave, FaBarcode, FaDollarSign, FaPercent, FaCubes, FaTruck, FaTags } from "react-icons/fa";

export default function ManualRegister() {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productProfit, setProductProfit] = useState(30);
  const [productIVA, setProductIVA] = useState(13);
  const [productSalePrice, setProductSalePrice] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [emissionDate, setEmissionDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const providers = ["Proveedor 1", "Proveedor 2", "Proveedor 3"];
  const categories = ["Categoría 1", "Categoría 2", "Categoría 3"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!productCode || !productName || !productPrice || !productProfit || !productQuantity || !selectedProvider || !selectedCategory || !emissionDate) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (productPrice <= 0 || productProfit <= 0 || productQuantity < 0) {
      setError("El precio, la utilidad y la cantidad deben ser números positivos");
      return;
    }

    // Agregar lógica para guardar el producto en el sistema de inventario

    setSuccess("Producto registrado con éxito");
  };

  useEffect(() => {
    if (productPrice) {
      const price = parseFloat(productPrice);
      const profit = price * (productProfit / 100);
      const iva = price * (productIVA / 100);
      setProductSalePrice((price + profit + iva).toFixed(2));
    }
  }, [productPrice, productProfit, productIVA]);

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Registrar Factura</h1>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="emissionDate" className="text-sm font-medium mb-2 flex items-center">
              <FaBarcode className="text-gray-600 mr-2" />
              Fecha de Emisión
            </label>
            <input
              type="date"
              id="emissionDate"
              className="w-full md:w-2/3 border rounded p-2"
              value={emissionDate}
              onChange={(e) => setEmissionDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="productCode" className="text-sm font-medium mb-2 flex items-center">
              <FaBarcode className="text-gray-600 mr-2" />
              Código de la factura
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label htmlFor="productQuantity" className="text-sm font-medium mb-2 flex items-center">
                <FaCubes className="text-teal-600 mr-2" />
                Cantidad
              </label>
              <input
                type="number"
                id="productQuantity"
                className="w-full md:w-2/3 border rounded p-2"
                placeholder="Ingrese la cantidad del producto"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="productPrice" className="text-sm font-medium mb-2 flex items-center">
                <FaDollarSign className="text-green-600 mr-2" />
                Precio de Compra
              </label>
              <input
                type="number"
                id="productPrice"
                className="w-full md:w-2/3 border rounded p-2"
                placeholder="Ingrese el precio de compra del producto"
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
                value={productProfit}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="productIVA" className="text-sm font-medium mb-2 flex items-center">
                <FaPercent className="text-green-600 mr-2" />
                IVA
              </label>
              <input
                type="number"
                id="productIVA"
                className="w-full md:w-2/3 border rounded p-2"
                value={productIVA}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="productSalePrice" className="text-sm font-medium mb-2 flex items-center">
                <FaDollarSign className="text-green-600 mr-2" />
                Precio de Venta
              </label>
              <input
                type="number"
                id="productSalePrice"
                className="w-full md:w-2/3 border rounded p-2"
                value={productSalePrice}
                readOnly
              />
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
