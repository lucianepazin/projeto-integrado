import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {}

export async function POST(req: NextRequest) {
  // invariant(typeof id === 'string', `id must be one string.`);
  // const session = await getServerSession(req, res, authOptions);
  const session = await getServerSession(authOptions);

  if (session === null)
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 },
    );

  const newPet = await prisma.pet.create({
    data: {
      nome: "Rex",
      idade: "2",
      codCidade: 1,
      codEstado: 1,
      codPessoaONG: 1,
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
