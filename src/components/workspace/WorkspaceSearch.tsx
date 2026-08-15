import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface WorkspaceSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  title?: string;
}

export default function WorkspaceSearch({
  value,
  onChange,
  placeholder = "Search...",
  title = "Search",
}: WorkspaceSearchProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography
            variant="h6"
            fontWeight={700}
          >
            {title}
          </Typography>

          <TextField
            fullWidth
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}