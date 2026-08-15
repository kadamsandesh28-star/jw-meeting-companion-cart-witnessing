import { Container } from "@mui/material";

import NotebookDashboard from "../components/NotebookDashboard";

export default function NotebookPage() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
    >
      <NotebookDashboard />
    </Container>
  );
}