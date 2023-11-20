import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const results = await conn.query(
      "SELECT * FROM Usuarios WHERE email = ? AND password = ?",
      [email, password]
    );

    if (results.length > 0) {
      console.log("Inicio de sesión exitoso");

      return NextResponse.json({
        success: true,
        message: "Inicio de sesión exitoso",
        email,
        password,
      });
    } else {
      return NextResponse.json({
        error: "Credenciales incorrectas",
        message: "Usuario o contraseña incorrectos",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Error en el servidor",
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
