import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const results = await conn.query("SELECT * FROM Usuarios");

    return NextResponse.json(results);
  } catch (error) {
    // Manejar errores
    //console.error(error);
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

export async function POST(request) {
  try {
    const { nombre_usuario, password, nombre_completo, email } =
      await request.json();

    const result = await conn.query(
      "INSERT INTO Usuarios (nombre_usuario, password, nombre_completo, email) VALUES (?, ?, ?, ?)",
      [nombre_usuario, password, nombre_completo, email]
    );

    return NextResponse.json({
      nombre_usuario,
      nombre_completo,
      email,
      //estado,
      id: result.insertId,
    });
  } catch (error) {
    // Manejar errores
    //console.error(error);
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





