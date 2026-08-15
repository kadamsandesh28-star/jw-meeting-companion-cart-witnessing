import {
  Button,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardCard from "./DashboardCard";
import { getTodaysFocus } from "../../src/services/dashboardService";

export default function FocusCard() {
  const navigate = useNavigate();

  const focus = getTodaysFocus();

  return (
    <DashboardCard>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          ⭐ Today's Spiritual Focus
        </Typography>

        <Typography
          variant="h6"
          sx={{ mt: 2 }}
        >
          {focus.title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {focus.description}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3 }}
          alignItems="center"
        >
          <Chip
            color="primary"
            label="Today's Focus"
          />

          <Button
            variant="contained"
            onClick={() => navigate(focus.path)}
          >
            {focus.button}
          </Button>
        </Stack>
      </CardContent>
    </DashboardCard>
  );
}