import { ServiceGroup } from "../types/serviceGroup";

const now = new Date().toISOString();

export const sampleServiceGroups: ServiceGroup[] = [
  {
    id: "group-1",
    name: "North Group",

    overseerPublisherId: "publisher-1",
    assistantPublisherId: "publisher-2",

    meetingDay: "Saturday",
    meetingTime: "09:00",

    territoryIds: [
      "T101",
      "T102",
      "T103",
    ],

    publisherIds: [
      "publisher-1",
      "publisher-2",
      "publisher-3",
      "publisher-4",
    ],

    notes: "Focus on the northern residential area.",

    createdAt: now,
    updatedAt: now,
  },

  {
    id: "group-2",
    name: "South Group",

    overseerPublisherId: "publisher-5",
    assistantPublisherId: "publisher-6",

    meetingDay: "Sunday",
    meetingTime: "14:30",

    territoryIds: [
      "T201",
      "T202",
    ],

    publisherIds: [
      "publisher-5",
      "publisher-6",
      "publisher-7",
      "publisher-8",
    ],

    notes: "Includes apartment witnessing.",

    createdAt: now,
    updatedAt: now,
  },
];