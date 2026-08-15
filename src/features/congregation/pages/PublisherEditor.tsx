import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Paper, Stack } from "@mui/material";

import PageContainer from "../../../components/layout/PageContainer";
import PageHeader from "../../../components/layout/PageHeader";

import PublisherForm from "../components/editor/PublisherForm";
import { publisherService } from "../publishers/services/publisherService";
import { Publisher } from "../publishers/types/Publisher";
import { createEmptyPublisher } from "../utils/createEmptyPublisher";

export default function PublisherEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isNew = id === undefined;

  const [publisher, setPublisher] = useState<Publisher>(
    createEmptyPublisher()
  );

  useEffect(() => {
    if (isNew) {
      setPublisher(createEmptyPublisher());
      return;
    }

    const existing = publisherService.getById(id!);

    if (!existing) {
      navigate("/congregation/publishers", { replace: true });
      return;
    }

    setPublisher(existing);
  }, [id, isNew, navigate]);

  function handleSave() {
    if (isNew) {
      publisherService.add(publisher);
    } else {
      publisherService.update(publisher);
    }

    navigate("/congregation/publishers");
  }

  function handleCancel() {
    navigate("/congregation/publishers");
  }

  return (
    <PageContainer>
      <PageHeader
        title={isNew ? "Add Publisher" : "Edit Publisher"}
        subtitle="Publisher Information"
      />

      <Paper
        elevation={1}
        sx={{
          p: {
            xs: 2,
            md: 3,
          },
          borderRadius: 3,
        }}
      >
        <PublisherForm
          publisher={publisher}
          onChange={setPublisher}
        />

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          mt={4}
        >
          <Button onClick={handleCancel}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>
      </Paper>
    </PageContainer>
  );
}