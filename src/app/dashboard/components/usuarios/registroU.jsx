"use client";
import { useState } from "react";
import axios from "axios";
import { AiOutlineUser, AiOutlineLock, AiOutlineMail, AiOutlineIdcard  } from "react-icons/ai";

export function UserRegistrationForm({onAddUser }) {
  const [nombre_usuario, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [nombre_completo, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async (newUser) => {
    try {
      await axios.post('/api/tr-usuarios', newUser);
     
    } catch (error) {
      console.error("Error al agregar usuario", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { nombre_usuario, password, nombre_completo, email };
    await onAddUser(newUser);
    //addUser(newUser);
    setUserName("");
    setPassword("");
    setFullName("");
    setEmail("");
  };

  return (
    <div className="w-full px-4 py-5 bg-gray-200 shadow rounded-lg">
      
        <h2 className="text-2xl font-semibold text-gray-800">
          Registrar nuevo usuario
        </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center border-b-2 py-2">
          <AiOutlineUser className="text-indigo-600" />
          <input
            type="text"
            id="nombre_usuario"
            value={nombre_usuario}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Nombre de usuario"
            className="flex-1 ml-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex items-center border-b-2 py-2">
          <AiOutlineLock className="text-indigo-600" />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="flex-1 ml-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex items-center border-b-2 py-2">
          <AiOutlineIdcard className="text-indigo-600" />
          <input
            type="text"
            id="nombre_completo"
            value={nombre_completo}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nombre completo"
            className="flex-1 ml-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex items-center border-b-2 py-2">
          <AiOutlineMail className="text-indigo-600" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="flex-1 ml-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-cyan-700 text-white rounded-md hover:bg-cyan-900"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
