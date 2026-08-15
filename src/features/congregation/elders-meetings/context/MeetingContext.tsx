import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAgenda } from "../hooks/useAgenda";

import type {
  Meeting,
  AttendanceMember,
} from "../models/Meeting";

interface MeetingContextValue {
  meeting: Meeting;

  setMeeting: React.Dispatch<
    React.SetStateAction<Meeting>
  >;

  agenda: ReturnType<
    typeof useAgenda
  >;
}

const MeetingContext =
  createContext<MeetingContextValue | null>(
    null
  );

interface Props {
  children: ReactNode;
}

export function MeetingProvider({
  children,
}: Props) {
  const agenda = useAgenda();

  const [meeting, setMeeting] =
    useState<Meeting>({
      id: crypto.randomUUID(),

      title: "Body of Elders Meeting",

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),

      archived: false,

      info: {
        congregation: "",
        meetingType: "Body of Elders",
        meetingDate: "",
        meetingTime: "",
        chairman: "",
        openingPrayer: "",
        closingPrayer: "",
        nextChairman: "",
      },

      attendance:
        [] as AttendanceMember[],

      agenda: [],

      minutes: "",
    });

  const value = useMemo(
    () => ({
      meeting,
      setMeeting,
      agenda,
    }),
    [meeting, agenda]
  );

  return (
    <MeetingContext.Provider
      value={value}
    >
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeeting() {
  const context =
    useContext(MeetingContext);

  if (!context) {
    throw new Error(
      "useMeeting must be used inside MeetingProvider"
    );
  }

  return context;
}