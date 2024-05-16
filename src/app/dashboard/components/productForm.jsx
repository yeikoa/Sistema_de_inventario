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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ProductForm() {
  const [products, setProducts] = useState({
    codigo: "",
    nombre: "",
    precioVenta: "",
    stock: "",
    proveedorP_id: "",
    categoriaP_id: "",
    ivaP_id: "",
    utilidadP_id: "",
  });

  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [iva, setIva] = useState([]);
  const [utility, setUtility] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    // Verificar que los campos requeridos estén completos
    if (
      !products.codigo ||
      !products.nombre ||
      !products.stock ||
      !products.proveedorP_id ||
      !products.categoriaP_id ||
      !products.precioVenta
    ) {
      toast.error("Todos los campos son obligatorios. Por favor, complete todos los campos.");
      return;
    }

    // Verificar que los campos calculados sean válidos
    if (
      parseFloat(products.precioVenta) <= 0 ||
      parseFloat(products.stock) <= 0 ||
      parseFloat(products.utilidadP_id) <= 0 ||
      parseFloat(products.ivaP_id) <= 0
    ) {
      toast.error("El precio, la utilidad y la cantidad deben ser números positivos");
      return;
    }

    try {
      // Realizar la inserción en la tabla de productos
      const productResponse = await axios.post("/api/table", products);

      if (productResponse.data.success) {
        // Obtener el ID del producto insertado
        const productId = productResponse.data.id;

        // Crear un objeto para registrar la entrada en la tabla RegistroInventario
        const registroInventarioData = {
          productoR_id: productId,
          fecha: new Date().toISOString(),
          tipo_operacion: "entrada", 
          cantidad: parseInt(products.stock), 
          nombre: products.nombre, 
        };

        // Realizar la inserción en la tabla RegistroInventario
        const registroResponse = await axios.post(
          "/api/movimientos/productos",
          registroInventarioData
        );

        if (registroResponse.data.success) {
          setProducts({
            codigo: "",
            nombre: "",
            precioVenta: "",
            stock: "",
            proveedorP_id: "",
            categoriaP_id: "",
            ivaP_id: "",
            utilidadP_id: "",
            precioCompra: "",
          });
          toast.success("Producto registrado con éxito");
        } else {
          setError(
            registroResponse.data.message ||
              "Error al registrar el producto en el inventario"
          );
        }
      } else {
        setError(
          productResponse.data.message || "Error al registrar el producto"
        );
      }
    } catch (error) {
      console.error(error);
      setError("Error al registrar el producto");
    }
  };

  useEffect(() => {
    axios.get("/api/proveedores").then((response) => {
      setProviders(response.data);
    });

    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });

    axios.get("/api/iva").then((response) => {
      setIva(response.data);
    });

    axios.get("/api/utilidad").then((response) => {
      setUtility(response.data);
    });
  }, []);
  const getIvaTasa = (ivaId) => {
    const ivaSeleccionado = iva.find((i) => i.iva_id === parseInt(ivaId, 10));
    return ivaSeleccionado ? parseFloat(ivaSeleccionado.tasa) : 0;
  };

  const getUtilityTasa = (utilityId) => {
    const utilitySeleccionado = utility.find((u) => u.utilidad_id === parseInt(utilityId, 10));
    return utilitySeleccionado ? parseFloat(utilitySeleccionado.tasa) : 0;
  };

  useEffect(() => {
    const ivaRate = getIvaTasa(products.ivaP_id);
    const utilityRate = getUtilityTasa(products.utilidadP_id);
    const precioUnitario = parseFloat(products.precioCompra);

    const precioVenta = precioUnitario * (1 + utilityRate) * (1 + ivaRate);
    const precioVentaRedondeado = precioVenta.toFixed(2);

    setProducts((prevProducts) => ({
      ...prevProducts,
      precioVenta: precioVentaRedondeado,
    }));
  }, [products.precioCompra, products.utilidadP_id, products.ivaP_id]);


  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="p-8 max-w-3xl w-full bg-cyan-950 text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Registrar nuevo producto
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="codigo"
                className="text-sm font-medium mb-2 flex items-center "
              >
                <FaBarcode className=" mr-2" />
                Código del producto
              </label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                className="w-full border rounded p-2 text-black"
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
                Nombre del producto
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="w-full border rounded p-2 text-black"
                placeholder="Ingrese el nombre del producto"
                value={products.nombre}
                onChange={handleChanges}
              />
            </div>
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
                className="w-full border rounded p-2 text-black"
                placeholder="Ingrese la cantidad del producto"
                value={products.stock}
                onChange={handleChanges}
              />
            </div>
            <div>
              <label
                htmlFor="precioCompra"
                className="text-sm font-medium mb-2 flex items-center"
              >
                <FaDollarSign className="text-green-600 mr-2" />
                Precio de compra
              </label>
              <input
                type="number"
                id="precioCompra"
                name="precioCompra"
                className="w-full border rounded p-2 text-black"
                placeholder="Ingrese el precio de compra del producto"
                value={products.precioCompra}
                onChange={handleChanges}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="utilidadP_id"
                className="text-sm font-medium mb-2 flex items-center"
              >
                <FaPercent className="text-green-600 mr-2" />
                Utilidad del producto
              </label>
              <select
                id="utilidadP_id"
                name="utilidadP_id"
                className="w-full border rounded p-2 text-black"
                value={products.utilidadP_id}
                onChange={handleChanges}
              >
                <option value="">Seleccionar utilidad</option>
                {utility.map((u) => (
                  <option key={u.utilidad_id} value={u.utilidad_id}>
                    {u.tasa}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="ivaP_id"
                className="text-sm font-medium mb-2 flex items-center "
              >
                <FaPercent className="text-green-600 mr-2" />
                IVA
              </label>
              <select
                id="ivaP_id"
                name="ivaP_id"
                className="w-full border rounded p-2 text-black"
                value={products.ivaP_id}
                onChange={handleChanges}
              >
                <option value="">Seleccionar IVA</option>
                {iva.map((i) => (
                  <option key={i.iva_id} value={i.iva_id}>
                    {i.tasa}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
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
                className="w-full border rounded p-2 text-black"
                value={products.precioVenta}
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="proveedorP_id"
                className="text-sm font-medium mb-2 flex items-center"
              >
                <FaTruck className="text-teal-600 mr-2" />
                Seleccionar Proveedor
              </label>
              <select
                id="proveedorP_id"
                name="proveedorP_id"
                className="w-full border rounded p-2 text-black"
                value={products.proveedorP_id}
                onChange={handleChanges}
              >
                <option value="">Seleccionar proveedor</option>
                {providers.map((provider) => (
                  <option
                    key={provider.proveedor_id}
                    value={provider.proveedor_id}
                  >
                    {provider.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="categoriaP_id"
                className="text-sm font-medium mb-2 flex items-center"
              >
                <FaTags className="text-blue-600 mr-2" />
                Seleccionar Categoría
              </label>
              <select
                id="categoriaP_id"
                name="categoriaP_id"
                className="w-full border rounded p-2 text-black"
                value={products.categoriaP_id}
                onChange={handleChanges}
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => (
                  <option
                    key={category.categoria_id}
                    value={category.categoria_id}
                  >
                    {category.nombre_categoria}
                  </option>
                ))}
              </select>
            </div>
            <div>
                <button
                type="submit"
                className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center mt-7"
              >
                <FaSave className="mr-2" />
                Registrar producto
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
