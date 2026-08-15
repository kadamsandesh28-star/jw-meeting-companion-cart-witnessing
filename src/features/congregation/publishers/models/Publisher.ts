import { Assignment } from "./Assignment";
import { FamilyMember } from "./FamilyMember";
import { Privilege } from "./Privilege";
import { TimelineEvent } from "./TimelineEvent";

export type Gender =
  | "Brother"
  | "Sister";

export type MaritalStatus =
  | "Single"
  | "Married"
  | "Widowed";

export type PublisherStatus =
  | "Publisher"
  | "Unbaptized Publisher"
  | "Baptized Publisher"
  | "Auxiliary Pioneer"
  | "Regular Pioneer"
  | "Ministerial Servant"
  | "Elder";

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Publisher {
  id: string;

  firstName: string;

  middleName?: string;

  lastName: string;

  displayName: string;

  gender: Gender;

  maritalStatus: MaritalStatus;

  dateOfBirth?: string;

  occupation?: string;

  email?: string;

  phone?: string;

  mobile?: string;

  whatsapp?: string;

  address?: Address;

  congregationGroup: number;

  publisherStatus: PublisherStatus;

  baptized: boolean;

  baptismDate?: string;

  publisherSince?: string;

  appointedMS?: string;

  appointedElder?: string;

  regularPioneerSince?: string;

  auxiliaryPioneerSince?: string;

  emergencyContact?: EmergencyContact;

  family: FamilyMember[];

  privileges: Privilege[];

  assignments: Assignment[];

  timeline: TimelineEvent[];

  notes?: string;

  photoUrl?: string;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}