import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";

interface SessionActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function SessionActions({
  onEdit,
  onDelete,
}: SessionActionsProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
    >
      <Tooltip title="Edit Session">
        <IconButton
          size="small"
          color="primary"
          onClick={(event) => {
            event.stopPropagation();
            onEdit();
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete Session">
        <IconButton
          size="small"
          color="error"
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}