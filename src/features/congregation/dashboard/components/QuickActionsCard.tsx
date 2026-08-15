import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function QuickActionsCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button
            component={RouterLink}
            to="/congregation/publishers/new"
            variant="contained"
          >
            New Publisher
          </Button>

          <Button
            component={RouterLink}
            to="/congregation/service-groups/new"
            variant="contained"
          >
            New Service Group
          </Button>

          <Button
            component={RouterLink}
            to="/congregation/territories/new"
            variant="contained"
          >
            New Territory
          </Button>

          <Button
            component={RouterLink}
            to="/congregation/service-committee/new"
            variant="contained"
          >
            New Committee
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}