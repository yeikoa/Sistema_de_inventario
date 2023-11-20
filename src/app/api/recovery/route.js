import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";
export async function PUT(request) {
  try {
    const { email, newPassword } = await request.json();

    await conn.query("UPDATE Usuarios SET password = ? WHERE email = ?", [
      newPassword,
      email,
    ]);

    return NextResponse.json({
      success: true,
      message: "Contraseña actualizada con éxito",
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
