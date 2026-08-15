import { ExportDocument } from "./exportTypes";

export function exportToText(
  exportDoc: ExportDocument
): void {
  let text = `${exportDoc.title}\n`;

  if (exportDoc.subtitle) {
    text += `${exportDoc.subtitle}\n`;
  }

  text += `\nCreated: ${exportDoc.createdAt}\n`;
  text += `Updated: ${exportDoc.updatedAt}\n\n`;

  text += "--------------------------------\n\n";

  for (const section of exportDoc.sections) {
    text += `${section.title}\n`;
    text += "--------------------------------\n";
    text += `${section.content || "-"}\n\n`;
  }

  const blob = new Blob([text], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${exportDoc.title}.txt`;

  link.click();

  URL.revokeObjectURL(url);
}