
import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Obtencion de algunos datos de la tabla Productos, mas los nombres de las tablas Proveedores
    const results = await conn.query(`
      SELECT
      f.factura_id,
      f.fecha,
      f.total,
      f.codigoFactura,
      pr.nombre AS proveedor_nombre
    FROM FacturasCompra AS f
    LEFT JOIN Proveedores AS pr ON f.proveedor_id = pr.proveedor_id
   
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
  