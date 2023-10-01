// Importando la conexión a la base de datos y la clase NextResponse de la biblioteca 'next/server'
import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

// Definiendo una función asincrónica GET para manejar las solicitudes GET
export async function GET() {
  try {
    // Intentando ejecutar una consulta SQL para obtener todos los registros de la tabla 'productos'
    const results = await conn.query("SELECT * FROM productos");
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

// Definiendo una función asincrónica POST para manejar las solicitudes POST
export async function POST(request) {
  try {
    // Desestructurando los datos del cuerpo de la solicitud
    const {
      codigo,
      nombre,
      precioVenta,
      stock,
      proveedorP_id,
      categoriaP_id,
      ivaP_id,
      utilidadP_id,
    } = await request.json();

    // Intentando ejecutar una consulta SQL para insertar un nuevo registro en la tabla 'Productos'
    const result = await conn.query("INSERT INTO Productos SET ? ", {
      codigo,
      nombre,
      precioVenta,
      stock,
      proveedorP_id,
      categoriaP_id,
      ivaP_id,
      utilidadP_id,
    });
    // Si la inserción es exitosa, respondemos con un JSON que contiene los datos insertados y el ID del nuevo registro
    return NextResponse.json({
      codigo,
      nombre,
      precioVenta,
      stock,
      proveedorP_id,
      categoriaP_id,
      ivaP_id,
      utilidadP_id,
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
