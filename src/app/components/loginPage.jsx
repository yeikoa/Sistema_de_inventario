"use client"
import React, { useState } from "react";
import { RecoverPass } from "./recoverPass";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRecoverPass, setShowRecoverPass] = useState(false);

  const handleLogin = () => {
    console.log("Iniciar sesión con:", username, password);
  };

  const handleShowRecoverPass = () => {
    setShowRecoverPass(true);
  };

  // Render only the RecoverPass component when showRecoverPass is true
  if (showRecoverPass) {
    return <RecoverPass />;
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
          <h1 className="text-3xl font-semibold text-green-700">Iniciar Sesión</h1>
        </div>
        <form className="space-y-4">
          <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
            <label className="block text-teal-600">Usuario</label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 transition-colors duration-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
            <label className="block text-teal-600">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 transition-colors duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="block w-full px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-gray-900 transition-colors duration-300"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-teal-600">
            <a
              href="#"
              className="text-green-700"
              onClick={handleShowRecoverPass}
            >
              ¿Recuperar Contraseña?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
