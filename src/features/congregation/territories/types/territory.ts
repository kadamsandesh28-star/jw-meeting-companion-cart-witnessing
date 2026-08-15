export type TerritoryType =
  | "Residential"
  | "Business"
  | "Rural"
  | "Mixed";

export type TerritoryStatus =
  | "Available"
  | "Assigned"
  | "Completed";

export type TerritoryAttachment = {
  name: string;
  type: "pdf" | "image";
  data: string;
};

export interface Territory {
  id: string;

  number: string;
  name: string;

  type: TerritoryType;
  status: TerritoryStatus;

  assignedServiceGroupId: string;

  addressNotes: string;
  mapReference: string;

  attachment?: TerritoryAttachment;

  lastWorked?: string;
  nextDue?: string;

  notes: string;

  createdAt: string;
  updatedAt: string;
}