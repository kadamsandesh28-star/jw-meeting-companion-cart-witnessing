import { Assignment, AssignmentStatus, AssignmentType } from "../features/congregation/publishers/models/Assignment";
import { FamilyMember, FamilyRelationship } from "../features/congregation/publishers/models/FamilyMember";
import { Privilege, PrivilegeType } from "../features/congregation/publishers/models/Privilege";
import { Publisher } from "../features/congregation/publishers/models/Publisher";
import { TimelineEvent, TimelineEventType } from "../features/congregation/publishers/models/TimelineEvent";

const now = new Date().toISOString();

const createFamilyMember = (
  id: string,
  firstName: string,
  lastName: string,
  relationship: FamilyRelationship,
  emergencyContact = false
): FamilyMember => ({
  id,
  firstName,
  lastName,
  relationship,
  emergencyContact,
});

const createPrivilege = (
  id: string,
  type: PrivilegeType,
  assignedDate: string,
  active = true
): Privilege => ({
  id,
  type,
  assignedDate,
  active,
});

const createTimeline = (
  id: string,
  type: TimelineEventType,
  title: string,
  eventDate: string,
  description?: string
): TimelineEvent => ({
  id,
  type,
  title,
  description,
  eventDate,
  createdAt: now,
  updatedAt: now,
});

const createAssignment = (
  id: string,
  type: AssignmentType,
  date: string,
  title?: string
): Assignment => ({
  id,
  type,
  date,
  title,
  status: AssignmentStatus.Scheduled,
  createdAt: now,
  updatedAt: now,
});

export const mockPublishers: Publisher[] = [
  {
    id: "pub-001",

    firstName: "John",

    lastName: "Smith",

    displayName: "John Smith",

    gender: "Brother",

    maritalStatus: "Married",

    dateOfBirth: "1974-03-14",

    occupation: "Electrical Engineer",

    email: "john.smith@example.com",

    phone: "555-1001",

    mobile: "555-2001",

    whatsapp: "555-2001",

    address: {
      addressLine1: "101 Oak Street",
      city: "Springfield",
      state: "IL",
      postalCode: "62701",
      country: "USA",
    },

    congregationGroup: 1,

    publisherStatus: "Elder",

    baptized: true,

    baptismDate: "1990-06-16",

    publisherSince: "1988-02-01",

    appointedMS: "1997-09-01",

    appointedElder: "2003-08-01",

    emergencyContact: {
      name: "Mary Smith",
      relationship: "Wife",
      phone: "555-2002",
    },

    family: [
      createFamilyMember(
        "fam-001",
        "Mary",
        "Smith",
        FamilyRelationship.Spouse,
        true
      ),
      createFamilyMember(
        "fam-002",
        "Daniel",
        "Smith",
        FamilyRelationship.Son
      ),
    ],

    privileges: [
      createPrivilege(
        "priv-001",
        PrivilegeType.Elder,
        "2003-08-01"
      ),
      createPrivilege(
        "priv-002",
        PrivilegeType.PublicSpeaker,
        "2005-01-01"
      ),
      createPrivilege(
        "priv-003",
        PrivilegeType.COBE,
        "2022-09-01"
      ),
    ],

    assignments: [
      createAssignment(
        "asg-001",
        AssignmentType.Chairman,
        "2026-08-02",
        "Weekend Meeting Chairman"
      ),
      createAssignment(
        "asg-002",
        AssignmentType.PublicTalk,
        "2026-08-09",
        "Public Talk"
      ),
    ],

    timeline: [
      createTimeline(
        "tl-001",
        TimelineEventType.Baptism,
        "Baptized",
        "1990-06-16"
      ),
      createTimeline(
        "tl-002",
        TimelineEventType.MinisterialServant,
        "Appointed Ministerial Servant",
        "1997-09-01"
      ),
      createTimeline(
        "tl-003",
        TimelineEventType.Elder,
        "Appointed Elder",
        "2003-08-01"
      ),
      createTimeline(
        "tl-004",
        TimelineEventType.JoinedCongregation,
        "Joined Springfield Congregation",
        "2012-05-15"
      ),
    ],

    notes:
      "Coordinator of the Body of Elders. Oversees congregation administration.",

    active: true,

    createdAt: now,

    updatedAt: now,
  },

  {
    id: "pub-002",

    firstName: "Michael",

    lastName: "Brown",

    displayName: "Michael Brown",

    gender: "Brother",

    maritalStatus: "Married",

    dateOfBirth: "1981-11-02",

    occupation: "IT Consultant",

    email: "michael.brown@example.com",

    phone: "555-1003",

    mobile: "555-2003",

    whatsapp: "555-2003",

    address: {
      addressLine1: "225 Cedar Avenue",
      city: "Springfield",
      state: "IL",
      postalCode: "62701",
      country: "USA",
    },

    congregationGroup: 2,

    publisherStatus: "Ministerial Servant",

    baptized: true,

    baptismDate: "1998-07-11",

    publisherSince: "1996-01-01",

    appointedMS: "2011-09-01",

    emergencyContact: {
      name: "Anna Brown",
      relationship: "Wife",
      phone: "555-2004",
    },

    family: [
      createFamilyMember(
        "fam-003",
        "Anna",
        "Brown",
        FamilyRelationship.Spouse,
        true
      ),
    ],

    privileges: [
      createPrivilege(
        "priv-004",
        PrivilegeType.MinisterialServant,
        "2011-09-01"
      ),
      createPrivilege(
        "priv-005",
        PrivilegeType.Sound,
        "2010-01-01"
      ),
      createPrivilege(
        "priv-006",
        PrivilegeType.Video,
        "2012-01-01"
      ),
    ],

    assignments: [
      createAssignment(
        "asg-003",
        AssignmentType.Sound,
        "2026-08-02"
      ),
      createAssignment(
        "asg-004",
        AssignmentType.Video,
        "2026-08-05"
      ),
    ],

    timeline: [
      createTimeline(
        "tl-005",
        TimelineEventType.Baptism,
        "Baptized",
        "1998-07-11"
      ),
      createTimeline(
        "tl-006",
        TimelineEventType.MinisterialServant,
        "Appointed Ministerial Servant",
        "2011-09-01"
      ),
    ],

    notes:
      "Assists with Audio/Video and Kingdom Hall maintenance.",

    active: true,

    createdAt: now,

    updatedAt: now,
  },
    {
    id: "pub-003",

    firstName: "David",

    lastName: "Wilson",

    displayName: "David Wilson",

    gender: "Brother",

    maritalStatus: "Single",

    dateOfBirth: "1992-05-18",

    occupation: "Teacher",

    email: "david.wilson@example.com",

    phone: "555-1005",

    mobile: "555-2005",

    whatsapp: "555-2005",

    address: {
      addressLine1: "88 Maple Drive",
      city: "Springfield",
      state: "IL",
      postalCode: "62701",
      country: "USA",
    },

    congregationGroup: 3,

    publisherStatus: "Regular Pioneer",

    baptized: true,

    baptismDate: "2008-07-12",

    publisherSince: "2007-01-01",

    regularPioneerSince: "2018-09-01",

    emergencyContact: {
      name: "Robert Wilson",
      relationship: "Father",
      phone: "555-2006",
    },

    family: [
      createFamilyMember(
        "fam-004",
        "Robert",
        "Wilson",
        FamilyRelationship.Father,
        true
      ),
      createFamilyMember(
        "fam-005",
        "Linda",
        "Wilson",
        FamilyRelationship.Mother
      ),
    ],

    privileges: [
      createPrivilege(
        "priv-007",
        PrivilegeType.RegularPioneer,
        "2018-09-01"
      ),
      createPrivilege(
        "priv-008",
        PrivilegeType.BibleReading,
        "2015-01-01"
      ),
    ],

    assignments: [
      createAssignment(
        "asg-005",
        AssignmentType.BibleReading,
        "2026-08-06",
        "Midweek Bible Reading"
      ),
      createAssignment(
        "asg-006",
        AssignmentType.InitialCall,
        "2026-08-06",
        "Initial Call Demonstration"
      ),
    ],

    timeline: [
      createTimeline(
        "tl-007",
        TimelineEventType.Baptism,
        "Baptized",
        "2008-07-12"
      ),
      createTimeline(
        "tl-008",
        TimelineEventType.RegularPioneer,
        "Appointed Regular Pioneer",
        "2018-09-01"
      ),
      createTimeline(
        "tl-009",
        TimelineEventType.PioneerSchool,
        "Attended Pioneer Service School",
        "2021-02-15"
      ),
    ],

    notes:
      "Regular pioneer with a strong interest in helping young ones.",

    active: true,

    createdAt: now,

    updatedAt: now,
  },

  {
    id: "pub-004",

    firstName: "Emily",

    lastName: "Davis",

    displayName: "Emily Davis",

    gender: "Sister",

    maritalStatus: "Single",

    dateOfBirth: "1998-09-22",

    occupation: "Registered Nurse",

    email: "emily.davis@example.com",

    phone: "555-1007",

    mobile: "555-2007",

    whatsapp: "555-2007",

    address: {
      addressLine1: "12 Birch Lane",
      city: "Springfield",
      state: "IL",
      postalCode: "62701",
      country: "USA",
    },

    congregationGroup: 2,

    publisherStatus: "Auxiliary Pioneer",

    baptized: true,

    baptismDate: "2014-08-16",

    publisherSince: "2013-01-01",

    auxiliaryPioneerSince: "2025-03-01",

    emergencyContact: {
      name: "Karen Davis",
      relationship: "Mother",
      phone: "555-2008",
    },

    family: [
      createFamilyMember(
        "fam-006",
        "Karen",
        "Davis",
        FamilyRelationship.Mother,
        true
      ),
    ],

    privileges: [
      createPrivilege(
        "priv-009",
        PrivilegeType.AuxiliaryPioneer,
        "2025-03-01"
      ),
    ],

    assignments: [
      createAssignment(
        "asg-007",
        AssignmentType.InitialCall,
        "2026-08-06",
        "Initial Call Demonstration"
      ),
    ],

    timeline: [
      createTimeline(
        "tl-010",
        TimelineEventType.Baptism,
        "Baptized",
        "2014-08-16"
      ),
      createTimeline(
        "tl-011",
        TimelineEventType.AuxiliaryPioneer,
        "Started Auxiliary Pioneer Service",
        "2025-03-01"
      ),
    ],

    notes:
      "Regularly assists with auxiliary pioneer service during campaigns.",

    active: true,

    createdAt: now,

    updatedAt: now,
  },

  {
    id: "pub-005",

    firstName: "Sarah",

    lastName: "Jones",

    displayName: "Sarah Jones",

    gender: "Sister",

    maritalStatus: "Widowed",

    dateOfBirth: "1965-12-05",

    occupation: "Retired",

    email: "sarah.jones@example.com",

    phone: "555-1009",

    mobile: "555-2009",

    whatsapp: "555-2009",

    address: {
      addressLine1: "450 Pine Court",
      city: "Springfield",
      state: "IL",
      postalCode: "62701",
      country: "USA",
    },

    congregationGroup: 1,

    publisherStatus: "Baptized Publisher",

    baptized: true,

    baptismDate: "1982-06-12",

    publisherSince: "1981-01-01",

    emergencyContact: {
      name: "Rachel Jones",
      relationship: "Daughter",
      phone: "555-2010",
    },

    family: [
      createFamilyMember(
        "fam-007",
        "Rachel",
        "Jones",
        FamilyRelationship.Daughter,
        true
      ),
    ],

    privileges: [],

    assignments: [],

    timeline: [
      createTimeline(
        "tl-012",
        TimelineEventType.Baptism,
        "Baptized",
        "1982-06-12"
      ),
      createTimeline(
        "tl-013",
        TimelineEventType.Marriage,
        "Married",
        "1988-09-17"
      ),
      createTimeline(
        "tl-014",
        TimelineEventType.ChildBorn,
        "Birth of Daughter",
        "1992-04-10"
      ),
    ],

    notes:
      "Faithful longtime publisher who regularly supports the congregation.",

    active: true,

    createdAt: now,

    updatedAt: now,
  }
];