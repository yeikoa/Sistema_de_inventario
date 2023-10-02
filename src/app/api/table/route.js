import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Obtencion de algunos datos de la tabla Productos, mas los nombres de las tablas Proveedores y Categorias
    const results = await conn.query(`
      SELECT
      p.producto_id,
      p.codigo,
      p.nombre,
      p.precioVenta,
      p.stock,
      pr.nombre AS proveedor_nombre,
      c.nombre_categoria AS categoria_nombre
    FROM Productos AS p
    LEFT JOIN Proveedores AS pr ON p.proveedorP_id = pr.proveedor_id
    LEFT JOIN Categorias AS c ON p.categoriaP_id = c.categoria_id
    
  `);
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
