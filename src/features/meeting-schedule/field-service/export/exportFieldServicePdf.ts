import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  FieldServiceArrangement,
  FieldServiceSchedule,
} from "../models/FieldServiceSchedule";

export function exportFieldServicePdf(
  schedule: FieldServiceSchedule
) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("JW Meeting Companion", 14, 20);

  doc.setFontSize(16);
  doc.text("Field Service Schedule", 14, 30);

  doc.setFontSize(12);
  doc.text(schedule.month, 14, 38);

  let y = 50;

  schedule.weeks.forEach((week) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(15);
    doc.text(week.weekLabel, 14, y);

    y += 8;

    week.days.forEach((day) => {
      if (y > 245) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(13);
      doc.text(day.day, 18, y);

      y += 4;

      const body: string[][] = [];

      day.arrangements.forEach(
        (arrangement: FieldServiceArrangement) => {
          body.push([
            arrangement.time,
            arrangement.arrangement,
            arrangement.location,
            arrangement.conductor,
            arrangement.notes,
          ]);
        }
      );

      if (body.length === 0) {
        body.push([
          "",
          "",
          "",
          "",
          "",
        ]);
      }

      autoTable(doc, {
        startY: y,

        theme: "grid",

        head: [[
          "Time",
          "Arrangement",
          "Location",
          "Conductor",
          "Notes",
        ]],

        body,
      });

      y =
        (doc as any).lastAutoTable.finalY + 8;
    });

    y += 6;
  });

  doc.save(
    `${schedule.month}-Field-Service.pdf`
  );
}