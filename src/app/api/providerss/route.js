import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

// Definiendo una función asincrónica GET para manejar las solicitudes GET
export async function GET() {
    try {
      // Intentando ejecutar una consulta SQL para obtener todos los registros de la tabla 'productos'
      const results = await conn.query("SELECT proveedor_id, nombre FROM Proveedores");
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