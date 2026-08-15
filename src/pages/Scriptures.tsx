import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { Scripture } from "../types/scripture";
import {
  loadScriptures,
  saveScriptures,
} from "../services/scriptureStorage";

export default function Scriptures() {
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [reference, setReference] = useState("");
  const [category, setCategory] = useState("");
  const [meeting, setMeeting] = useState("");
  const [application, setApplication] = useState("");

  useEffect(() => {
    setScriptures(loadScriptures());
  }, []);

  useEffect(() => {
    saveScriptures(scriptures);
  }, [scriptures]);

  const addScripture = () => {
    if (!reference || !application) return;

    const newScripture: Scripture = {
      id: Date.now().toString(),
      reference,
      category,
      meeting,
      application,
      createdAt: new Date().toISOString(),
    };

    setScriptures([newScripture, ...scriptures]);

    setReference("");
    setCategory("");
    setMeeting("");
    setApplication("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        ⭐ Favorite Scriptures
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            label="Scripture Reference"
            margin="normal"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />

          <TextField
            fullWidth
            label="Category"
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <TextField
            fullWidth
            select
            label="Meeting"
            margin="normal"
            value={meeting}
            onChange={(e) => setMeeting(e.target.value)}
          >
            <MenuItem value="Midweek">Midweek</MenuItem>
            <MenuItem value="Weekend">Weekend</MenuItem>
            <MenuItem value="Personal Study">Personal Study</MenuItem>
          </TextField>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Personal Application"
            margin="normal"
            value={application}
            onChange={(e) => setApplication(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={addScripture}
          >
            Save Scripture
          </Button>
        </CardContent>
      </Card>

      {scriptures.map((scripture) => (
        <Card key={scripture.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {scripture.reference}
            </Typography>

            <Typography>
              <strong>Category:</strong> {scripture.category}
            </Typography>

            <Typography>
              <strong>Meeting:</strong> {scripture.meeting}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              {scripture.application}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}