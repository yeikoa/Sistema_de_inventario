'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [facturaXML, setFacturaXML] = useState('');
  const [categories, setCategories] = useState([]);
  const [iva, setIva] = useState([]);
  const [utility, setUtility] = useState([]);
  const [providers, setProviders] = useState([]);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFacturaXML(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
    axios.get("/api/impuestos/iva").then((response) => {
      setIva(response.data);
    });

    axios.get("/api/impuestos/utilidad").then((response) => {
      setUtility(response.data);
    });
    axios.get("/api/providerss").then((response) => {
      setProviders(response.data);
    });

  }, []);

  const parseXML = () => {
    if (!facturaXML) return;

    const parser = new xml2js.Parser();
    parser.parseString(facturaXML, (err, result) => {
      if (err) {
        console.error('No se pudo analizar el archivo XML');
      } else {
        const lineasDetalle = result.FacturaElectronica.DetalleServicio[0].LineaDetalle;
        const productos = lineasDetalle.map((linea) => {
          const codigoComercial = linea.CodigoComercial[0].Codigo[0];
          return {
          proveedorP_id: '',  
          codigo: codigoComercial,
          descripcion: linea.Detalle[0],
          cantidad: linea.Cantidad[0],
          precioUnitario: linea.PrecioUnitario[0],
          montoTotal: linea.MontoTotal[0],
          categoriaP_id: '',
          iva: '',
          utilidad: '',
          }
        });

        setProductos(productos);
      }
    });
  };

  const handleChanges = (e, index) => {
    const newProductos = [...productos];
    newProductos[index][e.target.name] = e.target.value;
    setProductos(newProductos);
  };

  const handleProviderChange = (e) => {
    setProviders(e.target.value);
  };

  const handleEnviar = () => {
    // Aquí puedes enviar los datos al servidor
    // Usar 'productos' y 'selectedProvider' para enviar la información
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Procesar Factura</h1>
      <div className="flex items-center mb-4">
        <div className="w-1/2 p-4 border border-dashed rounded-lg flex flex-col items-center justify-center">
          <label htmlFor="fileInput" className="cursor-pointer">
            <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <p className="mt-2 text-sm text-gray-600">Arrastra un archivo aquí o haz clic para cargarlo</p>
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          {fileName && <p className="mt-2">Archivo cargado: {fileName}</p>}
        </div>
        <div className="ml-4">
          <button onClick={parseXML} className="bg-blue-500 text-white py-2 px-4 rounded">
            Procesar XML
          </button>
        </div>
      </div>
      <div className="mb-4">
        <select
          name="proveedorP_id"
          value={productos.proveedorP_id}
          onChange={(e) => handleChanges(e, index)}
          className="w-full p-1 border rounded"
        >
          <option value="">Seleccionar Proveedor</option>
          {providers.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2">Codigo</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Precio Unitario</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">IVA</th>
              <th className="px-4 py-2">Utilidad</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{producto.codigo}</td>
                <td className="px-4 py-2">{producto.descripcion}</td>
                <td className="px-4 py-2">{producto.cantidad}</td>
                <td className="px-4 py-2">{producto.precioUnitario}</td>
                <td className="px-4 py-2">{producto.montoTotal}</td>
                <td className="px-4 py-2">
                  <select
                    name="categoriaP_id"
                    value={producto.categoriaP_id}
                    onChange={(e) => handleChanges(e, index)}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">Categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.nombre_categoria}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select
                    name="iva"
                    value={producto.iva}
                    onChange={(e) => handleChanges(e, index)}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">IVA</option>
                    {/* Agrega opciones de tasa de IVA aquí */}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select
                    name="utilidad"
                    value={producto.utilidad}
                    onChange={(e) => handleChanges(e, index)}
                    className="w-full p-1 border rounded"
                  >
                    <option value="">Utilidad</option>
                    {/* Agrega opciones de tasa de utilidad aquí */}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <button onClick={handleEnviar} className="bg-blue-500 text-white py-2 px-4 rounded">
          Enviar
        </button>
      </div>
    </div>
  );
}
