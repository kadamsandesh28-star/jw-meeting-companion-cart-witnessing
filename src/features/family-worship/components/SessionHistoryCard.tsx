import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { exportFamilyWorshipPdf } from "../export";
import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import {
  formatSessionDate,
  formatSessionTime,
} from "../utils/dateFormatter";

interface Props {
  session: FamilyWorshipSession;

  onOpen: (
    session: FamilyWorshipSession
  ) => void;

  onDelete: (
    id: string
  ) => void;
}

export default function SessionHistoryCard({
  session,
  onOpen,
  onDelete,
}: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack spacing={0.5}>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                {session.title || "Untitled Session"}
              </Typography>

              <Typography color="text.secondary">
                {session.theme || "No theme"}
              </Typography>
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
            />
          </Stack>

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
      </CardContent>

      <CardActions>
        <Button
          startIcon={
            <EditRoundedIcon />
          }
          onClick={() =>
            onOpen(session)
          }
        >
          Open
        </Button>

        <Button
          startIcon={
            <FileDownloadRoundedIcon />
          }
          onClick={() =>
            exportFamilyWorshipPdf(
              session
            )
          }
        >
          Export
        </Button>

        <Button
          color="error"
          startIcon={
            <DeleteRoundedIcon />
          }
          onClick={() =>
            onDelete(session.id)
          }
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}