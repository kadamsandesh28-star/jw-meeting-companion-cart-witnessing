export type UserRole =
  | "publisher"
  | "ministerial-servant"
  | "elder";

const STORAGE_KEY = "jw-user-role";

export function getUserRole(): UserRole {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (
    saved === "publisher" ||
    saved === "ministerial-servant" ||
    saved === "elder"
  ) {
    return saved;
  }

  return "publisher";
}

export function setUserRole(
  role: UserRole
) {
  localStorage.setItem(
    STORAGE_KEY,
    role
  );
}

export function isResponsibleBrother() {
  const role = getUserRole();

  return (
    role === "ministerial-servant" ||
    role === "elder"
  );
}