import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import type { Meeting } from "../models/Meeting";

import { createMeetingPdfDocument } from "./meetingPdfDocument";

// Register built-in fonts
(pdfMake as any).vfs = pdfFonts.vfs;

export const meetingPdfService = {
  export(meeting: Meeting) {
    const document =
      createMeetingPdfDocument(meeting);

    const filename =
      `BodyOfEldersMeeting-${
        meeting.info.meetingDate || "Meeting"
      }.pdf`;

    pdfMake
      .createPdf(document)
      .download(filename);
  },

  open(meeting: Meeting) {
    const document =
      createMeetingPdfDocument(meeting);

    pdfMake
      .createPdf(document)
      .open();
  },

  print(meeting: Meeting) {
    const document =
      createMeetingPdfDocument(meeting);

    pdfMake
      .createPdf(document)
      .print();
  },
};