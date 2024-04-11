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
    //console.log(error);
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
