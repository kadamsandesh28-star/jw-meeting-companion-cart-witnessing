import { CartWitnessingSchedule } from "../models/CartWitnessingSchedule";

export function toDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getSaturday(date = new Date()) {
  const result = new Date(date);
  const day = result.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7;
  result.setDate(result.getDate() + daysUntilSaturday);
  return toDateInput(result);
}

export function createEntry(date: string) {
  return {
    id: crypto.randomUUID(),
    date,
    time: "",
    location: "",
    cart: "",
    participants: "",
    captainContact: "",
    captainId: "",
    notes: "",
  };
}

export function createEmptyCartWitnessingSchedule(
  weekOf = getSaturday()
): CartWitnessingSchedule {
  return {
    id: crypto.randomUUID(),
    title: "Cart Witnessing Weekly Schedule",
    weekOf,
    entries: [],
    dayCaptains: {},
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}
