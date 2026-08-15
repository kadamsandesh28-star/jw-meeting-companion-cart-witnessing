import {
  IconButton,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DepartmentWorkTemplate } from "../models/DepartmentWorkTemplate";

interface WorkTemplateTableProps {
  templates: DepartmentWorkTemplate[];
  onEdit: (template: DepartmentWorkTemplate) => void;
  onDelete: (template: DepartmentWorkTemplate) => void;
  onToggleActive: (
    template: DepartmentWorkTemplate,
    active: boolean
  ) => void;
}

export default function WorkTemplateTable({
  templates,
  onEdit,
  onDelete,
  onToggleActive,
}: WorkTemplateTableProps) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6">
          Work Templates
        </Typography>

        {templates.length === 0 ? (
          <Typography color="text.secondary">
            No work templates have been created for this
            department.
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Work</TableCell>
                <TableCell>Default Location</TableCell>
                <TableCell align="center">
                  Active
                </TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>{template.name}</TableCell>

                  <TableCell>
                    {template.defaultLocation || "-"}
                  </TableCell>

                  <TableCell align="center">
                    <Switch
                      checked={template.active}
                      onChange={(event) =>
                        onToggleActive(
                          template,
                          event.target.checked
                        )
                      }
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => onEdit(template)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() =>
                          onDelete(template)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Stack>
    </Paper>
  );
}