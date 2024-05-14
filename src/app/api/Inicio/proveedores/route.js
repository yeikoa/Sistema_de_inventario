import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalProvidersResult = await conn.query(
      "SELECT COUNT(*) AS totalProviders FROM Proveedores where estado = 'activo'"
    );
    const totalProviders = totalProvidersResult[0].totalProviders;

    const results = { totalProviders };

    return NextResponse.json(results);
  } catch (error) {
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

    const sql = "INSERT INTO Proveedores SET ? ";

    const result = await conn.query(sql, {
      nombre,
      vendedor,
      telefono,
      email,
      direccion,
    });

    return NextResponse.json({
      success: true,
      nombre,
      vendedor,
      telefono,
      email,
      direccion,
      proveedor_id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al registrar el proveedor: " + error.message },
      { status: 500 }
    );
  }
}
