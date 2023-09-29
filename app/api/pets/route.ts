import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const pets = await prisma.pet.findMany({ take: 5 });
  return new NextResponse(JSON.stringify(pets), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const token = await getToken({ req });

  if (session === null && token === null)
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "Você não está logado." }),
      { status: 401 },
    );

  const codPessoaOng = await prisma.pessoaONG.findUnique({
    where: {
      codUsuario: session?.user.id || token?.sub,
    },
  });
  if (!codPessoaOng)
    return new NextResponse(
      JSON.stringify({
        status: "fail",
        message: "Você não é de uma ONG.",
      }),
      { status: 403 },
    );
  const body = await req.json();
  const { dataNascimento, ...otherFields } = body;
  const newPet = await prisma.pet.create({
    data: {
      ...body,
      dataNascimento: new Date(dataNascimento),
    },
  });

  const petsONG = await prisma.petsONG.create({
    data: {
      codPessoaONG: codPessoaOng.codPessoaONG,
      codPet: newPet.codPet,
    },
  });

  return new NextResponse(JSON.stringify(newPet), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
