'use client'
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
  const [product, setProduct] = useState({
    productCode: "",
    productName: "",
    productDescription: "",
    productQuantity: "",
    productPrice: "",
    productProfit: 30,
    productIVA: 13,
    productSalePrice: "",
    selectedProvider: "",
    selectedCategory: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const providers = ["Proveedor 1", "Proveedor 2", "Proveedor 3"];
  const categories = ["Categoría 1", "Categoría 2", "Categoría 3"];

  const handleChanges = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validación de los campos
    if (
      !product.productCode ||
      !product.productName ||
      !product.productPrice ||
      !product.productProfit ||
      !product.productQuantity ||
      !product.selectedProvider ||
      !product.selectedCategory
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (
      product.productPrice <= 0 ||
      product.productProfit <= 0 ||
      product.productQuantity < 0
    ) {
      setError("El precio, la utilidad y la cantidad deben ser números positivos");
      return;
    }

    try {
      // Enviando todos los campos del producto en la solicitud POST
      const res = await axios.post('/api/products', {
        codigo: product.productCode,
        nombre: product.productName,
        precioVenta: product.productSalePrice,
        //iva: product.productIVA,
        //utilidad: product.productProfit,
        stock: product.productQuantity,
        // Agrega aquí otros campos si es necesario
      });
      console.log(res.data);
      setSuccess("Producto registrado con éxito");
      // Aquí puedes resetear el formulario si lo deseas
    } catch (error) {
      console.error(error);
      setError("Error registrando el producto");
    }
  };

  // Cálculo del precio de venta
  useEffect(() => {
    if (product.productPrice) {
      const price = parseFloat(product.productPrice);
      const profit = price * (product.productProfit / 100);
      const iva = price * (product.productIVA / 100);
      setProduct({
        ...product,
        productSalePrice: (price + profit + iva).toFixed(2),
      });
    }
  }, [product.productPrice, product.productProfit, product.productIVA]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Producto</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      
      <label>
        <FaBarcode /> Código
        <input
          type="text"
          name="productCode"
          value={product.productCode}
          onChange={handleChanges}
          required
        />
      </label>
      
      <label>
        Nombre del Producto
        <input
          type="text"
          name="productName"
          value={product.productName}
          onChange={handleChanges}
          required
        />
      </label>
      
      <label>
        Descripción
        <textarea
          name="productDescription"
          value={product.productDescription}
          onChange={handleChanges}
          required
        />
      </label>
      
      <label>
        <FaCubes /> Cantidad
        <input
          type="number"
          name="productQuantity"
          value={product.productQuantity}
          onChange={handleChanges}
          required
        />
      </label>
      
      <label>
        <FaDollarSign /> Precio
        <input
          type="number"
          name="productPrice"
          value={product.productPrice}
          onChange={handleChanges}
          required
        />
      </label>
      
      <label>
        <FaPercent /> Utilidad
        <input
          type="number"
          name="productProfit"
          value={product.productProfit}
          onChange={handleChanges}
          required
        />
      </label>
      
      <label>
        <FaPercent /> IVA
        <input
          type="number"
          name="productIVA"
          value={product.productIVA}
          onChange={handleChanges}
          required
        />
      </label>
      
      <label>
        <FaTruck /> Proveedor
        <select
          name="selectedProvider"
          value={product.selectedProvider}
          onChange={handleChanges}
          required
        >
          <option value="">Seleccione un proveedor</option>
          {providers.map((provider, index) => (
            <option key={index} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </label>
      
      <label>
        <FaTags /> Categoría
        <select
          name="selectedCategory"
          value={product.selectedCategory}
          onChange={handleChanges}
          required
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      
      <label>
        Precio de Venta
        <input
          type="text"
          value={`$${product.productSalePrice}`}
          readOnly
        />
      </label>
      
      <button type="submit">
        <FaSave /> Guardar Producto
      </button>
    </form>
    
  );
}

export default ProductForm;
