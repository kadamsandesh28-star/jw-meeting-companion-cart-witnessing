import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

export type HistorySort =
  | "newest"
  | "oldest"
  | "title-asc"
  | "title-desc";

interface Props {
  value: string;
  sort: HistorySort;

  onChange: (
    value: string
  ) => void;

  onSortChange: (
    value: HistorySort
  ) => void;
}

export default function HistoryToolbar({
  value,
  sort,
  onChange,
  onSortChange,
}: Props) {
  return (
    <Stack
      spacing={2}
      sx={{ mb: 3 }}
    >
      <TextField
        fullWidth
        placeholder="Search worship sessions..."
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      />

      <FormControl
        size="small"
        sx={{ width: 220 }}
      >
        <Select
          value={sort}
          onChange={(e) =>
            onSortChange(
              e.target.value as HistorySort
            )
          }
        >
          <MenuItem value="newest">
            Newest First
          </MenuItem>

          <MenuItem value="oldest">
            Oldest First
          </MenuItem>

          <MenuItem value="title-asc">
            Title (A–Z)
          </MenuItem>

          <MenuItem value="title-desc">
            Title (Z–A)
          </MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}