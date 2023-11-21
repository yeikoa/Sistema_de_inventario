import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        const result = await conn.query(
            "UPDATE Utilidad SET activo = ? WHERE utilidad_id = ?",
            [false, params.utilidad_id] // Asumiendo que el parámetro es 'utilidad_id' y no 'proveedor_id'
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Utilidad no encontrada", // Cambiado de 'Proveedor' a 'Utilidad'
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
