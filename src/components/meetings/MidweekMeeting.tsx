import { useEffect, useState } from "react";
import {
  BookOpen,
  Gem,
  Mic,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";

import MeetingSectionCard from "./MeetingSectionCard";
import {
  meetingData,
  MeetingSection,
  MeetingStatus,
} from "../../data/mock/meetingData";

const STORAGE_KEY = "jwmc.midweek.status";

const iconMap: Record<string, LucideIcon> = {
  treasures: BookOpen,
  gems: Gem,
  apply: Mic,
  living: HeartHandshake,
};

export default function MidweekMeeting() {
  const [sections, setSections] = useState<MeetingSection[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return meetingData.midweek.sections;
    }

    try {
      const statuses = JSON.parse(saved) as Record<
        string,
        MeetingStatus
      >;

      return meetingData.midweek.sections.map((section) => ({
        ...section,
        status: statuses[section.id] ?? section.status,
      }));
    } catch {
      return meetingData.midweek.sections;
    }
  });

  useEffect(() => {
    const statuses = Object.fromEntries(
      sections.map((section) => [section.id, section.status])
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(statuses)
    );
  }, [sections]);

  const handleStatusChange = (
    sectionId: string,
    status: MeetingStatus
  ) => {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? { ...section, status }
          : section
      )
    );
  };

  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const Icon = iconMap[section.id];

        return (
          <MeetingSectionCard
            key={section.id}
            id={section.id}
            icon={Icon}
            title={section.title}
            description={section.description}
            scripture={section.scripture}
            publication={section.publication}
            meetingReference={section.meetingReference}
            status={section.status}
            actions={section.actions}
            onStatusChange={(status) =>
              handleStatusChange(section.id, status)
            }
          />
        );
      })}
    </div>
  );
}