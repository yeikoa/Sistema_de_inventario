import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { tasa } = await request.json();

    // Intentando ejecutar una consulta SQL para insertar un nuevo registro en la tabla 'Iva'
    const result = await conn.query("INSERT INTO Iva (tasa) VALUES (?)", [tasa]);
    
    // Si la inserción es exitosa, respondemos con un JSON que contiene los datos insertados y el ID del nuevo registro
    return NextResponse.json({
      tasa,
      id: result.insertId,
    });
  } catch (error) {
    // Si ocurre un error, lo registramos en la consola y respondemos con un mensaje de error y un código de estado 500
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

export async function GET() {
    try {
      // Intentando ejecutar una consulta SQL para obtener todos los registros de la tabla 'Iva'
      const results = await conn.query("SELECT * FROM Iva WHERE activo = TRUE");
      
      // Si la consulta es exitosa, respondemos con un JSON que contiene los resultados
      return NextResponse.json(results);
    } catch (error) {
      // Si ocurre un error, lo registramos en la consola y respondemos con un mensaje de error y un código de estado 500
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