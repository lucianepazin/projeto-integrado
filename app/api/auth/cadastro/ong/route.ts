import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { EMAIL_DUPLICATED } from "domain/systemMessages";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, senha, nomeONG, CNPJ, nomeResp, CPFResp, endereco, telefone } =
    await req.json();
  const exists = await prisma.usuario.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: EMAIL_DUPLICATED }, { status: 400 });
  } else {
    const pessoa = await prisma.pessoaONG.create({
      data: {
        nomeONG,
        CNPJ,
        nomeResp,
        CPFResp,
        telefone,
        usuario: {
          create: {
            email: email.toLowerCase(),
            senha: await hash(senha, 10),
          },
        },
        endereco: { create: endereco },
      },
    });

    return new NextResponse(JSON.stringify(pessoa), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  }
}
