import BasicCard from "@/components/shared/BasicCard";
import { Container } from "@mui/material";
import { Pet } from "domain/pet";

export default async function Home() {
  const {
    data: { pets },
  } = await fetch("http://localhost:3000/api/dogs")
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
    <Container sx={{ display: "flex", flexWrap: "wrap" }}>
      oi{" "}
      {pets.map((pet: Pet) => (
        // <div key={pet?.id}>{pet?.name}</div>
        <BasicCard pet={pet} />
      ))}
    </Container>
  );
}
