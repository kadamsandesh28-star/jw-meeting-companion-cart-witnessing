import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";

import {
  FieldServiceArrangement,
  FieldServiceDay,
  FieldServiceWeek,
} from "../models/FieldServiceSchedule";

import FieldServiceDayCard from "./FieldServiceDayCard";
import ArrangementEditor from "./ArrangementEditor";

interface Props {
  week: FieldServiceWeek;

  onArrangementChange: (
    day: string,
    arrangement: FieldServiceArrangement
  ) => void;

  onAddArrangement: (
    day: string
  ) => void;
}

export default function FieldServiceWeekAccordion({
  week,
  onArrangementChange,
  onAddArrangement,
}: Props) {
  return (
    <Accordion
      defaultExpanded={week.weekNumber === 1}
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
        expandIcon={<ExpandMoreRoundedIcon />}
      >
        <Stack>
          <Typography
            fontWeight={700}
          >
            {week.weekLabel}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {week.days.length} Meeting Days
          </Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={3}>
          {week.days.map((day: FieldServiceDay) => (
            <FieldServiceDayCard
              key={day.day}
              day={day}
              onAddArrangement={() =>
                onAddArrangement(day.day)
              }
              renderArrangement={(
                arrangement
              ) => (
                <ArrangementEditor
                  key={arrangement.id}
                  arrangement={arrangement}
                  onChange={(updated) =>
                    onArrangementChange(
                      day.day,
                      updated
                    )
                  }
                />
              )}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}