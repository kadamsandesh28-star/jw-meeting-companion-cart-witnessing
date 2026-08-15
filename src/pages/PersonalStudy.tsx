import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  loadPersonalStudy,
  savePersonalStudy,
} from "../services/personalStudyService";

export default function PersonalStudy() {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const study = loadPersonalStudy();

    setBook(study.currentBook);
    setChapter(study.currentChapter);
    setNotes(study.readingNotes);
  }, []);

  const save = () => {
    savePersonalStudy({
      currentBook: book,
      currentChapter: chapter,
      readingNotes: notes,
    });

    alert("✅ Personal Study saved.");
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
        <Typography
          variant="h4"
          gutterBottom
        >
          📚 Personal Study
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Keep track of your Bible reading and study notes.
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Bible Book"
            value={book}
            onChange={(e) =>
              setBook(e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Chapter"
            type="number"
            value={chapter}
            onChange={(e) =>
              setChapter(Number(e.target.value))
            }
            fullWidth
          />

          <TextField
            label="Study Notes"
            multiline
            rows={8}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            fullWidth
          />

          <Button
            variant="contained"
            onClick={save}
          >
            💾 Save Study
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}