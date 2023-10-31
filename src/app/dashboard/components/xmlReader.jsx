"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import xml2js from "xml2js";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [facturaXML, setFacturaXML] = useState("");

  const [categories, setCategories] = useState([]);
  const [iva, setIva] = useState([]);
  const [selectedIva, setSelectedIva] = useState("");
  const [utility, setUtility] = useState([]);
  const [selectedUtility, setSelectedUtility] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [providers, setProviders] = useState([]);
  const [precioVenta, setPrecioVenta] = useState("");
  const[fecha, setFecha] = useState("");
  const[codigoFactura, setCodigoFactura] = useState("");
  const[totalComprobante, setTotalComprobante] = useState(0);

  const [fileName, setFileName] = useState("");

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
  //cambiar o quitar
  const getIvaTasa = (ivaId) => {
    //console.log(`ivaId recibido:`, iva_id);
    //console.log(`Array iva:`, iva);
    const ivaSeleccionado = iva.find((i) => i.iva_id === parseInt(ivaId, 10));
    //console.log(`IVA encontrado:`, ivaSeleccionado);
    return ivaSeleccionado ? parseFloat(ivaSeleccionado.tasa) : 0;
  };

  const getUtilityTasa = (utilityId) => {
    const utilitySeleccionado = utility.find(
      (u) => u.utilidad_id === parseInt(utilityId, 10)
    );
    return utilitySeleccionado ? parseFloat(utilitySeleccionado.tasa) : 0;
  };
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

  const redondearPrecio = (precio) => {
    return Math.round(precio / 10) * 10;
  };

  const parseXML = () => {
    if (!facturaXML) return;

    const parser = new xml2js.Parser();
    parser.parseString(facturaXML, (err, result) => {
      if (err) {
        console.error("No se pudo analizar el archivo XML");
      } else {
        const lineasDetalle =
          result.FacturaElectronica.DetalleServicio[0].LineaDetalle;
          const codigoFactura =result.FacturaElectronica.NumeroConsecutivo[0];
          setCodigoFactura(codigoFactura);
          const totalComprobante = result.FacturaElectronica.ResumenFactura[0].TotalComprobante;
          setTotalComprobante(totalComprobante);
          
        const productos = lineasDetalle.map((linea) => {
          const codigoComercial = linea.CodigoComercial[0].Codigo[0];
          const precioUnitario = parseFloat(linea.PrecioUnitario[0]);
         
          // Calcula la tasa de IVA y utilidad
          const ivaRate = getIvaTasa(selectedIva);
          const utilityRate = getUtilityTasa(selectedUtility);

          // Calcula el precio de venta
          const precioVenta =
            precioUnitario * (1 + utilityRate) * (1 + ivaRate);
          let precioVentaRedondeado = redondearPrecio(precioVenta);
          return {
            codigo: codigoComercial,
            nombre: linea.Detalle[0],
            stock: linea.Cantidad[0],
            precioUnitario: precioUnitario,
            montoTotal: linea.MontoTotal[0],
            categoriaP_id: "",
            categoriaP_id: "",
            ivaP_id: selectedIva,
            utilidadP_id: selectedUtility,
            proveedorP_id: selectedProvider,
            precioVenta: precioVentaRedondeado,
            
          };
        });

        setProductos(productos);
      }
    });
  };

  const handleChanges = (e, index) => {
    const newProductos = [...productos];
    newProductos[index][e.target.name] = e.target.value;
    setProductos(newProductos);
    console.log(newProductos);
  };

  const handleIvaChange = (e) => {
    const newValue = e.target.value;
    setSelectedIva(newValue);

    // Actualiza todos los productos con el mismo valor de IVA
    const newProductos = productos.map((producto) => ({
      ...producto,
      ivaP_id: newValue,
    }));
    setProductos(newProductos);
  };

  const handleUtilityChange = (e) => {
    const newValue = e.target.value;
    setSelectedUtility(newValue);

    // Actualiza todos los productos con el mismo valor de utilidad
    const newProductos = productos.map((producto) => ({
      ...producto,
      utilidadP_id: newValue,
    }));
    setProductos(newProductos);
  };

  const handleProviderChange = (e) => {
    const newValue = e.target.value;
    setSelectedProvider(newValue);
    // Actualiza todos los productos con el mismo valor de proveedor
    const newProductos = productos.map((producto) => ({
      ...producto,
      proveedorP_id: newValue,
    }));
    setProductos(newProductos);
  };
  const facturaEnviar = () => {

    const datosFactura = {
      fecha: fecha,
      total: totalComprobante,
      proveedor_id: selectedProvider,
      codigoFactura: codigoFactura,
    };
    
    return datosFactura;
  };
  const detalleFactura = () => {
    const datosDetalle = productos.map((producto) => {
      return {
        nombreProducto: producto.nombre,
        cantidad: producto.stock,
        precio_compra: producto.precioUnitario,
      };
    });
    return datosDetalle;
  };
  const prepararDatosParaEnvio = () => {
    const datosFiltrados = productos.map((producto) => {
      return {
        codigo: producto.codigo,
        nombre: producto.nombre,
        precioVenta: producto.precioVenta,
        stock: producto.stock,
        proveedorP_id: producto.proveedorP_id,
        categoriaP_id: producto.categoriaP_id,
        ivaP_id: producto.ivaP_id,
        utilidadP_id: producto.utilidadP_id,
      };
    });
    console.log("Datos Filtrados para Envío:", datosFiltrados);
    return datosFiltrados;
  };
  //para probar
  useEffect(() => {
    const datosFactura = detalleFactura();
    const datosParaEnvio = prepararDatosParaEnvio();
    console.log("Prueba de Datos para Envío:", datosFactura);
  }, [productos]); // Dependiendo de productos para recalcular cuando cambien

  const handleEnviar = async () => {
    try {
      const datosParaEnvio = prepararDatosParaEnvio();
      if (datosParaEnvio.some(producto => !producto.codigo)) {
        console.error("Algunos productos no tienen código válido", datosParaEnvio);
        return;
      }
      const productResponse = await axios.post("/api/facturas", datosParaEnvio);

      if(productResponse.status === 200){
        alert("Datos enviados correctamente")
      }else{
        alert("Error al enviar los datos")
      }
    } catch (error) {
      
    }

    try {
      const factura = facturaEnviar();
      const detallesFactura = detalleFactura();
      const datosEnvio = {
        factura,
        detalles: detallesFactura
      };
      const facturaResponse = await axios.post("/api/movimientos/facturas", datosEnvio);
      if(facturaResponse.status === 200){
        console.log("Datos enviados correctamente")
      }else{
        console.log("Error al enviar los datos")
      }
    } catch (error) {
      
    }

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
            <p className="mt-2 text-sm text-gray-600">
              Arrastra un archivo aquí o haz clic para cargarlo
            </p>
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
          <button
            onClick={parseXML}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Procesar XML
          </button>
        </div>
      </div>
      <div className="mb-4 flex justify-between">
        <div className="w-1/4">
          <label htmlFor="providerSelect" className="block font-medium">
            Seleccionar Proveedor:
          </label>
          <select
            id="providerSelect"
            name="proveedorP_id"
            value={selectedProvider}
            onChange={handleProviderChange}
            className="w-full p-1 border rounded"
          >
            <option value="">Seleccionar Proveedor</option>
            {providers.map((provider) => (
              <option key={provider.proveedor_id} value={provider.proveedor_id}>
                {provider.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/4">
          <label htmlFor="ivaSelect" className="block font-medium">
            Seleccionar IVA:
          </label>
          <select
            id="ivaSelect"
            value={selectedIva}
            onChange={handleIvaChange}
            className="w-full p-1 border rounded"
          >
            <option value="">IVA</option>
            {iva.map((i) => (
              <option key={i.iva_id} value={i.iva_id}>
                {i.tasa}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/4">
          <label htmlFor="utilitySelect" className="block font-medium">
            Seleccionar Utilidad:
          </label>
          <select
            id="utilitySelect"
            value={selectedUtility}
            onChange={handleUtilityChange}
            className="w-full p-1 border rounded"
          >
            <option value="">Utilidad</option>
            {utility.map((u) => (
              <option key={u.utilidad_id} value={u.utilidad_id}>
                {u.tasa}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/4">
    <label htmlFor="fecha" className="block font-medium">
      Fecha:
    </label>
    <input
      type="date"
      id="fecha"
      value={fecha}
      onChange={(e) => setFecha(e.target.value)}
      className="w-full p-1 border rounded"
    />
  </div>
  <div className="w-1/4">
    <label htmlFor="total" className="block font-medium">
      Total:
    </label>
    <input
      readOnly
      type="number"
      id="total"
      value={totalComprobante}
      
      className="w-full p-1 border rounded"
    />
  </div>
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
              <th className="px-4 py-2">Precio venta</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{producto.codigo}</td>
                <td className="px-4 py-2">{producto.nombre}</td>
                <td className="px-4 py-2">{producto.stock}</td>
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
                      <option
                        key={category.categoria_id}
                        value={category.categoria_id}
                      >
                        {category.nombre_categoria}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">{producto.precioVenta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <button
          onClick={handleEnviar}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
