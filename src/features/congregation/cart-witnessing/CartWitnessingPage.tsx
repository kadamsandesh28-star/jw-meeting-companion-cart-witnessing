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
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
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

async function imageUrlToJpegBytes(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Arrangement cart image could not be loaded.");
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement("canvas");
  const maxWidth = 700;
  const scale = Math.min(1, maxWidth / bitmap.width);
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available.");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const dataUrl = canvas.toDataURL("image/jpeg", 0.86);
  const base64 = dataUrl.split(",")[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return { bytes, width: canvas.width, height: canvas.height };
}

async function createArrangementNotificationPdf(data: {
  date: string;
  time: string;
  arrangement: string;
  assignedBrother: string;
  contact: string;
  note: string;
}) {
  const image = await imageUrlToJpegBytes("/arrangement-cart-logo.png");
 
  const imageHeight = 590;
  const imageWidth = Math.min(245, imageHeight * image.width / image.height);
  const imageX = 28;
  const imageY = 120;
  const rightX = 295;

  const lines = [
    "BT",
    "/F1 20 Tf",
    "0.03 0.12 0.35 rg",
    `1 0 0 1 ${rightX} 760 Tm`,
    "(ARRANGEMENT NOTIFICATION) Tj",
    "/F1 12 Tf",
    `1 0 0 1 ${rightX + 55} 735 Tm`,
    "(CART WITNESSING) Tj",
    "0 0 0 RG",
    "1 w",
    `45 715 m 550 715 l S`,
    "/F1 10 Tf",
    `1 0 0 1 ${rightX} 675 Tm`,
    `(Date        ${pdfEscape(data.date)}) Tj`,
    `1 0 0 1 ${rightX} 640 Tm`,
    `(Time Slot   ${pdfEscape(data.time)}) Tj`,
    `1 0 0 1 ${rightX} 605 Tm`,
    `(Arrangement ${pdfEscape(data.arrangement)}) Tj`,
    `1 0 0 1 ${rightX} 570 Tm`,
    `(Assigned Brother ${pdfEscape(data.assignedBrother)}) Tj`,
    `1 0 0 1 ${rightX} 535 Tm`,
    `(Contact Number   ${pdfEscape(data.contact)}) Tj`,
    "0.03 0.12 0.35 rg",
    "1 w",
    `295 500 m 550 500 l S`,
    "/F1 11 Tf",
    `1 0 0 1 ${rightX} 455 Tm`,
    "(Please inform the assigned brother of your name)",
    "Tj",
    `1 0 0 1 ${rightX + 35} 432 Tm`,
    "(regarding this arrangement and time slot.) Tj",
    "/F1 9 Tf",
    `1 0 0 1 ${rightX + 20} 395 Tm`,
    "(Thank you for your fine cooperation in the ministry.) Tj",
    "ET",
    "q",
    `${imageWidth} 0 0 ${imageHeight} ${imageX} ${imageY} cm`,
    "/Im1 Do",
    "Q",
  ].join("\n");

  const imageObject = concatBytes([
    toLatin1Bytes(
      `<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.bytes.length} >>\nstream\n`
    ),
    image.bytes,
    toLatin1Bytes("\nendstream"),
  ]);

  const objects: Uint8Array[] = [
    toLatin1Bytes("<< /Type /Catalog /Pages 2 0 R >>"),
    toLatin1Bytes("<< /Type /Pages /Kids [3 0 R] /Count 1 >>"),
    toLatin1Bytes("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> /XObject << /Im1 5 0 R >> >> /Contents 6 0 R >>"),
    toLatin1Bytes("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),
    imageObject,
    toLatin1Bytes(`<< /Length ${lines.length ? new TextEncoder().encode(lines).length : 0} >>\nstream\n${lines}\nendstream`),
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
  const [arrangementTime, setArrangementTime] = useState("9:00 AM – 10:00 AM");
  const [arrangement, setArrangement] = useState("Cart Witnessing – Residential");
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
      if (captain.from || captain.to) values.add(`${captain.from || "9:00 AM"} – ${captain.to || "10:00 AM"}`);
    }
    if (!values.size) values.add("9:00 AM – 10:00 AM");
    return [...values];
  }, [arrangementDate, arrangementCaptains, schedule.entries]);

  function syncArrangementDefaults(date: string) {
    const captains = schedule.dayCaptains[date] ?? [];
    const firstCaptain = captains[0];
    const firstEntry = schedule.entries.find((entry) => entry.date === date && entry.time.trim());
    setArrangementDate(date);
    setArrangementTime(firstEntry?.time || (firstCaptain?.from || firstCaptain?.to ? `${firstCaptain.from || "9:00 AM"} – ${firstCaptain.to || "10:00 AM"}` : "9:00 AM – 10:00 AM"));
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
    setArrangementDate(nextDate);
    setArrangementTime(firstEntry?.time || (firstCaptain?.from || firstCaptain?.to ? `${firstCaptain.from || "9:00 AM"} – ${firstCaptain.to || "10:00 AM"}` : "9:00 AM – 10:00 AM"));
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
          captainContact: captain ? `${captain.name}${captain.contact ? ` ┬╖ ${captain.contact}` : ""}` : item.captainContact,
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
      await navigator.share({ title: "Cart Witnessing Weekly Schedule", files: [file] });
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
                <Typography variant="h6" fontWeight={700}>Cart Witnessing ΓÇö {mode === "weekend" ? "Weekend Schedule" : "Weekly Schedule"}</Typography>
                <Typography color="text.secondary">Reusable daily or weekly schedule ΓÇö assign up to two day captains by time range.</Typography>
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
                      <ToggleButton value="saturday">Saturday ΓÇö {formatDate(saturdayDate)}</ToggleButton>
                      <ToggleButton value="sunday">Sunday ΓÇö {formatDate(sundayDate)}</ToggleButton>
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
          date={arrangementDate}
          dateOptions={arrangementDateOptions}
          time={arrangementTime}
          timeOptions={arrangementTimeOptions}
          arrangement={arrangement}
          assignedBrother={assignedBrother}
          contact={arrangementContact}
          note={arrangementNote}
          captains={arrangementCaptains}
          busy={arrangementBusy}
          onDateChange={(value) => syncArrangementDefaults(value)}
          onTimeChange={setArrangementTime}
          onArrangementChange={setArrangement}
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
  date,
  dateOptions,
  time,
  timeOptions,
  arrangement,
  assignedBrother,
  contact,
  note,
  captains,
  busy,
  onDateChange,
  onTimeChange,
  onArrangementChange,
  onBrotherChange,
  onContactChange,
  onNoteChange,
  onExport,
  onShare,
}: {
  date: string;
  dateOptions: string[];
  time: string;
  timeOptions: string[];
  arrangement: string;
  assignedBrother: string;
  contact: string;
  note: string;
  captains: CartWitnessingCaptain[];
  busy: boolean;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onArrangementChange: (value: string) => void;
  onBrotherChange: (value: string) => void;
  onContactChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onExport: () => void;
  onShare: () => void;
}) {
  const dateLabel = date ? formatDate(date) : "Select a date";
  const arrangementOptions = [
    "Cart Witnessing – Residential",
    "Cart Witnessing – Public",
    "Cart Witnessing – Special Arrangement",
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
          <Typography variant="subtitle2" fontWeight={800} color="primary.main" sx={{ mb: 1.5 }}>Preview (PDF)</Typography>
          <Card variant="outlined" sx={{ borderRadius: 2.5, overflow: "hidden", maxWidth: 980, mx: "auto" }}>
            <Grid container>
              <Grid size={{ xs: 12, md: 4 }} sx={{ minHeight: 360, bgcolor: "#f7f7f7" }}>
                <Box
                  component="img"
                  src="/arrangement-cart-logo.png"
                  alt="Public witnessing cart design"
                  sx={{ width: "100%", height: "100%", minHeight: 360, objectFit: "cover", display: "block" }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography align="center" variant="h5" fontWeight={900} color="#10265c">ARRANGEMENT NOTIFICATION</Typography>
                  <Typography align="center" fontWeight={800} color="#10265c" sx={{ mt: 0.5 }}>CART WITNESSING</Typography>
                  <Divider sx={{ my: 2, borderColor: "primary.main" }} />
                  <PreviewRow icon={<EventRoundedIcon />} label="Date" value={dateLabel} />
                  <PreviewRow icon={<AccessTimeRoundedIcon />} label="Time Slot" value={time || "—"} />
                  <PreviewRow icon={<PlaceRoundedIcon />} label="Arrangement" value={arrangement || "—"} />
                  <PreviewRow icon={<PersonRoundedIcon />} label="Assigned Brother" value={assignedBrother || "—"} />
                  <PreviewRow icon={<PhoneRoundedIcon />} label="Contact Number" value={contact || "—"} />
                  <Divider sx={{ my: 2, borderColor: "primary.main" }} />
                  <Stack alignItems="center" spacing={1}>
                    <InfoRoundedIcon color="primary" />
                    <Typography align="center" fontWeight={800} color="#10265c">
                      Please inform the assigned brother of your name regarding this arrangement and time slot.
                    </Typography>
                    {note && <Typography align="center" variant="body2" color="text.secondary">{note}</Typography>}
                    <Typography align="center" variant="body2" fontStyle="italic" color="primary.main">
                      Thank you for your fine cooperation in the ministry.
                    </Typography>
                  </Stack>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
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

function PreviewRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ py: 1, borderBottom: "1px solid", borderColor: "divider" }}>
      <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
      <Typography sx={{ minWidth: { xs: 110, sm: 145 }, fontWeight: 500 }}>{label}</Typography>
      <Typography sx={{ fontWeight: 600, overflowWrap: "anywhere" }}>{value}</Typography>
    </Stack>
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
            {monday && <Chip size="small" label="Monday ΓÇö Week Start" color="warning" sx={{ mt: 0.5 }} />}
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
          <Grid key={captain.id} size={{ xs: 12, md: 6 }}>
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
            <Grid size={{ xs: 12, sm: 4, md: 2 }}><TextField fullWidth label="Time" value={entry.time} onChange={field("time")} placeholder="9:00ΓÇô9:30" /></Grid>
            <Grid size={{ xs: 12, sm: 8, md: 4 }}><TextField fullWidth label="Location" value={entry.location} onChange={field("location")} /></Grid>
            <Grid size={{ xs: 12, sm: 4, md: 2 }}><TextField fullWidth label="Cart" value={entry.cart} onChange={field("cart")} placeholder="Cart 1" /></Grid>
            <Grid size={{ xs: 12, sm: 8, md: 4 }}>
              <Select fullWidth displayEmpty value={entry.captainId ?? ""} onChange={(e) => onAssignCaptain(entry.id, e.target.value)}>
                <MenuItem value=""><em>No day captain</em></MenuItem>
                {captains.map((captain, index) => <MenuItem key={captain.id} value={captain.id}>{captain.name || `Captain ${index + 1}`} {captain.from || captain.to ? `(${captain.from || "?"}ΓÇô${captain.to || "?"})` : ""}</MenuItem>)}
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


