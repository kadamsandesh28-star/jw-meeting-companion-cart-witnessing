import { NotebookType } from "../models/Notebook";

export function getNotebookSections(
  type: NotebookType
): string[] {
  switch (type) {
    case "Personal Notes":
      return [
        "Notes",
      ];

    case "Spiritual Journal":
      return [
        "Today's Scripture",
        "Reflection",
        "Prayer",
        "Application",
      ];

    case "Bible Reading Notes":
      return [
        "Bible Book",
        "Chapters",
        "Spiritual Gems",
        "Questions",
        "Application",
      ];

    case "Bible Study Notes":
      return [
        "Study Topic",
        "Research",
        "Scriptures",
        "Application",
      ];

    case "Meeting Comments":
      return [
        "Meeting",
        "Article",
        "Comments",
        "Scriptures",
      ];

    case "Talk Outline":
      return [
        "Introduction",
        "Main Point 1",
        "Supporting Scriptures",
        "Illustrations",
        "Application",
        "Main Point 2",
        "Main Point 3",
        "Conclusion",
        "Practice Notes",
      ];

    case "Family Worship":
      return [
        "Theme",
        "Objectives",
        "Activities",
        "Discussion",
        "Prayer",
      ];

    case "Assembly Notebook":
      return [
        "Assembly Theme",
        "Morning Session",
        "Afternoon Session",
        "Favorite Talks",
        "Spiritual Gems",
        "Research Later",
      ];

    case "Convention Notebook":
      return [
        "Convention Theme",
        "Friday",
        "Saturday",
        "Sunday",
        "Favorite Talks",
        "Application",
        "Goals",
      ];

    default:
      return [
        "Notes",
      ];
  }
}