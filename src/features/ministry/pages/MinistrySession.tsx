import { Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../components/ui/PageHeader";

import MinistrySessionForm from "../components/MinistrySessionForm";
import { useMinistry } from "../hooks/useMinistry";
import { MinistryFormData } from "../types/ministry";

export default function MinistrySession() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    addSession,
    updateSession,
    getSession,
  } = useMinistry();

  const existingSession = id
    ? getSession(id)
    : undefined;

  const isEditing = !!existingSession;

  const handleSave = (data: MinistryFormData) => {
    if (isEditing && id) {
      updateSession(id, data);
    } else {
      addSession(data);
    }

    navigate("/ministry");
  };

  return (
    <Stack spacing={4}>
      <PageHeader
        title={
          isEditing
            ? "Edit Ministry Session"
            : "New Ministry Session"
        }
        subtitle={
          isEditing
            ? "Update your ministry activity."
            : "Record your ministry activity."
        }
      />

      <MinistrySessionForm
        initialValues={existingSession}
        onSave={handleSave}
      />
    </Stack>
  );
}