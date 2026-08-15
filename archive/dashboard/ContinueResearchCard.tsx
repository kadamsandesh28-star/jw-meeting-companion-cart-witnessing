import {
  Button,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardCard from "./DashboardCard";
import { getLatestResearch } from "../../src/services/dashboardService";

export default function ContinueResearchCard() {
  const navigate = useNavigate();

  const latest = getLatestResearch();

  return (
    <DashboardCard>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          📂 Continue Research
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6">
          {latest.title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {latest.subtitle}
        </Typography>

        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/library/research")}
          >
            Continue →
          </Button>
        </Stack>
      </CardContent>
    </DashboardCard>
  );
}