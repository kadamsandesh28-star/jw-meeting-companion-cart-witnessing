import { PlannerAssignment } from "./plannerService";

const WORKBOOK_CHECKLIST_KEY =
  "jwMeetingCompanion.workbookChecklist";

const WORKBOOK_NOTES_KEY =
  "jwMeetingCompanion.workbookNotes";

const MEETING_NOTES_KEY =
  "jwMeetingCompanion.meetingNotes";

export interface MeetingProgress {
  workbook: {
    completed: number;
    total: number;
    hasNotes: boolean;
  };

  assignments: {
    ready: number;
    inProgress: number;
    notStarted: number;
    total: number;
  };

  meetingNotes: {
    hasNotes: boolean;
  };

  overallProgress: number;

  todaysFocus: string;
}

function getChecklist(): boolean[] {
  try {
    const raw = localStorage.getItem(
      WORKBOOK_CHECKLIST_KEY
    );

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return parsed;
    }

    // Legacy/corrupted storage
    return [];
  } catch {
    return [];
  }
}

export function getMeetingProgress(
  planner: PlannerAssignment[]
): MeetingProgress {
  const checklist = getChecklist();

  const workbookNotes =
    localStorage.getItem(WORKBOOK_NOTES_KEY) ?? "";

  const meetingNotes =
    localStorage.getItem(MEETING_NOTES_KEY) ?? "";

  const completedChecklist =
    checklist.filter(Boolean).length;

  const totalChecklist = checklist.length;

  const ready = planner.filter(
    (item) => item.status === "Ready"
  ).length;

  const inProgress = planner.filter(
    (item) => item.status === "In Progress"
  ).length;

  const notStarted = planner.filter(
    (item) => item.status === "Not Started"
  ).length;

  let score = 0;

  if (totalChecklist > 0) {
    score +=
      (completedChecklist / totalChecklist) * 40;
  }

  if (workbookNotes.trim()) {
    score += 20;
  }

  if (planner.length > 0) {
    score += (ready / planner.length) * 30;
  }

  if (meetingNotes.trim()) {
    score += 10;
  }

  let todaysFocus =
    "You're ready for this week's meetings.";

  if (!meetingNotes.trim()) {
    todaysFocus = "Add your meeting notes.";
  } else if (notStarted > 0) {
    todaysFocus =
      "Start preparing your assignments.";
  } else if (inProgress > 0) {
    todaysFocus =
      "Finish preparing your assignments.";
  } else if (
    totalChecklist > 0 &&
    completedChecklist < totalChecklist
  ) {
    todaysFocus =
      "Complete your workbook checklist.";
  }

  return {
    workbook: {
      completed: completedChecklist,
      total: totalChecklist,
      hasNotes: workbookNotes.trim().length > 0,
    },

    assignments: {
      ready,
      inProgress,
      notStarted,
      total: planner.length,
    },

    meetingNotes: {
      hasNotes: meetingNotes.trim().length > 0,
    },

    overallProgress: Math.round(score),

    todaysFocus,
  };
}