import { Card, CardContent, Typography } from "@mui/material";

export default function CongregationDashboardCard() {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6">
          Congregation Dashboard
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Dashboard summary coming soon.
        </Typography>
      </CardContent>
    </Card>
  );
}