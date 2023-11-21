import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";


export async function DELETE(request, { params }) {
    try {
  
  
      const result = await conn.query(
        "DELETE FROM Categorias WHERE categoria_id = ?",
        [params.categoria_id]
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
  export async function PUT(request) {
    try {
      const { categoria_id, nombre_categoria} =
        await request.json();
  
      // Actualizar un usuario existente en la tabla 'Usuarios'
      await conn.query(
        "UPDATE Categorias SET nombre_categoria = ? WHERE categoria_id = ?",
        [nombre_categoria, categoria_id]
      );
  
      // Responder con un mensaje de éxito
      return NextResponse.json({
        message: "Categoria actualizado con éxito",
        categoria_id,
        nombre_categoria,
      });
    } catch (error) {
      // Manejar errores
      console.error(error);
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