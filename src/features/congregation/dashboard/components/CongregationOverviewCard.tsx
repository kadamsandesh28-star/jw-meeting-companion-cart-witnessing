import {
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

interface CongregationOverviewCardProps {
  publisherCount: number;
  elderCount: number;
  serviceGroupCount: number;
  territoryCount: number;
  committeeCount: number;
}

interface StatTileProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function StatTile({
  title,
  value,
  icon,
  color,
}: StatTileProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        transition: "all .25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <Stack spacing={2}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 52,
            height: 52,
            borderRadius: 2,
            bgcolor: color,
          }}
        >
          {icon}
        </Stack>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          {value}
        </Typography>

        <Typography
          color="text.secondary"
          fontWeight={500}
        >
          {title}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default function CongregationOverviewCard({
  publisherCount,
  elderCount,
  serviceGroupCount,
  territoryCount,
  committeeCount,
}: CongregationOverviewCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          gutterBottom
        >
          Congregation Overview
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          A quick snapshot of your congregation's current information.
        </Typography>

        <Grid
          container
          spacing={3}
        >
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <StatTile
              title="Publishers"
              value={publisherCount}
              color="#E3F2FD"
              icon={<GroupsOutlinedIcon color="primary" />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <StatTile
              title="Body of Elders"
              value={elderCount}
              color="#E8F5E9"
              icon={<GavelOutlinedIcon sx={{ color: "#2E7D32" }} />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <StatTile
              title="Service Groups"
              value={serviceGroupCount}
              color="#FFF3E0"
              icon={<Diversity3OutlinedIcon sx={{ color: "#EF6C00" }} />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 2.4 }}>
            <StatTile
              title="Territories"
              value={territoryCount}
              color="#F3E5F5"
              icon={<MapOutlinedIcon sx={{ color: "#7B1FA2" }} />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 2.4 }}>
            <StatTile
              title="Committees"
              value={committeeCount}
              color="#E0F2F1"
              icon={<AccountTreeOutlinedIcon sx={{ color: "#00695C" }} />}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}