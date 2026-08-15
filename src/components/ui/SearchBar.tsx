import { ChangeEvent } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export interface SearchBarProps
  extends Omit<TextFieldProps, "value" | "onChange"> {
  /** Current search text */
  value: string;

  /** Called when the search text changes */
  onChange: (value: string) => void;

  /** Placeholder text */
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  ...textFieldProps
}: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const clearSearch = () => {
    onChange("");
  };

  return (
    <TextField
      {...textFieldProps}
      fullWidth
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment:
            value.length > 0 ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined,
        },
      }}
    />
  );
}