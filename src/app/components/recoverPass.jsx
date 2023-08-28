"use client";
import React, { useState } from "react";
import { ChangePass } from "./changePass";
import { FaUserLock, FaMotorcycle } from "react-icons/fa";
import '../style.css';

export function RecoverPass() {
  const [Gmail, setGmail] = useState("");
  const [showChangePass, setShowChangePass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowChangePass = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setShowChangePass(true);
    }, 2000);
  };

  if (showChangePass) {
    return <ChangePass />;
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
            <label className="block text-teal-600 ml-8">
              Correo Electrónico
            </label>
            <div className="flex items-center">
              <span className="mr-4 text-black-400">
                <FaUserLock />
              </span>
              <input
                type="text"
                placeholder="Correo"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-green-700 focus:border-green-700 transition-colors duration-300"
                value={Gmail}
                onChange={(e) => setGmail(e.target.value)}
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
            onClick={handleShowChangePass}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <FaMotorcycle className="animate-move" />
              </div>
            ) : (
              "Verificar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
