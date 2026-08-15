import { Box, Tooltip, Typography } from "@mui/material";
import { DashboardEvent } from "../models/DashboardEvent";

interface CalendarDayProps {
  day: number | null;
  month: number;
  year: number;
  events: DashboardEvent[];
  onClick: (date: string) => void;
}

export default function CalendarDay({
  day,
  month,
  year,
  events,
  onClick,
}: CalendarDayProps) {
  if (day === null) {
    return <Box sx={{ height: 56 }} />;
  }

  // Build the date string without UTC conversion.
  const dateString =
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const dayEvents = events.filter(
    (event) => event.date === dateString
  );

  const today = new Date();

  const isToday =
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  return (
    <Box
      onClick={() => onClick(dateString)}
      sx={{
        height: 56,
        border: "1px solid",
        borderColor: isToday
          ? "primary.main"
          : "divider",
        borderRadius: 2,
        cursor: "pointer",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all .2s ease",

        "&:hover": {
          bgcolor: "action.hover",
          borderColor: "primary.main",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Typography
        fontWeight={isToday ? 700 : 500}
        color={
          isToday
            ? "primary.main"
            : "text.primary"
        }
      >
        {day}
      </Typography>

      {dayEvents.length > 0 && (
        <Tooltip
          title={dayEvents
            .map((e) => e.title)
            .join(", ")}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 6,
              display: "flex",
              gap: 0.5,
            }}
          >
            {dayEvents
              .slice(0, 3)
              .map((event) => (
                <Box
                  key={event.id}
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor:
                      event.category ===
                      "Meeting"
                        ? "#2563EB"
                        : event.category ===
                          "Assembly"
                        ? "#16A34A"
                        : event.category ===
                          "Convention"
                        ? "#9333EA"
                        : event.category ===
                          "Reminder"
                        ? "#EA580C"
                        : "#64748B",
                  }}
                />
              ))}
          </Box>
        </Tooltip>
      )}
    </Box>
  );
}