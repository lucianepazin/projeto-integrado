import PetCard from "@/components/shared/PetCard";
import prisma from "@/lib/prisma";
import { Container } from "@mui/material";
import { Pet } from "@prisma/client";

export default async function Home() {
  // const { data } = await fetch(process.env.API_URL + "api/dogs")
  //   .then(async (res) => res.json())
  //   .catch((e) => console.log(e));

  // const { pets }: { pets: Pet[] } = data;
  const peeeets = await prisma.pet.findMany({ take: 5 });

  const cities = await prisma.dicionarioCidade.findMany({
    where: { codCidade: { in: peeeets.map((pet: Pet) => pet.codCidade) } },
  });
  const states = await prisma.dicionarioEstado.findMany({
    where: { codEstado: { in: peeeets.map((pet: Pet) => pet.codEstado) } },
  });
  //https://dog.ceo/api/breeds/image/random/5
  /**response
   * {
    "message": [
        "https://images.dog.ceo/breeds/dalmatian/cooper1.jpg",
        "https://images.dog.ceo/breeds/kelpie/n02105412_7819.jpg",
        "https://images.dog.ceo/breeds/doberman/n02107142_12191.jpg"
    ],
    "status": "success"
}
   */
  const { message: dogPhotosUrlList }: { message: string[]; status: string } = {
    message: [
      "https://images.dog.ceo/breeds/mastiff-bull/n02108422_3440.jpg",
      "https://images.dog.ceo/breeds/dane-great/n02109047_5331.jpg",
      "https://images.dog.ceo/breeds/mountain-bernese/n02107683_3655.jpg",
      "https://images.dog.ceo/breeds/sharpei/noel.jpg",
      "https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_1483.jpg",
    ],
    status: "success",
  };
  // await fetch("https://dog.ceo/api/breeds/image/random/5")
  //   .then((res) => res.json())
  //   .catch((e) => console.log(e));

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
      {peeeets.map((pet: Pet, index) => (
        <PetCard
          pet={pet}
          key={pet.codPet}
          cities={cities}
          states={states}
          imageURL={dogPhotosUrlList?.[index]}
        />
      ))}
    </Container>
  );
}
