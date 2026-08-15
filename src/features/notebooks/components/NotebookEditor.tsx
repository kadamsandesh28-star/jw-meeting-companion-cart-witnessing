import {
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { NotebookContent } from "../models/NotebookContent";

interface Props {
  notebook: NotebookContent;

  onChange: (
    notebook: NotebookContent
  ) => void;
}

export default function NotebookEditor({
  notebook,
  onChange,
}: Props) {
  return (
    <Stack spacing={3}>
      {notebook.sections.map((section) => (
        <Paper
          key={section.id}
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={2}>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {section.title}
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={5}
              placeholder={`Write ${section.title.toLowerCase()}...`}
              value={section.content}
              onChange={(e) => {
                const updated =
                  notebook.sections.map((s) =>
                    s.id === section.id
                      ? {
                          ...s,
                          content:
                            e.target.value,
                        }
                      : s
                  );

                onChange({
                  ...notebook,
                  sections: updated,
                });
              }}
            />
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}