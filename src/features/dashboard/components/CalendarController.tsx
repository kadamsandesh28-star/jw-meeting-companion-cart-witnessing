import { useState } from "react";

import { DashboardEvent } from "../models/DashboardEvent";
import useCalendarEvents from "../hooks/useCalendarEvents";

export default function useCalendarController() {
  const {
    events,
    saveEvent,
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

  const openNewEvent = (date: string) => {
    setSelectedEvent(undefined);
    setSelectedDate(date);
    setDialogOpen(true);
  };

  const openExistingEvent = (
    event: DashboardEvent
  ) => {
    setSelectedEvent(event);
    setSelectedDate(event.date);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return {
    events,

    currentMonth,

    previousMonth,

    nextMonth,

    dialogOpen,

    selectedDate,

    selectedEvent,

    openNewEvent,

    openExistingEvent,

    closeDialog,

    saveEvent,
  };
}