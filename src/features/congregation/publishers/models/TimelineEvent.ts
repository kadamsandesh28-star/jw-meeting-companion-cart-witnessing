/**
 * Represents an event in a publisher's history.
 * These events are displayed chronologically on the
 * Publisher Profile.
 */

export enum TimelineEventType {
  // Spiritual Milestones
  Baptism = "Baptism",
  Publisher = "Publisher",
  AuxiliaryPioneer = "Auxiliary Pioneer",
  RegularPioneer = "Regular Pioneer",
  MinisterialServant = "Ministerial Servant",
  Elder = "Elder",

  // Congregation
  JoinedCongregation = "Joined Congregation",
  TransferredIn = "Transferred In",
  TransferredOut = "Transferred Out",

  // Assignments
  PublicSpeaker = "Public Speaker",
  LDC = "LDC",
  HLC = "HLC",
  BethelVisit = "Bethel Visit",
  KingdomHallProject = "Kingdom Hall Project",

  // Schools
  PioneerSchool = "Pioneer School",
  KingdomMinistrySchool = "Kingdom Ministry School",
  EldersSchool = "Elders School",
  MinisterialServantsSchool = "Ministerial Servants School",

  // Shepherding
  ShepherdingVisit = "Shepherding Visit",

  // Personal
  Marriage = "Marriage",
  ChildBorn = "Child Born",

  // General
  Note = "Note",
  Other = "Other",
}

export interface TimelineEvent {
  id: string;

  type: TimelineEventType;

  title: string;

  description?: string;

  eventDate: string;

  location?: string;

  createdBy?: string;

  createdAt: string;

  updatedAt: string;
}