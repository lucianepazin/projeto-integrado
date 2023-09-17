import prisma from "@/lib/prisma";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
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

  return (
    <div>
      <Typography variant="h3" color="primary">
        Encontre seu novo melhor amigo
      </Typography>
      <Card sx={{ p: 2 }}>
        {/* <CardMedia
          sx={{ height: 480, width: 480 }}
          image={
            "https://images.dog.ceo/breeds/mastiff-bull/n02108422_3440.jpg"
          }
        /> */}
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Box sx={{ position: "relative", width: 480, height: 480 }}>
            <Image
              // sx={{ height: 330, width: 480 }}
              // image={

              // }
              src={
                "https://images.dog.ceo/breeds/mastiff-bull/n02108422_3440.jpg"
              }
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
              <Button variant="contained">Quero ADOTAR</Button>
            </Box>
            <Box>
              <Typography variant="body2">
                {pet?.idade} - {pet?.cor}
                <br />
                Porte {pet?.porte}
                <br />
                {city?.nome} - {state?.nome}
              </Typography>
              <Typography>{pet?.descricao}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
