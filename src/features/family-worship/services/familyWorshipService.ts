import { FamilyWorshipSession } from "../models/FamilyWorshipSession";

const STORAGE_KEY = "jwmc-family-worship";

export const familyWorshipService = {
  getAll(): FamilyWorshipSession[] {
    try {
      const stored = localStorage.getItem(
        STORAGE_KEY
      );

      return stored
        ? JSON.parse(stored)
        : [];
    } catch {
      return [];
    }
  },

  saveAll(
    sessions: FamilyWorshipSession[]
  ): void {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sessions)
    );
  },

  getById(id: string) {
    return this.getAll().find(
      (session) => session.id === id
    );
  },

  add(
    session: FamilyWorshipSession
  ): void {
    const sessions = this.getAll();

    sessions.unshift(session);

    this.saveAll(sessions);
  },

  update(
    session: FamilyWorshipSession
  ): void {
    const sessions = this.getAll().map(
      (item) =>
        item.id === session.id
          ? session
          : item
    );

    this.saveAll(sessions);
  },

  remove(id: string): void {
    const sessions = this.getAll().filter(
      (item) => item.id !== id
    );

    this.saveAll(sessions);
  },

  clear(): void {
    localStorage.removeItem(
      STORAGE_KEY
    );
  },
};