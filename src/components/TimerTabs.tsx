import { Tabs, Tab, Paper } from "@mui/material";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function TimerTabs({
  value,
  onChange,
}: Props) {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        mb: 3,
      }}
    >
      <Tabs
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        variant="fullWidth"
      >
        <Tab label="📚 Midweek" />
        <Tab label="📖 Weekend" />
        <Tab label="⏱ Stopwatch" />
      </Tabs>
    </Paper>
  );
}