import { useEffect, useMemo, useState } from "react";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { usePublishers } from "../hooks/usePublishers";
import { useMinistry } from "../../ministry/hooks/useMinistry";
import { loadCartWitnessingSchedules } from "../cart-witnessing/storage/cartWitnessingStorage";

const NAVY = "#08245b";
const GOLD = "#d99a20";
const PAGE = "#f5f8fc";
const BORDER = "#d9e2ef";
const MUTED = "#64748b";

function unwrapArray(value: unknown): any[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    for (const key of ["publishers", "items", "data", "records", "entries", "sessions"]) {
      if (Array.isArray(obj[key])) return obj[key] as any[];
    }
  }
  return [];
}

function unwrapObject(value: unknown): Record<string, any> {
  if (value && typeof value === "object") return value as Record<string, any>;
  return {};
}

function firstNumber(source: unknown, keys: string[]): number | null {
  const obj = unwrapObject(source);
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return null;
}


function pioneerKind(p: any) {
  const raw = String(
    p?.status ??
      p?.publisherStatus ??
      p?.serviceStatus ??
      p?.pioneerStatus ??
      p?.privilege ??
      ""
  ).toLowerCase();

  if (raw.includes("regular") && raw.includes("pioneer")) return "regular";
  if (raw.includes("auxiliary") && raw.includes("pioneer")) return "auxiliary";
  if (raw === "regularpioneer" || raw === "regular_pioneer") return "regular";
  if (raw === "auxiliarypioneer" || raw === "auxiliary_pioneer") return "auxiliary";
  return "";
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  accent = NAVY,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  accent?: string;
}) {
  return (
    <Card elevation={0} sx={{ height: "100%", border: `1px solid ${BORDER}`, borderRadius: 3 }}>
      <CardContent sx={{ p: 2.25 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography sx={{ fontSize: 12, fontWeight: 800, color: MUTED, letterSpacing: .5, textTransform: "uppercase" }}>
              {title}
            </Typography>
            <Typography sx={{ mt: .6, fontSize: { xs: 27, md: 32 }, lineHeight: 1.05, fontWeight: 900, color: NAVY }}>
              {value}
            </Typography>
            <Typography sx={{ mt: .8, fontSize: 12.5, color: MUTED }}>{subtitle}</Typography>
          </Box>
          <Box sx={{ width: 44, height: 44, borderRadius: 2.5, display: "grid", placeItems: "center", background: `${accent}12`, color: accent }}>
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function Panel({ children, sx = {} }: { children: React.ReactNode; sx?: any }) {
  return (
    <Card elevation={0} sx={{ border: `1px solid ${BORDER}`, borderRadius: 3, height: "100%", ...sx }}>
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>{children}</CardContent>
    </Card>
  );
}

function AttendanceChart({ values }: { values: number[] }) {
  const safe = values.length ? values : [0];
  const width = 760;
  const height = 250;
  const left = 42;
  const right = 18;
  const top = 22;
  const bottom = 38;
  const max = Math.max(10, ...safe);
  const min = 0;
  const points = safe.map((value, index) => {
    const x = left + (index * (width - left - right)) / Math.max(1, safe.length - 1);
    const y = top + ((max - value) * (height - top - bottom)) / Math.max(1, max - min);
    return `${x},${y}`;
  }).join(" ");

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-label="Report activity trend">
        {[0, Math.round(max / 2), max].map((tick) => {
          const y = top + ((max - tick) * (height - top - bottom)) / Math.max(1, max - min);
          return (
            <g key={tick}>
              <line x1={left} x2={width - right} y1={y} y2={y} stroke="#e7edf5" strokeWidth="1" />
              <text x="4" y={y + 4} fontSize="11" fill={MUTED}>{tick}</text>
            </g>
          );
        })}
        <polyline points={points} fill="none" stroke={NAVY} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {safe.map((value, index) => {
          const x = left + (index * (width - left - right)) / Math.max(1, safe.length - 1);
          const y = top + ((max - value) * (height - top - bottom)) / Math.max(1, max - min);
          return <circle key={index} cx={x} cy={y} r="5" fill={GOLD} stroke="#fff" strokeWidth="3" />;
        })}
      </svg>
    </Box>
  );
}

function Bars({ values }: { values: { label: string; value: number }[] }) {
  const max = Math.max(1, ...values.map((x) => x.value));
  return (
    <Stack spacing={2}>
      {values.map((item) => (
        <Box key={item.label}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: .7 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{item.label}</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 800, color: NAVY }}>{item.value}</Typography>
          </Stack>
          <Box sx={{ height: 10, borderRadius: 99, background: "#edf2f8", overflow: "hidden" }}>
            <Box sx={{ width: `${(item.value / max) * 100}%`, height: "100%", borderRadius: 99, background: NAVY }} />
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

export default function Reports() {
  const [period, setPeriod] = useState("This Month");
  const [reportType, setReportType] = useState("All Reports");
  const [refresh, setRefresh] = useState(0);

  // These hooks are the app's existing data sources. The loose unwrapping keeps
  // this report page tolerant of the existing hook return shapes.
  const publisherHook = usePublishers() as any;
  const ministryHook = useMinistry() as any;

  const publishers = useMemo(
    () => unwrapArray(publisherHook?.publishers ?? publisherHook),
    [publisherHook, refresh]
  );

  const ministryRecords = useMemo(
    () => unwrapArray(ministryHook?.sessions ?? ministryHook?.records ?? ministryHook?.data ?? ministryHook),
    [ministryHook, refresh]
  );

  const ministryStats = useMemo(
    () => ministryHook?.stats ?? ministryHook?.statistics ?? ministryHook?.monthlyStats ?? {},
    [ministryHook, refresh]
  );

  const cartSchedules = useMemo(() => {
    try {
      return loadCartWitnessingSchedules();
    } catch {
      return [];
    }
  }, [refresh]);

  const publisherCount = publishers.length;
  const regularPioneers = publishers.filter((p) => pioneerKind(p) === "regular").length;
  const auxiliaryPioneers = publishers.filter((p) => pioneerKind(p) === "auxiliary").length;
  const pioneerCount = regularPioneers + auxiliaryPioneers;

  const ministrySessions =
    firstNumber(ministryStats, ["sessions", "totalSessions", "sessionCount"]) ??
    ministryRecords.length;

  const ministryHours =
    firstNumber(ministryStats, ["hours", "totalHours", "serviceHours", "hoursThisMonth"]);

  const returnVisits =
    firstNumber(ministryStats, ["returnVisits", "totalReturnVisits"]) ??
    ministryRecords.reduce((n, r) => n + (Number(r?.returnVisits ?? r?.returnVisitCount) || 0), 0);

  const bibleStudies =
    firstNumber(ministryStats, ["bibleStudies", "totalBibleStudies"]) ??
    ministryRecords.reduce((n, r) => n + (Number(r?.bibleStudies ?? r?.bibleStudyCount) || 0), 0);

  const cartEntries = cartSchedules.flatMap((schedule: any) => schedule?.entries ?? []);
  const cartParticipants = new Set(
    cartEntries.flatMap((entry: any) => {
      const names = [
        entry?.publisherName,
        entry?.assignedBrother,
        entry?.brother,
        entry?.captainName,
      ].filter(Boolean);
      return names.map((x) => String(x).trim()).filter(Boolean);
    })
  ).size;

  const cartSessions = cartEntries.length;

  const trend = useMemo(() => {
    const buckets = Array.from({ length: 8 }, () => 0);
    ministryRecords.forEach((record: any) => {
      const dateValue = record?.date ?? record?.sessionDate ?? record?.createdAt;
      if (!dateValue) return;
      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return;
      const week = Math.max(0, Math.min(7, Math.floor((date.getDate() - 1) / 4)));
      buckets[week] += 1;
    });
    return buckets;
  }, [ministryRecords]);

  const activityBars = [
    { label: "Publishers", value: publisherCount },
    { label: "Pioneers", value: pioneerCount },
    { label: "Ministry sessions", value: ministrySessions },
    { label: "Cart sessions", value: cartSessions },
    { label: "Return visits", value: returnVisits },
    { label: "Bible studies", value: bibleStudies },
  ];

  const reportTypes = [
    "All Reports",
    "Publishers",
    "Pioneers",
    "Meeting Attendance",
    "Field Ministry",
    "Cart Witnessing",
    "Assignments",
  ];

  useEffect(() => {
    const timer = window.setInterval(() => setRefresh((x) => x + 1), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Box sx={{ minHeight: "100%", background: PAGE, p: { xs: 2, md: 3.5 } }}>
      <Box sx={{ maxWidth: 1500, mx: "auto" }}>
        <Stack direction={{ xs: "column", lg: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", lg: "center" }} spacing={2} sx={{ mb: 3 }}>
          <Box>
            <Stack direction="row" spacing={1.2} alignItems="center">
              <Box sx={{ width: 42, height: 42, borderRadius: 2.5, display: "grid", placeItems: "center", background: NAVY, color: "#fff" }}>
                <AssessmentRoundedIcon />
              </Box>
              <Box>
                <Typography sx={{ color: NAVY, fontWeight: 900, fontSize: { xs: 25, md: 31 }, lineHeight: 1.1 }}>
                  Congregation Reports
                </Typography>
                <Typography sx={{ color: MUTED, fontSize: 13.5, mt: .4 }}>
                  Live overview from the congregation records maintained in this app.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
                <MenuItem value="This Week">This Week</MenuItem>
                <MenuItem value="This Month">This Month</MenuItem>
                <MenuItem value="Last Month">Last Month</MenuItem>
                <MenuItem value="This Year">This Year</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 190 }}>
              <Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                {reportTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
              </Select>
            </FormControl>
            <Button variant="outlined" startIcon={<RefreshRoundedIcon />} onClick={() => setRefresh((x) => x + 1)} sx={{ borderColor: NAVY, color: NAVY, fontWeight: 800, textTransform: "none", borderRadius: 2 }}>
              Refresh
            </Button>
            <Button variant="outlined" startIcon={<DownloadRoundedIcon />} onClick={() => window.print()} sx={{ borderColor: NAVY, color: NAVY, fontWeight: 800, textTransform: "none", borderRadius: 2 }}>
              Print / Export
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard title="Publishers" value={String(publisherCount)} subtitle="Current publisher records" icon={<GroupsRoundedIcon />} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard title="Pioneers" value={String(pioneerCount)} subtitle={`${regularPioneers} regular · ${auxiliaryPioneers} auxiliary`} icon={<StarRoundedIcon />} accent={GOLD} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard title="Ministry Sessions" value={String(ministrySessions)} subtitle={ministryHours === null ? "Recorded sessions" : `${ministryHours} hours recorded`} icon={<PublicRoundedIcon />} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard title="Cart Witnessing" value={String(cartSessions)} subtitle={`${cartParticipants} participants identified`} icon={<AssignmentRoundedIcon />} accent={GOLD} />
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <Panel>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1} sx={{ mb: 1.5 }}>
                <Box>
                  <Typography sx={{ fontWeight: 900, color: NAVY, fontSize: 18 }}>Ministry Activity Trend</Typography>
                  <Typography sx={{ fontSize: 12.5, color: MUTED }}>Based on recorded ministry sessions</Typography>
                </Box>
                <Chip icon={<CalendarMonthRoundedIcon />} label={period} size="small" variant="outlined" />
              </Stack>
              <Divider sx={{ mb: 1 }} />
              <AttendanceChart values={trend} />
            </Panel>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Panel>
              <Typography sx={{ fontWeight: 900, color: NAVY, fontSize: 18 }}>Congregation Snapshot</Typography>
              <Typography sx={{ fontSize: 12.5, color: MUTED, mb: 2 }}>Live totals from available records</Typography>
              <Stack spacing={1.6}>
                {[
                  ["Publishers", publisherCount],
                  ["Regular pioneers", regularPioneers],
                  ["Auxiliary pioneers", auxiliaryPioneers],
                  ["Return visits", returnVisits],
                  ["Bible studies", bibleStudies],
                ].map(([label, value]) => (
                  <Stack key={label as string} direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: 13, color: "#334155" }}>{label}</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 900, color: NAVY }}>{value}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Panel>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Panel>
              <Typography sx={{ fontWeight: 900, color: NAVY, fontSize: 18, mb: .5 }}>Activity Overview</Typography>
              <Typography sx={{ fontSize: 12.5, color: MUTED, mb: 2.5 }}>Compare live reporting areas</Typography>
              <Bars values={activityBars} />
            </Panel>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Panel>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography sx={{ fontWeight: 900, color: NAVY, fontSize: 18 }}>Meeting Attendance</Typography>
                  <Typography sx={{ fontSize: 12.5, color: MUTED }}>
                    Attendance data is shown only when an attendance record exists.
                  </Typography>
                </Box>
                <EventAvailableRoundedIcon sx={{ color: GOLD, fontSize: 30 }} />
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ p: 2, borderRadius: 2.5, background: "#f7f9fc", border: "1px solid #edf1f6" }}>
                <Typography sx={{ fontWeight: 900, color: NAVY }}>Not recorded in the current report data source</Typography>
                <Typography sx={{ mt: .5, fontSize: 12.5, color: MUTED }}>
                  No invented attendance number is displayed. Once attendance storage is connected, this card and its graph can use the real meeting records.
                </Typography>
              </Box>
            </Panel>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2.5, textAlign: "center", color: MUTED, fontSize: 11.5 }}>
          Reports update automatically when the underlying congregation records change.
        </Box>
      </Box>
    </Box>
  );
}