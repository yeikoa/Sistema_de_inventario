import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { nombre_usuario, password, nombre_completo, email } =
      await request.json();

    // Insertar un nuevo usuario en la tabla 'Usuarios'
    const result = await conn.query(
      "INSERT INTO Usuarios (nombre_usuario, password, nombre_completo, email) VALUES (?, ?, ?, ?)",
      [nombre_usuario, password, nombre_completo, email]
    );

    // Responder con los datos del usuario insertado y su ID
    return NextResponse.json({
      nombre_usuario,
      nombre_completo,
      email,
      //estado,
      id: result.insertId,
    });
  } catch (error) {
    // Manejar errores
    console.error(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    // Obtener todos los usuarios de la tabla 'Usuarios'
    const results = await conn.query("SELECT * FROM Usuarios");

    // Responder con los usuarios obtenidos
    
    return NextResponse.json(results);
  } catch (error) {
    // Manejar errores
    console.error(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}



