import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import StatusChip from "../../../components/common/StatusChip";
import { ReturnVisit } from "../types/returnVisit";

interface ReturnVisitCardProps {
  visit: ReturnVisit;
  onEdit: (visit: ReturnVisit) => void;
  onDelete: (id: string) => void;
}

function formatDate(date: string) {
  const visitDate = new Date(date);
  const today = new Date();

  visitDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff =
    (visitDate.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";

  return visitDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ReturnVisitCard({
  visit,
  onEdit,
  onDelete,
}: ReturnVisitCardProps) {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight={700}>
              {visit.name}
            </Typography>

            <Typography color="text.secondary">
              📍 {visit.address}
            </Typography>

            {visit.phone && (
              <Typography color="text.secondary">
                📞 {visit.phone}
              </Typography>
            )}

            {visit.email && (
              <Typography color="text.secondary">
                ✉️ {visit.email}
              </Typography>
            )}

            <Typography color="text.secondary">
              📅 {formatDate(visit.nextVisit)}
            </Typography>

            {visit.notes && (
              <Typography
                sx={{
                  mt: 1,
                  p: 2,
                  bgcolor: "action.hover",
                  borderRadius: 2,
                }}
              >
                {visit.notes}
              </Typography>
            )}
          </Stack>

          <Stack
            spacing={2}
            alignItems={{
              xs: "flex-start",
              md: "flex-end",
            }}
          >
            <StatusChip status={visit.status} />

            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                onClick={() => onEdit(visit)}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => onDelete(visit.id)}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}