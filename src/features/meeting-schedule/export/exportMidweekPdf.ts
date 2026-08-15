import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { MidweekMeetingSchedule } from "../models/MidweekMeetingSchedule";

export function exportMidweekPdf(
  schedule: MidweekMeetingSchedule
) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text(
    "JW Meeting Companion",
    14,
    20
  );

  doc.setFontSize(16);
  doc.text(
    "Midweek Meeting Schedule",
    14,
    30
  );

  doc.setFontSize(12);
  doc.text(schedule.month, 14, 38);

  let y = 48;

  schedule.weeks.forEach((week) => {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.text(
      `Week ${week.weekNumber}`,
      14,
      y
    );

    y += 6;

    autoTable(doc, {
      startY: y,

      theme: "grid",

      head: [["Field", "Assignment"]],

      body: [
        [
          "Meeting Date",
          week.meetingDate,
        ],
        [
          "Bible Reading",
          week.bibleReading,
        ],
        [
          "Chairman",
          week.chairman,
        ],
        [
          "Opening Song",
          week.openingSong,
        ],
        [
          "Opening Prayer",
          week.openingPrayer,
        ],
        [
          "Treasures Theme",
          week.treasuresTalkTitle,
        ],
        [
          "Treasures Brother",
          week.treasuresTalkBrother,
        ],
        [
          "Middle Song",
          week.middleSong,
        ],
        [
          "Closing Song",
          week.closingSong,
        ],
        [
          "Closing Prayer",
          week.closingPrayer,
        ],
      ],
    });

    y =
      (doc as any).lastAutoTable
        .finalY + 12;
  });

  doc.save(
    `${schedule.month}-Midweek-Meeting.pdf`
  );
}