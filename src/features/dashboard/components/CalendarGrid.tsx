import { Typography } from "@mui/material";
import CalendarDay from "./CalendarDay";
import { DashboardEvent } from "../models/DashboardEvent";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
  currentMonth: Date;
  events: DashboardEvent[];
  onDayClick: (date: string) => void;
}

export default function CalendarGrid({
  currentMonth,
  events,
  onDayClick,
}: CalendarGridProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 8,
      }}
    >
      {DAYS.map((day) => (
        <Typography
          key={day}
          align="center"
          fontWeight={700}
          color="text.secondary"
        >
          {day}
        </Typography>
      ))}

      {cells.map((day, index) => (
        <CalendarDay
          key={index}
          day={day}
          month={month}
          year={year}
          events={events}
          onClick={onDayClick}
        />
      ))}
    </div>
  );
}