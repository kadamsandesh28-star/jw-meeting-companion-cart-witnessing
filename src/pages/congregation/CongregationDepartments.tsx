import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import PageHeader from "../../components/PageHeader";
import ConfirmDialog from "../../components/ConfirmDialog";

import {
  Department,
  Publisher,
  loadDepartments,
  saveDepartments,
  loadPublishers,
} from "../../services/congregationService";

export default function CongregationDepartments() {
  const [departments, setDepartments] =
    useState<Department[]>(loadDepartments());

  const [publishers] =
    useState<Publisher[]>(loadPublishers());

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  function addDepartment() {
    const newDepartment: Department = {
      id: crypto.randomUUID(),
      name: "",
      coordinatorId: "",
      assistantId: "",
      memberIds: [],
      notes: "",
    };

    const updated = [...departments, newDepartment];

    setDepartments(updated);
    saveDepartments(updated);
  }

  function updateDepartment(
    id: string,
    field: keyof Department,
    value: any
  ) {
    const updated = departments.map((department) =>
      department.id === id
        ? {
            ...department,
            [field]: value,
          }
        : department
    );

    setDepartments(updated);
    saveDepartments(updated);
  }

  function deleteDepartment(id: string) {
    const updated = departments.filter(
      (department) => department.id !== id
    );

    setDepartments(updated);
    saveDepartments(updated);

    setDeleteId(null);
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader title="🏢 Congregation Departments" />

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={addDepartment}
      >
        Add Department
      </Button>

      <Stack spacing={3}>
        {departments.map((department) => (
          <Card key={department.id}>
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="Department Name"
                  value={department.name}
                  onChange={(e) =>
                    updateDepartment(
                      department.id,
                      "name",
                      e.target.value
                    )
                  }
                />

                <FormControl fullWidth>
                  <InputLabel>Coordinator</InputLabel>

                  <Select
                    value={department.coordinatorId}
                    label="Coordinator"
                    onChange={(e) =>
                      updateDepartment(
                        department.id,
                        "coordinatorId",
                        e.target.value
                      )
                    }
                  >
                    {publishers.map((publisher) => (
                      <MenuItem
                        key={publisher.id}
                        value={publisher.id}
                      >
                        {publisher.firstName} {publisher.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Assistant</InputLabel>

                  <Select
                    value={department.assistantId}
                    label="Assistant"
                    onChange={(e) =>
                      updateDepartment(
                        department.id,
                        "assistantId",
                        e.target.value
                      )
                    }
                  >
                    {publishers.map((publisher) => (
                      <MenuItem
                        key={publisher.id}
                        value={publisher.id}
                      >
                        {publisher.firstName} {publisher.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Members</InputLabel>

                  <Select
                    multiple
                    value={department.memberIds}
                    input={<OutlinedInput label="Members" />}
                    renderValue={(selected) =>
                      publishers
                        .filter((p) => selected.includes(p.id))
                        .map(
                          (p) =>
                            `${p.firstName} ${p.lastName}`
                        )
                        .join(", ")
                    }
                    onChange={(e) =>
                      updateDepartment(
                        department.id,
                        "memberIds",
                        e.target.value
                      )
                    }
                  >
                    {publishers.map((publisher) => (
                      <MenuItem
                        key={publisher.id}
                        value={publisher.id}
                      >
                        <Checkbox
                          checked={department.memberIds.includes(
                            publisher.id
                          )}
                        />

                        <ListItemText
                          primary={`${publisher.firstName} ${publisher.lastName}`}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Notes"
                  multiline
                  minRows={3}
                  value={department.notes}
                  onChange={(e) =>
                    updateDepartment(
                      department.id,
                      "notes",
                      e.target.value
                    )
                  }
                />
              </Stack>
            </CardContent>

            <CardActions
              sx={{
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                color="error"
                onClick={() =>
                  setDeleteId(department.id)
                }
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Stack>

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Department?"
        message="This action cannot be undone."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteDepartment(deleteId);
          }
        }}
      />
    </Box>
  );
}