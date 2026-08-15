import { useState } from "react";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  MidweekMeetingSchedule,
  MidweekMeetingWeek,
} from "../models/MidweekMeetingSchedule";

import { createEmptyMidweekSchedule } from "../services/createEmptyMidweekSchedule";
import { saveSchedule } from "../storage/meetingScheduleStorage";
import { exportMidweekPdf } from "../export/exportMidweekPdf";

import ScheduleHeader from "../shared/ScheduleHeader";
import ScheduleToolbar from "../shared/ScheduleToolbar";

import MeetingInformationSection from "./MeetingInformationSection";
import TreasuresSection from "./TreasuresSection";
import ApplySection from "./ApplySection";
import ChristianLifeSection from "./ChristianLifeSection";
import ClosingSection from "./ClosingSection";

export default function MidweekMeetingEditor() {
  const [schedule, setSchedule] =
    useState<MidweekMeetingSchedule>(() =>
      createEmptyMidweekSchedule("September 2026")
    );

  const updateWeek = (
    updatedWeek: MidweekMeetingWeek
  ) => {
    setSchedule((current) => ({
      ...current,

      updatedAt: Date.now(),

      weeks: current.weeks.map((week) =>
        week.id === updatedWeek.id
          ? updatedWeek
          : week
      ),
    }));
  };

  function handleSave() {
    saveSchedule(schedule);

    alert("Schedule saved successfully.");
  }

  function handleExportPdf() {
    exportMidweekPdf(schedule);
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
        <ScheduleHeader
          title="Midweek Meeting Schedule"
          month={schedule.month}
          count={schedule.weeks.length}
          description="Prepare the monthly Midweek Meeting schedule, save it and export it as a PDF."
        />

        <ScheduleToolbar
          onSave={handleSave}
          onExport={handleExportPdf}
          onPrint={handlePrint}
        />

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
              <Stack spacing={5}>
                <MeetingInformationSection
                  week={week}
                  onChange={updateWeek}
                />

                <TreasuresSection
                  week={week}
                  onChange={updateWeek}
                />

                <ApplySection
                  week={week}
                  onChange={updateWeek}
                />

                <ChristianLifeSection
                  week={week}
                  onChange={updateWeek}
                />

                <ClosingSection
                  week={week}
                  onChange={updateWeek}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Paper>
  );
}