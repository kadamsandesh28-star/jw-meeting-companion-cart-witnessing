import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import {
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  value: string[];
  onChange: (questions: string[]) => void;
}

export default function DiscussionQuestionsEditor({
  value,
  onChange,
}: Props) {
  function updateQuestion(
    index: number,
    question: string
  ) {
    const updated = [...value];
    updated[index] = question;

    onChange(updated);
  }

  function addQuestion() {
    onChange([...value, ""]);
  }

  function removeQuestion(
    index: number
  ) {
    if (value.length === 1) {
      return;
    }

    onChange(
      value.filter((_, i) => i !== index)
    );
  }

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
          Discussion Questions
        </Typography>

        {value.map(
          (question, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
            >
              <TextField
                fullWidth
                label={`Question ${
                  index + 1
                }`}
                value={question}
                onChange={(event) =>
                  updateQuestion(
                    index,
                    event.target.value
                  )
                }
              />

              <IconButton
                color="error"
                disabled={
                  value.length === 1
                }
                onClick={() =>
                  removeQuestion(index)
                }
              >
                <DeleteRoundedIcon />
              </IconButton>
            </Stack>
          )
        )}

        <Button
          variant="outlined"
          startIcon={<AddRoundedIcon />}
          onClick={addQuestion}
        >
          Add Question
        </Button>
      </Stack>
    </Paper>
  );
}