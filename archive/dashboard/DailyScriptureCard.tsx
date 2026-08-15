import {
  Button,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardCard from "./DashboardCard";
import { getDashboardDailyScripture } from "../../src/services/dashboardService";

export default function DailyScriptureCard() {
  const navigate = useNavigate();

  const reflection = getDashboardDailyScripture();

  return (
    <DashboardCard>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          📖 Today's Reflection
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {reflection.started ? (
          <>
            <Chip
              label="Reflection Started"
              color="success"
              sx={{ mb: 2 }}
            />

            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              Scripture
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
            >
              {reflection.scripture || "Today's Scripture"}
            </Typography>

            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              Theme
            </Typography>

            <Typography sx={{ mb: 3 }}>
              {reflection.theme || "No theme yet"}
            </Typography>

            <Stack
              direction="row"
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                onClick={() =>
                  navigate("/daily-scripture")
                }
              >
                Continue →
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              gutterBottom
            >
              Start Today's Reflection
            </Typography>

            <Typography color="text.secondary">
              Read today's scripture, meditate on it,
              and record how you will apply it today.
            </Typography>

            <Stack
              direction="row"
              justifyContent="flex-end"
              sx={{ mt: 3 }}
            >
              <Button
                variant="contained"
                onClick={() =>
                  navigate("/daily-scripture")
                }
              >
                Start →
              </Button>
            </Stack>
          </>
        )}
      </CardContent>
    </DashboardCard>
  );
}