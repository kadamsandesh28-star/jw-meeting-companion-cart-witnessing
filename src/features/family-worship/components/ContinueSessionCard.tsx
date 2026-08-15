import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";

import {
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { FamilyWorshipSession } from "../models/FamilyWorshipSession";
import {
  formatSessionDate,
  formatSessionTime,
} from "../utils/dateFormatter";

interface Props {
  session: FamilyWorshipSession | null;
  onContinue?: (
    session: FamilyWorshipSession
  ) => void;
}

export default function ContinueSessionCard({
  session,
  onContinue,
}: Props) {
  if (!session) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 3,
          borderRadius: 6,
          border: "1px solid",
          borderColor: "#E2E8F0",
          background:
            "linear-gradient(135deg,#F8FAFC 0%,#EEF5FF 100%)",
          boxShadow:
            "0 10px 30px rgba(15,23,42,.06)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          color="#1E293B"
          gutterBottom
        >
          👨‍👩‍👧‍👦 Continue Last Worship
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            lineHeight: 1.7,
          }}
        >
          You haven't created a family worship session yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 3,
        borderRadius: 6,
        border: "1px solid",
        borderColor: "#D6E4FF",
        background:
          "linear-gradient(135deg,#F5FAFF 0%,#EAF4FF 100%)",
        boxShadow:
          "0 12px 30px rgba(25,118,210,.08)",
        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow:
            "0 18px 36px rgba(25,118,210,.16)",
        },
      }}
    >
      <Stack spacing={2.5}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="#1565C0"
        >
          👨‍👩‍👧‍👦 Continue Last Worship
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
          color="#1E293B"
        >
          {session.title || "Untitled Session"}
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
          }}
        >
          <strong>Theme:</strong>{" "}
          {session.theme || "No theme"}
        </Typography>

        <Stack spacing={0.5}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            📅{" "}
            {formatSessionDate(
              session.scheduledDate
            )}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            🕖{" "}
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
          <UpdateRoundedIcon
            sx={{
              color: "#64748B",
              fontSize: 18,
            }}
          />

          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
            }}
          >
            Last updated{" "}
            {new Date(
              session.updatedAt
            ).toLocaleDateString()}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          size="large"
          startIcon={
            <PlayCircleRoundedIcon />
          }
          onClick={() =>
            onContinue?.(session)
          }
          sx={{
            mt: 1,
            borderRadius: 999,
            py: 1.4,
            fontWeight: 700,
            textTransform: "none",
            background:
              "linear-gradient(90deg,#1976D2,#42A5F5)",

            "&:hover": {
              background:
                "linear-gradient(90deg,#1565C0,#1E88E5)",
            },
          }}
        >
          Continue Session
        </Button>
      </Stack>
    </Paper>
  );
}