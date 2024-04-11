import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      
      const results = await conn.query("SELECT categoria_id, nombre_categoria FROM Categorias");
      
      return NextResponse.json(results);
    } catch (error) {
      
      //console.log(error);
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
      const { nombre_categoria } =
        await request.json();
  
      const result = await conn.query(
        "INSERT INTO Categorias (nombre_categoria) VALUES (?)",
        [nombre_categoria]
      );
  
      return NextResponse.json({
        nombre_categoria,
        
        id: result.insertId,
      });
    } catch (error) {
     
      //console.error(error);
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