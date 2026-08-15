import { useMemo, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

import PageHeader from "../../../components/ui/PageHeader";
import SectionCard from "../../../components/ui/SectionCard";
import StatCard from "../../../components/ui/StatCard";
import DataTable from "../../../components/ui/DataTable";

import GenerateReportDialog from "../components/GenerateReportDialog";
import { ministryService } from "../services/ministryService";
import { MinistrySession } from "../types/ministry";
import { FieldServiceReportData } from "../types/report";
import { exportFieldServiceReport } from "../utils/exportFieldServiceReport";

export default function MinistryReports() {
  const now = new Date();

  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [reportDialogOpen, setReportDialogOpen] =
    useState(false);

  const statistics = useMemo(
    () => ministryService.getMonthlyStatistics(month, year),
    [month, year]
  );

  const sessions = useMemo(() => {
    const start = new Date(year, month, 1);

    const end = new Date(
      year,
      month + 1,
      0,
      23,
      59,
      59
    );

    return ministryService.getSessionsByDateRange(
      start,
      end
    );
  }, [month, year]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDuration = (
    session: MinistrySession
  ) => {
    const start = new Date(
      `${session.date}T${session.startTime}`
    );

    const end = new Date(
      `${session.date}T${session.endTime}`
    );

    const minutes = Math.max(
      0,
      Math.round(
        (end.getTime() - start.getTime()) /
          60000
      )
    );

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins}m`;
    }

    return `${hours}h ${mins}m`;
  };

  const handleGenerateReport = (
    report: FieldServiceReportData
  ) => {
    exportFieldServiceReport(report);
  };

  return (
    <Stack spacing={4}>
      <PageHeader
        title="Ministry Reports"
        subtitle="View ministry statistics by month."
        actions={
          <Button
            variant="contained"
            onClick={() =>
              setReportDialogOpen(true)
            }
          >
            📄 Generate Monthly Report
          </Button>
        }
      />

      <SectionCard
        title="Report Period"
        subtitle="Select the reporting month."
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Month</InputLabel>

              <Select
                value={month.toString()}
                label="Month"
                onChange={(
                  e: SelectChangeEvent
                ) =>
                  setMonth(
                    Number(e.target.value)
                  )
                }
              >
                {months.map(
                  (monthName, index) => (
                    <MenuItem
                      key={monthName}
                      value={index}
                    >
                      {monthName}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>

              <Select
                value={year.toString()}
                label="Year"
                onChange={(
                  e: SelectChangeEvent
                ) =>
                  setYear(
                    Number(e.target.value)
                  )
                }
              >
                {Array.from(
                  { length: 5 },
                  (_, i) =>
                    now.getFullYear() - i
                ).map((y) => (
                  <MenuItem
                    key={y}
                    value={y}
                  >
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </SectionCard>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            label="Hours"
            value={statistics.totalHours}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            label="Sessions"
            value={statistics.totalSessions}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            label="Return Visits"
            value={
              statistics.totalReturnVisits
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            label="Bible Studies"
            value={
              statistics.totalBibleStudies
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            label="Placements"
            value={
              statistics.totalPlacements
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            label="Videos"
            value={
              statistics.totalVideosShown
            }
          />
        </Grid>
      </Grid>

      <SectionCard
        title="Sessions"
        subtitle="Sessions recorded during the selected month."
      >
        <DataTable<MinistrySession>
          rows={sessions}
          getRowKey={(row) => row.id}
          emptyMessage="No ministry sessions found."
          columns={[
            {
              id: "date",
              label: "Date",
              render: (row) =>
                new Date(
                  row.date
                ).toLocaleDateString(),
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
                formatDuration(row),
            },
            {
              id: "returnVisits",
              label: "RVs",
            },
          ]}
        />
      </SectionCard>

      <GenerateReportDialog
        open={reportDialogOpen}
        onClose={() =>
          setReportDialogOpen(false)
        }
        onGenerate={handleGenerateReport}
        month={months[month]}
        year={year}
        hours={statistics.totalHours}
        bibleStudies={
          statistics.totalBibleStudies
        }
      />
    </Stack>
  );
}