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
  understanding: "jw-understanding-main",
  questions: "jw-understanding-questions",
  scriptures: "jw-understanding-scriptures",
  applications: "jw-understanding-applications",
};

export default function Understanding() {
  const [tab, setTab] = useState(0);

  const [understanding, setUnderstanding] = useState("");
  const [questions, setQuestions] = useState("");
  const [scriptures, setScriptures] = useState("");
  const [applications, setApplications] = useState("");

  useEffect(() => {
    setUnderstanding(
      localStorage.getItem(STORAGE_KEYS.understanding) || ""
    );

    setQuestions(
      localStorage.getItem(STORAGE_KEYS.questions) || ""
    );

    setScriptures(
      localStorage.getItem(STORAGE_KEYS.scriptures) || ""
    );

    setApplications(
      localStorage.getItem(STORAGE_KEYS.applications) || ""
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.understanding,
      understanding
    );
  }, [understanding]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.questions,
      questions
    );
  }, [questions]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.scriptures,
      scriptures
    );
  }, [scriptures]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.applications,
      applications
    );
  }, [applications]);

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
      >
        📖 Scriptural Understanding
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Develop and record your personal understanding.
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
          <Tab label="📝 Understanding" />
          <Tab label="❓ Questions" />
          <Tab label="📖 Scriptures" />
          <Tab label="💡 Applications" />
        </Tabs>
      </Card>

      {tab === 0 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              📝 My Understanding
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={understanding}
              placeholder="Write your understanding..."
              onChange={(e) =>
                setUnderstanding(e.target.value)
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
            <Typography
              variant="h6"
              gutterBottom
            >
              ❓ Questions
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={questions}
              placeholder="Questions to research later..."
              onChange={(e) =>
                setQuestions(e.target.value)
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
            <Typography
              variant="h6"
              gutterBottom
            >
              📖 Key Scriptures
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={scriptures}
              placeholder="Record scriptures..."
              onChange={(e) =>
                setScriptures(e.target.value)
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
            <Typography
              variant="h6"
              gutterBottom
            >
              💡 Personal Applications
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={12}
              value={applications}
              placeholder="How can I apply this?"
              onChange={(e) =>
                setApplications(e.target.value)
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