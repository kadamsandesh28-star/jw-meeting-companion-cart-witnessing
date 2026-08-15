import { ExportDocument } from "./exportTypes";

export function exportToWord(
  exportDoc: ExportDocument
): void {
  let html = `
  <html>
  <head>
    <meta charset="utf-8" />
    <title>${exportDoc.title}</title>
  </head>
  <body>
  `;

  html += `<h1>${exportDoc.title}</h1>`;

  if (exportDoc.subtitle) {
    html += `<h3>${exportDoc.subtitle}</h3>`;
  }

  html += `<p><strong>Created:</strong> ${exportDoc.createdAt}</p>`;
  html += `<p><strong>Updated:</strong> ${exportDoc.updatedAt}</p>`;

  for (const section of exportDoc.sections) {
    html += `<h2>${section.title}</h2>`;
    html += `<p>${(section.content || "-").replace(
      /\n/g,
      "<br/>"
    )}</p>`;
  }

  html += `
  </body>
  </html>
  `;

  const blob = new Blob([html], {
    type: "application/msword",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${exportDoc.title}.doc`;

  link.click();

  URL.revokeObjectURL(url);
}