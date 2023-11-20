"use client";
import { useState } from "react";
import axios from "axios";
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from "react-icons/ai";

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
    <div className="w-full md:w-1/2 px-4">
      <h2 className="text-xl mb-4">Registrar nuevo usuario</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex items-center">
          <AiOutlineUser className="text-indigo-600" />
          <input
            type="text"
            id="nombre_usuario"
            value={nombre_usuario}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Nombre de usuario"
            className="ml-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex items-center">
          <AiOutlineLock className="text-indigo-600" />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="ml-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex items-center">
          <AiOutlineUser className="text-indigo-600" />
          <input
            type="text"
            id="nombre_completo"
            value={nombre_completo}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nombre completo"
            className="ml-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex items-center">
          <AiOutlineMail className="text-indigo-600" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="ml-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
