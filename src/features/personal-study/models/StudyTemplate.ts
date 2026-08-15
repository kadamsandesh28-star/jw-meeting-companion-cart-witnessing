import { StudyType } from "./Study";

export interface StudyTemplate {
  id: string;

  name: string;

  description: string;

  icon: string;

  color: string;

  type: StudyType;
}

export const STUDY_TEMPLATES: StudyTemplate[] = [
  {
    id: "bible-study",
    name: "Bible Study",
    description: "Personal Bible reading and research.",
    icon: "📖",
    color: "#2563EB",
    type: "Bible Study",
  },
  {
    id: "watchtower",
    name: "Watchtower",
    description: "Prepare Watchtower study comments.",
    icon: "📚",
    color: "#16A34A",
    type: "Watchtower",
  },
  {
    id: "workbook",
    name: "Workbook",
    description: "Midweek Meeting workbook preparation.",
    icon: "📘",
    color: "#F59E0B",
    type: "Workbook",
  },
  {
    id: "family-worship",
    name: "Family Worship",
    description: "Plan Family Worship evenings.",
    icon: "👨‍👩‍👧",
    color: "#8B5CF6",
    type: "Family Worship",
  },
  {
    id: "public-talk",
    name: "Public Talk",
    description: "Public talk preparation and outlines.",
    icon: "🎤",
    color: "#DC2626",
    type: "Public Talk",
  },
  {
    id: "return-visit",
    name: "Return Visit",
    description: "Research for return visits and Bible studies.",
    icon: "🏡",
    color: "#0891B2",
    type: "Return Visit",
  },
  {
    id: "blank",
    name: "Blank Notebook",
    description: "Start with an empty notebook.",
    icon: "📝",
    color: "#64748B",
    type: "Blank",
  },
];