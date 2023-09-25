import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function POST(
  req: NextRequest,
  { params: { codPet } }: { params: { codPet: string } },
) {
  const session = await getServerSession(authOptions);
  // session?.user.
  if (session?.user.role !== "adotante")
    return new NextResponse(
      JSON.stringify({
        status: "fail",
        message: "Só pessoas dotantes podem demonstrar interesse.",
      }),
      { status: 403 },
    );

  // return new NextResponse(JSON.stringify({}), {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   status: 201,
  // });
  //TODO: validar se é usuário adotante

  /**
  codInteresseAdocao Int      @id @default(autoincrement())
  codPessoaAdotante  Int
  codPet             Int
  dataInteresse      DateTime @default(now())
       */
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
