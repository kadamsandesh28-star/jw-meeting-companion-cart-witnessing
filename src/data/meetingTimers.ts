export interface MeetingTimer {
  id: string;
  title: string;
  minutes: number;
}

export const midweekTimers: MeetingTimer[] = [
  {
    id: "chairman-opening-comments",
    title: "Chairman Opening Comments",
    minutes: 1,
  },
  {
    id: "treasures-talk",
    title: "Treasures From God's Word",
    minutes: 10,
  },
  {
    id: "spiritual-gems",
    title: "Digging for Spiritual Gems",
    minutes: 10,
  },
  {
    id: "bible-reading",
    title: "Bible Reading",
    minutes: 4,
  },
  {
    id: "initial-call",
    title: "Initial Call",
    minutes: 2,
  },
  {
    id: "return-visit",
    title: "Return Visit",
    minutes: 4,
  },
  {
    id: "bible-study",
    title: "Bible Study",
    minutes: 5,
  },
  {
    id: "living-as-christians",
    title: "Living as Christians",
    minutes: 15,
  },
  {
    id: "congregation-bible-study",
    title: "Congregation Bible Study",
    minutes: 30,
  },
  {
    id: "concluding-comments",
    title: "Concluding Comments",
    minutes: 3,
  },
];

export const weekendTimers: MeetingTimer[] = [
  {
    id: "public-talk",
    title: "Public Talk",
    minutes: 30,
  },
  {
    id: "watchtower-study",
    title: "Watchtower Study",
    minutes: 60,
  },
];