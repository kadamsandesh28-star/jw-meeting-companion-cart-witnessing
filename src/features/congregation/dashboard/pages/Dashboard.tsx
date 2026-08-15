import { Box, Grid, Stack } from "@mui/material";

import DashboardHeader from "../components/DashboardHeader";
import CongregationOverviewCard from "../components/CongregationOverviewCard";
import OverseersCard from "../components/OverseersCard";
import CongregationDepartmentsCard from "../components/CongregationDepartmentsCard";
import MeetingSchedulesCard from "../components/MeetingSchedulesCard";
import QuickActionsCard from "../components/QuickActionsCard";
import RecentActivityCard from "../components/RecentActivityCard";

import { publisherService } from "../../publishers/services/publisherService";
import { bodyMemberService } from "../../body-of-elders/services/bodyMemberService";
import { serviceGroupService } from "../../service-groups/services/serviceGroupService";
import { territoryService } from "../../territories/services/territoryService";
import { serviceCommitteeService } from "../../service-committee/services/serviceCommitteeService";

import { loadCongregationProfile } from "../../../settings/storage/congregationProfileStorage";

export default function Dashboard() {
  const profile = loadCongregationProfile();

  const publisherCount =
    publisherService.getAll().length;

  const elderCount =
    bodyMemberService.getAll().length;

  const serviceGroupCount =
    serviceGroupService.getAll().length;

  const territoryCount =
    territoryService.getAll().length;

  const committeeCount =
    serviceCommitteeService.getAll().length;

  return (
    <Box
      sx={{
        maxWidth: 1600,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 4,
        bgcolor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <Stack spacing={4}>
        <DashboardHeader
          congregationName={
            profile.congregationName
          }
        />

        <Grid
          container
          spacing={3}
        >
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <CongregationOverviewCard
              publisherCount={
                publisherCount
              }
              elderCount={elderCount}
              serviceGroupCount={
                serviceGroupCount
              }
              territoryCount={
                territoryCount
              }
              committeeCount={
                committeeCount
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <OverseersCard />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
        >
          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <CongregationDepartmentsCard />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <MeetingSchedulesCard />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <QuickActionsCard />
          </Grid>
        </Grid>

        <RecentActivityCard />
      </Stack>
    </Box>
  );
}