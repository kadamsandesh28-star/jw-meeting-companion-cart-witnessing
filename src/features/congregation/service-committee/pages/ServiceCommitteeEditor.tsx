import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import ServiceCommitteeForm from "../components/ServiceCommitteeForm";
import { serviceCommitteeService } from "../services/serviceCommitteeService";
import { ServiceCommittee } from "../types/ServiceCommittee";

function createNewServiceCommittee(): ServiceCommittee {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    name: "",

    coordinatorPublisherId: "",
    secretaryPublisherId: "",
    serviceOverseerPublisherId: "",

    memberPublisherIds: [],
    responsibilities: [],

    notes: "",

    createdAt: now,
    updatedAt: now,
  };
}

export default function ServiceCommitteeEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValue = useMemo(() => {
    if (!id) {
      return createNewServiceCommittee();
    }

    return (
      serviceCommitteeService.getById(id) ??
      createNewServiceCommittee()
    );
  }, [id]);

  const [serviceCommittee, setServiceCommittee] =
    useState<ServiceCommittee>(initialValue);

  const handleSave = () => {
    const updated: ServiceCommittee = {
      ...serviceCommittee,
      updatedAt: new Date().toISOString(),
    };

    if (id) {
      serviceCommitteeService.update(updated);
    } else {
      serviceCommitteeService.add(updated);
    }

    navigate("/congregation/service-committee");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={4}>
        <Typography variant="h4" fontWeight="bold">
          {id
            ? "Edit Service Committee"
            : "New Service Committee"}
        </Typography>

        <ServiceCommitteeForm
          serviceCommittee={serviceCommittee}
          onChange={setServiceCommittee}
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
              navigate("/congregation/service-committee")
            }
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}