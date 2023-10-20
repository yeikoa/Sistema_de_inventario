'use client'
import { useState } from 'react';
import xml2js from 'xml2js';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [facturaXML, setFacturaXML] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFacturaXML(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const parseXML = () => {
    if (!facturaXML) return;

    const parser = new xml2js.Parser();
    parser.parseString(facturaXML, (err, result) => {
      if (err) {
        console.error('No se pudo analizar el archivo XML');
      } else {
        const lineasDetalle = result.FacturaElectronica.DetalleServicio[0].LineaDetalle;
        const productos = lineasDetalle.map((linea) => ({
          descripcion: linea.Detalle[0],
          cantidad: linea.Cantidad[0],
          precioUnitario: linea.PrecioUnitario[0],
          montoTotal: linea.MontoTotal[0],
        }));

        setProductos(productos);
      }
    });
  };

  return (
    <div>
      <h1>Detalle de la Factura</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={parseXML}>Procesar XML</button>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Monto Total</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.descripcion}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.precioUnitario}</td>
              <td>{producto.montoTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
