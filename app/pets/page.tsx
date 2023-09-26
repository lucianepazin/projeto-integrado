import PetCard from "@/components/shared/PetCard";
import prisma from "@/lib/prisma";
import { Container } from "@mui/material";
import { Pet } from "@prisma/client";

export default async function Home() {
  const peeeets = await prisma.pet.findMany({ take: 5 });
  const cities = await prisma.dicionarioCidade.findMany({
    where: { codCidade: { in: peeeets.map((pet: Pet) => pet.codCidade) } },
  });
  const states = await prisma.dicionarioEstado.findMany({
    where: { codEstado: { in: peeeets.map((pet: Pet) => pet.codEstado) } },
  });
  return (
    <Container sx={{ display: "flex", flexWrap: "wrap" }}>
      {peeeets.map((pet: Pet, index) => (
        <PetCard pet={pet} key={pet.codPet} cities={cities} states={states} />
      ))}
    </Container>
  );
}
