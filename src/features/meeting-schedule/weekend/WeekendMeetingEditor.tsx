import { useState } from "react";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  WeekendMeetingSchedule,
  WeekendMeetingWeek,
} from "./models/WeekendMeetingSchedule";

import { createEmptyWeekendSchedule } from "./services/createEmptyWeekendSchedule";

import {
  saveSchedule,
} from "./storage/weekendMeetingStorage";

import { exportWeekendPdf } from "./export/exportWeekendPdf";

import WeekendMeetingInformationSection from "./WeekendMeetingInformationSection";

export default function WeekendMeetingEditor() {
  const [schedule, setSchedule] =
    useState<WeekendMeetingSchedule>(() =>
      createEmptyWeekendSchedule("September 2026")
    );

  function updateWeek(
    updatedWeek: WeekendMeetingWeek
  ) {
    setSchedule((current) => ({
      ...current,

      updatedAt: Date.now(),

      weeks: current.weeks.map((week) =>
        week.id === updatedWeek.id
          ? updatedWeek
          : week
      ),
    }));
  }

  function handleSave() {
    saveSchedule(schedule);

    alert("Weekend schedule saved successfully.");
  }

  function handleExportPdf() {
    exportWeekendPdf(schedule);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Stack spacing={4}>
        <Typography
          variant="h4"
          fontWeight={700}
          color="success.main"
        >
          Weekend Meeting Schedule
        </Typography>

        <Grid
          container
          spacing={2}
        >
          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >
            <TextField
              fullWidth
              label="Month"
              value={schedule.month}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <TextField
              fullWidth
              label="Weeks"
              value={schedule.weeks.length}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>

        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveRoundedIcon />}
            onClick={handleSave}
          >
            Save Schedule
          </Button>

          <Button
            variant="outlined"
            color="success"
            startIcon={<PictureAsPdfRoundedIcon />}
            onClick={handleExportPdf}
          >
            Export PDF
          </Button>

          <Button
            variant="outlined"
            color="success"
            startIcon={<PrintRoundedIcon />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Stack>

        <Typography color="text.secondary">
          Prepare the monthly Weekend Meeting
          schedule, save it and export it as a PDF.
        </Typography>

        {schedule.weeks.map((week) => (
          <Accordion
            key={week.id}
            defaultExpanded={
              week.weekNumber === 1
            }
            disableGutters
            elevation={0}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreRoundedIcon />
              }
            >
              <Stack>
                <Typography
                  fontWeight={700}
                >
                  Week {week.weekNumber}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {week.meetingDate ||
                    "Meeting date not set"}
                </Typography>
              </Stack>
            </AccordionSummary>

            <AccordionDetails>
              <WeekendMeetingInformationSection
                week={week}
                onChange={updateWeek}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Paper>
  );
}