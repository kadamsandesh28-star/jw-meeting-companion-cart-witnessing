import { useEffect, useState } from "react";

import type { Meeting } from "../models/Meeting";

import { meetingHistoryStorage } from "../storage/meetingHistoryStorage";

export function useMeetingHistory() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const refresh = () => {
    setMeetings(meetingHistoryStorage.getAll());
  };

  useEffect(() => {
    refresh();
  }, []);

  const createMeeting = (meeting: Meeting) => {
    meetingHistoryStorage.create(meeting);
    refresh();
  };

  const updateMeeting = (meeting: Meeting) => {
    meetingHistoryStorage.update(meeting);
    refresh();
  };

  const deleteMeeting = (id: string) => {
    meetingHistoryStorage.delete(id);
    refresh();
  };

  const getMeeting = (id: string) => {
    return meetingHistoryStorage.getById(id);
  };

  const clearMeetings = () => {
    meetingHistoryStorage.clear();
    refresh();
  };

  return {
    meetings,
    createMeeting,
    updateMeeting,
    deleteMeeting,
    getMeeting,
    clearMeetings,
    refresh,
  };
}