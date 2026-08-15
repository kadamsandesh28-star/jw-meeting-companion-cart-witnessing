import {
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { Territory } from "../types/territory";

import AssignmentInformation from "./AssignmentInformation";
import BasicInformation from "./BasicInformation";

interface TerritoryFormProps {
  territory: Territory;
  onChange: (territory: Territory) => void;
}

export default function TerritoryForm({
  territory,
  onChange,
}: TerritoryFormProps) {
  function handleAttachment(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const isPdf =
      file.type === "application/pdf";

    const isImage =
      file.type.startsWith("image/");

    if (!isPdf && !isImage) {
      alert(
        "Please attach a PDF or image file."
      );

      event.target.value = "";
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      const result =
        reader.result;

      if (
        typeof result !== "string"
      ) {
        return;
      }

      onChange({
        ...territory,

        attachment: {
          name: file.name,

          type: isPdf
            ? "pdf"
            : "image",

          data: result,
        },

        updatedAt:
          new Date().toISOString(),
      });
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  }

  function removeAttachment() {
    const updated = {
      ...territory,
    };

    delete updated.attachment;

    onChange({
      ...updated,
      updatedAt:
        new Date().toISOString(),
    });
  }

  return (
    <Stack spacing={3}>
      <BasicInformation
        territory={territory}
        onChange={onChange}
      />

      <AssignmentInformation
        territory={territory}
        onChange={onChange}
      />

      <Divider />

      <Stack spacing={1.5}>
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Territory Map
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Attach the territory map as a
          PDF or image so it stays with
          this territory.
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          alignItems={{
            xs: "stretch",
            sm: "center",
          }}
        >
          <Button
            component="label"
            variant="outlined"
            startIcon={
              <AttachFileRoundedIcon />
            }
          >
            {territory.attachment
              ? "Replace Map"
              : "Attach Map"}

            <input
              hidden
              type="file"
              accept=".pdf,image/png,image/jpeg,image/jpg"
              onChange={
                handleAttachment
              }
            />
          </Button>

          {territory.attachment && (
            <Button
              color="error"
              variant="outlined"
              startIcon={
                <DeleteOutlineRoundedIcon />
              }
              onClick={
                removeAttachment
              }
            >
              Remove
            </Button>
          )}
        </Stack>

        {territory.attachment && (
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              fontWeight: 600,
            }}
          >
            📎{" "}
            {territory.attachment.name}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}