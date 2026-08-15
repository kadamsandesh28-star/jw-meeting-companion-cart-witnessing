import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { Note } from "../types/note";
import { loadNotes, saveNotes } from "../services/notesStorage";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      category: "General",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        📝 Personal Notes
      </Typography>

      <TextField
        fullWidth
        label="Title"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        InputProps={{
          sx: {
            color: "text.primary",
          },
        }}
      />

      <TextField
        fullWidth
        multiline
        rows={5}
        label="Note"
        margin="normal"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        InputProps={{
          sx: {
            color: "text.primary",
          },
        }}
      />

      <Button
        variant="contained"
        sx={{ mt: 2, mb: 3 }}
        onClick={addNote}
      >
        Add Note
      </Button>

      <List>
        {notes.map((note) => (
          <Paper
            key={note.id}
            elevation={2}
            sx={{
              mb: 2,
              p: 1,
              borderRadius: 2,
            }}
          >
            <ListItem
              secondaryAction={
                <IconButton
                  color="error"
                  onClick={() => deleteNote(note.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={
                  <Typography fontWeight="bold">
                    {note.title}
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary">
                    {note.content}
                  </Typography>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
}