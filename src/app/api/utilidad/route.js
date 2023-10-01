import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { tasa } = await request.json();

    // Intentando ejecutar una consulta SQL para insertar un nuevo registro en la tabla 'Utilidad'
    const result = await conn.query("INSERT INTO Utilidad (tasa) VALUES (?)", [tasa]);

    // Si la inserción es exitosa, respondemos con un JSON que contiene los datos insertados y el ID del nuevo registro
    return NextResponse.json({
      tasa,
      id: result.insertId,
    });
  } catch (error) {
    // Si ocurre un error, lo registramos en la consola y respondemos con un mensaje de error y un código de estado 500
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

export async function GET() {
  try {
    // Intentando ejecutar una consulta SQL para obtener todos los registros de la tabla 'Utilidad'
    const results = await conn.query("SELECT * FROM Utilidad");

    // Si la consulta es exitosa, respondemos con un JSON que contiene los resultados
    return NextResponse.json(results);
  } catch (error) {
    // Si ocurre un error, lo registramos en la consola y respondemos con un mensaje de error y un código de estado 500
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

export async function PUT(request) {
  try {
    const { utilidad_id, tasa } = await request.json();

    // Intentando ejecutar una consulta SQL para actualizar un registro en la tabla 'Utilidad'
    await conn.query("UPDATE Utilidad SET tasa = ? WHERE utilidad_id = ?", [tasa, utilidad_id]);

    // Respondemos con un mensaje de éxito
    return NextResponse.json({ message: "Registro actualizado con éxito" });
  } catch (error) {
    // Si ocurre un error, lo registramos en la consola y respondemos con un mensaje de error y un código de estado 500
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

export async function DELETE(request) {
  try {
    // Obtener el utilidad_id de la URL en lugar de esperar un cuerpo JSON
    const { utilidad_id } = request.params;

    // Intentar ejecutar una consulta SQL para eliminar un registro en la tabla 'Utilidad'
    await conn.query("DELETE FROM Utilidad WHERE utilidad_id = ?", [utilidad_id]);

    // Responder con un mensaje de éxito
    return NextResponse.json({ message: "Registro eliminado con éxito" });
  } catch (error) {
    // Si ocurre un error, lo registrar en la consola y responder con un mensaje de error y un código de estado 500
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
