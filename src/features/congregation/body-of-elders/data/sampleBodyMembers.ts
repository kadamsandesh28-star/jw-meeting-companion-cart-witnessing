import { BodyMember } from "../types/bodyMember";

const now = new Date().toISOString();

export const sampleBodyMembers: BodyMember[] = [
  {
    id: crypto.randomUUID(),
    publisherId: "",
    role: "Coordinator",
    appointmentDate: "2022-01-01",
    active: true,
    notes: "Congregation coordinator.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    publisherId: "",
    role: "Secretary",
    appointmentDate: "2021-06-15",
    active: true,
    notes: "",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    publisherId: "",
    role: "Service Overseer",
    appointmentDate: "2023-03-10",
    active: true,
    notes: "",
    createdAt: now,
    updatedAt: now,
  },
];