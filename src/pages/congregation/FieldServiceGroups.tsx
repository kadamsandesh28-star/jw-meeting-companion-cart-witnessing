import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
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
  FieldServiceGroup,
  Publisher,
  loadGroups,
  saveGroups,
  loadPublishers,
} from "../../services/congregationService";

export default function FieldServiceGroups() {
  const [groups, setGroups] =
    useState<FieldServiceGroup[]>(loadGroups());

  const [publishers] =
    useState<Publisher[]>(loadPublishers());

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  function addGroup() {
    const newGroup: FieldServiceGroup = {
      id: crypto.randomUUID(),
      name: `Group ${groups.length + 1}`,
      overseerId: "",
      assistantId: "",
      publisherIds: [],
    };

    const updated = [...groups, newGroup];

    setGroups(updated);
    saveGroups(updated);
  }

  function updateGroup(
    id: string,
    field: keyof FieldServiceGroup,
    value: any
  ) {
    const updated = groups.map((group) =>
      group.id === id
        ? {
            ...group,
            [field]: value,
          }
        : group
    );

    setGroups(updated);
    saveGroups(updated);
  }

  function deleteGroup(id: string) {
    const updated = groups.filter(
      (group) => group.id !== id
    );

    setGroups(updated);
    saveGroups(updated);

    setDeleteId(null);
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader title="👥 Field Service Groups" />

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={addGroup}
      >
        Add Group
      </Button>

      <Stack spacing={3}>
        {groups.map((group) => (
          <Card key={group.id}>
            <CardContent>
              <Stack spacing={2}>

                <TextField
                  label="Group Name"
                  value={group.name}
                  onChange={(e) =>
                    updateGroup(
                      group.id,
                      "name",
                      e.target.value
                    )
                  }
                />

                <FormControl fullWidth>
                  <InputLabel>
                    Group Overseer
                  </InputLabel>

                  <Select
                    value={group.overseerId}
                    label="Group Overseer"
                    onChange={(e) =>
                      updateGroup(
                        group.id,
                        "overseerId",
                        e.target.value
                      )
                    }
                  >
                    {publishers.map((publisher) => (
                      <MenuItem
                        key={publisher.id}
                        value={publisher.id}
                      >
                        {publisher.firstName}{" "}
                        {publisher.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>
                    Assistant
                  </InputLabel>

                  <Select
                    value={group.assistantId}
                    label="Assistant"
                    onChange={(e) =>
                      updateGroup(
                        group.id,
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
                        {publisher.firstName}{" "}
                        {publisher.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>
                    Publishers
                  </InputLabel>

                  <Select
                    multiple
                    value={group.publisherIds}
                    input={
                      <OutlinedInput label="Publishers" />
                    }
                    renderValue={(selected) =>
                      publishers
                        .filter((p) =>
                          selected.includes(p.id)
                        )
                        .map(
                          (p) =>
                            `${p.firstName} ${p.lastName}`
                        )
                        .join(", ")
                    }
                    onChange={(e) =>
                      updateGroup(
                        group.id,
                        "publisherIds",
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
                          checked={group.publisherIds.includes(
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
                  setDeleteId(group.id)
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
        title="Delete Field Service Group?"
        message="This action cannot be undone."
        onCancel={() =>
          setDeleteId(null)
        }
        onConfirm={() => {
          if (deleteId) {
            deleteGroup(deleteId);
          }
        }}
      />
    </Box>
  );
}