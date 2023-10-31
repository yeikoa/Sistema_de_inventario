import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

// Definiendo una función asincrónica GET para manejar las solicitudes GET
export async function GET() {
  try {
    // Intentando ejecutar una consulta SQL para obtener el total de productos
    const totalProductsResult = await conn.query("SELECT COUNT(*) AS totalProducts FROM Productos");
    const totalProducts = totalProductsResult[0].totalProducts;
    
    // Creando un objeto de resultados que contiene el total de productos
    const results = { totalProducts };
    
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
