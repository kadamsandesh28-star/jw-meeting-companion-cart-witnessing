import AddRoundedIcon from "@mui/icons-material/AddRounded";

import {
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  onCreate?: () => void;
}

export default function NewSessionCard({
  onCreate,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 3,
        borderRadius: 6,
        border: "1px solid",
        borderColor: "#D8F0DF",
        background:
          "linear-gradient(135deg,#F6FFF8 0%,#ECFDF3 100%)",
        boxShadow:
          "0 10px 30px rgba(46,125,50,.08)",
        transition: "all .25s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow:
            "0 18px 36px rgba(46,125,50,.16)",
        },
      }}
    >
      <Stack spacing={2.5}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="#2E7D32"
        >
          🌱 Start New Family Worship
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            lineHeight: 1.7,
          }}
        >
          Create a new family worship
          session with scriptures,
          discussion questions, media,
          notes, goals, and more.
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddRoundedIcon />}
          onClick={onCreate}
          sx={{
            mt: 1,
            alignSelf: {
              xs: "stretch",
              sm: "flex-start",
            },
            borderRadius: 999,
            py: 1.4,
            px: 3,
            fontWeight: 700,
            textTransform: "none",
            background:
              "linear-gradient(90deg,#2E7D32,#43A047)",

            "&:hover": {
              background:
                "linear-gradient(90deg,#1B5E20,#2E7D32)",
            },
          }}
        >
          New Worship Session
        </Button>
      </Stack>
    </Paper>
  );
}