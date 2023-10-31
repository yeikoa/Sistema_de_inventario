import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const results = await conn.query(
        "SELECT * FROM Proveedores where estado = 'activo'"
      );
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
        const { nombre, vendedor, telefono, email, direccion } = requestData;

        // Validar los datos recibidos aquí si es necesario

        // Preparar la consulta SQL con parámetros
        const sql = "INSERT INTO Proveedores SET ? ";

        // Ejecutar la consulta SQL para insertar un nuevo registro en la tabla 'Proveedores'
        const result = await conn.query(sql,{
          nombre,
          vendedor,
          telefono,
          email,
          direccion,
        });
        console.log(sql,nombre,vendedor,telefono,email,direccion,);
        // Si la inserción es exitosa, enviar respuesta con los datos insertados
        return NextResponse.json({
            success: true,
            nombre,
            vendedor,
            telefono,
            email,
            direccion,
            proveedor_id: result.insertId, // Asegúrate de que result.insertId exista y sea válido
        });
    } catch (error) {
        // Manejar el error, posiblemente con más detalle
        console.error(error);
        return NextResponse.json(
            { message: "Error al registrar el proveedor: " + error.message },
            { status: 500 }
        );
    }
}