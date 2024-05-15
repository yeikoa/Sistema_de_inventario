"use client"
import { LoginPage } from "./loginPage";
import { FaLock, FaMotorcycle } from "react-icons/fa";
import '../style.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

export function ChangePass() {
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [verificationCode, setVerificationCode] = useState(localStorage.getItem('verificationCode') || '');
  const [enteredCode, setEnteredCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
 // console.log("Email:", email);
  //console.log("Verification Code:", verificationCode);

  const handlePassChange = async () => {
    if (enteredCode !== verificationCode) {
      toast.error("Código de verificación incorrecto.");
      setLoading(false);
      return;
    }
  
    // Si el código es correcto, proceder con el cambio de contraseña
    try {
      const response = await axios.put('/api/recovery', {
        email,
        newPassword
      });
      if (response.data.success) {
        toast.success("Contraseña cambiada con éxito.");
          setTimeout(() => {
            setShowLoginPage(true);
          }, 3000);
        
      } else {
        toast.error("Error al cambiar la contraseña.");
      }
    } catch (error) {
      toast.error("Error al cambiar la contraseña: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (showLoginPage) {
    return <LoginPage />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-700 to-gray-300">
      <ToastContainer />
      <div className="w-full max-w-md p-12 bg-gray-300 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-center mb-6">
          <div className="absolute top-0 left-0 p-4">
              <img
                src="/logoEligam.png"
                alt="Logo de la empresa"
                className="w-12 h-12"
              />
            </div>
          <h1 className="text-3xl font-semibold text-cyan-900">
            Recuperar cuenta
          </h1>
        </div>
        <form className="space-y-4">
          <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
            <label className="block text-cyan-900 ml-8">Código de recuperación</label>
            <div className="flex items-center">
              <span className="mr-4 text-black-400">
                <FaLock />
              </span>
              <input
                type="text"
                placeholder="Código"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-700 focus:border-cyan-900 transition-colors duration-300"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <div className="mb-4 transition-transform duration-300 transform hover:-translate-y-1">
            <label className="block text-cyan-900 ml-8">Nueva contraseña</label>
            <div className="flex items-center">
              <span className="mr-4 text-black-400">
                <FaLock />
              </span>
              <input
                 type="password"
                 placeholder="Ingresa tu nueva contraseña"
                 className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-cyan-900 focus:border-cyan-900 transition-colors duration-300"
                 value={newPassword}
                 onChange={(e) => setNewPassword(e.target.value)}
                 disabled={loading}
              />
            </div>  
          </div>
          <button
            type="button"
            className={`block w-full px-4 py-2 text-white rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-700 hover:bg-cyan-900 transition-colors duration-300"
            }`}
            onClick={handlePassChange}
            disabled={loading}
          >
          {loading ? (
              <div className="flex items-center justify-center">
                <FaMotorcycle className="animate-move" />
              </div>
            ) : (
              "Cambiar contraseña"
            )}
          </button>
        </form>
        
      </div>
    </div>
  );
}
