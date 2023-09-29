import prisma from "@/lib/prisma";
import { Pet } from "@prisma/client";

export default async function getPets(page: number = 1) {
  const [pets, count] = await prisma.$transaction([
    prisma.pet.findMany({ take: 5 * page, skip: 5 * (page - 1) }),
    prisma.pet.count(),
  ]);
  const cities = await prisma.dicionarioCidade.findMany({
    where: { codCidade: { in: pets.map((pet: Pet) => pet.codCidade) } },
  });
  const states = await prisma.dicionarioEstado.findMany({
    where: { codEstado: { in: pets.map((pet: Pet) => pet.codEstado) } },
  });
  return { pets, count, cities, states };
}
