import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

const STORAGE_KEYS = {
  active: "jw-goals-active",
  progress: "jw-goals-progress",
  completed: "jw-goals-completed",
  prayers: "jw-goals-prayers",
};

export default function Goals() {
  const [tab, setTab] = useState(0);

  const [active, setActive] = useState("");
  const [progress, setProgress] = useState("");
  const [completed, setCompleted] = useState("");
  const [prayers, setPrayers] = useState("");

  useEffect(() => {
    setActive(localStorage.getItem(STORAGE_KEYS.active) || "");
    setProgress(localStorage.getItem(STORAGE_KEYS.progress) || "");
    setCompleted(localStorage.getItem(STORAGE_KEYS.completed) || "");
    setPrayers(localStorage.getItem(STORAGE_KEYS.prayers) || "");
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.active, active);
  }, [active]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.progress, progress);
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.completed, completed);
  }, [completed]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.prayers, prayers);
  }, [prayers]);

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
      >
        🎯 Goal Tracker
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Set, monitor, and complete your spiritual goals.
      </Typography>

      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="🎯 Active Goals" />
          <Tab label="📈 Progress" />
          <Tab label="✅ Completed" />
          <Tab label="🙏 Prayer Support" />
        </Tabs>
      </Card>

      {tab === 0 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🎯 Active Goals
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={active}
              placeholder="Record your active spiritual goals..."
              onChange={(e) =>
                setActive(e.target.value)
              }
            />

            <Typography color="success.main" sx={{ mt: 2 }}>
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📈 Progress
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={progress}
              placeholder="Track your progress..."
              onChange={(e) =>
                setProgress(e.target.value)
              }
            />

            <Typography color="success.main" sx={{ mt: 2 }}>
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ✅ Completed Goals
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={completed}
              placeholder="Record completed goals..."
              onChange={(e) =>
                setCompleted(e.target.value)
              }
            />

            <Typography color="success.main" sx={{ mt: 2 }}>
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 3 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🙏 Prayer Support
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={prayers}
              placeholder="Write prayer requests related to your goals..."
              onChange={(e) =>
                setPrayers(e.target.value)
              }
            />

            <Typography color="success.main" sx={{ mt: 2 }}>
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}