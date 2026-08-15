import { Box, Grid } from "@mui/material";
import {
  Group,
  Groups,
  Business,
  VolunteerActivism,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import DashboardCard from "../../components/DashboardCard";
import CongregationDashboardCard from "../../../archive/dashboard/CongregationDashboardCard";

export default function CongregationResponsibilities() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader title="🤝 Congregation Responsibilities" />

      <CongregationDashboardCard />

      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Directory"
            icon={<Group fontSize="large" />}
            onClick={() =>
              navigate("/congregation/directory")
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Service Groups"
            icon={<Groups fontSize="large" />}
            onClick={() =>
              navigate("/congregation/groups")
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Departments"
            icon={<Business fontSize="large" />}
            onClick={() =>
              navigate("/congregation/departments")
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Shepherding"
            icon={<VolunteerActivism fontSize="large" />}
            onClick={() =>
              navigate("/congregation/shepherding")
            }
          />
        </Grid>

      </Grid>
    </Box>
  );
}