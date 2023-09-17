import { CardActionArea, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DicionarioCidade, DicionarioEstado, Pet } from "@prisma/client";
import Link from "next/link";

export default function PetCard({
  pet,
  cities,
  states,
  imageURL,
}: {
  pet: Pet;
  cities: DicionarioCidade[];
  states: DicionarioEstado[];
  imageURL: string;
}) {
  // const age = intervalToDuration({
  //   start: new Date(),
  //   end: new Date(pet?.birthDate),
  // });
  const city = cities?.find((city) => city.codCidade === pet?.codCidade);
  const state = states?.find((state) => state.codEstado === pet?.codEstado);

  return (
    <Card sx={{ minWidth: 240, width: 240, m: 2 }}>
      <CardActionArea LinkComponent={Link} href={`/pet/${pet.codPet}`}>
        <CardMedia
          sx={{ height: 240, width: 240 }}
          image={imageURL}
          title="Cachorro"
        />
        <CardContent>
          {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
          <Typography variant="h5" component="div">
            {pet?.nome}
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">

</Typography> */}
          <Typography variant="body2">
            {pet?.idade} - {pet?.cor}
            <br />
            Porte {pet?.porte}
            <br />
            {city?.nome} - {state?.nome}
            {/* <City codCidade={pet?.codCidade} /> */}
            {/* {age?.years !== undefined && age.years > 0 && age.years + " anos e "}
          {age.months} meses
          <br />
        {'"a benevolent smile"'} */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
