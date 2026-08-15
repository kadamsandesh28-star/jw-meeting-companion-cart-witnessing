import { ExportDocument } from "./exportTypes";

export function exportToMarkdown(
  exportDoc: ExportDocument
): void {
  let markdown = `# ${exportDoc.title}

`;

  if (exportDoc.subtitle) {
    markdown += `**${exportDoc.subtitle}**

`;
  }

  markdown += `**Created:** ${exportDoc.createdAt}

`;
  markdown += `**Updated:** ${exportDoc.updatedAt}

`;

  markdown += `---

`;

  for (const section of exportDoc.sections) {
    markdown += `## ${section.title}

`;

    markdown += `${section.content || "-"}

`;

    markdown += `---

`;
  }

  const blob = new Blob([markdown], {
    type: "text/markdown;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${exportDoc.title}.md`;

  link.click();

  URL.revokeObjectURL(url);
}