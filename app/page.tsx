import BasicCard from "@/components/shared/BasicCard";
import { Container } from "@mui/material";
import { Pet } from "domain/pet";

export default async function Home() {
  const {
    data: { pets },
  } = await fetch(process.env.API_URL + "api/dogs")
    .then((res) => res.json())
    .catch((e) => console.log(e));

  // const a = await fetch(process.env.API_URL + "api/pets", {
  //   method: "POST",
  //   headers: { Cookie: cookies().toString() },
  // });
  // .then((res) => res.json())
  // .catch((e) => console.log(e));
  // const a = await getServerSession(authOptions);
  // console.log("a", a);
  return (
    <Container sx={{ display: "flex", flexWrap: "wrap" }}>
      {pets.map((pet: Pet) => (
        <BasicCard pet={pet} key={pet.mouraId + pet.name} />
      ))}
    </Container>
  );
}
