import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  STUDY_TEMPLATES,
  StudyTemplate,
} from "../models/StudyTemplate";

interface TemplatePickerProps {
  onSelect?: (template: StudyTemplate) => void;
}

export default function TemplatePicker({
  onSelect,
}: TemplatePickerProps) {
  return (
    <Grid container spacing={3}>
      {STUDY_TEMPLATES.map((template) => (
        <Grid
          key={template.id}
          size={{ xs: 12, sm: 6, md: 4 }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              transition: "0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
          >
            <CardActionArea
              onClick={() => onSelect?.(template)}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography
                    sx={{ fontSize: 42 }}
                  >
                    {template.icon}
                  </Typography>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {template.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {template.description}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}