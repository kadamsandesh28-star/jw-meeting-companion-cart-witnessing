import { NotebookType } from "./Notebook";

export interface NotebookTemplate {
  id: string;

  type: NotebookType;

  title: string;

  description: string;

  icon: string;

  color: string;
}

export const NOTEBOOK_TEMPLATES: NotebookTemplate[] = [
  {
    id: "personal",
    type: "Personal Notes",
    title: "Personal Notes",
    description: "Capture thoughts, ideas and plans.",
    icon: "📒",
    color: "#2563EB",
  },
  {
    id: "journal",
    type: "Spiritual Journal",
    title: "Spiritual Journal",
    description: "Reflect on scriptures and prayer.",
    icon: "🙏",
    color: "#16A34A",
  },
  {
    id: "reading",
    type: "Bible Reading Notes",
    title: "Bible Reading Notes",
    description: "Record spiritual gems while reading.",
    icon: "📖",
    color: "#F59E0B",
  },
  {
    id: "study",
    type: "Bible Study Notes",
    title: "Bible Study Notes",
    description: "Research and organize Bible study notes.",
    icon: "📚",
    color: "#8B5CF6",
  },
  {
    id: "comments",
    type: "Meeting Comments",
    title: "Meeting Comments",
    description: "Prepare comments for congregation meetings.",
    icon: "💬",
    color: "#0891B2",
  },
  {
    id: "talk",
    type: "Talk Outline",
    title: "Talk Outline",
    description: "Prepare organized talk outlines.",
    icon: "🎤",
    color: "#DC2626",
  },
  {
    id: "family",
    type: "Family Worship",
    title: "Family Worship",
    description: "Plan meaningful family worship evenings.",
    icon: "👨‍👩‍👧",
    color: "#9333EA",
  },
  {
    id: "assembly",
    type: "Assembly Notebook",
    title: "Assembly Notebook",
    description: "Keep all assembly notes together.",
    icon: "🎪",
    color: "#EA580C",
  },
  {
    id: "convention",
    type: "Convention Notebook",
    title: "Convention Notebook",
    description: "Organize convention notes by day.",
    icon: "🌍",
    color: "#0F766E",
  },
  {
    id: "blank",
    type: "Blank Notebook",
    title: "Blank Notebook",
    description: "Start with a clean notebook.",
    icon: "📝",
    color: "#64748B",
  },
];