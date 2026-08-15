import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import {
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  onSurprise: () => void;
}

export default function SurpriseMeCard({
  onSurprise,
}: Props) {
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
          "linear-gradient(135deg, #F8FAFC 0%, #EEF5FF 100%)",
        boxShadow:
          "0 10px 30px rgba(15,23,42,0.06)",
        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow:
            "0 16px 36px rgba(25,118,210,.12)",
        },
      }}
    >
      <Stack spacing={2.5}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="#1E293B"
        >
          ✨ Need Inspiration?
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            lineHeight: 1.7,
          }}
        >
          Let the app choose a family
          worship template for you and
          discover a fresh spiritual
          discussion for your family.
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={
            <AutoAwesomeRoundedIcon />
          }
          onClick={onSurprise}
          sx={{
            mt: 1,
            borderRadius: 999,
            py: 1.4,
            fontWeight: 700,
            textTransform: "none",
            background:
              "linear-gradient(90deg, #1976D2 0%, #42A5F5 100%)",

            "&:hover": {
              background:
                "linear-gradient(90deg, #1565C0 0%, #1E88E5 100%)",
            },
          }}
        >
          Surprise Me
        </Button>
      </Stack>
    </Paper>
  );
}