export type SearchType =
  | "publisher"
  | "group"
  | "department"
  | "shepherding";

export interface SearchResult {
  id: string;

  title: string;

  subtitle: string;

  type: SearchType;

  route?: string;
}