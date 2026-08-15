import { Scripture } from "../types/scripture";

const STORAGE_KEY = "my-jw-companion-scriptures";

export function loadScriptures(): Scripture[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveScriptures(scriptures: Scripture[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scriptures));
}