"use client"
import React, { useState } from "react";
import { LoginPage } from "./loginPage";
import {  FaLock, FaTruckMonster } from "react-icons/fa";

export function ChangePass() {
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [loading, setLoading] = useState(false);//Estado del boton

  const handlePassChange = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setShowLoginPage(true);

    }, 2000); // Simulamos un tiempo de carga de 2 segundos
  };

  if (showLoginPage) {
    return <LoginPage />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-700 to-gray-300">
      <div className="w-full max-w-md p-12 bg-gray-300 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-center mb-6">
          <div className="absolute top-0 left-0 p-4">
              <img
                src="/logoEligam.png"
                alt="Logo de la empresa"
                className="w-12 h-12"
              />
            </div>
          <h1 className="text-3xl font-semibold text-green-700">
            Recuperar cuenta
          </h1>
        </div>
        <form className="space-y-4">
          <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
            <label className="block text-teal-600 ml-8">Código de recuperación</label>
            <div className="flex items-center">
              <span className="mr-4 text-black-400">
                <FaLock />
              </span>
              <input
                type="text"
                placeholder="Código"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 transition-colors duration-300"
              />
            </div>
          </div>
          <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
            <label className="block text-teal-600 ml-8">Nueva Contraseña</label>
            <div className="flex items-center">
              <span className="mr-4 text-black-400">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 transition-colors duration-300"
              />
            </div>  
          </div>
          <button
            type="button"
            className={`block w-full px-4 py-2 text-white rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-700 hover:bg-gray-900 transition-colors duration-300"
            }`}
            onClick={handlePassChange}
            disabled={loading}
          >
          {loading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 animate-spin">
                  <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></div>
                  <svg
                    className="h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 01-2.315-1.942M21 12c0-4.418-3.582-8-8-8V0a10 10 0 0110 10h-2zm-9.685 6.749A7.962 7.962 0 015.315 18.06M12 21a8 8 0 00-8-8h2a6 6 0 0112 0h2a8 8 0 00-8 8z"
                    ></path>
                  </svg>
                </div>
                Cargando...
              </div>
            ) : (
              "Cambiar contraseña"
            )}
          </button>
        </form>
        <div className="absolute bottom-0 right-0 p-4">
          <FaTruckMonster size={40} color="black" />
      </div>
      </div>
    </div>
  );
}
