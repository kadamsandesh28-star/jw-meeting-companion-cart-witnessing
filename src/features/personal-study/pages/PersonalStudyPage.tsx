import { Box, Container } from "@mui/material";

import StudyDashboard from "../components/StudyDashboard";

export default function PersonalStudyPage() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <StudyDashboard />
      </Box>
    </Container>
  );
}