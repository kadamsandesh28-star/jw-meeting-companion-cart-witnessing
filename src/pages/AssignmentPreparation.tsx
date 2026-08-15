import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import {
  loadAssignmentPreparation,
  saveAssignmentPreparation,
} from "../services/assignmentNotes";

export default function AssignmentPreparation() {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state?.id ?? "";
  const title = location.state?.title ?? "Assignment";
  const minutes = location.state?.minutes ?? 2;

  const [scripture, setScripture] = useState("");
  const [objective, setObjective] = useState("");
  const [notes, setNotes] = useState("");
  const [reminder, setReminder] = useState("");

  useEffect(() => {
    const data = loadAssignmentPreparation();

    if (data[id]) {
      setScripture(data[id].scripture);
      setObjective(data[id].objective);
      setNotes(data[id].notes);
      setReminder(data[id].reminder);
    }
  }, [id]);

  const save = () => {
    saveAssignmentPreparation(id, {
      scripture,
      objective,
      notes,
      reminder,
    });

    alert("✅ Preparation saved.");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          ⏱ {minutes} Minutes
        </Typography>

        <TextField
          label="📖 Key Scripture"
          fullWidth
          value={scripture}
          onChange={(e) => setScripture(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TextField
          label="🎯 Objective"
          fullWidth
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TextField
          label="📝 Preparation Notes"
          multiline
          rows={6}
          fullWidth
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TextField
          label="💡 Personal Reminder"
          multiline
          rows={3}
          fullWidth
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={save}
        >
          💾 Save
        </Button>

        <Button
          variant="outlined"
          onClick={() =>
            navigate("/practice-timer", {
              state: {
                id,
                title,
                minutes,
              },
            })
          }
        >
          ▶ Start Practice
        </Button>
      </Paper>
    </Box>
  );
}