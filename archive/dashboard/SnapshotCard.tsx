import {
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import DashboardCard from "./DashboardCard";
import { getDashboardSummary } from "../../src/services/dashboardService";

export default function SnapshotCard() {
  const summary = getDashboardSummary();

  return (
    <DashboardCard>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          📊 Spiritual Snapshot
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography>📚 Research</Typography>
            <Typography fontWeight="bold">
              {summary.researchCollections} Collections
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography>📖 Understanding</Typography>
            <Typography fontWeight="bold">
              {summary.understandingNotes} Notes
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography>💎 Gems</Typography>
            <Typography fontWeight="bold">
              {summary.gemsEntries} Entries
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography>🎯 Goals</Typography>
            <Typography fontWeight="bold">
              {summary.activeGoals} Active
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography>🌍 Ministry</Typography>
            <Typography fontWeight="bold">
              {summary.ministryNotes} Notes
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </DashboardCard>
  );
}