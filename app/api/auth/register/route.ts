import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const exists = await prisma.usuario.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const user = await prisma.usuario.create({
      data: {
        email: email.toLowerCase(),
        senha: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
