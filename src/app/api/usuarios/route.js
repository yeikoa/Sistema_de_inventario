import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Realiza una consulta SQL para verificar las credenciales del usuario
    const results = await conn.query("SELECT * FROM Usuarios WHERE email = ? AND password = ?", [email, password]);

    if (results.length > 0) {
      // Las credenciales son válidas, autentica al usuario
      // Puedes establecer una sesión o generar un token de autenticación en este punto
      console.log("Inicio de sesión exitoso");
      // En este ejemplo, simplemente respondemos con un mensaje de éxito
      return NextResponse.json({
        success: true,
        message: "Inicio de sesión exitoso",
        email,
        password,
      });
    } else {
      // Las credenciales son incorrectas
      return NextResponse.json({
        error: "Credenciales incorrectas", // Agrega un campo "error" aquí
        message: "Usuario o contraseña incorrectos",
      });
    }
  } catch (error) {
    // Si ocurre un error, regístralo en la consola y responde con un mensaje de error y un código de estado 500
    console.log(error);
    return NextResponse.json(
      {
        error: "Error en el servidor", // Agrega un campo "error" aquí
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
