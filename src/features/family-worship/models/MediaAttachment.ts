export type MediaType =
  | "video"
  | "image"
  | "document"
  | "link";

export interface MediaAttachment {
  id: string;

  type: MediaType;

  title: string;

  url: string;

  notes?: string;
}