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
export async function POST(request) {
  try {
    // Desestructurando los datos del cuerpo de la solicitud
    const { factura, detalles } = await request.json();


    // Insertar los datos de la factura
    const facturaResult = await conn.query("INSERT INTO FacturasCompra SET ?", factura);
    const facturaId = facturaResult.insertId; // Obtener el ID de la factura insertada

    // Insertar cada detalle de la factura
    for (const detalle of detalles) {
      await conn.query("INSERT INTO DetalleFacturasCompra SET ?", {
        factura_id: facturaId,
        ...detalle // Asegúrate de que los campos coincidan con tu tabla DetalleFacturasCompra
      });
    }



    // Responder con éxito
    return NextResponse.json({
      success: true,
      message: 'Factura y detalles insertados correctamente',
      facturaId
    });

  } catch (error) {
  

    // Registrar y responder con el error
    console.log(error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
