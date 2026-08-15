import {
  Button,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardCard from "./DashboardCard";

export default function CongregationResponsibilitiesCard() {
  const navigate = useNavigate();

  return (
    <DashboardCard>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          🤝 Congregation Responsibilities
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography
          variant="h6"
          gutterBottom
        >
          Stay organized with congregation assignments.
        </Typography>

        <Typography color="text.secondary">
          Keep track of meeting assignments,
          shepherding plans, public talks,
          weekend reader schedules, and congregation
          notes—all in one place.
        </Typography>

        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button
            variant="contained"
            onClick={() =>
              navigate("/congregation")
            }
          >
            Continue →
          </Button>
        </Stack>
      </CardContent>
    </DashboardCard>
  );
}