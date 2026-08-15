import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  minutes: number;
}

export default function AssignmentRow({
  id,
  title,
  minutes,
}: Props) {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        py: 2,
      }}
    >
      <Box>
        <Typography fontWeight="bold">
          {title}
        </Typography>

        <Typography
          color="text.secondary"
          variant="body2"
        >
          ⏱ {minutes} min
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={() =>
          navigate("/assignment-preparation", {
            state: {
              id,
              title,
              minutes,
            },
          })
        }
      >
        📝 Prepare
      </Button>
    </Stack>
  );
}