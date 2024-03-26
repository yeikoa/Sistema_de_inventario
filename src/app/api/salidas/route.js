import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Obtencion de algunos datos de la tabla Productos, mas los nombres de las tablas Proveedores y Categorias
    const results = await conn.query(`SELECT producto_id, nombre, stock FROM Productos `);
    // Si la consulta es exitosa, respondemos con un JSON que contiene los resultados
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
export async function PUT(request) {
  try {
      // Los datos recibidos ahora serán una lista de objetos con producto_id y cantidad vendida
      const ventas = await request.json();

      for (const venta of ventas) {
          const { productoId, cantidad } = venta;

          // Restar la cantidad vendida del stock del producto
          await conn.query("UPDATE Productos SET stock = stock - ? WHERE producto_id = ?", [cantidad, productoId]);
      }

      return NextResponse.json({ success: true, message: "Stock actualizado correctamente" });
  } catch (error) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
