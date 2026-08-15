import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import PageHeader from "../../components/PageHeader";
import ConfirmDialog from "../../components/ConfirmDialog";

import {
  ShepherdingRecord,
  Publisher,
  loadShepherding,
  saveShepherding,
  loadPublishers,
} from "../../services/congregationService";

export default function ShepherdingPlanner() {
  const [records, setRecords] =
    useState<ShepherdingRecord[]>(loadShepherding());

  const [publishers] =
    useState<Publisher[]>(loadPublishers());

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  function addRecord() {
    const newRecord: ShepherdingRecord = {
      id: crypto.randomUUID(),
      publisherId: "",
      elderId: "",
      lastVisit: "",
      nextVisit: "",
      notes: "",
    };

    const updated = [...records, newRecord];

    setRecords(updated);
    saveShepherding(updated);
  }

  function updateRecord(
    id: string,
    field: keyof ShepherdingRecord,
    value: any
  ) {
    const updated = records.map((record) =>
      record.id === id
        ? {
            ...record,
            [field]: value,
          }
        : record
    );

    setRecords(updated);
    saveShepherding(updated);
  }

  function deleteRecord(id: string) {
    const updated = records.filter(
      (record) => record.id !== id
    );

    setRecords(updated);
    saveShepherding(updated);

    setDeleteId(null);
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader title="🐑 Shepherding Planner" />

      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={addRecord}
      >
        Add Shepherding Record
      </Button>

      <Stack spacing={3}>
        {records.map((record) => (
          <Card key={record.id}>
            <CardContent>
              <Stack spacing={2}>

                <FormControl fullWidth>
                  <InputLabel>Publisher</InputLabel>

                  <Select
                    value={record.publisherId}
                    label="Publisher"
                    onChange={(e) =>
                      updateRecord(
                        record.id,
                        "publisherId",
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
                  <InputLabel>Assigned Elder</InputLabel>

                  <Select
                    value={record.elderId}
                    label="Assigned Elder"
                    onChange={(e) =>
                      updateRecord(
                        record.id,
                        "elderId",
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

                <TextField
                  label="Last Visit"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={record.lastVisit}
                  onChange={(e) =>
                    updateRecord(
                      record.id,
                      "lastVisit",
                      e.target.value
                    )
                  }
                />

                <TextField
                  label="Next Visit"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={record.nextVisit}
                  onChange={(e) =>
                    updateRecord(
                      record.id,
                      "nextVisit",
                      e.target.value
                    )
                  }
                />

                <TextField
                  label="Encouragement / Notes"
                  multiline
                  minRows={4}
                  value={record.notes}
                  onChange={(e) =>
                    updateRecord(
                      record.id,
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
                  setDeleteId(record.id)
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
        title="Delete Shepherding Record?"
        message="This action cannot be undone."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteRecord(deleteId);
          }
        }}
      />
    </Box>
  );
}