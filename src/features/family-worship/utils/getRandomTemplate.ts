import { WorshipTemplate } from "../models/WorshipTemplate";

export function getRandomTemplate(
  templates: WorshipTemplate[]
): WorshipTemplate | null {
  if (templates.length === 0) {
    return null;
  }

  const index = Math.floor(
    Math.random() * templates.length
  );

  return templates[index];
}