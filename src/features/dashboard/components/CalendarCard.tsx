import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  Divider,
} from "@mui/material";

import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import UpcomingEvents from "./UpcomingEvents";
import EventDialog from "./EventDialog";

import useCalendarEvents from "../hooks/useCalendarEvents";

import { DashboardEvent } from "../models/DashboardEvent";

export default function CalendarCard() {
  const {
    events,
    saveEvent,
    deleteEvent,
  } = useCalendarEvents();

  const [currentMonth, setCurrentMonth] =
    useState(new Date());

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedEvent, setSelectedEvent] =
    useState<DashboardEvent | undefined>();

  const previousMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  const monthEvents = useMemo(() => {
    return events.filter((event) => {
      const d = new Date(event.date);

      return (
        d.getMonth() === currentMonth.getMonth() &&
        d.getFullYear() ===
          currentMonth.getFullYear()
      );
    });
  }, [events, currentMonth]);

  const handleDayClick = (
    date: string
  ) => {
    setSelectedDate(date);
    setSelectedEvent(undefined);
    setDialogOpen(true);
  };

  const handleEventClick = (
    event: DashboardEvent
  ) => {
    setSelectedEvent(event);
    setSelectedDate(event.date);
    setDialogOpen(true);
  };

  const handleSave = (
    event:
      | DashboardEvent
      | Omit<DashboardEvent, "id">
  ) => {
    saveEvent(event);
    setDialogOpen(false);
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <CalendarHeader
          month={currentMonth}
          onPrevious={previousMonth}
          onNext={nextMonth}
        />

        <Divider sx={{ mb: 2 }} />

        <CalendarGrid
          currentMonth={currentMonth}
          events={monthEvents}
          onDayClick={handleDayClick}
        />

        <Divider sx={{ my: 3 }} />

        <UpcomingEvents
          events={monthEvents}
          onSelect={handleEventClick}
        />

        <EventDialog
          open={dialogOpen}
          initialDate={selectedDate}
          event={selectedEvent}
          onClose={() =>
            setDialogOpen(false)
          }
          onSave={handleSave}
          onDelete={(id) => {
            deleteEvent(id);
            setDialogOpen(false);
          }}
        />
      </CardContent>
    </Card>
  );
}