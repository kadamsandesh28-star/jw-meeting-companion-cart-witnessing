import {
  Paper,
  Stack,
  Typography,
  Chip,
} from "@mui/material";

interface DepartmentOverviewCardProps {
  active: boolean;
  memberCount: number;
  keyMemberCount: number;
}

export default function DepartmentOverviewCard({
  active,
  memberCount,
  keyMemberCount,
}: DepartmentOverviewCardProps) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6">
          Department Overview
        </Typography>

        <Chip
          color={active ? "success" : "default"}
          label={active ? "Active" : "Inactive"}
        />

        <Typography>
          Total Members: <strong>{memberCount}</strong>
        </Typography>

        <Typography>
          Key Members: <strong>{keyMemberCount}</strong>
        </Typography>
      </Stack>
    </Paper>
  );
}