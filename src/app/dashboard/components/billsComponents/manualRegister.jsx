'use client'
import React, { useState, useEffect } from "react";
import { FaSave, FaCalendarAlt, FaMoneyBillWave, FaTruck } from "react-icons/fa";
import axios from "axios";

export default function ManualRegister() {
  const [invoiceDate, setInvoiceDate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState([
    {
      productCode: "",
      productName: "",
      productPrice: "",
      productQuantity: "",
      productCategory: "",
      productSalePrice: "",
      productIVA: "",
      productUtilidad: "",
    },
  ]);
  const [providers, setProviders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIVA, setSelectedIVA] = useState("");
  const [selectedUtilidad, setSelectedUtilidad] = useState("");
  const [blackBorders, setBlackBorders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ivaList, setIvaList] = useState([]);
  const [utilidadList, setUtilidadList] = useState([]);

  useEffect(() => {
    axios.get("/api/providerss")
    .then((response) => {
      setProviders(response.data);
    })
    .catch((error) => {
      console.error("Error al obtener la lista de proveedores:", error);
    });

    axios.get("/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de categorías:", error);
      });

    axios.get("/api/impuestos/iva")
      .then((response) => {
        setIvaList(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de IVA:", error);
      });

    axios.get("/api/impuestos/utilidad")
      .then((response) => {
        setUtilidadList(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de utilidad:", error);
      });
  }, []);

  const calculateSalePrice = (price, ivaRate, utilidadRate) => {
    const priceFloat = parseFloat(price);
    const ivaFloat = parseFloat(ivaRate);
    const utilidadFloat = parseFloat(utilidadRate);

    if (!isNaN(priceFloat) && !isNaN(ivaFloat) && !isNaN(utilidadFloat)) {
      const ivaAmount = (priceFloat * (ivaFloat / 100)).toFixed(2);
      const utilidadAmount = (priceFloat * (utilidadFloat / 100)).toFixed(2);
      const salePrice = (priceFloat + parseFloat(ivaAmount) + parseFloat(utilidadAmount)).toFixed(2);
      return salePrice;
    }
    return "";
  };

  const handleAddNewRow = () => {
    const newRow = {
      productCode: "",
      productName: "",
      productPrice: "",
      productQuantity: "",
      productCategory: selectedCategory,
      productSalePrice: "",
      productIVA: selectedIVA,
      productUtilidad: selectedUtilidad,
    };
    setInvoiceDetails([...invoiceDetails, newRow]);
    setBlackBorders([...blackBorders, invoiceDetails.length]);
  };

  const handleSubmitInvoice = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!invoiceDate || !totalAmount || !selectedSupplier || invoiceDetails.length === 0) {
      setError("Todos los campos de la factura de compra son obligatorios");
      return;
    }

    const newInvoice = {
      invoiceDate,
      totalAmount,
      selectedSupplier,
      details: invoiceDetails,
    };

    // Implementa la lógica de envío al backend para registrar la factura y sus productos

    setSuccess("Factura de compra registrada con éxito");
    clearInvoiceFields();
  };

  const clearInvoiceFields = () => {
    setInvoiceDate("");
    setTotalAmount("");
    setSelectedSupplier("");
    setInvoiceDetails([]);
  };

  const handleProductFieldChange = (index, field, value) => {
    const updatedDetails = [...invoiceDetails];
    updatedDetails[index][field] = value;

    if (field === "productPrice" || field === "productIVA" || field === "productUtilidad") {
      const { productPrice, productIVA, productUtilidad } = updatedDetails[index];
      updatedDetails[index].productSalePrice = calculateSalePrice(productPrice, productIVA, productUtilidad);
    }

    setInvoiceDetails(updatedDetails);
    setBlackBorders([...blackBorders.slice(0, index), index, ...blackBorders.slice(index + 1)]);
  };

  return (
    <div className="p-8">
      <div className="rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Registrar Factura</h1>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

        <form className="space-y-6" onSubmit={handleSubmitInvoice}>
          <div>
            <label htmlFor="invoiceDate" className="text-sm font-medium mb-2 flex items-center">
              <FaCalendarAlt className="text-gray-600 mr-2" />
              Fecha de Factura
            </label>
            <input
              type="date"
              id="invoiceDate"
              className="w-full md:w-2/3 border border-black rounded p-2"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="totalAmount" className="text-sm font-medium mb-2 flex items-center">
              <FaMoneyBillWave className="text-gray-600 mr-2" />
              Total
            </label>
            <input
              type="number"
              id="totalAmount"
              className="w-full md:w-2/3 border border-black rounded p-2"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="selectedSupplier" className="text-sm font-medium mb-2 flex items-center">
              <FaTruck className="text-gray-600 mr-2" />
              Seleccionar Proveedor
            </label>
            <select
              id="selectedSupplier"
              className="w-full md:w-2/3 border border-black rounded p-2"
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
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
            <label className="text-sm font-medium mb-2">Detalle de Productos</label>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="border border-black p-2">Código de Producto</th>
                    <th className="border border-black p-2">Nombre de Producto</th>
                    <th className="border border-black p-2">Precio de Compra</th>
                    <th className="border border-black p-2">Cantidad</th>
                    <th className="border border-black p-2">Categoría</th>
                    <th className="border border-black p-2">Precio de Venta</th>
                    <th className="border border-black p-2">IVA</th>
                    <th className="border border-black p-2">Utilidad</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceDetails.map((product, index) => (
                    <tr key={index}>
                      <td className={`border ${blackBorders.includes(index) ? 'border-black' : 'border-white'}`}>
                        <input
                          type="text"
                          value={product.productCode}
                          onChange={(e) => handleProductFieldChange(index, "productCode", e.target.value)}
                        />
                      </td>
                      <td className={`border ${blackBorders.includes(index) ? 'border-black' : 'border-white'}`}>
                        <input
                          type="text"
                          value={product.productName}
                          onChange={(e) => handleProductFieldChange(index, "productName", e.target.value)}
                        />
                      </td>
                      <td className={`border ${blackBorders.includes(index) ? 'border-black' : 'border-white'}`}>
                        <input
                          type="text"
                          value={product.productPrice}
                          onChange={(e) => handleProductFieldChange(index, "productPrice", e.target.value)}
                        />
                      </td>
                      <td className={`border ${blackBorders.includes(index) ? 'border-black' : 'border-white'}`}>
                        <input
                          type="text"
                          value={product.productQuantity}
                          onChange={(e) => handleProductFieldChange(index, "productQuantity", e.target.value)}
                        />
                      </td>
                      <td className={`border ${blackBorders.includes(index) ? 'border-black' : 'border-white'}`}>
                        <select
                          value={product.productCategory}
                          onChange={(e) => handleProductFieldChange(index, "productCategory", e.target.value)}
                        >
                          <option value="">Seleccionar categoría</option>
                          {categories.map((category) => (
                            <option key={category.categoria_id} value={category.categoria_id}>
                              {category.nombre_categoria}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className={`border ${blackBorders.includes(index) ? 'border-black' : 'border-white'}`}>
                        <input
                          type="text"
                          value={product.productSalePrice}
                          readOnly
                        />
                      </td>
                      <td className={`border ${blackBorders.includes(index) ? 'border-black' : 'border-white'}`}>
                        <select
                          value={product.productIVA}
                          onChange={(e) => handleProductFieldChange(index, "productIVA", e.target.value)}
                        >
                          <option value="">Seleccionar IVA</option>
                          {ivaList.map((iva) => (
                            <option key={iva.iva_id} value={iva.iva_id}>
                              {iva.tasa}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className={`border ${blackBorders.includes(index) ? 'border-black' : 'border-white'}`}>
                        <select
                          value={product.productUtilidad}
                          onChange={(e) => handleProductFieldChange(index, "productUtilidad", e.target.value)}
                        >
                          <option value="">Seleccionar Utilidad</option>
                          {utilidadList.map((utilidad) => (
                            <option key={utilidad.utilidad_id} value={utilidad.utilidad_id}>
                              {utilidad.tasa}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold p-2 mt-4"
              onClick={handleAddNewRow}
            >
              Agregar Producto
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4"
            >
              <FaSave className="mr-2" />
              Guardar Factura
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
