export type MeetingStatus = "not-started" | "in-progress" | "completed";

export interface MeetingSection {
  id: string;
  title: string;
  description: string;
  status: MeetingStatus;
  actions: string[];

  // Rich meeting data (optional)
  scripture?: string;
  publication?: string;
  meetingReference?: string;
}

export interface MeetingData {
  weekOf: string;

  midweek: {
    meetingDate: string;
    meetingTime: string;
    sections: MeetingSection[];
  };

  weekend: {
    meetingDate: string;
    meetingTime: string;
    sections: MeetingSection[];
  };
}

export const meetingData: MeetingData = {
  weekOf: "July 20–26",

  midweek: {
    meetingDate: "Tuesday",
    meetingTime: "7:00 PM",

    sections: [
      {
        id: "treasures",
        title: "Treasures From God's Word",
        description: "Bible Reading and Opening Discussion",
        scripture: "Acts 18:24-28",
        publication: "New World Translation",
        meetingReference: "mwb25 July p.3",
        status: "completed",
        actions: ["Workbook", "Notes", "Mark Complete"],
      },
      {
        id: "gems",
        title: "Digging for Spiritual Gems",
        description: "Prepare Spiritual Gems",
        scripture: "Acts 18:24-28",
        meetingReference: "mwb25 July p.3",
        status: "completed",
        actions: ["Workbook", "Notes", "Mark Complete"],
      },
      {
        id: "apply",
        title: "Apply Yourself to the Field Ministry",
        description: "Meeting Assignments",
        meetingReference: "mwb25 July pp.4–5",
        status: "in-progress",
        actions: ["Prepare", "Notes", "Mark Complete"],
      },
      {
        id: "living",
        title: "Living as Christians",
        description: "Living as Christians Program",
        meetingReference: "mwb25 July pp.6–7",
        status: "not-started",
        actions: ["Workbook", "Notes", "Mark Complete"],
      },
    ],
  },

  weekend: {
    meetingDate: "Sunday",
    meetingTime: "10:00 AM",

    sections: [
      {
        id: "public-talk",
        title: "Public Talk",
        description: "Public Bible Discourse",
        meetingReference: "Public Talk Schedule",
        status: "not-started",
        actions: ["Notes", "Mark Complete"],
      },
      {
        id: "watchtower",
        title: "Watchtower Study",
        description: "Study Edition",
        publication: "Watchtower Study Edition",
        meetingReference: "w25 July Study Article",
        status: "not-started",
        actions: ["Study", "Notes", "Mark Complete"],
      },
    ],
  },
};