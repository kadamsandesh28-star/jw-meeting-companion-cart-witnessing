import {
  AlignmentType, Document, HeadingLevel, Packer, Paragraph, Table, TableCell, TableRow, WidthType,
} from "docx";
import { saveAs } from "file-saver";
import { CartWitnessingSchedule } from "../models/CartWitnessingSchedule";
import { loadCongregationProfile } from "../../../settings/storage/congregationProfileStorage";

function safeFilePart(value: string) {
  return value.trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "Congregation";
}

function formatDate(value: string) {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function startMinutes(value: string) {
  const match = value.trim().match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);
  if (!match) return Number.MAX_SAFE_INTEGER;
  let hour = Number(match[1]);
  const minute = Number(match[2] ?? 0);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem === "AM" && hour === 12) hour = 0;
  if (meridiem === "PM" && hour !== 12) hour += 12;
  return hour * 60 + minute;
}

function captainLabel(schedule: CartWitnessingSchedule, date: string, captainId?: string, fallback = "") {
  if (!captainId) return fallback;
  const captain = (schedule.dayCaptains?.[date] ?? []).find((item) => item.id === captainId);
  if (!captain) return fallback;
  const range = captain.from || captain.to ? ` (${captain.from || "?"}–${captain.to || "?"})` : "";
  const contact = captain.contact ? ` · ${captain.contact}` : "";
  return `${captain.name || "Captain"}${range}${contact}`;
}

export async function exportCartWitnessingWord(schedule: CartWitnessingSchedule) {
  const profile = loadCongregationProfile();
  const congregationName = profile.congregationName || "Congregation";
  const headers = ["Day / Date", "Time", "Location", "Cart", "Participants", "Captain", "Notes"];
  const rows = [...schedule.entries].sort((a, b) => a.date.localeCompare(b.date) || startMinutes(a.time) - startMinutes(b.time) || a.time.localeCompare(b.time));
  const tableRows = [
    new TableRow({ children: headers.map((header) => new TableCell({ children: [new Paragraph({ text: header })] })) }),
    ...(rows.length ? rows : [{ date: "", time: "", location: "", cart: "", participants: "", captainId: "", captainContact: "", notes: "" }]).map((entry) =>
      new TableRow({ children: [
        new TableCell({ children: [new Paragraph(formatDate(entry.date))] }),
        new TableCell({ children: [new Paragraph(entry.time)] }),
        new TableCell({ children: [new Paragraph(entry.location)] }),
        new TableCell({ children: [new Paragraph(entry.cart)] }),
        new TableCell({ children: [new Paragraph(entry.participants)] }),
        new TableCell({ children: [new Paragraph(captainLabel(schedule, entry.date, entry.captainId, entry.captainContact))] }),
        new TableCell({ children: [new Paragraph(entry.notes)] }),
      ] })
    ),
  ];

  const captainParagraphs: Paragraph[] = [];
  Object.keys(schedule.dayCaptains ?? {}).sort().forEach((date) => {
    const captains = schedule.dayCaptains[date] ?? [];
    if (!captains.length) return;
    captainParagraphs.push(new Paragraph({ text: `${formatDate(date)} — Day Captains`, heading: HeadingLevel.HEADING_3 }));
    captains.forEach((captain, index) => {
      const range = captain.from || captain.to ? `${captain.from || "?"}–${captain.to || "?"}` : "time range not set";
      const contact = captain.contact ? ` · ${captain.contact}` : "";
      captainParagraphs.push(new Paragraph({ text: `Captain ${index + 1}: ${captain.name || "Not named"} (${range})${contact}` }));
    });
  });

  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ text: congregationName, heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: "Cart Witnessing — Weekly Schedule", heading: HeadingLevel.HEADING_2, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: `Week of Saturday: ${formatDate(schedule.weekOf)}`, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: "" }),
        new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: tableRows }),
        new Paragraph({ text: "" }),
        ...captainParagraphs,
        new Paragraph({ text: "Helpful Reminders", heading: HeadingLevel.HEADING_3 }),
        new Paragraph({ text: "• Please arrive a few minutes before your assigned time." }),
        new Paragraph({ text: "• If you need to make a change, please inform the captain." }),
        new Paragraph({ text: "• Please coordinate with the previous/next pair for a smooth handover." }),
        new Paragraph({ text: "• Keep the assigned location and time in mind." }),
        new Paragraph({ text: "• Keep the captain informed if you are delayed." }),
      ],
    }],
  });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${safeFilePart(congregationName)}-Cart-Witnessing-${schedule.weekOf}.docx`);
}


