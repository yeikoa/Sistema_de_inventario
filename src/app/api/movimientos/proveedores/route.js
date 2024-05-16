import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM RegistroProveedores");
    return NextResponse.json(results);
  } catch (error) {
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
    const requestData = await request.json();
    const {
      proveedor_id,
      nombre,
      vendedor,
      telefono,
      email,
      direccion,
      estado,
      fecha_cambio,
    } = requestData;

    // Intentando ejecutar una consulta SQL para insertar un nuevo registro en la tabla 'RegistroProveedores'
    const result = await conn.query("INSERT INTO RegistroProveedores SET ?", {
      proveedor_id,
      nombre,
      vendedor,
      telefono,
      email,
      direccion,
      estado,
      fecha_cambio,
    });

    // Si la inserción es exitosa, respondemos con un JSON que contiene los datos insertados y el ID del nuevo registro
    return NextResponse.json({
      success: true,
      proveedor_id,
      nombre,
      vendedor,
      telefono,
      email,
      direccion,
      estado,
      fecha_cambio,
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
