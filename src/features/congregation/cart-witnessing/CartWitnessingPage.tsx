import { useEffect, useMemo, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import {
  Box, Button, Card, CardContent, Chip, Divider, Grid, MenuItem, Paper, Select,
  Stack, TextField, ToggleButton, ToggleButtonGroup, Typography,
} from "@mui/material";
import {
  CartWitnessingCaptain, CartWitnessingEntry, CartWitnessingSchedule,
} from "./models/CartWitnessingSchedule";
import {
  createEmptyCartWitnessingSchedule, createEntry,
} from "./services/createEmptyCartWitnessingSchedule";
import { loadCartWitnessingSchedules, saveCartWitnessingSchedule } from "./storage/cartWitnessingStorage";
import { exportCartWitnessingPdf, createCartWitnessingPdfBlob } from "./export/exportCartWitnessingPdf";
import { exportCartWitnessingWord } from "./export/exportCartWitnessingWord";
import { loadCongregationProfile } from "../../settings/storage/congregationProfileStorage";

function shiftIsoDate(value: string, days: number) {
  const d = new Date(`${value}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function mondayOf(value: string) {
  const d = new Date(`${value}T00:00:00`);
  const day = d.getDay();
  d.setDate(d.getDate() - ((day + 6) % 7));
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function saturdayOf(value: string) {
  const d = new Date(`${value}T00:00:00`);
  const day = d.getDay();
  d.setDate(d.getDate() + (6 - day));
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

/** Keep saved schedule rows aligned with the selected week. If an older saved
 * test schedule is exactly one or more whole weeks behind the selected
 * Saturday, migrate its dates forward rather than exporting a mixed week. */
function normalizeScheduleWeek(schedule: CartWitnessingSchedule) {
  const targetWeek = schedule.weekOf;
  if (!schedule.entries.length) return schedule;
  const weekDates = new Set(getWeekDates(targetWeek));
  if (schedule.entries.some((entry) => weekDates.has(entry.date))) return schedule;

  const sourceWeeks = [...new Set(schedule.entries.map((entry) => saturdayOf(entry.date)))];
  if (sourceWeeks.length !== 1) return schedule;
  const source = sourceWeeks[0];
  const deltaDays = Math.round((new Date(`${targetWeek}T00:00:00`).getTime() - new Date(`${source}T00:00:00`).getTime()) / 86400000);
  if (deltaDays % 7 !== 0 || deltaDays === 0) return schedule;

  const entries = schedule.entries.map((entry) => ({ ...entry, date: shiftIsoDate(entry.date, deltaDays) }));
  const dayCaptains = Object.fromEntries(Object.entries(schedule.dayCaptains ?? {}).map(([date, captains]) => [shiftIsoDate(date, deltaDays), captains]));
  return { ...schedule, entries, dayCaptains, updatedAt: Date.now() };
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function formatDate(value: string) {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}

function getWeekDates(monday: string) {
  const date = new Date(`${monday}T00:00:00`);
  return days.map((_, index) => {
    const d = new Date(date);
    d.setDate(date.getDate() + index);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  });
}

function parseClock(value: string) {
  const match = value.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();
  if (meridiem === "PM" && hour < 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

function getEndMinutes(value: string) {
  const matches = value.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/gi) ?? [];
  const last = matches[matches.length - 1];
  return parseClock(last ?? value) ?? 9 * 60;
}

function formatClock(totalMinutes: number) {
  const hour24 = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}


function pdfEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function toLatin1Bytes(value: string) {
  const bytes = new Uint8Array(value.length);
  for (let i = 0; i < value.length; i += 1) bytes[i] = value.charCodeAt(i) & 0xff;
  return bytes;
}

function concatBytes(parts: Uint8Array[]) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function pdfText(value: string) {
  return pdfEscape((value || "-").replace(/[^\x20-\x7E]/g, " "));
}

async function createArrangementNotificationPdf(data: {
  date: string;
  time: string;
  arrangement: string;
  location: string;
  assignedBrother: string;
  contact: string;
  note: string;
}) {
  // Fully vector PDF: no poster image, no Bible/logo artwork, and no
  // hard-coded sample values. Every visible value is generated from the form.
  const pageWidth = 595;
  const pageHeight = 842;
  const congregationName = loadCongregationProfile().congregationName || "Vadodara East Congregation";

  const wrapText = (value: string, maxChars: number) => {
    const clean = value?.trim() || "-";
    if (clean.length <= maxChars) return [clean];
    const words = clean.split(/\s+/);
    const result: string[] = [];
    let line = "";
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (next.length > maxChars && line) {
        result.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) result.push(line);
    return result.slice(0, 2);
  };

  const arrangementLines = wrapText(data.arrangement, 30);
  const locationLines = wrapText(data.location, 30);
  const brotherLines = wrapText(data.assignedBrother, 27);
  const noteLine = data.note?.trim() ? `Additional note: ${data.note.trim()}` : "";

  const navy = "0.03 0.12 0.35";
  const gold = "0.82 0.58 0.14";
  const lightBlue = "0.94 0.97 1";
  const darkText = "0.08 0.12 0.18";
  const muted = "0.55 0.60 0.67";
  const white = "1 1 1";

  const esc = (value: string) => pdfText(value);

  const textAt = (x: number, y: number, size: number, value: string, font = "F1") =>
    `${navy} rg /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${esc(value)}) Tj`;

  const line = (x1: number, y1: number, x2: number, y2: number, width = 0.7, color = muted) =>
    `${color} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S`;

  const circle = (cx: number, cy: number, radius: number, color = navy) =>
    `${color} rg ${cx} ${cy} ${radius} 0 360 arc f`;

  const roundedRect = (x: number, y: number, w: number, h: number, color: string) =>
    `${color} rg ${x} ${y} ${w} ${h} re f`;

  const lines: string[] = [
    "q",
    // Background.
    `${white} rg 0 0 ${pageWidth} ${pageHeight} re f`,

    // Top navy header and gold accents.
    `${navy} rg 0 760 ${pageWidth} 82 re f`,
    `${gold} rg 0 760 ${pageWidth} 3 re f`,
    `${gold} rg 0 839 ${pageWidth} 3 re f`,
    `${white} rg /F2 18 Tf 1 0 0 1 50 792 Tm (${esc(congregationName)}) Tj`,

    // Main title.
    textAt(50, 724, 25, "ARRANGEMENT NOTIFICATION", "F2"),
    `${gold} RG 1.2 w 155 707 m 440 707 l S`,
    `${navy} rg 172 674 251 34 re f`,
    `${gold} rg 164 674 8 34 re f`,
    `${gold} rg 423 674 8 34 re f`,
    `${white} rg /F2 14 Tf 1 0 0 1 226 686 Tm (CART WITNESSING) Tj`,

    // Detail rows.
    roundedRect(42, 598, 511, 54, white),
    roundedRect(42, 536, 511, 54, white),
    roundedRect(42, 474, 511, 54, white),
    roundedRect(42, 412, 511, 54, white),
    roundedRect(42, 350, 511, 54, white),
    roundedRect(42, 288, 511, 54, white),

    // Row dividers.
    line(42, 598, 553, 598),
    line(42, 536, 553, 536),
    line(42, 474, 553, 474),
    line(42, 412, 553, 412),
    line(42, 350, 553, 350),
    line(42, 288, 553, 288),

    // Simple letter icons: deliberately plain, with no Bible/logo.
    circle(70, 625, 17),
    circle(70, 563, 17),
    circle(70, 501, 17),
    circle(70, 439, 17),
    circle(70, 377, 17),
    circle(70, 315, 17),
    `${white} rg /F2 10 Tf 1 0 0 1 66 621 Tm (D) Tj`,
    `${white} rg /F2 10 Tf 1 0 0 1 66 559 Tm (T) Tj`,
    `${white} rg /F2 10 Tf 1 0 0 1 66 497 Tm (A) Tj`,
    `${white} rg /F2 10 Tf 1 0 0 1 66 435 Tm (L) Tj`,
    `${white} rg /F2 10 Tf 1 0 0 1 66 373 Tm (B) Tj`,
    `${white} rg /F2 10 Tf 1 0 0 1 66 311 Tm (C) Tj`,

    // Labels.
    textAt(105, 621, 10, "DATE", "F2"),
    textAt(105, 559, 10, "TIME SLOT", "F2"),
    textAt(105, 497, 10, "ARRANGEMENT", "F2"),
    textAt(105, 435, 10, "LOCATION", "F2"),
    textAt(105, 373, 10, "ASSIGNED BROTHER", "F2"),
    textAt(105, 311, 10, "CONTACT NUMBER", "F2"),

    // Values.
    textAt(205, 621, 10, data.date || "-", "F1"),
    textAt(205, 559, 10, data.time || "-", "F1"),
    ...arrangementLines.map((value, index) => textAt(205, index === 0 ? 497 : 484, 9, value, "F1")),
    ...locationLines.map((value, index) => textAt(205, index === 0 ? 435 : 422, 9, value, "F1")),
    ...brotherLines.map((value, index) => textAt(205, index === 0 ? 373 : 360, 10, value, "F1")),
    textAt(205, 311, 10, data.contact || "-", "F1"),

    // Please Note panel.
    `${lightBlue} rg 42 62 511 200 re f`,
    `${navy} rg 42 234 511 28 re f`,
    `${gold} rg 190 234 9 28 re f`,
    `${white} rg /F2 13 Tf 1 0 0 1 61 243 Tm (PLEASE NOTE) Tj`,

    // Note point 1.
    circle(70, 200, 12),
    `${white} rg /F2 9 Tf 1 0 0 1 66 197 Tm (1) Tj`,
    `${darkText} rg /F1 8.5 Tf 1 0 0 1 95 207 Tm (If several brothers and sisters sign up, you may be asked) Tj`,
    `${darkText} rg /F1 8.5 Tf 1 0 0 1 95 194 Tm (to serve for only 30 minutes.) Tj`,
    `${darkText} rg /F1 8.5 Tf 1 0 0 1 95 181 Tm (Please check your schedule accordingly.) Tj`,
    line(95, 170, 535, 170, 0.6, "0.72 0.78 0.86"),

    // Note point 2.
    circle(70, 141, 12),
    `${white} rg /F2 9 Tf 1 0 0 1 66 138 Tm (2) Tj`,
    `${darkText} rg /F1 8.5 Tf 1 0 0 1 95 148 Tm (After your assigned time, you may also continue with) Tj`,
    `${darkText} rg /F1 8.5 Tf 1 0 0 1 95 135 Tm (informal witnessing or the house-to-house ministry) Tj`,
    `${darkText} rg /F1 8.5 Tf 1 0 0 1 95 122 Tm (with your assigned partner.) Tj`,
    line(95, 111, 535, 111, 0.6, "0.72 0.78 0.86"),

    // Note point 3.
    circle(70, 82, 12),
    `${white} rg /F2 9 Tf 1 0 0 1 66 79 Tm (3) Tj`,
    `${darkText} rg /F1 8.5 Tf 1 0 0 1 95 89 Tm (For this, please contact the assigned brother;) Tj`,
    `${darkText} rg /F1 8.5 Tf 1 0 0 1 95 76 Tm (he will provide you with the territory.) Tj`,
  ];

  if (noteLine) {
    const noteLines = wrapText(noteLine, 80);
    lines.push(
      `${navy} rg /F2 7.5 Tf`,
      `1 0 0 1 95 63 Tm (${esc(noteLines[0])}) Tj`,
    );
  }

  lines.push(
    // Footer.
    `${gold} RG 1 w 145 42 m 450 42 l S`,
    `${navy} rg /F1 9 Tf 1 0 0 1 180 28 Tm (Thank you for your fine cooperation in the ministry.) Tj`,
    `${navy} rg 0 0 595 18 re f`,
    `${gold} rg 0 18 595 3 re f`,
    "Q",
  );

  const content = lines.join("\n");
  const contentBytes = toLatin1Bytes(content);
  const objects: Uint8Array[] = [
    toLatin1Bytes("<< /Type /Catalog /Pages 2 0 R >>"),
    toLatin1Bytes("<< /Type /Pages /Kids [3 0 R] /Count 1 >>"),
    toLatin1Bytes("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>"),
    toLatin1Bytes("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),
    toLatin1Bytes("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"),
    toLatin1Bytes(`<< /Length ${contentBytes.length} >>\nstream\n${content}\nendstream`),
  ];

  const header = toLatin1Bytes("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  const bodyParts: Uint8Array[] = [header];
  const offsets: number[] = [0];
  let position = header.length;

  objects.forEach((object, index) => {
    offsets[index + 1] = position;
    const prefix = toLatin1Bytes(`${index + 1} 0 obj\n`);
    const suffix = toLatin1Bytes("\nendobj\n");
    bodyParts.push(prefix, object, suffix);
    position += prefix.length + object.length + suffix.length;
  });

  const xrefPosition = position;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i += 1) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPosition}\n%%EOF`;
  bodyParts.push(toLatin1Bytes(xref));

  return new Blob([concatBytes(bodyParts)], { type: "application/pdf" });
}

function arrangementPdfName(congregationName: string, date: string) {
  return `${congregationName.replace(/[^a-z0-9]+/gi, "-")}-Arrangement-Notification-${date}.pdf`;
}

export default function CartWitnessingPage() {
  const congregationName = loadCongregationProfile().congregationName || "Congregation";
  const [mode, setMode] = useState<"weekly" | "weekend">("weekly");
  const [schedule, setSchedule] = useState<CartWitnessingSchedule>(() => {
    const saved = loadCartWitnessingSchedules();
    const latest = saved.sort((a, b) => b.updatedAt - a.updatedAt)[0] ?? createEmptyCartWitnessingSchedule();
    return normalizeScheduleWeek({ ...latest, weekOf: mondayOf(latest.weekOf) });
  });
  const [weekendDay, setWeekendDay] = useState<"saturday" | "sunday">("saturday");
  const [arrangementDate, setArrangementDate] = useState("");
  const [arrangementTime, setArrangementTime] = useState("9:00 AM - 10:00 AM");
  const [arrangement, setArrangement] = useState("Cart Witnessing - Residential");
  const [arrangementLocation, setArrangementLocation] = useState("");
  const [assignedBrother, setAssignedBrother] = useState("");
  const [arrangementContact, setArrangementContact] = useState("");
  const [arrangementNote, setArrangementNote] = useState("");
  const [arrangementBusy, setArrangementBusy] = useState(false);


  const weekDates = useMemo(() => getWeekDates(schedule.weekOf), [schedule.weekOf]);
  const arrangementDateOptions = weekDates.filter((date) => {
    const day = new Date(`${date}T00:00:00`).getDay();
    return day === 6 || day === 0;
  });
  const arrangementCaptains = schedule.dayCaptains[arrangementDate] ?? [];
  const arrangementTimeOptions = useMemo(() => {
    const values = new Set<string>();
    for (const entry of schedule.entries.filter((item) => item.date === arrangementDate)) {
      if (entry.time.trim()) values.add(entry.time.trim());
    }
    for (const captain of arrangementCaptains) {
      if (captain.from || captain.to) values.add(`${captain.from || "9:00 AM"} - ${captain.to || "10:00 AM"}`);
    }
    if (!values.size) values.add("9:00 AM - 10:00 AM");
    return [...values];
  }, [arrangementDate, arrangementCaptains, schedule.entries]);

  function syncArrangementDefaults(date: string) {
    const captains = schedule.dayCaptains[date] ?? [];
    const firstCaptain = captains[0];
    const firstEntry = schedule.entries.find((entry) => entry.date === date && entry.time.trim());
    setArrangementLocation(firstEntry?.location || "");
    setArrangementDate(date);
    setArrangementTime(firstEntry?.time || (firstCaptain?.from || firstCaptain?.to ? `${firstCaptain.from || "9:00 AM"} - ${firstCaptain.to || "10:00 AM"}` : "9:00 AM - 10:00 AM"));
    setAssignedBrother(firstCaptain?.name || "");
    setArrangementContact(firstCaptain?.contact || "");
  }

  useEffect(() => {
    if (!arrangementDateOptions.length) return;
    const nextDate = arrangementDate && arrangementDateOptions.includes(arrangementDate) ? arrangementDate : arrangementDateOptions[0];
    if (nextDate === arrangementDate) return;
    const captains = schedule.dayCaptains[nextDate] ?? [];
    const firstCaptain = captains[0];
    const firstEntry = schedule.entries.find((entry) => entry.date === nextDate && entry.time.trim());
    setArrangementLocation(firstEntry?.location || "");
    setArrangementDate(nextDate);
    setArrangementTime(firstEntry?.time || (firstCaptain?.from || firstCaptain?.to ? `${firstCaptain.from || "9:00 AM"} - ${firstCaptain.to || "10:00 AM"}` : "9:00 AM - 10:00 AM"));
    setAssignedBrother(firstCaptain?.name || "");
    setArrangementContact(firstCaptain?.contact || "");
  }, [arrangementDateOptions, arrangementDate, schedule.dayCaptains, schedule.entries]);


  function updateEntry(id: string, field: keyof CartWitnessingEntry, value: string) {
    setSchedule((current) => ({
      ...current,
      updatedAt: Date.now(),
      entries: current.entries.map((entry) => entry.id === id ? { ...entry, [field]: value } : entry),
    }));
  }

  function assignCaptain(entryId: string, captainId: string) {
    setSchedule((current) => {
      const entry = current.entries.find((item) => item.id === entryId);
      if (!entry) return current;
      const captains = current.dayCaptains[entry.date] ?? [];
      const captain = captains.find((item) => item.id === captainId);
      return {
        ...current,
        updatedAt: Date.now(),
        entries: current.entries.map((item) => item.id === entryId ? {
          ...item,
          captainId,
          captainContact: captain ? `${captain.name}${captain.contact ? `  -  ${captain.contact}` : ""}` : item.captainContact,
        } : item),
      };
    });
  }

  function updateCaptain(date: string, id: string, field: keyof CartWitnessingCaptain, value: string) {
    setSchedule((current) => ({
      ...current,
      updatedAt: Date.now(),
      dayCaptains: {
        ...current.dayCaptains,
        [date]: (current.dayCaptains[date] ?? []).map((captain) => captain.id === id ? { ...captain, [field]: value } : captain),
      },
    }));
  }

  function addCaptain(date: string) {
    setSchedule((current) => {
      const captains = current.dayCaptains[date] ?? [];
      if (captains.length >= 2) return current;
      const captain: CartWitnessingCaptain = {
        id: crypto.randomUUID(), name: "", from: "", to: "", contact: "",
      };
      return {
        ...current,
        updatedAt: Date.now(),
        dayCaptains: { ...current.dayCaptains, [date]: [...captains, captain] },
      };
    });
  }

  function removeCaptain(date: string, id: string) {
    setSchedule((current) => ({
      ...current,
      updatedAt: Date.now(),
      dayCaptains: {
        ...current.dayCaptains,
        [date]: (current.dayCaptains[date] ?? []).filter((captain) => captain.id !== id),
      },
      entries: current.entries.map((entry) => entry.date === date && entry.captainId === id
        ? { ...entry, captainId: "", captainContact: "" }
        : entry),
    }));
  }

  function addEntry(date: string) {
    setSchedule((current) => ({ ...current, updatedAt: Date.now(), entries: [...current.entries, createEntry(date)] }));
  }

  function addTimedPair(date: string, minutes: 30 | 60) {
    setSchedule((current) => {
      const dayEntries = current.entries.filter((entry) => entry.date === date);
      const lastTimed = [...dayEntries].reverse().find((entry) => entry.time.trim());
      const start = lastTimed ? getEndMinutes(lastTimed.time) : 9 * 60;
      const end = start + minutes;
      const entry = createEntry(date);
      entry.time = `${formatClock(start)} to ${formatClock(end)}`;
      return { ...current, updatedAt: Date.now(), entries: [...current.entries, entry] };
    });
  }

  function deleteEntry(id: string) {
    setSchedule((current) => ({ ...current, updatedAt: Date.now(), entries: current.entries.filter((entry) => entry.id !== id) }));
  }

  function updateWeek(value: string) {
    setSchedule((current) => ({ ...current, weekOf: value, updatedAt: Date.now() }));
  }

  function nextWeekTemplate() {
    const next = new Date(`${schedule.weekOf}T00:00:00`);
    next.setDate(next.getDate() + 7);
    const nextMonday = next.toISOString().slice(0, 10);
    setSchedule(createEmptyCartWitnessingSchedule(nextMonday));
    setWeekendDay("saturday");
  }

  async function sharePdf() {
    const blob = await createCartWitnessingPdfBlob(schedule);
    const file = new File([blob], `${congregationName.replace(/[^a-z0-9]+/gi, "-")}-Cart-Witnessing-${schedule.weekOf}.pdf`, { type: "application/pdf" });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: "Cart Witnessing Schedule", files: [file] });
      return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function exportArrangementPdf() {
    try {
      setArrangementBusy(true);
      const blob = await createArrangementNotificationPdf({
        date: formatDate(arrangementDate),
        time: arrangementTime,
        arrangement,
        location: arrangementLocation,
        assignedBrother,
        contact: arrangementContact,
        note: arrangementNote,
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = arrangementPdfName(congregationName, arrangementDate);
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Arrangement Notification PDF could not be created.");
    } finally {
      setArrangementBusy(false);
    }
  }

  async function shareArrangementPdf() {
    try {
      setArrangementBusy(true);
      const blob = await createArrangementNotificationPdf({
        date: formatDate(arrangementDate),
        time: arrangementTime,
        arrangement,
        location: arrangementLocation,
        assignedBrother,
        contact: arrangementContact,
        note: arrangementNote,
      });
      const file = new File([blob], arrangementPdfName(congregationName, arrangementDate), { type: "application/pdf" });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Arrangement Notification",
          text: "Please inform the assigned brother of your name regarding this arrangement and time slot.",
          files: [file],
        });
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(url);
      alert("PDF downloaded. You can share the downloaded PDF with the assigned brother.");
    } catch (error) {
      if ((error as Error)?.name !== "AbortError") {
        console.error(error);
        alert("Arrangement Notification could not be shared.");
      }
    } finally {
      setArrangementBusy(false);
    }
  }

  function save() {
    saveCartWitnessingSchedule(schedule);
    alert("Cart Witnessing schedule saved successfully.");
  }

  const entriesForDate = (date: string) => schedule.entries.filter((entry) => entry.date === date);
  const weekendDates = getWeekDates(schedule.weekOf);
  const saturdayDate = weekendDates[5];
  const sundayDate = weekendDates[6];
  const weekendDate = weekendDay === "saturday" ? saturdayDate : sundayDate;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack spacing={3}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: 1, borderColor: "divider" }}>
          <Stack spacing={2.5}>
            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={2}>
              <Box>
                <Typography variant="overline" color="primary.main" fontWeight={700}>CONGREGATION</Typography>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                  <Typography variant="h4" fontWeight={800}>{congregationName}</Typography>
                  <Button size="small" variant="outlined" startIcon={<EditRoundedIcon />} href="/settings">Edit</Button>
                </Stack>
                <Typography variant="h6" fontWeight={700}>Cart Witnessing Schedule</Typography>
                <Typography color="text.secondary">Reusable daily or weekly schedule — assign up to two day captains by time range.</Typography>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip icon={<CalendarMonthRoundedIcon />} label={`Week of ${formatDate(schedule.weekOf)}`} />
                <Chip size="small" label={`${schedule.entries.length} schedule${schedule.entries.length === 1 ? "" : "s"}`} variant="outlined" />
              </Stack>
            </Stack>

            <ToggleButtonGroup exclusive value={mode} onChange={(_, value) => value && setMode(value)} size="small">
              <ToggleButton value="weekend"><TodayRoundedIcon sx={{ mr: 1 }} />Weekend</ToggleButton>
              <ToggleButton value="weekly"><CalendarMonthRoundedIcon sx={{ mr: 1 }} />Weekly</ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 5 }}>
                <TextField key={schedule.weekOf} fullWidth type="text" label="Week Of (Monday)" defaultValue={schedule.weekOf} onBlur={(e) => updateWeek(e.target.value)} placeholder="YYYY-MM-DD" helperText="Type the Monday date manually" slotProps={{ inputLabel: { shrink: true } }} />
              </Grid>
              {mode === "weekend" && (
                <Grid size={{ xs: 12, sm: 7 }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                    <Typography variant="body2" color="text.secondary">Weekend day:</Typography>
                    <ToggleButtonGroup exclusive value={weekendDay} onChange={(_, value) => value && setWeekendDay(value)} size="small">
                      <ToggleButton value="saturday">Saturday  -  {formatDate(saturdayDate)}</ToggleButton>
                      <ToggleButton value="sunday">Sunday  -  {formatDate(sundayDate)}</ToggleButton>
                    </ToggleButtonGroup>
                  </Stack>
                </Grid>
              )}
            </Grid>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button variant="contained" startIcon={<SaveRoundedIcon />} onClick={save}>Save</Button>
              <Button variant="outlined" startIcon={<PictureAsPdfRoundedIcon />} onClick={() => exportCartWitnessingPdf(schedule)}>Export PDF</Button>
              <Button variant="outlined" startIcon={<DescriptionRoundedIcon />} onClick={() => void exportCartWitnessingWord(schedule)}>Export Word</Button>
              <Button variant="outlined" startIcon={<ShareRoundedIcon />} onClick={() => void sharePdf()}>Share PDF</Button>
              <Button variant="text" onClick={nextWeekTemplate}>Next Week Template</Button>
            </Stack>
          </Stack>
        </Paper>

        <ArrangementNotification
          congregationName={congregationName}
          date={arrangementDate}
          dateOptions={arrangementDateOptions}
          time={arrangementTime}
          timeOptions={arrangementTimeOptions}
          arrangement={arrangement}
          location={arrangementLocation}
          assignedBrother={assignedBrother}
          contact={arrangementContact}
          note={arrangementNote}
          captains={arrangementCaptains}
          busy={arrangementBusy}
          onDateChange={(value) => syncArrangementDefaults(value)}
          onTimeChange={setArrangementTime}
          onArrangementChange={setArrangement}
          onLocationChange={setArrangementLocation}
          onBrotherChange={(value) => {
            const captain = arrangementCaptains.find((item) => item.name === value);
            setAssignedBrother(value);
            if (captain) setArrangementContact(captain.contact);
          }}
          onContactChange={setArrangementContact}
          onNoteChange={setArrangementNote}
          onExport={exportArrangementPdf}
          onShare={shareArrangementPdf}
        />

        {mode === "weekend" ? (
          <DailyView date={weekendDate} entries={entriesForDate(weekendDate)} captains={schedule.dayCaptains[weekendDate] ?? []} onAdd={() => addEntry(weekendDate)} onAddPair={(minutes) => addTimedPair(weekendDate, minutes)} onChange={updateEntry} onAssignCaptain={assignCaptain} onAddCaptain={() => addCaptain(weekendDate)} onUpdateCaptain={updateCaptain} onRemoveCaptain={removeCaptain} onDelete={deleteEntry} />
        ) : (
          <WeeklyView dates={weekDates} entries={schedule.entries} dayCaptains={schedule.dayCaptains} onAdd={addEntry} onAddPair={addTimedPair} onChange={updateEntry} onAssignCaptain={assignCaptain} onAddCaptain={addCaptain} onUpdateCaptain={updateCaptain} onRemoveCaptain={removeCaptain} onDelete={deleteEntry} />
        )}
      </Stack>
    </Box>
  );
}


function ArrangementNotification({
  congregationName,
  date,
  dateOptions,
  time,
  timeOptions,
  arrangement,
  location,
  assignedBrother,
  contact,
  note,
  captains,
  busy,
  onDateChange,
  onTimeChange,
  onArrangementChange,
  onLocationChange,
  onBrotherChange,
  onContactChange,
  onNoteChange,
  onExport,
  onShare,
}: {
  congregationName: string;
  date: string;
  dateOptions: string[];
  time: string;
  timeOptions: string[];
  arrangement: string;
  location: string;
  assignedBrother: string;
  contact: string;
  note: string;
  captains: CartWitnessingCaptain[];
  busy: boolean;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onArrangementChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onBrotherChange: (value: string) => void;
  onContactChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onExport: () => void;
  onShare: () => void;
}) {
  const dateLabel = date ? formatDate(date) : "Select a date";
  const arrangementOptions = [
    "Cart Witnessing - Residential",
    "Cart Witnessing - Public",
    "Cart Witnessing - Special Arrangement",
  ];

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: 1, borderColor: "divider" }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <NotificationsNoneRoundedIcon color="warning" />
          <Box>
            <Typography variant="h6" fontWeight={800} color="primary.main">Arrangement Notification</Typography>
            <Typography variant="body2" color="text.secondary">
              Create a notification for the assigned brother of your name regarding a specific arrangement and time slot.
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select fullWidth label="Arrangement Date *" value={date}
              onChange={(e) => onDateChange(e.target.value)}
              helperText={dateLabel}
            >
              {dateOptions.map((item) => <MenuItem key={item} value={item}>{formatDate(item)}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField select fullWidth label="Time Slot *" value={time} onChange={(e) => onTimeChange(e.target.value)}>
              {timeOptions.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField select fullWidth label="Arrangement *" value={arrangement} onChange={(e) => onArrangementChange(e.target.value)}>
              {arrangementOptions.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Cart Witnessing Location *"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="Where will the cart witnessing take place?"
              helperText="Taken from the selected Saturday/Sunday schedule location; you can edit it here."
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select fullWidth label="Assigned Brother *" value={assignedBrother}
              onChange={(e) => onBrotherChange(e.target.value)}
              helperText={captains.length ? "Taken from the selected day's assigned brothers." : "Add a day captain above to select a name here."}
            >
              {captains.map((captain, index) => (
                <MenuItem key={captain.id} value={captain.name}>{captain.name || `Captain ${index + 1}`}</MenuItem>
              ))}
              {!captains.length && <MenuItem value="">No assigned brother yet</MenuItem>}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField fullWidth label="Contact Number *" value={contact} onChange={(e) => onContactChange(e.target.value)} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField fullWidth multiline minRows={2} label="Note (Optional)" value={note} onChange={(e) => onNoteChange(e.target.value)} placeholder="Type any additional note (optional)" />
          </Grid>
        </Grid>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button fullWidth variant="contained" startIcon={<PictureAsPdfRoundedIcon />} onClick={onExport} disabled={busy || !date}>
            {busy ? "Creating PDF..." : "Export PDF"}
          </Button>
          <Button fullWidth variant="outlined" startIcon={<ShareRoundedIcon />} onClick={onShare} disabled={busy || !date}>
            Share PDF
          </Button>
        </Stack>

        <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 2.5, overflow: "hidden" }}>
          <Typography variant="subtitle2" fontWeight={800} color="primary.main" sx={{ mb: 1.5 }}>Preview (Final PDF Design)</Typography>
          <Card variant="outlined" sx={{ borderRadius: 2.5, overflow: "hidden", maxWidth: 620, mx: "auto", bgcolor: "#fff", borderColor: "#d5dbe5" }}>
            <Box sx={{ bgcolor: "#fff", color: "#0b1f4a", fontFamily: "Arial, sans-serif" }}>
              <Box sx={{ bgcolor: "#0b1f4a", borderBottom: "3px solid #d9a52e", px: { xs: 2, md: 4 }, py: 2.5 }}>
                <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: 15, md: 18 } }}>{congregationName}</Typography>
              </Box>
              <Box sx={{ px: { xs: 2, md: 4 }, pt: 3, pb: 2 }}>
                <Typography sx={{ fontWeight: 900, letterSpacing: 0.3, fontSize: { xs: 20, md: 25 }, color: "#0b1f4a" }}>ARRANGEMENT NOTIFICATION</Typography>
                <Box sx={{ mt: 1.5, mb: 2.5, mx: "auto", maxWidth: 285, bgcolor: "#0b1f4a", borderLeft: "8px solid #d9a52e", borderRight: "8px solid #d9a52e", py: 0.8 }}>
                  <Typography align="center" sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: 11, md: 14 } }}>CART WITNESSING</Typography>
                </Box>
                <Stack spacing={0}>
                  {[
                    ["DATE", date ? formatDate(date) : "—"],
                    ["TIME SLOT", time || "—"],
                    ["ARRANGEMENT", arrangement || "—"],
                    ["LOCATION", location || "—"],
                    ["ASSIGNED BROTHER", assignedBrother || "—"],
                    ["CONTACT NUMBER", contact || "—"],
                  ].map(([label, value]) => (
                    <Box key={label} sx={{ minHeight: 58, display: "grid", gridTemplateColumns: { xs: "125px 1fr", md: "160px 1fr" }, alignItems: "center", borderBottom: "1px solid #b9c2cf" }}>
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: 8, md: 10 }, color: "#0b1f4a", pr: 1, minHeight: 30, display: "flex", alignItems: "center" }}>{label}</Typography>
                      <Typography sx={{ pl: 2, fontSize: { xs: 9, md: 11 }, color: "#111827", wordBreak: "break-word" }}>{value}</Typography>
                    </Box>
                  ))}
                </Stack>
                <Box sx={{ mt: 3, bgcolor: "#eef4fc", p: 2, borderRadius: 1 }}>
                  <Box sx={{ bgcolor: "#0b1f4a", px: 1.5, py: 0.8, mb: 1.5 }}><Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 11 }}>PLEASE NOTE</Typography></Box>
                  <Stack spacing={1.2}>
                    <Typography sx={{ fontSize: 8.5 }}>1. If several brothers and sisters sign up, you may be asked to serve for only 30 minutes. Please check your schedule accordingly.</Typography>
                    <Divider />
                    <Typography sx={{ fontSize: 8.5 }}>2. After your assigned time, you may also continue with informal witnessing or the house-to-house ministry with your assigned partner.</Typography>
                    <Divider />
                    <Typography sx={{ fontSize: 8.5 }}>3. For this, please contact the assigned brother; he will provide you with the territory.</Typography>
                    {note.trim() && <><Divider /><Typography sx={{ fontSize: 8.5, fontWeight: 700 }}>Additional note: {note}</Typography></>}
                  </Stack>
                </Box>
                <Box sx={{ mt: 2.5, borderTop: "1px solid #d9a52e", pt: 1.5 }}><Typography align="center" sx={{ fontSize: 8.5, fontStyle: "italic", color: "#526070" }}>Thank you for your fine cooperation in the ministry.</Typography></Box>
              </Box>
              <Box sx={{ height: 8, bgcolor: "#0b1f4a", borderTop: "3px solid #d9a52e" }} />
            </Box>
          </Card>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1, textAlign: "center" }}>
            Live preview of the code-generated PDF. No poster image or logo is used.
          </Typography>
        </Paper>

        <Paper sx={{ p: 1.5, bgcolor: "primary.50", borderRadius: 2 }} elevation={0}>
          <Typography variant="body2">
            <strong>Tip:</strong> Share this notification with your assigned brother through the PDF.
          </Typography>
        </Paper>
      </Stack>
    </Paper>
  );
}


type ViewProps = {
  date: string;
  entries: CartWitnessingEntry[];
  captains: CartWitnessingCaptain[];
  onAdd: () => void;
  onAddPair: (minutes: 30 | 60) => void;
  onChange: (id: string, field: keyof CartWitnessingEntry, value: string) => void;
  onAssignCaptain: (entryId: string, captainId: string) => void;
  onAddCaptain: () => void;
  onUpdateCaptain: (date: string, id: string, field: keyof CartWitnessingCaptain, value: string) => void;
  onRemoveCaptain: (date: string, id: string) => void;
  onDelete: (id: string) => void;
};

function WeeklyView({ dates, entries, dayCaptains, onAdd, onAddPair, onChange, onAssignCaptain, onAddCaptain, onUpdateCaptain, onRemoveCaptain, onDelete }: { dates: string[]; entries: CartWitnessingEntry[]; dayCaptains: Record<string, CartWitnessingCaptain[]>; onAdd: (date: string) => void; onAddPair: (date: string, minutes: 30 | 60) => void; onChange: ViewProps["onChange"]; onAssignCaptain: ViewProps["onAssignCaptain"]; onAddCaptain: (date: string) => void; onUpdateCaptain: ViewProps["onUpdateCaptain"]; onRemoveCaptain: ViewProps["onRemoveCaptain"]; onDelete: ViewProps["onDelete"]; }) {
  return (
    <Stack spacing={2}>
      {dates.map((date) => {
        const monday = new Date(`${date}T00:00:00`).getDay() === 1;
        const dayEntries = entries
          .filter((entry) => entry.date === date)
          .sort((a, b) => (parseClock(a.time) ?? Number.MAX_SAFE_INTEGER) - (parseClock(b.time) ?? Number.MAX_SAFE_INTEGER));
        return <DaySection key={date} date={date} monday={monday} entries={dayEntries} captains={dayCaptains[date] ?? []} onAdd={() => onAdd(date)} onAddPair={(minutes) => onAddPair(date, minutes)} onChange={onChange} onAssignCaptain={onAssignCaptain} onAddCaptain={() => onAddCaptain(date)} onUpdateCaptain={onUpdateCaptain} onRemoveCaptain={onRemoveCaptain} onDelete={onDelete} />;
      })}
    </Stack>
  );
}

function DailyView({ date, entries, captains, onAdd, onAddPair, onChange, onAssignCaptain, onAddCaptain, onUpdateCaptain, onRemoveCaptain, onDelete }: ViewProps) {
  return <DaySection date={date} monday={new Date(`${date}T00:00:00`).getDay() === 1} entries={entries} captains={captains} onAdd={onAdd} onAddPair={onAddPair} onChange={onChange} onAssignCaptain={onAssignCaptain} onAddCaptain={onAddCaptain} onUpdateCaptain={onUpdateCaptain} onRemoveCaptain={onRemoveCaptain} onDelete={onDelete} />;
}

function DaySection({ date, monday, entries, captains, onAdd, onAddPair, onChange, onAssignCaptain, onAddCaptain, onUpdateCaptain, onRemoveCaptain, onDelete }: ViewProps & { monday: boolean }) {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: 1, borderColor: monday ? "warning.main" : "divider", bgcolor: monday ? "warning.50" : "background.paper" }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", md: "center" }} spacing={1.5}>
          <Box>
            <Typography variant="h6" fontWeight={800}>{formatDate(date)}</Typography>
            {monday && <Chip size="small" label="Monday  -  Week Start" color="warning" sx={{ mt: 0.5 }} />}
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="flex-end">
            <Button size="small" variant="outlined" startIcon={<PersonAddAltRoundedIcon />} onClick={onAddCaptain} disabled={captains.length >= 2}>{captains.length >= 2 ? "2 Captains Added" : `Add Captain (${captains.length}/2)`}</Button>
            <Button size="small" variant="outlined" startIcon={<AddRoundedIcon />} onClick={onAdd}>Add Blank</Button>
            <Button size="small" variant="contained" color={monday ? "warning" : "primary"} startIcon={<AccessTimeRoundedIcon />} onClick={() => onAddPair(30)}>+ 30-min Pair</Button>
            <Button size="small" variant="outlined" startIcon={<AccessTimeRoundedIcon />} onClick={() => onAddPair(60)}>+ 1-hour Pair</Button>
          </Stack>
        </Stack>

        <CaptainPanel date={date} captains={captains} onUpdate={onUpdateCaptain} onRemove={onRemoveCaptain} />
        <Divider />
        {entries.length === 0 ? <Typography color="text.secondary">No schedule added yet.</Typography> : entries.map((entry) => <EntryCard key={entry.id} entry={entry} captains={captains} onChange={onChange} onAssignCaptain={onAssignCaptain} onDelete={onDelete} />)}
      </Stack>
    </Paper>
  );
}

function CaptainPanel({ date, captains, onUpdate, onRemove }: { date: string; captains: CartWitnessingCaptain[]; onUpdate: ViewProps["onUpdateCaptain"]; onRemove: ViewProps["onRemoveCaptain"] }) {
  if (!captains.length) return (
    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2.5, borderStyle: "dashed" }}>
      <Typography variant="body2" color="text.secondary">No day captain assigned. Add up to 2 captains and give each one a time range.</Typography>
    </Paper>
  );
  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2" fontWeight={800}>Day Captains</Typography>
      <Grid container spacing={1.5}>
        {captains.map((captain, index) => (
          <Grid key={captain.id} size={{ xs: 12, md: captains.length === 1 ? 12 : 6 }}>
            <Card variant="outlined" sx={{ borderRadius: 2.5 }}>
              <CardContent sx={{ p: 1.75, "&:last-child": { pb: 1.75 } }}>
                <Stack spacing={1.25}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Chip size="small" label={`Captain ${index + 1}`} color="primary" variant="outlined" />
                    <Button color="error" size="small" startIcon={<DeleteOutlineRoundedIcon />} onClick={() => onRemove(date, captain.id)}>Remove</Button>
                  </Stack>
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth size="small" label="Captain Name" value={captain.name} onChange={(e) => onUpdate(date, captain.id, "name", e.target.value)} /></Grid>
                    <Grid size={{ xs: 6, sm: 3 }}><TextField fullWidth size="small" type="time" label="From" value={captain.from} onChange={(e) => onUpdate(date, captain.id, "from", e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
                    <Grid size={{ xs: 6, sm: 3 }}><TextField fullWidth size="small" type="time" label="To" value={captain.to} onChange={(e) => onUpdate(date, captain.id, "to", e.target.value)} slotProps={{ inputLabel: { shrink: true } }} /></Grid>
                    <Grid size={{ xs: 12 }}><TextField fullWidth size="small" label="Contact" value={captain.contact} onChange={(e) => onUpdate(date, captain.id, "contact", e.target.value)} placeholder="Phone / preferred contact" /></Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

function EntryCard({ entry, captains, onChange, onAssignCaptain, onDelete }: { entry: CartWitnessingEntry; captains: CartWitnessingCaptain[]; onChange: ViewProps["onChange"]; onAssignCaptain: ViewProps["onAssignCaptain"]; onDelete: ViewProps["onDelete"] }) {
  const field = (key: keyof CartWitnessingEntry) => (e: React.ChangeEvent<HTMLInputElement>) => onChange(entry.id, key, e.target.value);
  return (
    <Card variant="outlined" sx={{ borderRadius: 2.5 }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="flex-end">
            <Button color="error" size="small" startIcon={<DeleteOutlineRoundedIcon />} onClick={() => onDelete(entry.id)}>Remove</Button>
          </Stack>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4, md: 2 }}><TextField fullWidth label="Time" value={entry.time} onChange={field("time")} placeholder="9:00 - 9:30" /></Grid>
            <Grid size={{ xs: 12, sm: 8, md: 4 }}><TextField fullWidth label="Location" value={entry.location} onChange={field("location")} /></Grid>
            <Grid size={{ xs: 12, sm: 4, md: 2 }}><TextField fullWidth label="Cart" value={entry.cart} onChange={field("cart")} placeholder="Cart 1" /></Grid>
            <Grid size={{ xs: 12, sm: 8, md: 4 }}>
              <Select fullWidth displayEmpty value={entry.captainId ?? ""} onChange={(e) => onAssignCaptain(entry.id, e.target.value)}>
                <MenuItem value=""><em>No day captain</em></MenuItem>
                {captains.map((captain, index) => <MenuItem key={captain.id} value={captain.id}>{captain.name || `Captain ${index + 1}`} {captain.from || captain.to ? `(${captain.from || "?"} - ${captain.to || "?"})` : ""}</MenuItem>)}
              </Select>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Participants" value={entry.participants} onChange={field("participants")} placeholder="Names" /></Grid>
            <Grid size={{ xs: 12, md: 6 }}><TextField fullWidth label="Notes" value={entry.notes} onChange={field("notes")} /></Grid>
            {!captains.length && entry.captainContact && <Grid size={{ xs: 12 }}><TextField fullWidth label="Captain / Contact Person" value={entry.captainContact} onChange={field("captainContact")} /></Grid>}
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}

