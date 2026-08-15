import { Grid, Paper, Typography } from "@mui/material";
import { Publisher } from "../publishers/types/Publisher";
import {
  PublisherRole,
  PublisherStatus,
} from "../publishers/types/enums";

interface Props {
  publishers: Publisher[];
}

export default function StatsCards({ publishers }: Props) {
  const total = publishers.length;

  const elders = publishers.filter(
    p => p.congregation.role === PublisherRole.Elder
  ).length;

  const servants = publishers.filter(
    p => p.congregation.role === PublisherRole.MinisterialServant
  ).length;

  const active = publishers.filter(
    p => p.congregation.status === PublisherStatus.Active
  ).length;

  const cards = [
    { title: "Publishers", value: total },
    { title: "Elders", value: elders },
    { title: "Ministerial Servants", value: servants },
    { title: "Active", value: active },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map(card => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.title}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              {card.title}
            </Typography>

            <Typography variant="h3">
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}