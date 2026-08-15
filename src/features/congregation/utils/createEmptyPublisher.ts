import { Publisher } from "../publishers/types/Publisher";
import {
  Gender,
  PublisherRole,
  PublisherStatus,
  PublisherType,
} from "../publishers/types/enums";

export function createEmptyPublisher(): Publisher {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),

    firstName: "",
    lastName: "",

    gender: Gender.Male,

    birthDate: "",
    baptismDate: "",

    contact: {
      phone: "",
      email: "",
      address: "",
      emergencyContact: "",
    },

    family: {
      spouse: "",
      parents: [],
      children: [],
    },

    congregation: {
      role: PublisherRole.Publisher,
      publisherType: PublisherType.Regular,
      fieldServiceGroup: "",
      status: PublisherStatus.Active,
    },

    notes: "",

    createdAt: now,
    updatedAt: now,
  };
}