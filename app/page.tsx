import PetSwipe from "@/components/shared/PetSwipe";
import UnimplementedButton from "@/components/shared/UnimplementedButton";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default async function Home() {
  return (
    <Container
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ width: "50%" }} color="primary">
          Encontre seu novo melhor amigo.
        </Typography>
        <PetSwipe />
      </Box>
      <Typography variant="h5" color="secondary" sx={{ my: 2 }}>
        Nossa missão é aproximar <br />
        pessoas interessadas em adotar + animaizinhos disponíveis para adoção.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button LinkComponent={Link} href="/pets" variant="contained">
          Busque seu novo amigo
        </Button>
        <UnimplementedButton variant="outlined" sx={{ ml: 2 }}>
          Sou de uma ONG e quero cadastrar nossos pets
        </UnimplementedButton>
      </Box>
    </Container>
  );
}
