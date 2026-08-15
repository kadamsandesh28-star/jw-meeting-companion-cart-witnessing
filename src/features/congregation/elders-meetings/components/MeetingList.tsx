import { useEffect, useState } from "react";

import MeetingListItem from "./MeetingListItem";
import EmptyMeetings from "./EmptyMeetings";

import { meetingHistoryStorage } from "../storage/meetingHistoryStorage";
import type { Meeting } from "../models/Meeting";

export default function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const savedMeetings =
      meetingHistoryStorage.getAll();

    setMeetings(savedMeetings);
  }, []);

  return (
    <>
      {meetings.length === 0 ? (
        <EmptyMeetings />
      ) : (
        meetings.map((meeting) => (
          <MeetingListItem
  key={meeting.id}
  id={meeting.id}
  title={meeting.title}
  date={meeting.info.meetingDate}
  status={
    meeting.archived
      ? "Archived"
      : "Upcoming"
  }
/>
        ))
      )}
    </>
  );
}