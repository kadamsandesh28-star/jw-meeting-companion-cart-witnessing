import { useState } from "react";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";

import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  FieldServiceArrangement,
  FieldServiceSchedule,
} from "./models/FieldServiceSchedule";

import { createEmptyFieldServiceSchedule } from "./services/createEmptyFieldServiceSchedule";

import { saveSchedule } from "./storage/fieldServiceStorage";

import { exportFieldServicePdf } from "./export/exportFieldServicePdf";

import FieldServiceWeekAccordion from "./components/FieldServiceWeekAccordion";

export default function FieldServiceEditor() {
  const [schedule, setSchedule] =
    useState<FieldServiceSchedule>(() =>
      createEmptyFieldServiceSchedule(
        "September 2026"
      )
    );

  function updateArrangement(
    weekId: string,
    dayName: string,
    updated: FieldServiceArrangement
  ) {
    setSchedule((current) => ({
      ...current,

      updatedAt: Date.now(),

      weeks: current.weeks.map((week) => {
        if (week.id !== weekId) {
          return week;
        }

        return {
          ...week,

          days: week.days.map((day) => {
            if (day.day !== dayName) {
              return day;
            }

            return {
              ...day,

              arrangements:
                day.arrangements.map(
                  (arrangement) =>
                    arrangement.id === updated.id
                      ? updated
                      : arrangement
                ),
            };
          }),
        };
      }),
    }));
  }

  function addArrangement(
    weekId: string,
    dayName: string
  ) {
    setSchedule((current) => ({
      ...current,

      updatedAt: Date.now(),

      weeks: current.weeks.map((week) => {
        if (week.id !== weekId) {
          return week;
        }

        return {
          ...week,

          days: week.days.map((day) => {
            if (day.day !== dayName) {
              return day;
            }

            return {
              ...day,

              arrangements: [
                ...day.arrangements,

                {
                  id: crypto.randomUUID(),

                  time: "",

                  arrangement: "",

                  location: "",

                  conductor: "",

                  notes: "",
                },
              ],
            };
          }),
        };
      }),
    }));
  }

  function handleSave() {
    saveSchedule(schedule);

    alert(
      "Field Service schedule saved successfully."
    );
  }

  function handleExportPdf() {
    exportFieldServicePdf(schedule);
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
          Field Service Schedule
        </Typography>

        <TextField
          fullWidth
          label="Month"
          value={schedule.month}
          InputProps={{
            readOnly: true,
          }}
        />

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
          Prepare the monthly Field Service schedule.
          Each week contains meeting days, and each day
          can contain multiple arrangements.
        </Typography>

        <Stack spacing={3}>
          {schedule.weeks.map((week) => (
            <FieldServiceWeekAccordion
              key={week.id}
              week={week}
              onArrangementChange={(
                day,
                arrangement
              ) =>
                updateArrangement(
                  week.id,
                  day,
                  arrangement
                )
              }
              onAddArrangement={(day) =>
                addArrangement(
                  week.id,
                  day
                )
              }
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}