import BasicCard from "@/components/shared/BasicCard";
import { Container } from "@mui/material";
import { Pet } from "domain/pet";

export default async function Home() {
  const {
    data: { pets },
  } = await fetch(process.env.API_URL + "api/dogs")
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
    <Container sx={{ display: "flex", flexWrap: "wrap" }}>
      {pets.map((pet: Pet) => (
        <BasicCard pet={pet} key={pet.mouraId} />
      ))}
    </Container>
  );
}
