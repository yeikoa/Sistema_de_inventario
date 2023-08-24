'use client'
import React, { useState } from "react";
import { RecoverPass } from "./recoverPass";
import Navbar from "./navbar";
import { FaUserLock, FaLock, FaTruckMonster } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRecoverPass, setShowRecoverPass] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    // Simulamos la autenticación
    setTimeout(() => {
      setLoading(false);

      // Si la autenticación es exitosa
      if (username === "usuario" && password === "contraseña") {
        setShowNavBar(true);
      } else {
        // Mostramos una notificación de error
        toast.error("Usuario o contraseña incorrectos. Por favor, intenta de nuevo.");
      }
    }, 2000); // Simulamos un tiempo de carga de 2 segundos
  };

  if (showNavBar) {
    return <Navbar />;
  }

  const handleShowRecoverPass = () => {
    setShowRecoverPass(true);
  };

  if (showRecoverPass) {
    return <RecoverPass />;
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
            Iniciar Sesión
          </h1>
        </div>
        <form className="space-y-4">
          <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
            <label className="block text-teal-600 ml-8">Usuario</label>
            <div className="flex items-center">
              <span className="mr-4 text-black-400">
                <FaUserLock />
              </span>
              <input
                type="text"
                placeholder="Ingresa tu usuario"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 transition-colors duration-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
            <label className="block text-teal-600 ml-8">Contraseña</label>
            <div className="flex items-center">
              <span className="mr-4 text-black-400">
                <FaLock />
              </span>
              <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 transition-colors duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleLogin}
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
              "Iniciar Sesión"
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-teal-600">
            <a
              href="#"
              className="text-green-700"
              onClick={handleShowRecoverPass}
            >
              ¿Recuperar Cuenta?
            </a>
          </p>
        </div>
        <div className="absolute bottom-0 right-0 p-4">
          <FaTruckMonster size={40} color="black" />
        </div>
      </div>
      {/* ToastContainer para mostrar notificaciones */}
      <ToastContainer />
    </div>
  );
}
