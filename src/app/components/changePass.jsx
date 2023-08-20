"use client"
import React, { useState } from "react";
import { LoginPage } from "./LoginPage";

export function ChangePass() {
  const [showLoginPage, setShowLoginPage] = useState(false);

  const handlePassChange = () => {
    setShowLoginPage(true);
  };

  if (showLoginPage) {
    return <LoginPage />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-700 to-gray-300">
      <div className="w-full max-w-md p-6 bg-gray-300 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-center mb-6">
          <img
            src="/logoEligam.jpg"
            alt="Logo de la empresa"
            className="w-12 h-12 mr-2"
          />
          <h1 className="text-3xl font-semibold text-green-700">
            Recuperar cuenta
          </h1>
        </div>
        <form className="space-y-4">
          <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
            <label className="block text-teal-600">Código de recuperación</label>
            <input
              type="text"
              placeholder="Código"
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 transition-colors duration-300"
            />
          </div>
          <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
            <label className="block text-teal-600">Nueva Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 transition-colors duration-300"
            />
          </div>
          <button
            type="button"
            className="block w-full px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-gray-900 transition-colors duration-300"
            onClick={handlePassChange}
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
