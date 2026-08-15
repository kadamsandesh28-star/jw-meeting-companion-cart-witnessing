import { TimelineEvent, TimelineEventType } from "../features/congregation/publishers/models/TimelineEvent";

let timelineEvents: TimelineEvent[] = [];

export const timelineService = {
  /**
   * Returns all timeline events.
   */
  getAll(): TimelineEvent[] {
    return timelineEvents;
  },

  /**
   * Returns a timeline event by ID.
   */
  getById(id: string): TimelineEvent | undefined {
    return timelineEvents.find((event) => event.id === id);
  },

  /**
   * Creates a new timeline event.
   */
  create(event: TimelineEvent): void {
    timelineEvents.push(event);
  },

  /**
   * Updates an existing timeline event.
   */
  update(updatedEvent: TimelineEvent): boolean {
    const index = timelineEvents.findIndex(
      (event) => event.id === updatedEvent.id
    );

    if (index === -1) {
      return false;
    }

    timelineEvents[index] = updatedEvent;

    return true;
  },

  /**
   * Deletes a timeline event.
   */
  delete(id: string): boolean {
    const index = timelineEvents.findIndex(
      (event) => event.id === id
    );

    if (index === -1) {
      return false;
    }

    timelineEvents.splice(index, 1);

    return true;
  },

  /**
   * Returns timeline events of a specific type.
   */
  getByType(type: TimelineEventType): TimelineEvent[] {
    return timelineEvents.filter(
      (event) => event.type === type
    );
  },

  /**
   * Returns events sorted by event date (newest first).
   */
  getLatest(): TimelineEvent[] {
    return [...timelineEvents].sort(
      (a, b) =>
        new Date(b.eventDate).getTime() -
        new Date(a.eventDate).getTime()
    );
  },

  /**
   * Removes all timeline events.
   * Useful during development and testing.
   */
  clear(): void {
    timelineEvents = [];
  }
};