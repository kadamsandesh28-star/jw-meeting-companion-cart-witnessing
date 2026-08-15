/**
 * Defines all congregation privileges that can be assigned
 * to a publisher.
 */

export enum PrivilegeType {
  Elder = "Elder",
  MinisterialServant = "Ministerial Servant",

  RegularPioneer = "Regular Pioneer",
  AuxiliaryPioneer = "Auxiliary Pioneer",

  PublicSpeaker = "Public Speaker",
  WatchtowerReader = "Watchtower Reader",
  BibleReading = "Bible Reading",

  Sound = "Sound",
  Video = "Video",
  Attendant = "Attendant",
  Microphones = "Microphones",

  Literature = "Literature",
  Accounts = "Accounts",
  Secretary = "Secretary",
  ServiceOverseer = "Service Overseer",
  COBE = "Coordinator of the Body of Elders",

  LDC = "LDC",
  HLC = "HLC",
  RBC = "RBC",

  Cleaning = "Cleaning",
  Maintenance = "Maintenance"
}

export interface Privilege {
  id: string;

  type: PrivilegeType;

  assignedDate?: string;

  endDate?: string;

  active: boolean;

  notes?: string;
}    