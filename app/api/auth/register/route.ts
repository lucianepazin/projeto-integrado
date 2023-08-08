import prisma from "@/lib/prisma";
import { genSalt, hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const salt = await genSalt();
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, salt),
        salt,
      },
    });
    return NextResponse.json(user);
  }
}
