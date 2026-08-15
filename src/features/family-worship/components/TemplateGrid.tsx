import {
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { WorshipTemplate } from "../models/WorshipTemplate";
import TemplateCard from "./TemplateCard";

interface Props {
  templates: WorshipTemplate[];
  onSelect?: (
    template: WorshipTemplate
  ) => void;
}

export default function TemplateGrid({
  templates,
  onSelect,
}: Props) {
  return (
    <Stack spacing={3}>
      <Typography
        variant="h5"
        fontWeight={700}
      >
        Worship Templates
      </Typography>

      <Grid
        container
        spacing={2}
      >
        {templates.map((template) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
            key={template.id}
          >
            <TemplateCard
              template={template}
              onSelect={onSelect}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}