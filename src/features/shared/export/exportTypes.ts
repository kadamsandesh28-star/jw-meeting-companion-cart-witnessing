export interface ExportSection {
  title: string;

  content: string;
}

export interface ExportDocument {
  title: string;

  subtitle?: string;

  createdAt: string;

  updatedAt: string;

  sections: ExportSection[];
}