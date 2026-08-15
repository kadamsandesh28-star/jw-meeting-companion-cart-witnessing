import {
  Paper,
  type PaperProps,
} from "@mui/material";

type Props = PaperProps;

export default function SectionCard(
  props: Props
) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
      {...props}
    />
  );
}