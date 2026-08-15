export type CongregationRole =
  | "Publisher"
  | "Auxiliary Pioneer"
  | "Regular Pioneer"
  | "Ministerial Servant"
  | "Elder";

const STORAGE_KEY = "jwMeetingCompanion.resources";

export function getCongregationRole(): CongregationRole {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return "Publisher";
    }

    const settings = JSON.parse(data);

    return settings.role ?? "Publisher";
  } catch {
    return "Publisher";
  }
}

export function canUseChairmanAssistant(): boolean {
  const role = getCongregationRole();

  return (
    role === "Ministerial Servant" ||
    role === "Elder"
  );
}