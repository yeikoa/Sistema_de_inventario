"use client";
import React, { useState, useEffect } from "react";
import { UserRegistrationForm } from "../components/usuarios/registroU";
import { UsersTable } from "../components/usuarios/tablaU";
import axios from "axios";

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/tr-usuarios");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };
  const deleteUser = async (usuario_id) => {
    try {
      await axios.delete(`/api/tr-usuarios/${usuario_id}`);
      const updatedUsers = users.filter(
        (user) => user.usuario_id !== usuario_id
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
  };

  const addUser = async (newUser) => {
    try {
      await axios.post("/api/tr-usuarios", newUser);
      fetchUsers();
    } catch (error) {
      console.error("Error al agregar usuario", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <UsersTable users={users} onDeleteUser={deleteUser} />
      <UserRegistrationForm onAddUser={addUser} />
    </div>
  );
}
