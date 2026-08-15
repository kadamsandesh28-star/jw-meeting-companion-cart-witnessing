import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export default function SearchBar({
  value,
  placeholder = "Search...",
  onChange,
  onClear,
}: SearchBarProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <TextField
        fullWidth
        size="small"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment:
              value && onClear ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={onClear}
                  >
                    ✕
                  </IconButton>
                </InputAdornment>
              ) : undefined,
          },
        }}
      />
    </Paper>
  );
}