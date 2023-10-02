import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query(
      "DELETE FROM Productos WHERE producto_id = ?",
      [params.producto_id]
    );

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