import { WorshipTemplate } from "../models/WorshipTemplate";

export function getWorshipOfTheWeek(
  templates: WorshipTemplate[]
): WorshipTemplate | null {
  if (templates.length === 0) {
    return null;
  }

  const now = new Date();

  const start =
    new Date(now.getFullYear(), 0, 1);

  const week = Math.floor(
    (now.getTime() -
      start.getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  );

  return templates[
    week % templates.length
  ];
}