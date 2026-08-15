import { Note } from "../types/note";

const STORAGE_KEY = "jw-meeting-notes";

export function loadNotes(): Note[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveNotes(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}