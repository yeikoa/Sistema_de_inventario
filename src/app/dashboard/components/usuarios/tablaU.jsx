"use client";
import React, { useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function UsersTable({ users, onDeleteUser }) {
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const startEditing = (userId) => {
    const user = users.find((user) => user.usuario_id === userId);
    setEditUserId(userId);
    setEditedUser({ ...user });
  };

  const cancelEditing = () => {
    setEditUserId(null);
    setEditedUser({});
  };

  const saveField = async (userId) => {
    try {
      await axios.put(`/api/tr-usuarios/${userId}`, editedUser);
      cancelEditing();
      fetchUsers();
    } catch (error) {
      console.error("Error al actualizar usuario", error);
    }
  };

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setEditedUser({ ...editedUser, [fieldName]: value });
  };

  const handleEliminate = async (usuario_id) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: "¿Estás seguro de que deseas eliminar este usuario?",
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            try {
              onDeleteUser(usuario_id);
            } catch (error) {
              console.error("Error al eliminar el producto", error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="w-full px-4 py-5 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Lista de Usuarios
      </h2>
      <table className="w-full text-left bg-white border border-cyan-900">
        <thead className="bg-cyan-900 text-white">
          <tr className="text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6">Nombre de Usuario</th>
            <th className="py-3 px-6">Nombre Completo</th>
            <th className="py-3 px-6">Correo Electrónico</th>
            <th className="py-3 px-6">Estado</th>
            <th className="py-3 px-6">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-black text-sm font-light">
          {users.map((user) => (
            <tr
              key={user.usuario_id}
              className={user.usuario_id % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-3 px-6 border-b border-cyan-900 text-sm">
                {editUserId === user.usuario_id ? (
                  <input
                    type="text"
                    value={editedUser.nombre_usuario}
                    onChange={(e) => handleInputChange(e, "nombre_usuario")}
                    className="border-2 border-gray-300 p-2 rounded-lg"
                  />
                ) : (
                  user.nombre_usuario
                )}
              </td>
              <td className="py-3 px-6 border-b border-cyan-900 text-sm">
                {editUserId === user.usuario_id ? (
                  <input
                    type="text"
                    value={editedUser.nombre_completo}
                    onChange={(e) => handleInputChange(e, "nombre_completo")}
                    className="border-2 border-gray-300 p-2 rounded-lg"
                  />
                ) : (
                  user.nombre_completo
                )}
              </td>
              <td className="py-3 px-6 border-b border-cyan-900 text-sm">
                {editUserId === user.usuario_id ? (
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => handleInputChange(e, "email")}
                    className="border-2 border-gray-300 p-2 rounded-lg"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="py-3 px-6 border-b border-cyan-900 text-sm">
                {editUserId === user.usuario_id ? (
                  <select
                    value={editedUser.estado}
                    onChange={(e) => handleInputChange(e, "estado")}
                    className="border-2 border-gray-300 p-2 rounded-lg"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                ) : (
                  user.estado
                )}
              </td>
              <td className="py-3 px-6 border-b border-cyan-900 items-center  ">
                {editUserId === user.usuario_id ? (
                  <>
                    <button
                      onClick={() => saveField(user.usuario_id)}
                      className="text-green-600 hover:text-green-800 transition duration-300 mr-2"
                    >
                      <AiOutlineCheck size={20} />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-red-600 hover:text-red-800 transition duration-300 "
                    >
                      <AiOutlineClose size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(user.usuario_id)}
                      className="text-blue-600 hover:text-blue-800 transition duration-300 mr-2"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleEliminate(user.usuario_id)}
                      className="text-red-600 hover:text-red-800 transition duration-300"
                    >
                      <FaTrash size={20} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
