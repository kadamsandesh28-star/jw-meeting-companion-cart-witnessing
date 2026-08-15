/**
 * Represents congregation assignments that may be scheduled
 * for meetings or other congregation activities.
 */

export enum AssignmentType {
  // Meeting Assignments
  Chairman = "Chairman",
  OpeningPrayer = "Opening Prayer",
  ClosingPrayer = "Closing Prayer",
  PublicTalk = "Public Talk",
  WatchtowerReader = "Watchtower Reader",

  // Life and Ministry Meeting
  BibleReading = "Bible Reading",
  InitialCall = "Initial Call",
  ReturnVisit = "Return Visit",
  BibleStudy = "Bible Study",
  Talk = "Talk",

  // Platform
  Conductor = "Conductor",
  Assistant = "Assistant",

  // Audio / Video
  Sound = "Sound",
  Video = "Video",
  Microphones = "Microphones",

  // Hospitality
  Attendant = "Attendant",
  LiteratureCounter = "Literature Counter",

  // Congregation
  Cleaning = "Cleaning",
  Maintenance = "Maintenance",

  // Field Service
  GroupOverseer = "Group Overseer",
  FieldServiceMeeting = "Field Service Meeting"
}

export enum AssignmentStatus {
  Scheduled = "Scheduled",
  Completed = "Completed",
  Cancelled = "Cancelled",
  Reassigned = "Reassigned"
}

export interface Assignment {
  id: string;

  type: AssignmentType;

  title?: string;

  description?: string;

  date: string;

  startTime?: string;

  endTime?: string;

  location?: string;

  status: AssignmentStatus;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}