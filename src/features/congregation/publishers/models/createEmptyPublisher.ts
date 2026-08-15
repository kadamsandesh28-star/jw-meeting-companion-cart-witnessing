import { Publisher } from "./Publisher";

export function createEmptyPublisher(): Publisher {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),

    firstName: "",
    middleName: "",
    lastName: "",
    displayName: "",

    gender: "Brother",
    maritalStatus: "Single",

    dateOfBirth: "",
    occupation: "",

    email: "",
    phone: "",
    mobile: "",
    whatsapp: "",

    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },

    congregationGroup: 1,

    publisherStatus: "Publisher",

    baptized: false,

    baptismDate: "",
    publisherSince: "",

    appointedMS: "",
    appointedElder: "",

    regularPioneerSince: "",
    auxiliaryPioneerSince: "",

    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },

    family: [],

    privileges: [],

    assignments: [],

    timeline: [],

    notes: "",

    photoUrl: "",

    active: true,

    createdAt: now,

    updatedAt: now,
  };
}