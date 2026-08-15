export type BodyRole =
  | "Coordinator"
  | "Secretary"
  | "Service Overseer"
  | "Life and Ministry Overseer"
  | "Watchtower Overseer"
  | "Public Talk Coordinator"
  | "Territory Overseer"
  | "Literature Servant"
  | "Accounts Overseer"
  | "Group Overseer"
  | "Elder";

export interface BodyMember {
  id: string;

  publisherId: string;

  role: BodyRole;

  appointmentDate: string;

  active: boolean;

  notes: string;

  createdAt: string;
  updatedAt: string;
}