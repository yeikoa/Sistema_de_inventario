"use client";
import "../style.css";
import React, { useState, useEffect } from "react";
import { RecoverPass } from "./recoverPass";

import { FaUserLock, FaLock, FaMotorcycle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

import { signIn, signOut, useSession } from "next-auth/react";
export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRecoverPass, setShowRecoverPass] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const handleLogin = async (event) => {
    setLoading(true);
    event.preventDefault();
    setErrors([]);
    try {
      const responseNextAuth = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        setLoading(false);
        setErrors(responseNextAuth.error.split(","));
        return;
      }

      // Verificar si la respuesta de tu API de usuarios contiene un error
      if (responseNextAuth?.user?.error) {
        setErrors([responseNextAuth.user.error]);
        return;
      }

      toast.success("Inicio de sesión exitoso. Redirigiendo...", {
        onClose: () => router.push("/dashboard"),
      });
    } catch (error) {
      //console.error(error);
      // Manejar otros errores aquí
    } finally {
      setLoading(false);
    }
  };

  const handleShowRecoverPass = () => {
    setShowRecoverPass(true);
  };

  if (showRecoverPass) {
    return <RecoverPass />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 to-gray-300">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-12 bg-gray-300 shadow-md">
          <img
            src="/logoEligam.png"
            alt="Logo de la empresa"
            className="w-full h-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-12 bg-gray-300 shadow-md">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-3xl font-semibold text-cyan-900">
              Iniciar sesión
            </h1>
          </div>
          <form className="space-y-4">
            <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
              <label className="block text-cyan-900 ml-8">Usuario</label>
              <div className="flex items-center">
                <span className="mr-4 text-black-400">
                  <FaUserLock />
                </span>
                <input
                  id="email-user"
                  type="email"
                  placeholder="test@test.com"
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-cyan-900 focus:border-cyan-900 transition-colors duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
              <label className="block text-cyan-900 ml-8">Contraseña</label>
              <div className="flex items-center">
                <span className="mr-4 text-black-400">
                  <FaLock />
                </span>
                <input
                  id="pass-user"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-cyan-900 focus:border-cyan-900 transition-colors duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            {errors.length > 0 && (
              <div className="text-red-600">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <button
            id= "login"
              type="button"
              className={`block w-full px-4 py-2 text-white rounded-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cyan-900 hover:bg-gray-900 transition-colors duration-300"
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
          <div className="mt-4 text-center">
            <p className="text-cyan-900">
              <a
                href="#"
                className="text-cyan-900"
                onClick={handleShowRecoverPass}
              >
                ¿Recuperar cuenta?
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
