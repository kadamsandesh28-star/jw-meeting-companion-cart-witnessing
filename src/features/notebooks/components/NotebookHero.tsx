import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import { Paper, Stack, Typography } from "@mui/material";

export default function NotebookHero() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        borderRadius: 4,
        background:
          "linear-gradient(135deg,#1565C0 0%,#42A5F5 100%)",
        color: "white",
      }}
    >
      <Stack spacing={2}>
        <AutoStoriesRoundedIcon
          sx={{
            fontSize: 52,
          }}
        />

        <Typography
          variant="h3"
          fontWeight={700}
        >
          Notebook
        </Typography>

        <Typography
          variant="h6"
          sx={{
            opacity: 0.9,
            maxWidth: 700,
          }}
        >
          Create, organize and preserve all your
          personal, spiritual and ministry notebooks
          in one beautiful workspace.
        </Typography>
      </Stack>
    </Paper>
  );
}