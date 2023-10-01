import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const codEstado = searchParams.get("codEstado");

  if (typeof codEstado !== "string") {
    return new NextResponse(
      JSON.stringify({
        status: "fail",
        message: "Código do estado não informado.",
      }),
      { status: 400 },
    );
  }

  const cities = await prisma.dicionarioCidade.findMany({
    where: { codEstado: Number(codEstado) },
  });

  return new NextResponse(JSON.stringify(cities), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
