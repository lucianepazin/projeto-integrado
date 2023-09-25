import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session === null)
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "Você não está logado." }),
      { status: 401 },
    );

  const newPet = await prisma.pet.create({
    data: {
      nome: "Rex",
      dataNascimento: new Date("2021-01-01"),
      codCidade: 1,
      codEstado: 1,
      fotoUrl: "https://images.dog.ceo/breeds/finnish-lapphund/mochilamvan.jpg",
      cor: "Branco",
      descricao: "Cachorro muito dócil",
      tipo: "Cachorro",
      instituicao: "ONG",
      porte: "Pequeno",
      telefone: "999999999",
    },
  });
  return new NextResponse(JSON.stringify(newPet), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
