import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

interface Props {
  role: string;
  status: string;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function PublisherFilters({
  role,
  status,
  onRoleChange,
  onStatusChange,
}: Props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      my={2}
    >
      <FormControl sx={{ minWidth: 220 }}>
        <InputLabel>Role</InputLabel>

        <Select
          value={role}
          label="Role"
          onChange={(e) => onRoleChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Publisher">Publisher</MenuItem>
          <MenuItem value="Ministerial Servant">
            Ministerial Servant
          </MenuItem>
          <MenuItem value="Elder">
            Elder
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Status</InputLabel>

        <Select
          value={status}
          label="Status"
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}