import { Paper, Stack, TextField, Typography } from "@mui/material";

interface NotebookSectionProps {
  title: string;
  icon: string;
  value: string;
  minRows?: number;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function NotebookSection({
  title,
  icon,
  value,
  minRows = 4,
  placeholder,
  onChange,
}: NotebookSectionProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <Stack spacing={0}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: "action.hover",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography fontSize={20}>
            {icon}
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={700}
          >
            {title}
          </Typography>
        </Stack>

        <TextField
          multiline
          fullWidth
          variant="standard"
          minRows={minRows}
          value={value}
          placeholder={placeholder}
          onChange={(e) =>
            onChange(e.target.value)
          }
          InputProps={{
            disableUnderline: true,
            sx: {
              px: 2,
              py: 2,
              alignItems: "flex-start",
            },
          }}
        />
      </Stack>
    </Paper>
  );
}