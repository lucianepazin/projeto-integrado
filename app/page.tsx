import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default async function Home() {
  // const peeeets = await prisma.pet.findMany({ take: 5 });
  // const cities = await prisma.dicionarioCidade.findMany({
  //   where: { codCidade: { in: peeeets.map((pet: Pet) => pet.codCidade) } },
  // });
  // const states = await prisma.dicionarioEstado.findMany({
  //   where: { codEstado: { in: peeeets.map((pet: Pet) => pet.codEstado) } },
  // });
  return (
    <Container
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" sx={{ width: "50%" }} color="primary">
        Encontre seu novo melhor amigo.
      </Typography>
      <Typography sx={{ width: "50%" }} color="secondary">
        Nossa missão é aproximar pessoas interessadas em adotar + animaizinhos
        disponíveis para adoção.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button LinkComponent={Link} href="/pets" variant="contained">
          Busque seu novo amigo
        </Button>
      </Box>
    </Container>
  );
}
