import { TextField } from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function PublisherSearch({
  value,
  onChange,
}: Props) {
  return (
    <TextField
      fullWidth
      margin="normal"
      label="Search Publishers"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}