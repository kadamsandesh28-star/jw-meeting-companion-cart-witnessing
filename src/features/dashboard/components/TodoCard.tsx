import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { TodoItem } from "../models/TodoItem";
import { todoService } from "../services/todoService";

export default function TodoCard() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    setTodos(todoService.getAll());
  }, []);

  const addTask = () => {
    const title = task.trim();

    if (!title) return;

    setTodos(todoService.add(title));
    setTask("");
  };

  const toggleTask = (id: string) => {
    setTodos(todoService.toggle(id));
  };

  const deleteTask = (id: string) => {
    setTodos(todoService.remove(id));
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          ✅ Today's To-Do
        </Typography>

        <Stack
          direction="row"
          spacing={1.5}
          mb={3}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Add a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <Button
            variant="contained"
            onClick={addTask}
            startIcon={<AddRoundedIcon />}
          >
            Add
          </Button>
        </Stack>

        <List disablePadding>
          {todos.length === 0 && (
            <Typography
              color="text.secondary"
              align="center"
              py={4}
            >
              No tasks yet.
            </Typography>
          )}

          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              disablePadding
              sx={{
                py: 0.5,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  width: "100%",
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTask(todo.id)}
                />

                <Typography
                  sx={{
                    flexGrow: 1,
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                    color: todo.completed
                      ? "text.secondary"
                      : "text.primary",
                  }}
                >
                  {todo.title}
                </Typography>

                <IconButton
                  color="error"
                  onClick={() => deleteTask(todo.id)}
                  sx={{
                    flexShrink: 0,
                    alignSelf: "center",
                  }}
                >
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </Stack>
            </ListItem>
          ))}
        </List>

        <Box mt={2}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {todos.filter((t) => !t.completed).length} task(s) remaining
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}