import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";

interface Props {
  title: string;
  defaultExpanded?: boolean;
  children: ReactNode;
}

export default function CollapsibleSection({
  title,
  defaultExpanded = true,
  children,
}: Props) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      disableGutters
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        mb: 2,
        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          variant="subtitle1"
          fontWeight={700}
        >
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}