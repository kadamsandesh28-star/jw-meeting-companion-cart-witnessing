import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";

import {
  Card,
  CardActionArea,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import {
  formatSessionDate,
  formatSessionTime,
} from "../utils/dateFormatter";

interface Props {
  session: FamilyWorshipSession;
  onOpen?: (id: string) => void;
}

export default function RecentSessionCard({
  session,
  onOpen,
}: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
      }}
    >
      <CardActionArea
        onClick={() =>
          onOpen?.(session.id)
        }
        sx={{
          p: 3,
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {session.title}
            </Typography>

            <ChevronRightRoundedIcon
              color="action"
            />
          </Stack>

          <Typography
            color="text.secondary"
          >
            {session.theme}
          </Typography>

          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <CalendarTodayRoundedIcon
                fontSize="small"
                color="primary"
              />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {formatSessionDate(
                  session.scheduledDate
                )}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <ScheduleRoundedIcon
                fontSize="small"
                color="primary"
              />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {formatSessionTime(
                  session.scheduledTime
                )}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <AccessTimeRoundedIcon
                fontSize="small"
                color="action"
              />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Last updated{" "}
                {new Date(
                  session.updatedAt
                ).toLocaleDateString()}
              </Typography>
            </Stack>
          </Stack>

          <Chip
            label={
              session.completed
                ? "Completed"
                : "In Progress"
            }
            color={
              session.completed
                ? "success"
                : "warning"
            }
            size="small"
            sx={{
              alignSelf: "flex-start",
            }}
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
}