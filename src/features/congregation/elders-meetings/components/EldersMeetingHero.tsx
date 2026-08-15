import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";

import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function EldersMeetingHero() {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 5,
        p: { xs: 4, md: 6 },
        borderRadius: 8,
        overflow: "hidden",
        position: "relative",
        border: "1px solid",
        borderColor: "#D9E8FF",

        background:
          "linear-gradient(135deg,#0D47A1 0%,#1976D2 45%,#00897B 100%)",

        color: "#fff",

        boxShadow:
          "0 20px 50px rgba(13,71,161,.22)",

        "&::before": {
          content: '""',
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "rgba(255,255,255,.08)",
          top: -130,
          right: -100,
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background:
            "rgba(255,255,255,.05)",
          bottom: -70,
          left: -60,
        },
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
        textAlign="center"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <GroupsRoundedIcon
          sx={{
            fontSize: 72,
            color: "#fff",
          }}
        />

        <Typography
          variant="h3"
          fontWeight={800}
        >
          Elders Meetings
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: 760,
            opacity: 0.95,
            lineHeight: 1.8,
            fontWeight: 400,
          }}
        >
          Prepare meeting agendas, record
          discussion notes, assign follow-up
          responsibilities, monitor progress,
          and maintain an organized archive of
          elders and service committee meetings.
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{
            px: 2.5,
            py: 1,
            borderRadius: 999,
            background:
              "rgba(255,255,255,.15)",
            backdropFilter: "blur(6px)",
          }}
        >
          <GavelRoundedIcon
            sx={{
              color: "#FFE082",
            }}
            fontSize="small"
          />

          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              fontWeight: 500,
            }}
          >
            Organized Meetings • Better Decisions • Faithful Follow-up
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}