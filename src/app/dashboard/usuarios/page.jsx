'use client'
import { useState } from "react";
import { AiOutlineUser, AiOutlineLock, AiOutlineMail, AiOutlineTeam } from "react-icons/ai";

export default function UserRegistration() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, { userName, password, fullName, email, role }]);
    setUserName("");
    setPassword("");
    setFullName("");
    setEmail("");
    setRole("");
  };

  return (
    <div className="container mx-auto p-8 rounded-lg bg-gray-50 shadow-lg">
      <h1 className="text-2xl mb-8">Registro de usuarios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex items-center">
              <AiOutlineUser className="text-indigo-600" />
              <input
                type="text"
                id="userName"
                value={userName}
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
                id="fullName"
                value={fullName}
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
            <div className="flex items-center">
              <AiOutlineTeam className="text-indigo-600" />
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="ml-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              >
                <option value="" disabled>
                  Seleccione un rol
                </option>
                <option value="admin">Admin</option>
                <option value="user">Usuario</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Registrar
            </button>
          </form>
        </div>
        <div>
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">Nombre de usuario</th>
                <th className="py-2 px-4 border-b border-gray-200">Nombre completo</th>
                <th className="py-2 px-4 border-b border-gray-200">Correo electrónico</th>
                <th className="py-2 px-4 border-b border-gray-200">Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="py-2 px-4 border-b border-gray-200">{user.userName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{user.fullName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}