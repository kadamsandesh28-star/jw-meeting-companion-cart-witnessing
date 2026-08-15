import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import BodyMemberForm from "../components/BodyMemberForm";
import { bodyMemberService } from "../services/bodyMemberService";
import { BodyMember } from "../types/bodyMember";

function createNewBodyMember(): BodyMember {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),

    publisherId: "",

    role: "Elder",

    appointmentDate: "",

    active: true,

    notes: "",

    createdAt: now,
    updatedAt: now,
  };
}

export default function BodyMemberEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValue = useMemo(() => {
    if (!id) {
      return createNewBodyMember();
    }

    return (
      bodyMemberService.getById(id) ??
      createNewBodyMember()
    );
  }, [id]);

  const [member, setMember] =
    useState<BodyMember>(initialValue);

  const handleSave = () => {
    const updated: BodyMember = {
      ...member,
      updatedAt: new Date().toISOString(),
    };

    if (id) {
      bodyMemberService.update(updated);
    } else {
      bodyMemberService.add(updated);
    }

    navigate("/congregation/body-of-elders");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          {id
            ? "Edit Body Member"
            : "New Body Member"}
        </Typography>

        <BodyMemberForm
          member={member}
          onChange={setMember}
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
              navigate("/congregation/body-of-elders")
            }
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}