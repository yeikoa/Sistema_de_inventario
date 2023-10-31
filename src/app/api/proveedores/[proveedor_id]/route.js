import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
      const result = await conn.query(
        "UPDATE Proveedores SET estado = ? WHERE proveedor_id = ?",
        ['inactivo', params.proveedor_id]
      );
  
      if (result.affectedRows === 0) {
        return NextResponse.json(
          {
            message: "Proveedor no encontrado",
          },
          {
            status: 404,
          }
        );
      }
  
      console.log(result);
      return new Response(null, { status: 204 });
    } catch (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }

  export async function PUT(request, { params }) {
    try {
      const { proveedor_id } = params;
      const requestData = await request.json();
      const { nombre, vendedor, email, telefono, direccion } = requestData;
  
      console.log('Datos recibidos:', { nombre, vendedor, email, telefono, direccion, proveedor_id });
  
      const query =
        "UPDATE Proveedores SET nombre = ?, vendedor = ?, email = ?, telefono = ?, direccion = ? WHERE proveedor_id = ?";
      const values = [nombre, vendedor, email, telefono, direccion, proveedor_id];
  
      const result = await conn.query(query, values);
  
      if (result.affectedRows === 0) {
        return new Response(
          JSON.stringify({
            message: "Proveedor no encontrado",
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
  
      console.log(result);
      return new Response(null, { status: 204 });
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: error.message,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
  