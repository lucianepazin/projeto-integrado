import AdoptButton from "@/components/pet/AdoptButton";
import prisma from "@/lib/prisma";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { intervalToDuration } from "date-fns";
import Image from "next/image";

export default async function page({ params }: { params: { codPet: string } }) {
  const pet = await prisma.pet.findUnique({
    where: { codPet: Number(params.codPet) },
  });
  const city = await prisma.dicionarioCidade.findUnique({
    where: { codCidade: pet?.codCidade },
  });
  const state = await prisma.dicionarioEstado.findUnique({
    where: { codEstado: pet?.codEstado },
  });
  if (!pet) return <div>pet não encontrado</div>;

  const age = intervalToDuration({
    start: new Date(),
    end: pet?.dataNascimento,
  });
  return (
    <div>
      <Typography variant="h3" color="primary">
        Encontre seu novo melhor amigo
      </Typography>
      <Card sx={{ p: 2 }}>
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Box sx={{ position: "relative", width: 480, height: 480 }}>
            <Image
              src={pet.fotoUrl}
              alt="foto do pet"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">{pet?.nome}</Typography>
              <AdoptButton codPet={pet.codPet} />
            </Box>
            <Box>
              <Typography variant="body2">
                {age?.years !== undefined &&
                  age.years > 0 &&
                  age.years + " anos e "}
                {age.months} meses - {pet?.cor}
                <br />
                Porte {pet?.porte}
                <br />
                {city?.nome} - {state?.nome}
              </Typography>
              <Typography sx={{ mt: 2 }}>{pet?.descricao}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
