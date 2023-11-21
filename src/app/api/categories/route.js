import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

// Definiendo una función asincrónica GET para manejar las solicitudes GET
export async function GET() {
    try {
      // Intentando ejecutar una consulta SQL para obtener todos los registros de la tabla 'productos'
      const results = await conn.query("SELECT categoria_id, nombre_categoria FROM Categorias");
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
  export async function POST(request) {
    try {
      const { nombre_categoria } =
        await request.json();
  
      // Insertar un nuevo usuario en la tabla 'Usuarios'
      const result = await conn.query(
        "INSERT INTO Categorias (nombre_categoria) VALUES (?)",
        [nombre_categoria]
      );
  
      // Responder con los datos del usuario insertado y su ID
      return NextResponse.json({
        nombre_categoria,
        
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