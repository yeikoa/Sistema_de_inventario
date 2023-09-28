"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  FaSave,
  FaBarcode,
  FaDollarSign,
  FaPercent,
  FaCubes,
  FaTruck,
  FaTags,
} from "react-icons/fa";

export function ProductForm() {
  const [products, setProducts] = useState({
    codigo: "",
    nombre: "",
    precioVenta: "",
    utilidad: 30,
    stock: "",
    productPrice: "",
    
    productIVA: 2,
    selectedProvider: "",
    selectedCategory: "",
  });
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
//REVISSSAAARRRR
  useEffect(() => {
    // Cargar las opciones de proveedores desde tu API
    axios.get("/api/providerss").then((response) => {
     setProviders(response.data);
    });

    // Cargar las opciones de categorías desde tu API
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //const providers = ["Proveedor 1", "Proveedor 2", "Proveedor 3"];
  //const categories = ["Categoría 1", "Categoría 2", "Categoría 3"];

  const handleChanges = (e) => {
    setProducts({
      ...products,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !products.codigo ||
      !products.nombre ||
      !products.productPrice ||
      !products.utilidad ||
      !products.stock ||
      !products.selectedProvider ||
      !products.selectedCategory
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (
      products.productPrice <= 0 ||
      products.utilidad <= 0 ||
      products.stock < 0
    ) {
      setError(
        "El precio, la utilidad y la cantidad deben ser números positivos"
      );
      return;
    }
     
    try {
      const res = await axios.post("/api/products", products);
      console.log(res);
      // Verifica si la respuesta fue exitosa antes de restablecer el estado
      if (res.data.success) {
        setProducts({
          codigo: "",
          nombre: "",
          stock: "",
          //productPrice: "",
          //utilidad: 30,
          //productIVA: 13,
          precioVenta: "",
          selectedProvider: "",
          selectedCategory: "",
        });
        setSuccess("Producto registrado con éxito");
      } else {
        // Manejar el caso en que la respuesta no fue exitosa
        setError(res.data.message || "Error al registrar el producto");
      }
    } catch (error) {
      console.error(error);
      setError("Error al registrar el ");
    }
  };

  useEffect(() => {
    if (products.productPrice) {
      const price = parseFloat(products.productPrice);
      const profit = price * (products.utilidad / 100);
      const iva = price * (products.productIVA / 100);
      setProducts({
        ...products,
        precioVenta: (price + profit + iva).toFixed(2),
      });
    }
  }, [products.productPrice, products.utilidad, products.productIVA]);

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="mx-auto p-6 bg-cyan-950 text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">
          Registrar Nuevo Producto
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="codigo"
              className="text-sm font-medium mb-2 flex items-center "
            >
              <FaBarcode className=" mr-2" />
              Código del Producto
            </label>
            <input
              type="text"
              id="codigo"
              name="codigo"
              className="w-full md:w-2/3 border rounded p-2 text-black"
              placeholder="Ingrese el código del producto"
              value={products.codigo}
              onChange={handleChanges}
            />
          </div>

          <div>
            <label
              htmlFor="nombre"
              className="text-sm font-medium mb-2 flex items-center"
            >
              <FaTags className="text-white mr-2" />
              Nombre del Producto
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="w-full md:w-2/3 border rounded p-2 text-black"
              placeholder="Ingrese el nombre del producto"
              value={products.nombre}
              onChange={handleChanges}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="stock"
                className="text-sm font-medium mb-2 flex items-center"
              >
                <FaCubes className="text-teal-600 mr-2" />
                Cantidad
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="w-full md:w-2/3 border rounded p-2 text-black"
                placeholder="Ingrese la cantidad del producto"
                value={products.stock}
                onChange={handleChanges}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="productPrice"
                className="text-sm font-medium mb-2 flex items-center"
              >
                <FaDollarSign className="text-green-600 mr-2" />
                Precio de Compra
              </label>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                className="w-full md:w-2/3 border rounded p-2 text-black"
                placeholder="Ingrese el precio de compra del producto"
                value={products.productPrice}
                onChange={handleChanges}
              />
            </div>
            <div>
              <label
                htmlFor="utilidad"
                className="text-sm font-medium mb-2 flex items-center"
              >
                <FaPercent className="text-green-600 mr-2" />
                Utilidad del Producto
              </label>
              <input
                type="number"
                id="utilidad"
                name="utilidad"
                className="w-full md:w-2/3 border rounded p-2 text-black"
                value={products.utilidad}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div>
              <label
                htmlFor="productIVA"
                className="text-sm font-medium mb-2 flex items-center "
              >
                <FaPercent className="text-green-600 mr-2" />
                IVA
              </label>
              <input
                type="number"
                id="productIVA"
                name="productIVA"
                className="w-full md:w-2/3 border rounded p-2 text-black"
                value={products.productIVA}
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="precioVenta"
                className="text-sm font-medium mb-2 flex items-center"
              >
                <FaDollarSign className="text-green-600 mr-2" />
                Precio de Venta
              </label>
              <input
                type="number"
                id="precioVenta"
                name="precioVenta"
                className="w-full md:w-2/3 border rounded p-2 text-black"
                value={products.precioVenta}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="selectedProvider"
                className="text-sm font-medium mb-2 flex items-center"
              >
                <FaTruck className="text-teal-600 mr-2" />
                Seleccionar Proveedor
              </label>
              <select
                id='selectedProvider'
                name='selectedProvider'
                className="w-full md:w-2/3 border rounded p-2 text-black"
                value={products.selectedProvider}
                onChange={handleChanges}
              >
                <option value="">Seleccionar proveedor</option>
                {providers.map((provider) => (
                  <option key={provider.proveedor_id} value={provider.proveedor_id}>
                    {provider.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="selectedCategory"
                className="text-sm font-medium mb-2 flex items-center"
              >
                <FaTags className="text-blue-600 mr-2" />
                Seleccionar Categoría
              </label>
              <select
                id="selectedCategory"
                name="selectedCategory"
                className="w-full md:w-2/3 border rounded p-2 text-black"
                value={products.selectedCategory}
                onChange={handleChanges}
              >
                <option value="">Seleccionar categoría</option>
                  {categories.map((category) => (
                  <option key={category.categoria_id} value={category.categoria_id}>
                  {category.nombre_categoria}
                </option>
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
