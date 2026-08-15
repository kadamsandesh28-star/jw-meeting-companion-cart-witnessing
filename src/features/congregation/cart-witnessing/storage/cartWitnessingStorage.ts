import { CartWitnessingSchedule } from "../models/CartWitnessingSchedule";

const KEY = "jw-companion-cart-witnessing-schedules";

function normalizeSchedule(raw: Partial<CartWitnessingSchedule>): CartWitnessingSchedule {
  const entries = (raw.entries ?? []).map((entry) => ({
    ...entry,
    captainId: entry.captainId ?? "",
  }));
  return {
    id: raw.id ?? crypto.randomUUID(),
    title: raw.title ?? "Cart Witnessing Weekly Schedule",
    weekOf: raw.weekOf ?? "",
    entries,
    dayCaptains: raw.dayCaptains ?? {},
    createdAt: raw.createdAt ?? Date.now(),
    updatedAt: raw.updatedAt ?? Date.now(),
  };
}

export function loadCartWitnessingSchedules(): CartWitnessingSchedule[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Partial<CartWitnessingSchedule>[];
    return Array.isArray(parsed) ? parsed.map(normalizeSchedule) : [];
  } catch {
    return [];
  }
}

export function saveCartWitnessingSchedule(schedule: CartWitnessingSchedule) {
  const existing = loadCartWitnessingSchedules().filter((item) => item.id !== schedule.id);
  localStorage.setItem(KEY, JSON.stringify([...existing, schedule]));
}
