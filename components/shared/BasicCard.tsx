import { CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import intervalToDuration from "date-fns/intervalToDuration";
import { Pet } from "domain/pet";

export default function BasicCard({ pet }: { pet: Pet }) {
  const age = intervalToDuration({
    start: new Date(),
    end: new Date(pet?.birthDate),
  });
  return (
    <Card sx={{ minWidth: 240, width: 240, m: 2 }}>
      <CardMedia
        sx={{ height: 240, width: 240 }}
        image={pet?.image?.photo}
        title="green iguana"
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          {pet?.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {pet?.gender === "MALE" ? "Macho" : "Fêmea"} - {pet?.size}
        </Typography>
        <Typography variant="body2">
          {age?.years !== undefined && age.years > 0 && age.years + " anos e "}
          {age.months} meses
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Saiba mais</Button>
      </CardActions>
    </Card>
  );
}
