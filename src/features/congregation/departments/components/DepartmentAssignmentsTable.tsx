import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DepartmentAssignment } from "../models/DepartmentAssignment";
import { departmentWorkTemplateService } from "../services/departmentWorkTemplateService";
import { publisherService } from "../../publishers/services/publisherService";

interface DepartmentAssignmentsTableProps {
  assignments: DepartmentAssignment[];

  onEdit?: (assignment: DepartmentAssignment) => void;

  onDelete?: (assignment: DepartmentAssignment) => void;
}

export default function DepartmentAssignmentsTable({
  assignments,
  onEdit,
  onDelete,
}: DepartmentAssignmentsTableProps) {
  const publishers = publisherService.getAll();
  const templates =
    departmentWorkTemplateService.getAll();

  const getPublisherName = (publisherId?: string) => {
    if (!publisherId) return "-";

    const publisher = publishers.find(
      (p) => p.id === publisherId
    );

    if (!publisher) return "-";

    return `${publisher.firstName} ${publisher.lastName}`;
  };

  const getWorkTemplateName = (
    templateId: string
  ) => {
    const template = templates.find(
      (t) => t.id === templateId
    );

    return template?.name ?? "-";
  };

  const getStatusColor = (
    status: DepartmentAssignment["status"]
  ) => {
    switch (status) {
      case "Completed":
        return "success";

      case "Cancelled":
        return "error";

      default:
        return "warning";
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography
        variant="h6"
        gutterBottom
      >
        Department Assignments
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Work</TableCell>
            <TableCell>Brother</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {assignments.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
              >
                No assignments scheduled.
              </TableCell>
            </TableRow>
          ) : (
            assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  {assignment.date}
                </TableCell>

                <TableCell>
                  {getWorkTemplateName(
                    assignment.workTemplateId
                  )}
                </TableCell>

                <TableCell>
                  {getPublisherName(
                    assignment.assignedPublisherId
                  )}
                </TableCell>

                <TableCell>
                  {assignment.location || "-"}
                </TableCell>

                <TableCell>
                  <Chip
                    size="small"
                    label={assignment.status}
                    color={getStatusColor(
                      assignment.status
                    )}
                  />
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() =>
                      onEdit?.(assignment)
                    }
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      onDelete?.(assignment)
                    }
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}