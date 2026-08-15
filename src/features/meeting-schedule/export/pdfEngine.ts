import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface PdfRow {
  label: string;
  value: string;
}

export interface PdfSection {
  title: string;
  rows: PdfRow[];
}

interface ExportOptions {
  title: string;
  month: string;
  filename: string;
  sections: PdfSection[];
}

export function exportSchedulePdf({
  title,
  month,
  filename,
  sections,
}: ExportOptions) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("JW Meeting Companion", 14, 20);

  doc.setFontSize(16);
  doc.text(title, 14, 30);

  doc.setFontSize(12);
  doc.text(month, 14, 38);

  let y = 48;

  sections.forEach((section) => {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.text(section.title, 14, y);

    y += 6;

    autoTable(doc, {
      startY: y,

      theme: "grid",

      head: [["Field", "Assignment"]],

      body: section.rows.map((row) => [
        row.label,
        row.value,
      ]),
    });

    y = (doc as any).lastAutoTable.finalY + 12;
  });

  doc.save(filename);
}