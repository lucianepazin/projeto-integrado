import CustomPagination from "@/components/shared/CustomPagination";
import PetCard from "@/components/shared/PetCard";
import getPets from "@/components/shared/getPets";
import { Box, Container } from "@mui/material";
import { Pet } from "@prisma/client";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string[] | string | undefined };
}) {
  const page =
    typeof searchParams?.page === "string" ? Number(searchParams.page) : 1;
  const { pets, count, cities, states } = await getPets(page);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        {pets.map((pet: Pet) => (
          <PetCard pet={pet} key={pet.codPet} cities={cities} states={states} />
        ))}
      </Box>
      <CustomPagination total={count} />
    </Container>
  );
}
