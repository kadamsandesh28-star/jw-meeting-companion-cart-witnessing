import Grid from "@mui/material/Grid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import StatCard from "../../../components/ui/StatCard";
import { MinistryStatistics } from "../types/ministry";

interface MinistryStatsProps {
  statistics: MinistryStatistics;
}

export default function MinistryStats({
  statistics,
}: MinistryStatsProps) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          value={statistics.totalHours}
          label="Hours"
          icon={<AccessTimeIcon />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          value={statistics.totalReturnVisits}
          label="Return Visits"
          icon={<PeopleIcon />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          value={statistics.totalBibleStudies}
          label="Bible Studies"
          icon={<MenuBookIcon />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          value={statistics.totalPlacements}
          label="Placements"
          icon={<LibraryBooksIcon />}
        />
      </Grid>
    </Grid>
  );
}