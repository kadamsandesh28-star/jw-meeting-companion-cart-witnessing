import { DashboardEvent } from "../models/DashboardEvent";

const STORAGE_KEY = "dashboard-events";

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 9)
  );
};

const normalizeEvent = (
  event: DashboardEvent | Omit<DashboardEvent, "time">
): DashboardEvent => ({
  ...event,
  time: "time" in event ? event.time : "19:00",
});

export const dashboardEventService = {
  getAll(): DashboardEvent[] {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    try {
      const events = JSON.parse(raw);

      return events.map(normalizeEvent);
    } catch {
      return [];
    }
  },

  saveAll(events: DashboardEvent[]) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(events)
    );
  },

  add(event: Omit<DashboardEvent, "id">) {
    const events = this.getAll();

    const newEvent: DashboardEvent = {
      id: generateId(),
      ...event,
    };

    events.push(newEvent);

    this.saveAll(events);

    return newEvent;
  },

  update(event: DashboardEvent) {
    const events = this.getAll().map((e) =>
      e.id === event.id ? event : e
    );

    this.saveAll(events);
  },

  remove(id: string) {
    const events = this.getAll().filter(
      (event) => event.id !== id
    );

    this.saveAll(events);
  },
};