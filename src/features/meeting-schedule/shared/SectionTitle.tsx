import {
  Divider,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
}

export default function SectionTitle({
  title,
}: Props) {
  return (
    <Stack spacing={2}>
      <Typography
        variant="h6"
        fontWeight={700}
        color="success.main"
      >
        {title}
      </Typography>

      <Divider />
    </Stack>
  );
}