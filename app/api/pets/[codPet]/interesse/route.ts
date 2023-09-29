import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function POST(
  _req: NextRequest,
  { params: { codPet } }: { params: { codPet: string } },
) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "adotante")
    return new NextResponse(
      JSON.stringify({
        status: "fail",
        message: "Só pessoas adotantes podem demonstrar interesse.",
      }),
      { status: 403 },
    );

  const codPessoaAdotante = await prisma.pessoaAdotante.findUnique({
    where: {
      codUsuario: session?.user.id,
    },
  });
  if (!codPessoaAdotante)
    return new NextResponse(
      JSON.stringify({
        status: "fail",
        message: "Você não é um adotante.",
      }),
      { status: 403 },
    );

  const interesse = await prisma.interesseAdocao.findFirst({
    where: {
      codPessoaAdotante: codPessoaAdotante.codPessoaAdotante,
      codPet: Number(codPet),
    },
  });
  if (interesse)
    return new NextResponse(
      JSON.stringify({
        status: "fail",
        message: "Você já demonstrou interesse nesse pet.",
      }),
      { status: 400 },
    );
  const newInteresse = await prisma.interesseAdocao.create({
    data: {
      codPessoaAdotante: codPessoaAdotante.codPessoaAdotante,
      codPet: Number(codPet),
    },
  });
  return new NextResponse(JSON.stringify(newInteresse), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}

export async function GET(
  _req: NextRequest,
  { params: { codPet } }: { params: { codPet: string } },
) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "adotante")
    return new NextResponse(
      JSON.stringify({
        status: "fail",
        message: "Só pessoas adotantes podem demonstrar interesse.",
      }),
      { status: 403 },
    );

  const codPessoaAdotante = await prisma.pessoaAdotante.findUnique({
    where: {
      codUsuario: session?.user.id,
    },
  });
  if (!codPessoaAdotante)
    return new NextResponse(
      JSON.stringify({
        status: "fail",
        message: "Você não é um adotante.",
      }),
      { status: 403 },
    );

  const interesse = await prisma.interesseAdocao.findFirst({
    where: {
      codPessoaAdotante: codPessoaAdotante.codPessoaAdotante,
      codPet: Number(codPet),
    },
  });
  if (interesse) {
    return new NextResponse(JSON.stringify(interesse), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  }
}
