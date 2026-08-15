import {
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  NOTEBOOK_TEMPLATES,
  NotebookTemplate,
} from "../models/NotebookTemplate";
import NotebookTemplateCard from "./NotebookTemplateCard";

interface Props {
  onSelect: (
    template: NotebookTemplate
  ) => void;
}

export default function NotebookTemplateGrid({
  onSelect,
}: Props) {
  return (
    <Stack spacing={3}>
      <Typography
        variant="h5"
        fontWeight={700}
      >
        Choose a Notebook
      </Typography>

      <Grid
        container
        spacing={3}
      >
        {NOTEBOOK_TEMPLATES.map(
          (template) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
              key={template.id}
            >
              <NotebookTemplateCard
                template={template}
                onClick={onSelect}
              />
            </Grid>
          )
        )}
      </Grid>
    </Stack>
  );
}