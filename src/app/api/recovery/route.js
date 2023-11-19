import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";
export async function PUT(request) {
    try {
      // Recibiendo el correo electrónico y la nueva contraseña del cuerpo de la solicitud
      const { email, newPassword } = await request.json();
  
      // Ejecutando una consulta SQL para actualizar la contraseña del usuario
      // Asegúrate de que 'conn' es tu conexión a la base de datos configurada correctamente
      await conn.query("UPDATE Usuarios SET password = ? WHERE email = ?", [newPassword, email]);
  
      // Respondiendo con un mensaje de éxito
      return NextResponse.json({ success: true, message: "Contraseña actualizada con éxito" });
    } catch (error) {
      // Manejando errores
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
  