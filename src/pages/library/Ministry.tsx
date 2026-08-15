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
  notes: "jw-ministry-notes",
  experiences: "jw-ministry-experiences",
  returnVisits: "jw-ministry-return-visits",
  bibleStudies: "jw-ministry-bible-studies",
  directions: "jw-ministry-directions",
};

export default function Ministry() {
  const [tab, setTab] = useState(0);

  const [notes, setNotes] = useState("");
  const [experiences, setExperiences] = useState("");
  const [returnVisits, setReturnVisits] = useState("");
  const [bibleStudies, setBibleStudies] = useState("");
  const [directions, setDirections] = useState("");

  useEffect(() => {
    setNotes(localStorage.getItem(STORAGE_KEYS.notes) || "");
    setExperiences(
      localStorage.getItem(STORAGE_KEYS.experiences) || ""
    );
    setReturnVisits(
      localStorage.getItem(STORAGE_KEYS.returnVisits) || ""
    );
    setBibleStudies(
      localStorage.getItem(STORAGE_KEYS.bibleStudies) || ""
    );
    setDirections(
      localStorage.getItem(STORAGE_KEYS.directions) || ""
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.notes, notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.experiences,
      experiences
    );
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.returnVisits,
      returnVisits
    );
  }, [returnVisits]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.bibleStudies,
      bibleStudies
    );
  }, [bibleStudies]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.directions,
      directions
    );
  }, [directions]);

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
      >
        🌍 Field Ministry
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Organize your ministry experiences and plans.
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
          <Tab label="🌍 Notes" />
          <Tab label="💬 Experiences" />
          <Tab label="👥 Return Visits" />
          <Tab label="📖 Bible Studies" />
          <Tab label="📋 Directions" />
        </Tabs>
      </Card>

      {tab === 0 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🌍 Ministry Notes
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={notes}
              placeholder="Write your ministry notes..."
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />

            <Typography
              color="success.main"
              sx={{ mt: 2 }}
            >
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              💬 Experiences
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={experiences}
              placeholder="Record encouraging experiences..."
              onChange={(e) =>
                setExperiences(e.target.value)
              }
            />

            <Typography
              color="success.main"
              sx={{ mt: 2 }}
            >
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 2 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              👥 Return Visits
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={returnVisits}
              placeholder="Keep track of return visits..."
              onChange={(e) =>
                setReturnVisits(e.target.value)
              }
            />

            <Typography
              color="success.main"
              sx={{ mt: 2 }}
            >
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 3 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📖 Bible Studies
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={bibleStudies}
              placeholder="Record your Bible study notes..."
              onChange={(e) =>
                setBibleStudies(e.target.value)
              }
            />

            <Typography
              color="success.main"
              sx={{ mt: 2 }}
            >
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}

      {tab === 4 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📋 Theocratic Directions
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={directions}
              placeholder="Record important theocratic directions..."
              onChange={(e) =>
                setDirections(e.target.value)
              }
            />

            <Typography
              color="success.main"
              sx={{ mt: 2 }}
            >
              ✅ Saved Automatically
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}