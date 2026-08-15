import { useEffect, useMemo, useState } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import NightsStayRoundedIcon from "@mui/icons-material/NightsStayRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import { Box, Fab } from "@mui/material";

import AddScheduleDialog from "../components/AddScheduleDialog";
import ProgressCard from "../components/ProgressCard";
import ScheduleHeader from "../components/ScheduleHeader";
import ScheduleRow from "../components/ScheduleRow";
import ScheduleSection from "../components/ScheduleSection";
import { ScheduleItem } from "../models/ScheduleItem";
import { scheduleService } from "../services/scheduleService";

const defaultItems: ScheduleItem[] = [
  {
    id: "1",
    period: "Morning",
    time: "06:00",
    activity: "Personal Prayer",
    icon: "prayer",
    completed: false,
  },
  {
    id: "2",
    period: "Morning",
    time: "06:15",
    activity: "Bible Reading",
    icon: "bible",
    completed: false,
  },
  {
    id: "3",
    period: "Morning",
    time: "06:30",
    activity: "Daily Text",
    icon: "study",
    completed: false,
  },
  {
    id: "4",
    period: "Morning",
    time: "07:00",
    activity: "Morning Walk",
    icon: "walk",
    completed: false,
  },
  {
    id: "5",
    period: "Morning",
    time: "07:45",
    activity: "Breakfast",
    icon: "breakfast",
    completed: false,
  },
  {
    id: "6",
    period: "Afternoon",
    time: "13:00",
    activity: "Personal Study",
    icon: "study",
    completed: false,
  },
  {
    id: "7",
    period: "Afternoon",
    time: "15:00",
    activity: "Return Visit",
    icon: "ministry",
    completed: false,
  },
  {
    id: "8",
    period: "Evening",
    time: "19:00",
    activity: "Congregation Meeting",
    icon: "meeting",
    completed: false,
  },
  {
    id: "9",
    period: "Evening",
    time: "21:30",
    activity: "Evening Prayer",
    icon: "prayer",
    completed: false,
  },
];

export default function LifeSchedulePage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [editingItem, setEditingItem] =
    useState<ScheduleItem | null>(null);

  const [items, setItems] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const saved = scheduleService.getAll();

    if (saved.length > 0) {
      setItems(saved);
    } else {
      setItems(defaultItems);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      scheduleService.saveAll(items);
    }
  }, [items]);

  function handleToggle(id: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  }

  function handleSave(item: ScheduleItem) {
    setItems((current) => {
      const exists = current.some(
        (x) => x.id === item.id
      );

      const updated = exists
        ? current.map((x) =>
            x.id === item.id ? item : x
          )
        : [...current, item];

      return updated.sort((a, b) =>
        a.time.localeCompare(b.time)
      );
    });

    setEditingItem(null);
    setDialogOpen(false);
  }

  function handleEdit(item: ScheduleItem) {
    setEditingItem(item);
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  const completed = useMemo(
    () =>
      items.filter((item) => item.completed)
        .length,
    [items]
  );

  const morning = items.filter(
    (item) => item.period === "Morning"
  );

  const afternoon = items.filter(
    (item) => item.period === "Afternoon"
  );

  const evening = items.filter(
    (item) => item.period === "Evening"
  );

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: 3,
        pb: 10,
      }}
    >
      <ScheduleHeader />

      <ProgressCard
        completed={completed}
        total={items.length}
      />

      <ScheduleSection
        title="Morning"
        subtitle="Start your day spiritually and positively."
        icon={<WbSunnyRoundedIcon color="warning" />}
      >
        {morning.map((item) => (
          <ScheduleRow
            key={item.id}
            item={item}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ScheduleSection>

      <ScheduleSection
        title="Afternoon"
        subtitle="Continue your day with purpose."
        icon={<LightModeRoundedIcon color="primary" />}
      >
        {afternoon.map((item) => (
          <ScheduleRow
            key={item.id}
            item={item}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ScheduleSection>

      <ScheduleSection
        title="Evening"
        subtitle="Wind down and reflect on your day."
        icon={<NightsStayRoundedIcon color="secondary" />}
      >
        {evening.map((item) => (
          <ScheduleRow
            key={item.id}
            item={item}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ScheduleSection>

      <Fab
        color="primary"
        onClick={() => {
          setEditingItem(null);
          setDialogOpen(true);
        }}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
        }}
      >
        <AddRoundedIcon />
      </Fab>

      <AddScheduleDialog
        open={dialogOpen}
        item={editingItem}
        onClose={() => {
          setDialogOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
      />
    </Box>
  );
}