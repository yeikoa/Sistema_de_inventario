import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const result = await conn.query(
      "SELECT * FROM DetalleFacturasCompra WHERE factura_id = ?",
      [params.factura_id]
    );

    if (result.length == 0) {
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
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}