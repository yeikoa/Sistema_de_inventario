import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const result = await conn.query(
      "SELECT * FROM productos WHERE producto_id = ?",
      [params.product_id]
    );

    if (result.length == 0) {
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
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query(
      "DELETE FROM productos WHERE producto_id = ?",
      [params.product_id]
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
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await conn.query(
      "UPDATE productos SET ? WHERE producto_id = ?",
      [data, params.product_id]
    );
    if (result.affectedRows == 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }
    const updateProduct = await conn.query(
      "SELECT * FROM productos WHERE producto_id = ?",
      [params.product_id]
    );
    return NextResponse.json(updateProduct[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,  
      },
      { status: 500 }
    )
  }
}
