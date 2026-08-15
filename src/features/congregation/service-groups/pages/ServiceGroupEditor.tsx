import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import ServiceGroupForm from "../components/ServiceGroupForm";
import { serviceGroupService } from "../services/serviceGroupService";
import { ServiceGroup } from "../types/serviceGroup";

function createNewServiceGroup(): ServiceGroup {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name: "",

    meetingDay: "",
    meetingTime: "",

    overseerPublisherId: "",
    assistantPublisherId: "",

    publisherIds: [],
    territoryIds: [],

    notes: "",

    createdAt: now,
    updatedAt: now,
  };
}

export default function ServiceGroupEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValue = useMemo(() => {
    if (!id) {
      return createNewServiceGroup();
    }

    return (
      serviceGroupService.getById(id) ??
      createNewServiceGroup()
    );
  }, [id]);

  const [serviceGroup, setServiceGroup] =
    useState<ServiceGroup>(initialValue);

  const handleSave = () => {
    const updated: ServiceGroup = {
      ...serviceGroup,
      updatedAt: new Date().toISOString(),
    };

    if (id) {
      serviceGroupService.update(updated);
    } else {
      serviceGroupService.add(updated);
    }

    navigate("/congregation/service-groups");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={4}>
        <Typography variant="h4" fontWeight="bold">
          {id
            ? "Edit Service Group"
            : "New Service Group"}
        </Typography>

        <ServiceGroupForm
          serviceGroup={serviceGroup}
          onChange={setServiceGroup}
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
              navigate("/congregation/service-groups")
            }
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}