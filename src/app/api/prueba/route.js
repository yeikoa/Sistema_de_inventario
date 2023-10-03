import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Desestructura los datos del cuerpo de la solicitud
    const {
      nombre,
      cedula,
    } = await request.json();

    // Intenta ejecutar una consulta SQL para insertar un nuevo registro en la tabla 'Usuarios'
    const result = await conn.query("INSERT INTO Usuarios (nombre, cedula) VALUES (?, ?)", [
      nombre,
      cedula,
    ]);

    // Si la inserción es exitosa, responde con un JSON que contiene los datos insertados y el ID del nuevo registro
    return NextResponse.json({
      success: true,
      nombre,
      cedula,
      id: result.insertId,
    });
  } catch (error) {
    // Si ocurre un error, regístralo en la consola y responde con un mensaje de error y un código de estado 500
    console.log(error);
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
