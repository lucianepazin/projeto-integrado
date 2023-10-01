import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const states = await prisma.dicionarioEstado.findMany();

  return new NextResponse(JSON.stringify(states), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
