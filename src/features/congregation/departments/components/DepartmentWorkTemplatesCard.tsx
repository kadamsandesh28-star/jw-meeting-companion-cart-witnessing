import { useState } from "react";
import {
  Alert,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { DepartmentWorkTemplate } from "../models/DepartmentWorkTemplate";
import { departmentWorkTemplateService } from "../services/departmentWorkTemplateService";
import WorkTemplateDialog from "./WorkTemplateDialog";
import WorkTemplateTable from "./WorkTemplateTable";

interface DepartmentWorkTemplatesCardProps {
  departmentId: string;
  templates: DepartmentWorkTemplate[];
  onChanged: () => void;
}

export default function DepartmentWorkTemplatesCard({
  departmentId,
  templates,
  onChanged,
}: DepartmentWorkTemplatesCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedTemplate, setSelectedTemplate] =
    useState<DepartmentWorkTemplate>();

  const handleAdd = () => {
    setSelectedTemplate(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (
    template: DepartmentWorkTemplate
  ) => {
    setSelectedTemplate(template);
    setDialogOpen(true);
  };

  const handleDelete = (
    template: DepartmentWorkTemplate
  ) => {
    if (
      !window.confirm(
        `Delete "${template.name}"?`
      )
    ) {
      return;
    }

    departmentWorkTemplateService.delete(
      template.id
    );

    onChanged();
  };

  const handleToggleActive = (
    template: DepartmentWorkTemplate,
    active: boolean
  ) => {
    departmentWorkTemplateService.update({
      ...template,
      active,
      updatedAt: new Date().toISOString(),
    });

    onChanged();
  };

  const handleSave = (data: {
    name: string;
    defaultLocation: string;
    active: boolean;
  }) => {
    if (selectedTemplate) {
      departmentWorkTemplateService.update({
        ...selectedTemplate,
        name: data.name,
        defaultLocation:
          data.defaultLocation || undefined,
        active: data.active,
        updatedAt: new Date().toISOString(),
      });
    } else {
      departmentWorkTemplateService.create({
        departmentId,
        name: data.name,
        defaultLocation:
          data.defaultLocation || undefined,
        active: data.active,
      });
    }

    onChanged();
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
            Work Templates
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add Work Template
          </Button>
        </Stack>

        <Typography color="text.secondary">
          Work templates define the regular
          assignments performed by this
          department. Once created, they can be
          scheduled and assigned to publishers.
        </Typography>

        {templates.length === 0 && (
          <Alert severity="info">
            <Typography
              variant="subtitle2"
              gutterBottom
            >
              No work templates have been
              created yet.
            </Typography>

            <Typography variant="body2">
              Examples include:
            </Typography>

            <ul style={{ marginTop: 8 }}>
              <li>Audio Mixer</li>
              <li>Platform Microphone</li>
              <li>Camera Operator</li>
              <li>Main Entrance Attendant</li>
            </ul>

            <Typography variant="body2">
              Click <strong>Add Work Template</strong>{" "}
              to create your first template.
            </Typography>
          </Alert>
        )}

        <WorkTemplateTable
          templates={templates}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />

        <WorkTemplateDialog
          open={dialogOpen}
          title={
            selectedTemplate
              ? "Edit Work Template"
              : "Add Work Template"
          }
          template={selectedTemplate}
          onClose={() => setDialogOpen(false)}
          onSave={handleSave}
        />
      </Stack>
    </Paper>
  );
}