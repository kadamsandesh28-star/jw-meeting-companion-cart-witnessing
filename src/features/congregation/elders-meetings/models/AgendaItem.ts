export interface ActionItem {
  id: string;

  task: string;

  assignedTo: string;

  dueDate: string;

  priority:
    | "Low"
    | "Normal"
    | "High";

  completed: boolean;
}

export type AgendaStatus =
  | "Pending"
  | "Discussed"
  | "Deferred"
  | "Completed";

export interface AgendaItem {
  id: string;

  title: string;

  proposedBy: string;

  duration: number;

  reference: string;

  notes: string;

  confidential: boolean;

  status: AgendaStatus;

  actions: ActionItem[];
}