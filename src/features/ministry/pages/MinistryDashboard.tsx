import { Grid, Stack } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/ui/PageHeader";
import SectionCard from "../../../components/ui/SectionCard";
import DataTable from "../../../components/ui/DataTable";
import ActionCard from "../../../components/ui/ActionCard";

import MinistryStats from "../components/MinistryStats";
import QuickActions from "../components/QuickActions";
import SessionActions from "../components/SessionActions";
import { useMinistry } from "../hooks/useMinistry";
import { MinistrySession } from "../types/ministry";

export default function MinistryDashboard() {
  const navigate = useNavigate();

  const {
    statistics,
    sessions,
    deleteSession,
  } = useMinistry();

  const formatDuration = (
    start: string,
    end: string
  ) => {
    const startDate = new Date(`1970-01-01T${start}:00`);
    const endDate = new Date(`1970-01-01T${end}:00`);

    const minutes =
      (endDate.getTime() - startDate.getTime()) / 60000;

    if (minutes <= 0) return "-";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins}m`;
    }

    if (mins === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${mins}m`;
  };

  return (
    <Stack spacing={4}>
      <PageHeader
        title="Ministry"
        subtitle="Manage your ministry activity, return visits and Bible studies."
      />

      <MinistryStats statistics={statistics} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <QuickActions />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <SectionCard
            title="Recent Sessions"
            subtitle="Latest ministry activity"
          >
            <DataTable<MinistrySession>
              rows={sessions}
              getRowKey={(row) => row.id}
              emptyMessage="No ministry sessions recorded yet."
              columns={[
                {
                  id: "date",
                  label: "Date",
                  render: (row) =>
                    new Date(row.date).toLocaleDateString(),
                },
                {
                  id: "companion",
                  label: "Companion",
                },
                {
                  id: "territory",
                  label: "Territory",
                },
                {
                  id: "duration",
                  label: "Duration",
                  render: (row) =>
                    formatDuration(
                      row.startTime,
                      row.endTime
                    ),
                },
                {
                  id: "returnVisits",
                  label: "RVs",
                  align: "center",
                },
                {
                  id: "actions",
                  label: "",
                  align: "center",
                  width: 120,
                  render: (row) => (
                    <SessionActions
                      onEdit={() =>
                        navigate(`/ministry/session/${row.id}`)
                      }
                      onDelete={() => {
                        if (
                          window.confirm(
                            "Delete this ministry session?"
                          )
                        ) {
                          deleteSession(row.id);
                        }
                      }}
                    />
                  ),
                },
              ]}
            />
          </SectionCard>
        </Grid>
      </Grid>

      <SectionCard
        title="Monthly Goal"
        subtitle="Stay encouraged"
      >
        <ActionCard
          title="Keep up the fine work!"
          description="Every ministry session is valuable. Continue building good spiritual habits and tracking your progress."
          icon={<VolunteerActivismIcon />}
        />
      </SectionCard>
    </Stack>
  );
}