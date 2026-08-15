import { Publisher } from "../types/Publisher";
import {
  Gender,
  PublisherRole,
  PublisherStatus,
  PublisherType,
} from "../types/enums";

export const samplePublishers: Publisher[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    gender: Gender.Male,
    birthDate: "1978-05-15",
    baptismDate: "1996-08-10",

    contact: {
      phone: "555-0101",
      email: "john.smith@example.com",
      address: "12 Maple Street",
      emergencyContact: "Mary Smith",
    },

    family: {
      spouse: "Mary Smith",
      children: ["David Smith", "Anna Smith"],
    },

    congregation: {
      role: PublisherRole.Elder,
      publisherType: PublisherType.Regular,
      fieldServiceGroup: "Group 1",
      status: PublisherStatus.Active,
    },

    notes: "Congregation Coordinator",

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    id: "2",
    firstName: "David",
    lastName: "Brown",
    gender: Gender.Male,
    birthDate: "1987-02-21",
    baptismDate: "2004-07-18",

    contact: {
      phone: "555-0102",
      email: "david.brown@example.com",
      address: "25 Oak Avenue",
    },

    family: {},

    congregation: {
      role: PublisherRole.MinisterialServant,
      publisherType: PublisherType.Regular,
      fieldServiceGroup: "Group 2",
      status: PublisherStatus.Active,
    },

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    id: "3",
    firstName: "Sarah",
    lastName: "Johnson",
    gender: Gender.Female,
    birthDate: "1992-11-09",
    baptismDate: "2010-03-15",

    contact: {
      phone: "555-0103",
      email: "sarah.johnson@example.com",
      address: "44 Pine Road",
    },

    family: {},

    congregation: {
      role: PublisherRole.Publisher,
      publisherType: PublisherType.RegularPioneer,
      fieldServiceGroup: "Group 3",
      status: PublisherStatus.Active,
    },

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
