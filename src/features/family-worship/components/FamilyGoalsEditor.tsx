import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import {
  Box,
  Button,
  Checkbox,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export interface FamilyGoal {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  value: FamilyGoal[];
  onChange: (
    goals: FamilyGoal[]
  ) => void;
}

export default function FamilyGoalsEditor({
  value,
  onChange,
}: Props) {
  function updateGoal(
    id: string,
    title: string
  ) {
    onChange(
      value.map((goal) =>
        goal.id === id
          ? { ...goal, title }
          : goal
      )
    );
  }

  function toggleGoal(id: string) {
    onChange(
      value.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              completed:
                !goal.completed,
            }
          : goal
      )
    );
  }

  function addGoal() {
    onChange([
      ...value,
      {
        id: crypto.randomUUID(),
        title: "",
        completed: false,
      },
    ]);
  }

  function removeGoal(id: string) {
    if (value.length === 1) {
      return;
    }

    onChange(
      value.filter(
        (goal) => goal.id !== id
      )
    );
  }

  const completedGoals =
    value.filter(
      (goal) => goal.completed
    ).length;

  const totalGoals =
    value.length;

  const progress =
    totalGoals === 0
      ? 0
      : (completedGoals /
          totalGoals) *
        100;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
      }}
    >
      <Stack spacing={3}>
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Family Goals
        </Typography>

        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            mb={1}
          >
            <Typography
              variant="body2"
              fontWeight={600}
            >
              Progress
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {completedGoals} of{" "}
              {totalGoals} completed
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 999,
            }}
          />
        </Box>

        {value.map((goal) => (
          <Stack
            key={goal.id}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Checkbox
              checked={
                goal.completed
              }
              onChange={() =>
                toggleGoal(goal.id)
              }
            />

            <TextField
              fullWidth
              label="Goal"
              value={goal.title}
              onChange={(e) =>
                updateGoal(
                  goal.id,
                  e.target.value
                )
              }
            />

            <IconButton
              color="error"
              disabled={
                value.length === 1
              }
              onClick={() =>
                removeGoal(goal.id)
              }
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Stack>
        ))}

        <Button
          variant="outlined"
          startIcon={
            <AddRoundedIcon />
          }
          onClick={addGoal}
        >
          Add Goal
        </Button>
      </Stack>
    </Paper>
  );
}