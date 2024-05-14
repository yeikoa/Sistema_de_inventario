import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query(
      "DELETE FROM Usuarios WHERE usuario_id = ?",
      [params.usuario_id]
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
    const {
      usuario_id,
      nombre_usuario,
      password,
      nombre_completo,
      email,
      estado,
    } = await request.json();

    await conn.query(
      "UPDATE Usuarios SET nombre_usuario = ?, password = ?, nombre_completo = ?, email = ?, estado = ? WHERE usuario_id = ?",
      [nombre_usuario, password, nombre_completo, email, estado, usuario_id]
    );

    return NextResponse.json({
      message: "Usuario actualizado con éxito",
      usuario_id,
      nombre_usuario,
      nombre_completo,
      email,
      estado,
    });
  } catch (error) {
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
