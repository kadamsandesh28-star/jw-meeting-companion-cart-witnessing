import { Stack, TextField } from "@mui/material";

import { StudyNotebook } from "../models/StudyNotebook";

interface NotebookSectionsProps {
  notebook: StudyNotebook;
  onChange: (notebook: StudyNotebook) => void;
}

export default function NotebookSections({
  notebook,
  onChange,
}: NotebookSectionsProps) {
  const updateField = (
    field: keyof StudyNotebook,
    value: string
  ) => {
    onChange({
      ...notebook,
      [field]: value,
    });
  };

  return (
    <Stack spacing={3}>
      <TextField
        label="🎯 Objective"
        multiline
        minRows={3}
        fullWidth
        value={notebook.objective}
        onChange={(e) =>
          updateField("objective", e.target.value)
        }
      />

      <TextField
        label="❓ Questions"
        multiline
        minRows={4}
        fullWidth
        value={notebook.questions}
        onChange={(e) =>
          updateField("questions", e.target.value)
        }
      />

      <TextField
        label="📚 Research"
        multiline
        minRows={6}
        fullWidth
        value={notebook.research}
        onChange={(e) =>
          updateField("research", e.target.value)
        }
      />

      <TextField
        label="💡 Application"
        multiline
        minRows={4}
        fullWidth
        value={notebook.application}
        onChange={(e) =>
          updateField("application", e.target.value)
        }
      />

      <TextField
        label="🙏 Prayer"
        multiline
        minRows={3}
        fullWidth
        value={notebook.prayer}
        onChange={(e) =>
          updateField("prayer", e.target.value)
        }
      />

      <TextField
        label="📝 Notes"
        multiline
        minRows={8}
        fullWidth
        value={notebook.notes}
        onChange={(e) =>
          updateField("notes", e.target.value)
        }
      />
    </Stack>
  );
}    