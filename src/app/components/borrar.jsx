"use client";
import "../style.css";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { FaUserLock, FaLock, FaMotorcycle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'; // Importa Axios

export function LoginPage() {
  const router = useRouter();
  const [nombre_usuario, setUsername] = useState("");
  const [contra, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      // Realiza una solicitud al servidor para autenticar al usuario
      const response = await axios.post('/api/usuarios', {
        nombre_usuario,
        contra,
      });

      if (response.data.success) {
        // Las credenciales son válidas, redirige al usuario a la página de inicio
        router.push('/dashboard');
        //setShowNavBar(true);
      } else {
        // Las credenciales son incorrectas, muestra un mensaje de error
        toast.error("Usuario o contraseña incorrectos. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al iniciar sesión. Por favor, intenta de nuevo.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 to-gray-300">
      <div className="w-full md:w-1/2 p-12 bg-gray-300 shadow-md">
        <div className="flex items-center justify-center mb-6">
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
                value={nombre_usuario}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
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
                value={contra}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
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
                <FaMotorcycle className="animate-move" />
              </div>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
