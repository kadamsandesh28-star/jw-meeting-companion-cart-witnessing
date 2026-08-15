import { useCallback, useEffect, useState } from "react";

import { DashboardEvent } from "../models/DashboardEvent";
import { dashboardEventService } from "../services/dashboardEventService";

export default function useCalendarEvents() {
  const [events, setEvents] = useState<DashboardEvent[]>([]);

  const loadEvents = useCallback(() => {
    setEvents(dashboardEventService.getAll());
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const addEvent = (
    event: Omit<DashboardEvent, "id">
  ) => {
    dashboardEventService.add(event);
    loadEvents();
  };

  const updateEvent = (
    event: DashboardEvent
  ) => {
    dashboardEventService.update(event);
    loadEvents();
  };

  const deleteEvent = (id: string) => {
    dashboardEventService.remove(id);
    loadEvents();
  };

  const saveEvent = (
    event: Omit<DashboardEvent, "id"> | DashboardEvent
  ) => {
    if ("id" in event) {
      updateEvent(event);
    } else {
      addEvent(event);
    }
  };

  return {
    events,
    loadEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    saveEvent,
  };
}