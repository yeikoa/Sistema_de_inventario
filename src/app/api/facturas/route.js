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

export async function POST(request) {
    try {
        const productos = await request.json();

        const codigos = productos.map(p => p.codigo);
        const resultado= await conn.query("SELECT * FROM Productos WHERE codigo IN (?)", [codigos]);
        
        console.log("Resultado de la consulta:", resultado);

        const productosExistentes = resultado
        //const productosExistentes = resultado[0] || [];

        // Crear un mapa para un acceso rápido a los productos existentes por código
        const mapaProductosExistentes = new Map(productosExistentes.map(p => [p.codigo, p]));

        for (const producto of productos) {
            const { codigo, nombre, precioVenta, stock, proveedorP_id, categoriaP_id, ivaP_id, utilidadP_id } = producto;

            if (mapaProductosExistentes.has(codigo)) {
               
                await conn.query("UPDATE Productos SET stock = stock + ? WHERE codigo = ?", [stock, codigo]);
            } else {
              
                await conn.query("INSERT INTO Productos (codigo, nombre, precioVenta, stock, proveedorP_id, categoriaP_id, ivaP_id, utilidadP_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                [codigo, nombre, precioVenta, stock, proveedorP_id, categoriaP_id, ivaP_id, utilidadP_id]);
            }
        }

        return NextResponse.json({ success: true, message: "Operación completada correctamente" });
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}