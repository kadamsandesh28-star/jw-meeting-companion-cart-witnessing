import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CartWitnessingSchedule } from "../models/CartWitnessingSchedule";
import { loadCongregationProfile } from "../../../settings/storage/congregationProfileStorage";

const NAVY = "102A43";
const GREEN = "138A4A";
const PALE_GREEN = "EEF8F2";
const LIGHT = "F7F9FB";
const BORDER = "D9E2EC";
const TEXT = "243B53";
const MUTED = "627D98";

function safeFilePart(value: string) {
  return value.trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "Congregation";
}

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

/** Sort by the actual starting clock time instead of lexicographic text order. */
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
  return `${captain.name || "Captain"}${range}`;
}

function sortedEntries(schedule: CartWitnessingSchedule) {
  return [...schedule.entries].sort((a, b) =>
    a.date.localeCompare(b.date) || startMinutes(a.time) - startMinutes(b.time) || a.time.localeCompare(b.time)
  );
}

function buildRows(schedule: CartWitnessingSchedule) {
  return sortedEntries(schedule).map((entry) => [
    formatDate(entry.date),
    entry.time,
    entry.location,
    entry.cart,
    entry.participants,
    captainLabel(schedule, entry.date, entry.captainId, entry.captainContact),
    entry.notes || "—",
  ]);
}

function drawCartIcon(doc: jsPDF, x: number, y: number) {
  // Small original cart illustration so it never competes with the report title.
  doc.setFillColor(`#${PALE_GREEN}`);
  doc.setDrawColor(`#${GREEN}`);
  doc.setLineWidth(0.6);
  doc.circle(x + 15, y + 15, 14, "FD");

  doc.setDrawColor(`#${NAVY}`);
  doc.setLineWidth(1.1);
  // canopy / header
  doc.line(x + 8, y + 9, x + 22, y + 9);
  doc.line(x + 9, y + 9, x + 9, y + 12);
  doc.line(x + 21, y + 9, x + 21, y + 12);
  // shelves
  doc.line(x + 10, y + 13, x + 20, y + 13);
  doc.line(x + 10, y + 17, x + 20, y + 17);
  doc.line(x + 10, y + 21, x + 20, y + 21);
  // uprights and base
  doc.line(x + 10, y + 12, x + 10, y + 23);
  doc.line(x + 20, y + 12, x + 20, y + 23);
  doc.line(x + 8, y + 23, x + 22, y + 23);
  // wheels
  doc.setFillColor(`#${NAVY}`);
  doc.circle(x + 11.5, y + 26, 1.7, "F");
  doc.circle(x + 18.5, y + 26, 1.7, "F");
}

function addCaptainSummary(doc: jsPDF, schedule: CartWitnessingSchedule, startY: number) {
  const dates = Object.keys(schedule.dayCaptains ?? {}).sort();
  let y = startY;
  const pageHeight = doc.internal.pageSize.getHeight();

  for (const date of dates) {
    const captains = schedule.dayCaptains[date] ?? [];
    if (!captains.length) continue;
    if (y > pageHeight - 58) {
      doc.addPage();
      y = 18;
    }

    doc.setFillColor(`#${PALE_GREEN}`);
    doc.setDrawColor(`#${BORDER}`);
    doc.roundedRect(14, y, 269, 42, 4, 4, "FD");
    doc.setTextColor(`#${NAVY}`);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`${formatDate(date)} — Day Captains`, 24, y + 11);

    const usable = 245;
    const columnWidth = usable / Math.max(captains.length, 1);
    captains.forEach((captain, index) => {
      const x = 24 + index * columnWidth;
      doc.setFillColor(`#${GREEN}`);
      doc.circle(x + 5, y + 25, 5, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text(String(index + 1), x + 2.7, y + 27.5);

      const range = captain.from || captain.to ? `${captain.from || "?"}–${captain.to || "?"}` : "Time not set";
      doc.setTextColor(`#${GREEN}`);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(`Captain ${index + 1}`, x + 13, y + 22);
      doc.setTextColor(`#${TEXT}`);
      doc.setFontSize(9);
      doc.text(`${captain.name || "Not named"} (${range})`, x + 13, y + 29);
      if (captain.contact) {
        doc.setTextColor(`#${MUTED}`);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text(captain.contact, x + 13, y + 35);
      }
    });
    y += 48;
  }
}

function renderPdf(schedule: CartWitnessingSchedule) {
  const profile = loadCongregationProfile();
  const congregationName = profile.congregationName || "Congregation";
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const width = doc.internal.pageSize.getWidth();

  drawCartIcon(doc, 14, 10);

  doc.setTextColor(`#${NAVY}`);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(congregationName, 46, 22);
  doc.setTextColor(`#${GREEN}`);
  doc.setFontSize(15);
  doc.text("Cart Witnessing — Weekly Schedule", 46, 31);
  doc.setTextColor(`#${TEXT}`);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.text(`Week of Saturday: ${formatDate(schedule.weekOf)}`, 46, 39);

  doc.setFillColor(`#${LIGHT}`);
  doc.setDrawColor(`#${BORDER}`);
  doc.roundedRect(width - 62, 10, 48, 27, 4, 4, "FD");
  doc.setTextColor(`#${GREEN}`);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text("WEEK START", width - 54, 17);
  doc.setTextColor(`#${NAVY}`);
  doc.setFontSize(10);
  doc.text("Saturday", width - 54, 24);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(formatDate(schedule.weekOf), width - 54, 30);

  const rows = buildRows(schedule);
  autoTable(doc, {
    startY: 46,
    margin: { left: 10, right: 10 },
    theme: "grid",
    head: [["Day / Date", "Time", "Location", "Cart", "Participants", "Captain", "Notes"]],
    body: rows.length ? rows : [["", "", "", "", "", "", ""]],
    styles: {
      font: "helvetica",
      fontSize: 8.7,
      textColor: `#${TEXT}`,
      cellPadding: 2.7,
      lineColor: `#${BORDER}`,
      lineWidth: 0.25,
      valign: "middle",
    },
    headStyles: {
      fillColor: `#${NAVY}`,
      textColor: "#FFFFFF",
      fontStyle: "bold",
      fontSize: 8.8,
      cellPadding: 3.1,
    },
    alternateRowStyles: { fillColor: `#${LIGHT}` },
    columnStyles: {
      0: { cellWidth: 27 },
      1: { cellWidth: 29 },
      2: { cellWidth: 36 },
      3: { cellWidth: 19 },
      4: { cellWidth: 43 },
      5: { cellWidth: 47 },
      6: { cellWidth: 60 },
    },
    didDrawPage: (data) => {
      doc.setDrawColor(`#${GREEN}`);
      doc.setLineWidth(0.6);
      doc.line(10, 8, 10, 42);
      doc.setDrawColor(`#${BORDER}`);
      doc.setLineWidth(0.3);
      doc.line(10, doc.internal.pageSize.getHeight() - 10, width - 10, doc.internal.pageSize.getHeight() - 10);
    },
  });

  const finalY = (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 46;
  addCaptainSummary(doc, schedule, finalY + 8);

  const h = doc.internal.pageSize.getHeight();
  const reminders = [
    "Please arrive a few minutes before your assigned time.",
    "If you need to make a change, please inform the captain.",
    "Please coordinate with the previous/next pair for a smooth handover.",
    "Keep the assigned location and time in mind.",
    "Keep the captain informed if you are delayed.",
  ];
  const reminderY = Math.min(h - 30, Math.max(finalY + 56, h - 42));
  doc.setFillColor(`#${LIGHT}`);
  doc.setDrawColor(`#${BORDER}`);
  doc.roundedRect(14, reminderY, width - 28, 22, 3, 3, "FD");
  doc.setTextColor(`#${NAVY}`);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("Helpful Reminders", 20, reminderY + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.1);
  reminders.forEach((text, index) => {
    const x = 20 + (index % 2) * ((width - 40) / 2);
    const y = reminderY + 12 + Math.floor(index / 2) * 4.2;
    doc.text(`• ${text}`, x, y);
  });

  doc.setTextColor(`#${MUTED}`);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.2);
  doc.text("Please be on time and follow the local guidelines for cart witnessing.", 14, h - 5);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${new Date().toLocaleDateString()}  •  JW Meeting Companion`, width - 88, h - 5);
  return { doc, congregationName };
}

export function exportCartWitnessingPdf(schedule: CartWitnessingSchedule) {
  const { doc, congregationName } = renderPdf(schedule);
  doc.save(`${safeFilePart(congregationName)}-Cart-Witnessing-${schedule.weekOf}.pdf`);
}

export async function createCartWitnessingPdfBlob(schedule: CartWitnessingSchedule) {
  const { doc } = renderPdf(schedule);
  return doc.output("blob");
}
