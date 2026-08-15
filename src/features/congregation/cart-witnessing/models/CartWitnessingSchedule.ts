export type CartWitnessingMode = "daily" | "weekly";

export interface CartWitnessingCaptain {
  id: string;
  name: string;
  from: string;
  to: string;
  contact: string;
}

export interface CartWitnessingEntry {
  id: string;
  date: string;
  time: string;
  location: string;
  cart: string;
  participants: string;
  captainContact: string;
  captainId?: string;
  notes: string;
}

export interface CartWitnessingSchedule {
  id: string;
  title: string;
  weekOf: string;
  entries: CartWitnessingEntry[];
  dayCaptains: Record<string, CartWitnessingCaptain[]>;
  createdAt: number;
  updatedAt: number;
}
