"use client"
import React, { useState } from "react";
import { ChangePass } from "./ChangePass"; // Importa el componente ChangePass

export function RecoverPass() {
  const [Gmail, setGmail] = useState("");
  const [showChangePass, setShowChangePass] = useState(false); // Nuevo estado para el componente ChangePass

  const handleShowChangePass = () => {
    setShowChangePass(true); // Establece showChangePass en true cuando se hace clic en el botón
  };

  if (showChangePass) {
    return <ChangePass />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-700 to-gray-300">
      <div className="w-full max-w-md p-6 bg-gray-300 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-center mb-6">
          <img
            src="/logoEligam.jpg" // Ruta de tu logotipo
            alt="Logo de la empresa"
            className="w-12 h-12 mr-2"
          />
          <h1 className="text-3xl font-semibold text-green-700">Recuperar cuenta</h1>
        </div>
        <form className="space-y-4">
          <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
            <label className="block text-teal-600">Correo Electrónico</label>
            <input
              type="text"
              placeholder="Correo"
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 transition-colors duration-300"
              value={Gmail}
              onChange={(e) => setGmail(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="block w-full px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-gray-900 transition-colors duration-300"
            onClick={handleShowChangePass} // Agrega el controlador onClick para cambiar a ChangePass
          >
            Verificar
          </button>
        </form>
      </div>
    </div>
  );
}
