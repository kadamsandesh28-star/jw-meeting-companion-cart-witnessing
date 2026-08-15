import {
  Gender,
  PublisherRole,
  PublisherStatus,
  PublisherType,
} from "./enums";

export interface ContactInformation {
  phone: string;
  email: string;
  address: string;
  emergencyContact?: string;
}

export interface FamilyInformation {
  spouse?: string;
  parents?: string[];
  children?: string[];
}

export interface CongregationInformation {
  role: PublisherRole;
  publisherType: PublisherType;
  fieldServiceGroup: string;
  status: PublisherStatus;
}

export interface Publisher {
  id: string;

  firstName: string;
  lastName: string;

  gender: Gender;

  birthDate?: string;
  baptismDate?: string;

  contact: ContactInformation;

  family: FamilyInformation;

  congregation: CongregationInformation;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}