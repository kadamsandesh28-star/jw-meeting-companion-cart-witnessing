import {
  IconButton,
  Paper,
  Stack,
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

import { DepartmentAssignment } from "../models/DepartmentAssignment";
import { DepartmentWorkTemplate } from "../models/DepartmentWorkTemplate";
import { publisherService } from "../../publishers/services/publisherService";

interface DepartmentScheduleTableProps {
  assignments: DepartmentAssignment[];
  templates: DepartmentWorkTemplate[];

  onEdit: (assignment: DepartmentAssignment) => void;
  onDelete: (assignment: DepartmentAssignment) => void;
}

const publishers = publisherService.getAll();

export default function DepartmentScheduleTable({
  assignments,
  templates,
  onEdit,
  onDelete,
}: DepartmentScheduleTableProps) {
  const getPublisherName = (id?: string) => {
    if (!id) return "-";

    const publisher = publishers.find((p) => p.id === id);

    if (!publisher) return "Unknown Publisher";

    return `${publisher.firstName} ${publisher.lastName}`;
  };

  const getTemplateName = (templateId: string) => {
    const template = templates.find(
      (t) => t.id === templateId
    );

    return template?.name ?? "Unknown Work";
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6">
          Schedule
        </Typography>

        {assignments.length === 0 ? (
          <Typography color="text.secondary">
            No assignments have been scheduled.
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Work</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    {assignment.date}
                  </TableCell>

                  <TableCell>
                    {getTemplateName(
                      assignment.workTemplateId
                    )}
                  </TableCell>

                  <TableCell>
                    {getPublisherName(
                      assignment.assignedPublisherId
                    )}
                  </TableCell>

                  <TableCell>
                    {assignment.location ?? "-"}
                  </TableCell>

                  <TableCell>
                    {assignment.status}
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() =>
                          onEdit(assignment)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() =>
                          onDelete(assignment)
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