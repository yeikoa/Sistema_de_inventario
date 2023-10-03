'use client'
import React, { useState } from 'react';
import xml2js from 'xml2js';
import axios from 'axios';

const XmlFileUploader = () => {
  const [formData, setFormData] = useState({
    nombre: '', // Asegúrate de que los nombres coincidan con los esperados por el servidor
    cedula: '', // Asegúrate de que los nombres coincidan con los esperados por el servidor
    // Agrega otros campos aquí
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const xmlText = e.target.result;
        try {
          const result = await parseXml(xmlText);
          if (result.FacturaElectronica && result.FacturaElectronica.Receptor) {
            const receptor = result.FacturaElectronica.Receptor[0];
            // Muestra los datos del receptor en los campos del formulario
            setFormData({
              nombre: receptor.Nombre[0], // Asegúrate de que los nombres coincidan con los esperados por el servidor
              cedula: receptor.Identificacion[0].Numero[0], // Asegúrate de que los nombres coincidan con los esperados por el servidor
              // Actualiza otros campos aquí
            });
          } else {
            console.warn('Nodo "Receptor" no encontrado en el archivo XML.');
            // Limpia los campos del formulario si no se encuentra el nodo "Receptor"
            setFormData({
              nombre: '', // Asegúrate de que los nombres coincidan con los esperados por el servidor
              cedula: '', // Asegúrate de que los nombres coincidan con los esperados por el servidor
              // Limpia otros campos aquí
            });
          }
        } catch (error) {
          console.error('Error al analizar el archivo XML:', error);
        }
      };

      reader.readAsText(file);
    }
  };

  const parseXml = (xmlText) => {
    return new Promise((resolve, reject) => {
      const parser = new xml2js.Parser();

      parser.parseString(xmlText, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza una solicitud POST al servidor para insertar los datos en la base de datos
      const response = await axios.post('/api/prueba', formData);

      // Maneja la respuesta del servidor si es necesario
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };

  return (
    <div>
      <h1>Cargar Archivo XML</h1>
      <input type="file" accept=".xml" onChange={handleFileUpload} />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} // Asegúrate de que los nombres coincidan con los esperados por el servidor
          />
        </div>
        <div>
          <label>Número de Identificación:</label>
          <input
            type="text"
            value={formData.cedula}
            onChange={(e) => setFormData({ ...formData, cedula: e.target.value })} // Asegúrate de que los nombres coincidan con los esperados por el servidor
          />
        </div>
        {/* Agrega otros campos aquí */}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default XmlFileUploader;
