import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { publisherService } from "../../publishers/services/publisherService";
import { DepartmentAssignment } from "../models/DepartmentAssignment";
import { DepartmentWorkTemplate } from "../models/DepartmentWorkTemplate";
import { departmentAssignmentService } from "../services/departmentAssignmentService";

import AssignmentDialog from "./AssignmentDialog";
import DepartmentAssignmentsTable from "./DepartmentAssignmentsTable";

interface DepartmentScheduleCardProps {
  departmentId: string;
  memberIds: string[];
  templates: DepartmentWorkTemplate[];
}

export default function DepartmentScheduleCard({
  departmentId,
  memberIds,
  templates,
}: DepartmentScheduleCardProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const assignments = useMemo(
    () =>
      departmentAssignmentService.getByDepartment(
        departmentId
      ),
    [departmentId, refreshKey]
  );

  const publishers = useMemo(
    () =>
      publisherService
        .getAll()
        .filter((publisher) =>
          memberIds.includes(publisher.id)
        ),
    [memberIds]
  );

  const activeTemplates = useMemo(
    () =>
      templates.filter(
        (template) => template.active
      ),
    [templates]
  );

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedAssignment, setSelectedAssignment] =
    useState<DepartmentAssignment>();

  const refresh = () =>
    setRefreshKey((value) => value + 1);

  const handleAdd = () => {
    setSelectedAssignment(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (
    assignment: DepartmentAssignment
  ) => {
    setSelectedAssignment(assignment);
    setDialogOpen(true);
  };

  const handleDelete = (
    assignment: DepartmentAssignment
  ) => {
    if (
      !window.confirm(
        "Delete this assignment?"
      )
    ) {
      return;
    }

    departmentAssignmentService.delete(
      assignment.id
    );

    refresh();
  };

  const handleSave = (data: {
    date: string;
    workTemplateId: string;
    assignedPublisherId?: string;
    location?: string;
    status: DepartmentAssignment["status"];
    notes?: string;
  }) => {
    if (selectedAssignment) {
      departmentAssignmentService.update({
        ...selectedAssignment,
        ...data,
        updatedAt: new Date().toISOString(),
      });
    } else {
      departmentAssignmentService.create({
        departmentId,
        ...data,
      });
    }

    refresh();
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">
            Department Schedule
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            disabled={
              activeTemplates.length === 0
            }
          >
            Add Assignment
          </Button>
        </Stack>

        {activeTemplates.length === 0 && (
          <Alert severity="info">
            Create one or more active work
            templates before scheduling
            assignments.
          </Alert>
        )}

        {activeTemplates.length > 0 &&
          assignments.length === 0 && (
            <Alert severity="info">
              No assignments have been
              scheduled yet. Click{" "}
              <strong>Add Assignment</strong>{" "}
              to create the first one.
            </Alert>
          )}

        <DepartmentAssignmentsTable
          assignments={assignments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <AssignmentDialog
          open={dialogOpen}
          title={
            selectedAssignment
              ? "Edit Assignment"
              : "Add Assignment"
          }
          assignment={selectedAssignment}
          templates={activeTemplates}
          publishers={publishers}
          onClose={() =>
            setDialogOpen(false)
          }
          onSave={handleSave}
        />
      </Stack>
    </Paper>
  );
}