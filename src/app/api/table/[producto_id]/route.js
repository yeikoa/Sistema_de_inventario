import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    // Deshabilita temporalmente la restricción de clave foránea en RegistroInventario
    await conn.query("SET FOREIGN_KEY_CHECKS=0");

    const result = await conn.query(
      "DELETE FROM Productos WHERE producto_id = ?",
      [params.producto_id]
    );
    // Vuelve a habilitar la restricción de clave foránea en RegistroInventario
    await conn.query("SET FOREIGN_KEY_CHECKS=1"); 
    if (result.affectedRows == 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
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
export async function PUT(request, { params, body }) {
  try {
    // Deshabilita temporalmente la restricción de clave foránea en RegistroInventario
    await conn.query("SET FOREIGN_KEY_CHECKS=0");

    const {codigo, nombre, precioVenta, cantidad, proveedor, categoria } = body;

    const result = await conn.query(
      "UPDATE Productos SET codigo = ?, nombre = ?, precioVenta = ?, cantidad = ?, proveedor = ?, categoria = ? WHERE producto_id = ?",
      [nombre, precioVenta, cantidad, proveedor, categoria, params.producto_id]
    );

    // Vuelve a habilitar la restricción de clave foránea en RegistroInventario
    await conn.query("SET FOREIGN_KEY_CHECKS=1"); 

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
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