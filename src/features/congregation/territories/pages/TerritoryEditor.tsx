import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import TerritoryForm from "../components/TerritoryForm";
import { territoryService } from "../services/territoryService";
import { Territory } from "../types/territory";

function createNewTerritory(): Territory {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),

    number: "",
    name: "",

    type: "Residential",
    status: "Available",

    assignedServiceGroupId: "",

    addressNotes: "",
    mapReference: "",

    lastWorked: "",
    nextDue: "",

    notes: "",

    createdAt: now,
    updatedAt: now,
  };
}

export default function TerritoryEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValue = useMemo(() => {
    if (!id) {
      return createNewTerritory();
    }

    return (
      territoryService.getById(id) ??
      createNewTerritory()
    );
  }, [id]);

  const [territory, setTerritory] =
    useState<Territory>(initialValue);

  const handleSave = () => {
    const updated: Territory = {
      ...territory,
      updatedAt: new Date().toISOString(),
    };

    if (id) {
      territoryService.update(updated);
    } else {
      territoryService.add(updated);
    }

    navigate("/congregation/territories");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          {id
            ? "Edit Territory"
            : "New Territory"}
        </Typography>

        <TerritoryForm
          territory={territory}
          onChange={setTerritory}
        />

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>

          <Button
            variant="outlined"
            onClick={() =>
              navigate("/congregation/territories")
            }
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}